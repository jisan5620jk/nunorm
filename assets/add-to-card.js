// document.addEventListener('DOMContentLoaded', () => {
//   // Cart update utility functions
//   function updateCartCount(count) {
//     const cartCountElements = document.querySelectorAll(
//       [
//         '.cart-count',
//         '.cart-item-count',
//         '.site-header__cart-count',
//         '.header__cart-count',
//         '.cart-link__count',
//         '[data-cart-count]',
//         '.js-cart-item-count',
//         '.cart-count-bubble span',
//         '.cart-count-text',
//       ].join(', ')
//     );

//     cartCountElements.forEach((element) => {
//       element.textContent = count;
//       element.innerText = count;
//       if (element.hasAttribute('data-cart-count')) {
//         element.setAttribute('data-cart-count', count);
//       }
//     });

//     const cartBubbles = document.querySelectorAll(
//       ['.cart-count-bubble', '.cart-link__bubble', '.site-header__cart-indicator'].join(', ')
//     );

//     cartBubbles.forEach((bubble) => {
//       if (count > 0) {
//         bubble.style.display = '';
//         bubble.classList.remove('hidden');
//         bubble.classList.add('visible');
//       } else {
//         bubble.style.display = 'none';
//         bubble.classList.add('hidden');
//         bubble.classList.remove('visible');
//       }
//     });
//   }

//   function updateCartTotal(total) {
//     const cartTotalElements = document.querySelectorAll(
//       [
//         '.cart-subtotal',
//         '.cart-total',
//         '.cart__total',
//         '.cart-drawer__total',
//         '.drawer__total',
//         '[data-cart-total]',
//       ].join(', ')
//     );

//     cartTotalElements.forEach((element) => {
//       element.textContent = total;
//       element.innerHTML = total;
//     });
//   }

//   function fetchCartState() {
//     return fetch('/cart.js')
//       .then((res) => res.json())
//       .then((cart) => {
//         updateCartCount(cart.item_count);
//         const formattedTotal = Shopify.formatMoney
//           ? Shopify.formatMoney(cart.total_price)
//           : (cart.total_price / 100).toFixed(2);
//         updateCartTotal(formattedTotal);
//         return cart;
//       });
//   }

//   // Add upsells via separate JSON request
//   function addUpsellsToCart() {
//     const upsellIds = window.getSelectedUpsells ? window.getSelectedUpsells() : [];

//     if (!upsellIds.length) return Promise.resolve(); // no upsells, skip

//     return fetch('/cart/add.js', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({
//         items: upsellIds.map((id) => ({ id: parseInt(id, 10), quantity: 1 })),
//       }),
//     }).then((res) => res.json());
//   }

//   // Main cart add functionality
//   document.querySelectorAll('form[action*="/cart/add"]').forEach((form) => {
//     form.addEventListener('submit', function (e) {
//       e.preventDefault();

//       const formData = new FormData(form); // untouched original form data
//       const submitButton = form.querySelector('[type="submit"]');
//       const originalText = submitButton.textContent;
//       if (submitButton) {
//         submitButton.disabled = true;        
//         submitButton.textContent = 'Adding...';        
//       }

//       // Step 1: Add main product (original formData, nothing changed)
//       fetch('/cart/add.js', {
//         method: 'POST',
//         body: formData,
//       })
//         .then((res) => res.json())
//         .then((item) => {
//           console.log('Main item added:', item);
//           // Step 2: Add upsells if any selected
//           return addUpsellsToCart();
//         })
//         .then(() => {
//           // Step 3: Refresh cart state
//           return fetchCartState();
//         })
//         .then(() => {
//           // Step 4: Fetch updated drawer HTML
//           return fetch('/cart?section_id=cart-drawer');
//         })
//         .then((res) => res.text())
//         .then((html) => {
//           // Step 5: Update drawer and open it
//           updateCartDrawerContent(html);
//           openCartDrawer();      
          
          
//           submitButton.disabled = false;
//           submitButton.textContent = originalText;        
          
        
//         })
//         .catch((err) => {
//           console.error('Cart error:', err);
//           if (submitButton) {
//             submitButton.disabled = false;
//              submitButton.textContent = originalText;   
//           }
         
//         });
//     });
//   });

//   function updateCartDrawerContent(html) {
//     const parser = new DOMParser();
//     const doc = parser.parseFromString(html, 'text/html');
//     const newCartDrawer = doc.querySelector('cart-drawer');
//     const currentCartDrawer = document.querySelector('cart-drawer');

//     if (currentCartDrawer && newCartDrawer) {
//       const wasOpen =
//         currentCartDrawer.hasAttribute('open') || currentCartDrawer.classList.contains('active');
//       const parent = currentCartDrawer.parentNode;

//       if (wasOpen) {
//         newCartDrawer.setAttribute('open', '');
//         newCartDrawer.classList.add('active');
//       }

//       newCartDrawer.classList.remove('is-empty');
//       parent.replaceChild(newCartDrawer, currentCartDrawer);
//     } else if (currentCartDrawer) {
//       const newContent = doc.querySelector('cart-drawer .drawer__inner');
//       const currentContent = currentCartDrawer.querySelector('.drawer__inner');

//       if (newContent && currentContent) {
//         currentContent.innerHTML = newContent.innerHTML;
//         currentCartDrawer.classList.remove('is-empty');
//       }
//     }

//     updatePageCartElements(doc);
//   }

//   function updatePageCartElements(doc) {
//     const newMiniCart = doc.querySelector('.mini-cart');
//     const currentMiniCart = document.querySelector('.mini-cart');
//     if (newMiniCart && currentMiniCart) {
//       currentMiniCart.innerHTML = newMiniCart.innerHTML;
//     }

//     const newCartForm = doc.querySelector('form[action="/cart"]');
//     const currentCartForm = document.querySelector('form[action="/cart"]');
//     if (newCartForm && currentCartForm && window.location.pathname === '/cart') {
//       currentCartForm.innerHTML = newCartForm.innerHTML;
//     }
//   }

//   function openCartDrawer() {
//     const cartDrawer = document.querySelector('cart-drawer');
//     if (!cartDrawer) return;

//     cartDrawer.classList.remove('is-empty');
//     cartDrawer.setAttribute('open', '');
//     cartDrawer.classList.add('active');
//     document.body.classList.add('overflow-hidden');

//     if (window.theme && window.theme.cartDrawer) {
//       window.theme.cartDrawer.open();
//     }

//     cartDrawer.offsetHeight;

//     setTimeout(() => {
//       if (cartDrawer && !cartDrawer.hasAttribute('open')) {
//         cartDrawer.setAttribute('open', '');
//         cartDrawer.classList.add('active');
//       }
//     }, 100);

//     document.dispatchEvent(
//       new CustomEvent('cart:updated', {
//         detail: { action: 'opened' },
//       })
//     );
//   }

//   // Handle cart drawer close
//   document.addEventListener('click', function (e) {
//     if (e.target.matches('.drawer__close, [data-cart-close]')) {
//       const cartDrawer = document.querySelector('cart-drawer');
//       if (cartDrawer) {
//         cartDrawer.removeAttribute('open');
//         cartDrawer.classList.remove('active');
//         document.body.classList.remove('overflow-hidden');
//       }
//     }
//   });

//   // Initialize cart count on page load
//   fetchCartState().catch((err) => console.error('Failed to fetch initial cart state:', err));
// });


document.addEventListener('DOMContentLoaded', () => {
  // Cart update utility functions
  function updateCartCount(count) {
    const cartCountElements = document.querySelectorAll(
      [
        '.cart-count', '.cart-item-count', '.site-header__cart-count',
        '.header__cart-count', '.cart-link__count', '[data-cart-count]',
        '.js-cart-item-count', '.cart-count-bubble span', '.cart-count-text',
      ].join(', ')
    );
    cartCountElements.forEach((element) => {
      element.textContent = count;
      element.innerText = count;
      if (element.hasAttribute('data-cart-count')) {
        element.setAttribute('data-cart-count', count);
      }
    });

    const cartBubbles = document.querySelectorAll(
      ['.cart-count-bubble', '.cart-link__bubble', '.site-header__cart-indicator'].join(', ')
    );
    cartBubbles.forEach((bubble) => {
      if (count > 0) {
        bubble.style.display = '';
        bubble.classList.remove('hidden');
        bubble.classList.add('visible');
      } else {
        bubble.style.display = 'none';
        bubble.classList.add('hidden');
        bubble.classList.remove('visible');
      }
    });
  }

  function updateCartTotal(total) {
    const cartTotalElements = document.querySelectorAll(
      [
        '.cart-subtotal', '.cart-total', '.cart__total',
        '.cart-drawer__total', '.drawer__total', '[data-cart-total]',
      ].join(', ')
    );
    cartTotalElements.forEach((element) => {
      element.textContent = total;
      element.innerHTML = total;
    });
  }

  function fetchCartState() {
    return fetch('/cart.js')
      .then((res) => res.json())
      .then((cart) => {
        updateCartCount(cart.item_count);
        const formattedTotal = Shopify.formatMoney
          ? Shopify.formatMoney(cart.total_price)
          : (cart.total_price / 100).toFixed(2);
        updateCartTotal(formattedTotal);
        return cart;
      });
  }

  // ✅ Build combined items array from formData + upsells in ONE fetch
  function buildCombinedPayload(formData) {
    // Extract main product id & quantity from formData
    const mainId = formData.get('id');
    const mainQty = parseInt(formData.get('quantity') || '1', 10);

    // Build items array starting with main product
    const items = [{ id: parseInt(mainId, 10), quantity: mainQty }];

    // Collect any extra properties from formData (e.g. selling_plan, properties)
    const properties = {};
    for (const [key, value] of formData.entries()) {
      if (key.startsWith('properties[')) {
        const propKey = key.match(/\[(.+)\]/)[1];
        properties[propKey] = value;
      }
    }
    if (Object.keys(properties).length) {
      items[0].properties = properties;
    }

    // Selling plan support
    const sellingPlan = formData.get('selling_plan');
    if (sellingPlan) {
      items[0].selling_plan = sellingPlan;
    }

    // Append upsells
    const upsellIds = window.getSelectedUpsells ? window.getSelectedUpsells() : [];
    upsellIds.forEach((id) => {
      items.push({ id: parseInt(id, 10), quantity: 1 });
    });

    return items;
  }

  // Main cart add functionality
  document.querySelectorAll('form[action*="/cart/add"]').forEach((form) => {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const formData = new FormData(form);
      const submitButton = form.querySelector('[type="submit"]');
      const originalText = submitButton ? submitButton.textContent : '';

      if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = 'Adding...';
      }

      // ✅ Step 1: Single fetch — main product + upsells combined
      fetch('/cart/add.js', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: buildCombinedPayload(formData) }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log('Items added:', data);
          // ✅ Step 2: Fetch cart state and drawer HTML in parallel
          return Promise.all([
            fetchCartState(),
            fetch('/cart?section_id=cart-drawer').then((res) => res.text()),
          ]);
        })
        .then(([, html]) => {
          // ✅ Step 3: Update drawer and open
          updateCartDrawerContent(html);
          openCartDrawer();

          if (submitButton) {
            submitButton.disabled = false;
            submitButton.textContent = originalText;
          }
        })
        .catch((err) => {
          console.error('Cart error:', err);
          if (submitButton) {
            submitButton.disabled = false;
            submitButton.textContent = originalText;
          }
        });
    });
  });

  function updateCartDrawerContent(html) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const newCartDrawer = doc.querySelector('cart-drawer');
    const currentCartDrawer = document.querySelector('cart-drawer');

    if (currentCartDrawer && newCartDrawer) {
      const wasOpen = currentCartDrawer.hasAttribute('open') || currentCartDrawer.classList.contains('active');
      const parent = currentCartDrawer.parentNode;
      if (wasOpen) {
        newCartDrawer.setAttribute('open', '');
        newCartDrawer.classList.add('active');
      }
      newCartDrawer.classList.remove('is-empty');
      parent.replaceChild(newCartDrawer, currentCartDrawer);
    } else if (currentCartDrawer) {
      const newContent = doc.querySelector('cart-drawer .drawer__inner');
      const currentContent = currentCartDrawer.querySelector('.drawer__inner');
      if (newContent && currentContent) {
        currentContent.innerHTML = newContent.innerHTML;
        currentCartDrawer.classList.remove('is-empty');
      }
    }
    updatePageCartElements(doc);
  }

  function updatePageCartElements(doc) {
    const newMiniCart = doc.querySelector('.mini-cart');
    const currentMiniCart = document.querySelector('.mini-cart');
    if (newMiniCart && currentMiniCart) {
      currentMiniCart.innerHTML = newMiniCart.innerHTML;
    }

    const newCartForm = doc.querySelector('form[action="/cart"]');
    const currentCartForm = document.querySelector('form[action="/cart"]');
    if (newCartForm && currentCartForm && window.location.pathname === '/cart') {
      currentCartForm.innerHTML = newCartForm.innerHTML;
    }
  }

  function openCartDrawer() {
    const cartDrawer = document.querySelector('cart-drawer');
    if (!cartDrawer) return;

    cartDrawer.classList.remove('is-empty');
    cartDrawer.setAttribute('open', '');
    cartDrawer.classList.add('active');
    document.body.classList.add('overflow-hidden');

    if (window.theme && window.theme.cartDrawer) {
      window.theme.cartDrawer.open();
    }

    cartDrawer.offsetHeight;

    setTimeout(() => {
      if (cartDrawer && !cartDrawer.hasAttribute('open')) {
        cartDrawer.setAttribute('open', '');
        cartDrawer.classList.add('active');
      }
    }, 100);

    document.dispatchEvent(
      new CustomEvent('cart:updated', { detail: { action: 'opened' } })
    );
  }

  document.addEventListener('click', function (e) {
    if (e.target.matches('.drawer__close, [data-cart-close]')) {
      const cartDrawer = document.querySelector('cart-drawer');
      if (cartDrawer) {
        cartDrawer.removeAttribute('open');
        cartDrawer.classList.remove('active');
        document.body.classList.remove('overflow-hidden');
      }
    }
  });

  fetchCartState().catch((err) => console.error('Failed to fetch initial cart state:', err));
});