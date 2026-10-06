(function () {
  "use strict";

  // -------------------------------
  // GET CONFIG FROM GLOBAL
  // -------------------------------
  const CART_CONFIG = window.CART_CONFIG || {
    surpriseGiftTitle: "Surprise Gift!",
    freeShippingGoal: 50,
    freeGiftGoal: 100,
    freeGiftHandle: "",
    discountCode: "BROWSE10",
    nonSubscriptionHandles: [],
    progressTitles: {
      freeGift: "Free Gift Unlocked!",
      freeShipping: "Free Shipping Unlocked!",
      default: "Add more for rewards",
    },
    progressMessages: {
      freeGift: "You got a free gift!",
      freeShipping: "Add ${remaining} more for a free gift",
      default: "Add ${remaining} more for free shipping",
    },
  };

  let isProcessingGift = false;
  const initializedButtons = new Set();
  let debounceTimer;
  const DEBOUNCE_DELAY = 500;
  let isUpdating = false;

  // -------------------------------
  // POPUP STYLES
  // -------------------------------
  function injectPopupStyles() {
    if (document.getElementById("subscription-popup-styles")) return;

    const style = document.createElement("style");
    style.id = "subscription-popup-styles";
    style.textContent = `
      .subscription-popup-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.6);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        opacity: 0;
        transition: opacity 0.3s ease;
      }
      
      .subscription-popup-overlay.show {
        opacity: 1;
        z-index:9999999999999999;
      }
      
      .subscription-popup {
        background: white;
        background: #fbead2;
        border-radius: 12px;
        padding: 30px;
        max-width: 500px;
        width: 90%;
        max-height: 80vh;
        overflow-y: auto;
        box-shadow: 0 10px 40px rgba(0,0,0,0.2);
        transform: scale(0.9);
        transition: transform 0.3s ease;
      }
       @media(max-width: 767px){
        .subscription-popup {
          padding: 20px;
        }
      }
      .subscription-popup-overlay.show .subscription-popup {
        transform: scale(1);
      }
      
      .popup-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
      }
      
      .popup-title {
        font-size: 24px;
        font-weight: bold;
        margin: 0;
      }
      @media(max-width: 767px){
        .popup-title {
          font-size: 15px;
        }
        .popup-header {
          margin-bottom: 10px;
        }
      }
      .popup-close {
        background: none;
        border: none;
        font-size: 28px;
        cursor: pointer;
        color: #666;
        padding: 0;
        width: 30px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      
      .popup-close:hover {
        color: #000;
      }
      
      .product-plans {
        // margin-bottom: 25px;
        border-bottom: 1px solid #eee;
        padding-bottom: 20px;
      }
      
      .product-plans:last-of-type {
        border-bottom: none;
      }
      
     .product-name {
        font-size: 16px;
        font-weight: 600;
        margin-bottom: 12px;
        color: #213346;
        font-family: "Point Panther";
        font-style: italic;
        line-height: 120%;
      }
      @media(max-width: 767px){
        .product-name {
          font-size: 14px;
        }
        .product-plans {
          margin-bottom: 0px;
          padding-bottom: 10px;
        }
      }
      .plan-option {
        display: flex;
        align-items: center;
        padding: 12px;
        border: 2px solid #e0e0e0;
        border-radius: 8px;
        border-radius: 32px;
        margin-bottom: 10px;
        cursor: pointer;
        transition: all 0.2s ease;
        background: #fff;
      }
      
      .plan-option:hover {
        border-color: #999;
        background: #f9f9f9;
      }
      
      .plan-option.selected {
        border-color: #000;
        background: #f5f5f5;
      }
      .plan-option.selected {
        border-color: #953F2F;
        background: #953F2F;
        color: #fff;
      }
      label.plan-option.selected .plan-description {
        color: #fff;
      }

      .plan-option.selected  .plan-radio {          
        accent-color: #953F2F;
      }
      
      .plan-radio {
        margin-right: 12px;
        width: 20px;
        height: 20px;
        cursor: pointer;
      }

      
      .plan-info {
        flex: 1;
      }
      
      .plan-name {
        font-weight: 600;
        // margin-bottom: 4px;
      }
      @media(max-width: 767px){
        .plan-name {
          font-weight: 600;
          margin-bottom: 2px;
          font-size:12px;
        }
      }
      .plan-description {
        font-size: 13px;
        color: #666;
      }
      .plan-description {
        display: none;
      }
      
      .popup-actions {
        display: flex;
        gap: 12px;
        margin-top: 10px;
      }
      @media(max-width: 767px){
        .popup-actions {
          display: flex;
          flex-wrap: wrap;
          flex-direction: column-reverse;
          margin-top: 6px;
        }
      }
      .popup-button {
        flex: 1;
        padding: 14px 20px;
        border: none;
        border-radius: 6px;
        font-size: 16px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s ease;
      }
      @media(max-width: 767px){
         .popup-button {
          flex: unset;
          width: 100%;
         }
      }
      .popup-button.primary {
        background: #953F2F;
        color: white;
      }
      
      .popup-button.primary:hover {
        background: #333;
        background:rgba(149, 62, 47, 0.93);
      }
      
      .popup-button.primary:disabled {
        background: #ccc;
        cursor: not-allowed;
      }
      
      .popup-button.secondary {
        background: #f0f0f0;
        color: #333;
      }
      
      .popup-button.secondary:hover {
        background: #e0e0e0;
      }
    `;
    document.head.appendChild(style);
  }

  // -------------------------------
  // HELPER FUNCTIONS
  // -------------------------------
  function getCacheBustedUrl(url) {
    const separator = url.includes("?") ? "&" : "?";
    return `${url}${separator}_t=${Date.now()}&_r=${Math.random()}`;
  }

  // -------------------------------
  // POPUP FUNCTIONS
  // -------------------------------
  function createPopupHTML(productsWithPlans) {
    return `
      <div class="subscription-popup-overlay" id="subscription-popup">
        <div class="subscription-popup">
          <div class="popup-header">
            <h2 class="popup-title">Select Subscription Plans</h2>
            <button class="popup-close" onclick="window.closeSubscriptionPopup()">&times;</button>
          </div>
          
          <div id="popup-content">
            ${productsWithPlans
              .map(
                (product, pIdx) => `
              <div class="product-plans">
                <div class="product-name">${product.title}</div>
                ${product.plans
                  .map(
                    (plan, planIdx) => `
                  <label class="plan-option ${planIdx === 0 ? 'selected' : ''}" data-product-idx="${pIdx}" data-plan-idx="${planIdx}">
                    <input 
                      type="radio" 
                      name="plan-${pIdx}" 
                      class="plan-radio" 
                      value="${plan.id}"
                      data-variant-id="${product.variantId}"
                      data-quantity="${product.quantity}"
                      ${planIdx === 0 ? "checked" : ""}
                    >
                    <div class="plan-info">
                      <div class="plan-name">${plan.name}</div>
                      <div class="plan-description">${
                        plan.description || "Subscribe and save"
                      }</div>
                    </div>
                  </label>
                `
                  )
                  .join("")}
              </div>
            `
              )
              .join("")}
          </div>
          
          <div class="popup-actions">
            <button class="popup-button secondary" onclick="window.closeSubscriptionPopup()">Cancel</button>
            <button class="popup-button primary" id="confirm-subscription-btn">Continue to Checkout</button>
          </div>
        </div>
      </div>
    `;
  }

  window.closeSubscriptionPopup = function () {
    const popup = document.getElementById("subscription-popup");
    if (popup) {
      popup.classList.remove("show");
      setTimeout(() => popup.remove(), 300);
    }
  };

  function openSubscriptionPopup(productsWithPlans) {
    const existingPopup = document.getElementById("subscription-popup");
    if (existingPopup) existingPopup.remove();

    const popupHTML = createPopupHTML(productsWithPlans);
    document.body.insertAdjacentHTML("beforeend", popupHTML);

    const popup = document.getElementById("subscription-popup");
    setTimeout(() => popup.classList.add("show"), 10);

    popup.querySelectorAll(".plan-option").forEach((option) => {
      option.addEventListener("click", function () {
        const radio = this.querySelector('input[type="radio"]');
        radio.checked = true;

        const productIdx = this.dataset.productIdx;
        popup
          .querySelectorAll(`.plan-option[data-product-idx="${productIdx}"]`)
          .forEach((opt) => {
            opt.classList.remove("selected");
          });

        this.classList.add("selected");
      });
    });

    const confirmBtn = document.getElementById("confirm-subscription-btn");
    confirmBtn.addEventListener("click", async () => {
      confirmBtn.disabled = true;
      confirmBtn.textContent = "Processing...";

      try {
        const selectedPlans = [];
        productsWithPlans.forEach((product, idx) => {
          console.log("this is called");
          const selectedRadio = popup.querySelector(
            `input[name="plan-${idx}"]:checked`
          );
          if (selectedRadio) {
            selectedPlans.push({
              variantId: parseInt(selectedRadio.dataset.variantId),
              quantity: parseInt(selectedRadio.dataset.quantity),
              sellingPlan: parseInt(selectedRadio.value),
            });
          }
        });

        if (selectedPlans.length > 0) {
          await processSubscriptionCheckout(selectedPlans);
        }
      } catch (err) {
        console.error("Subscription popup error:", err);
        confirmBtn.disabled = false;
        confirmBtn.textContent = "Continue to Checkout";
        alert("Something went wrong. Please try again.");
      }
    });

    popup.addEventListener("click", (e) => {
      if (e.target === popup) {
        window.closeSubscriptionPopup();
      }
    });
  }

  // -------------------------------
  // SUBSCRIPTION FUNCTIONS
  // -------------------------------
  // async function processSubscriptionCheckout(selectedPlans) {
  //   try {
  //     const url = getCacheBustedUrl("/cart.js");
  //     const cart = await fetch(url, {
  //       headers: { "Cache-Control": "no-cache" },
  //       cache: "no-store",
  //     }).then((r) => r.json());

  //     const updates = {};
  //     cart.items.forEach((item) => {
  //       if (CART_CONFIG.nonSubscriptionHandles.includes(item.handle)) return;
  //       if (item.handle === CART_CONFIG.freeGiftHandle) return;
  //       updates[item.key] = 0;
  //     });

  //     if (Object.keys(updates).length > 0) {
  //       await fetch("/cart/update.js", {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify({ updates }),
  //       });
  //       await new Promise((resolve) => setTimeout(resolve, 200));
  //     }

  //     const items = selectedPlans.map((plan) => ({
  //       id: plan.variantId,
  //       quantity: plan.quantity,
  //       selling_plan: plan.sellingPlan,
  //     }));

  //     await fetch("/cart/add.js", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ items }),
  //     });

  //     await new Promise((resolve) => setTimeout(resolve, 300));
  //     window.location.href = "/checkout";
  //   } catch (err) {
  //     console.error("processSubscriptionCheckout error:", err);
  //     throw err;
  //   }
  // }
  async function processSubscriptionCheckout(selectedPlans) {
    try {
      const url = getCacheBustedUrl("/cart.js");
      const cart = await fetch(url, {
        headers: { "Cache-Control": "no-cache" },
        cache: "no-store",
      }).then((r) => r.json());

      const updates = {};

      selectedPlans.forEach((plan) => {
        const cartItem = cart.items.find(
          (item) => item.variant_id === plan.variantId
        );
        if (cartItem) {
          updates[cartItem.key] = 0;
        }
      });

      if (Object.keys(updates).length > 0) {
        await fetch("/cart/update.js", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ updates }),
        });
        await new Promise((resolve) => setTimeout(resolve, 200));
      }

      const items = selectedPlans.map((plan) => ({
        id: plan.variantId,
        quantity: plan.quantity,
        selling_plan: plan.sellingPlan,
      }));

      await fetch("/cart/add.js", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      });

      await new Promise((resolve) => setTimeout(resolve, 300));
      window.location.href = "/checkout";
    } catch (err) {
      console.error("processSubscriptionCheckout error:", err);
      throw err;
    }
  }
  async function getProductsWithSellingPlans() {
    try {
      const url = getCacheBustedUrl("/cart.js");
      const cart = await fetch(url, {
        headers: { "Cache-Control": "no-cache" },
        cache: "no-store",
      }).then((r) => r.json());

      const productsWithPlans = [];

      for (const item of cart.items) {
        if (CART_CONFIG.nonSubscriptionHandles.includes(item.handle)) continue;
        if (item.handle === CART_CONFIG.freeGiftHandle) continue;

        const productUrl = getCacheBustedUrl(`/products/${item.handle}.js`);
        const product = await fetch(productUrl, {
          headers: { "Cache-Control": "no-cache" },
          cache: "no-store",
        }).then((r) => r.json());

        if (
          product.selling_plan_groups &&
          product.selling_plan_groups.length > 0
        ) {
          // Collect all plans from all selling plan groups
          const plans = [];
          product.selling_plan_groups.forEach((group) => {
            group.selling_plans.forEach((plan) => {
              plans.push({
                id: plan.id,
                name: plan.name,
                description: plan.description || group.name || "",
              });
            });
          });

          if (plans.length > 0) {
            productsWithPlans.push({
              title: product.title,
              variantId: item.variant_id,
              quantity: item.quantity,
              plans: plans,
            });
          }
        }
      }

      return productsWithPlans;
    } catch (err) {
      console.error("getProductsWithSellingPlans error:", err);
      return [];
    }
  }

  //   async function getProductsWithSellingPlans() {
  //     try {
  //       const url = getCacheBustedUrl("/cart.js");
  //       const cart = await fetch(url, {
  //         headers: { "Cache-Control": "no-cache" },
  //         cache: "no-store",
  //       }).then((r) => r.json());

  //       const productsWithPlans = [];

  //       for (const item of cart.items) {
  //         if (CART_CONFIG.nonSubscriptionHandles.includes(item.handle)) continue;
  //         if (item.handle === CART_CONFIG.freeGiftHandle) continue;

  //         const productUrl = getCacheBustedUrl(`/products/${item.handle}.js`);
  //         const product = await fetch(productUrl, {
  //           headers: { "Cache-Control": "no-cache" },
  //           cache: "no-store",
  //         }).then((r) => r.json());

  //         if (
  //           product.selling_plan_groups &&
  //           product.selling_plan_groups.length > 0
  //         ) {
  //           const plans = product.selling_plan_groups[0].selling_plans.map(
  //             (plan) => ({
  //               id: plan.id,
  //               name: plan.name,
  //               description: plan.description || "",
  //             })
  //           );

  //           if (plans.length > 0) {
  //             productsWithPlans.push({
  //               title: product.title,
  //               variantId: item.variant_id,
  //               quantity: item.quantity,
  //               plans: plans,
  //             });
  //           }
  //         }
  //       }

  //       return productsWithPlans;
  //     } catch (err) {
  //       console.error("getProductsWithSellingPlans error:", err);
  //       return [];
  //     }
  //   }

  // -------------------------------
  // CART DRAWER REFRESH
  // -------------------------------
  async function refreshCartDrawer() {
    try {
      const url =
        window.Shopify.routes.root +
        "?sections=cart-drawer,cart-icon-bubble&t=" +
        Date.now();
      const sections = await fetch(url, {
        method: "GET",
        headers: {
          "Cache-Control": "no-cache, no-store, must-revalidate",
          Pragma: "no-cache",
          Expires: "0",
        },
        cache: "no-store",
      }).then((r) => r.json());

      const cartDrawer = document.querySelector("cart-drawer");
      if (cartDrawer && sections["cart-drawer"]) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(
          sections["cart-drawer"],
          "text/html"
        );
        const newDrawer = doc.querySelector("cart-drawer");
        if (newDrawer) {
          cartDrawer.innerHTML = newDrawer.innerHTML;
          cartDrawer.classList.toggle(
            "is-empty",
            newDrawer.classList.contains("is-empty")
          );
        }
      }

      await new Promise((resolve) => setTimeout(resolve, 100));

      const headerBubble = document.querySelector("#cart-icon-bubble");
      if (headerBubble && sections["cart-icon-bubble"]) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(
          sections["cart-icon-bubble"],
          "text/html"
        );
        const newBubble = doc.querySelector("#cart-icon-bubble");
        if (newBubble) {
          headerBubble.replaceWith(newBubble.cloneNode(true));
        }
      }

      try {
        const cartRes = await fetch(`/cart.js?t=${Date.now()}`, {
          method: "GET",
          headers: {
            "Cache-Control": "no-cache, no-store, must-revalidate",
            Pragma: "no-cache",
          },
          cache: "no-store",
        });
        const cart = await cartRes.json();

        const totalCount = cart.items.reduce(
          (sum, item) => sum + item.quantity,
          0
        );

        const selectors = [
          "#cart-icon-bubble span",
          "#cart-icon-bubble .cart-count",
          "#cart-icon-bubble [data-cart-count]",
          ".cart-count-bubble",
        ];

        selectors.forEach((selector) => {
          const elements = document.querySelectorAll(selector);
          elements.forEach((el) => {
            el.textContent = totalCount > 0 ? totalCount : "";
            if (totalCount === 0) {
              el.style.display = "none";
            } else {
              el.style.display = "";
            }
          });
        });

        const bubble = document.querySelector("#cart-icon-bubble");
        if (bubble) {
          if (totalCount === 0) {
            bubble.classList.add("hidden");
            bubble.style.display = "none";
          } else {
            bubble.classList.remove("hidden");
            bubble.style.display = "";
          }
        }

        console.log("✅ Cart count synced:", totalCount);
      } catch (err) {
        console.error("❌ Cart count fetch failed:", err);
      }
      setTimeout(() => {
        initSubscriptionButton();
      }, 100);
      document.dispatchEvent(new CustomEvent("cart:refresh"));
    } catch (err) {
      console.error("refreshCartDrawer error:", err);
    }
  }

  // -------------------------------
  // PROGRESS BAR
  // -------------------------------
  function updateProgressBar(cartTotal) {
    const progressBar = document.querySelector(".progress-bar");
    const remainingAmountText = document.querySelector(".remaining-amount");
    const progressTitleText = document.querySelector(".progress-title-text");

    if (!progressBar || !remainingAmountText || !progressTitleText) return;

    let progress = 0;

    // Linear progress calculation based on thresholds
    const shippingGoal = CART_CONFIG.freeShippingGoal;
    const giftGoal = CART_CONFIG.freeGiftGoal;

    if (cartTotal >= giftGoal) {
      progress = 100;
    } else if (cartTotal >= shippingGoal) {
      // Map cartTotal between shippingGoal and giftGoal to 50% - 100%
      progress =
        50 + ((cartTotal - shippingGoal) / (giftGoal - shippingGoal)) * 50;
    } else {
      // Map cartTotal between 0 and shippingGoal to 0% - 50%
      progress = (cartTotal / shippingGoal) * 50;
    }

    // Animate progress bar
    requestAnimationFrame(() => {
      progressBar.style.transition = "none";
      progressBar.style.width = "0%";
      progressBar.offsetHeight;

      requestAnimationFrame(() => {
        progressBar.style.transition = "width 0.4s ease";
        // progressBar.style.width = `${Math.min(progress, 100)}%`;
        progressBar.style.width = `calc(${Math.min(progress, 100)}% - 12px)`;
      });
    });

    // Update progress texts
    if (cartTotal >= giftGoal) {
      remainingAmountText.innerHTML = CART_CONFIG.progressMessages.freeGift;
      progressTitleText.innerHTML = CART_CONFIG.progressTitles.freeGift;
    } else if (cartTotal >= shippingGoal) {
      const remaining = giftGoal - cartTotal;
      remainingAmountText.innerHTML =
        CART_CONFIG.progressMessages.freeShipping.replace(
          "${remaining}",
          remaining.toFixed(2)
        );
      progressTitleText.innerHTML = CART_CONFIG.progressTitles.freeShipping;
    } else {
      const remaining = shippingGoal - cartTotal;
      remainingAmountText.innerHTML =
        CART_CONFIG.progressMessages.default.replace(
          "${remaining}",
          remaining.toFixed(2)
        );
      progressTitleText.innerHTML = CART_CONFIG.progressTitles.default;
    }
  }

  // -------------------------------
  // FREE GIFT
  // -------------------------------
  function hideGiftControls(cart) {
    const cartItems = document.querySelectorAll(".cart-item");
    cartItems.forEach((item) => {
      const nameEl = item.querySelector(".cart-item__name");
      if (!nameEl) return;

      const itemTitle = nameEl.textContent.trim();
      const isGiftItem = cart.items.some(
        (ci) =>
          ci.handle === CART_CONFIG.freeGiftHandle &&
          (ci.title === itemTitle ||
            itemTitle === CART_CONFIG.surpriseGiftTitle)
      );
      if (isGiftItem || item.classList.contains("free-gift-item")) {
        // Add your hide logic here
      }
    });
  }

  async function getFirstVariantId(handle) {
    try {
      const url = getCacheBustedUrl(`/products/${handle}.js`);
      const product = await fetch(url, {
        headers: { "Cache-Control": "no-cache" },
        cache: "no-store",
      }).then((r) => r.json());
      if (product.variants && product.variants.length > 0)
        return product.variants[0].id;
    } catch (err) {
      console.error(err);
    }
    return null;
  }

  async function applyDiscountCodeAjax() {
    if (localStorage.getItem("firstFreeApplied")) return;
    try {
      const res = await fetch(
        "/discount/" + CART_CONFIG.discountCode + "?section_id=cart-drawer"
      );
      if (res.ok) localStorage.setItem("firstFreeApplied", "true");
    } catch (err) {
      console.error(err);
    }
  }

  async function handleFreeGift(cartTotal, cart) {
    if (isProcessingGift) return;
    isProcessingGift = true;

    try {
      const giftItem = cart.items.find(
        (i) => i.handle === CART_CONFIG.freeGiftHandle
      );

      if (cartTotal >= CART_CONFIG.freeGiftGoal && !giftItem) {
        const variantId = await getFirstVariantId(CART_CONFIG.freeGiftHandle);
        if (variantId) {
          await fetch("/cart/add.js", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id: variantId,
              quantity: 1,
              properties: { _free_gift: "true" },
            }),
          });
          await applyDiscountCodeAjax();
          await new Promise((resolve) => setTimeout(resolve, 400));
          await refreshCartDrawer();
        }
      } else if (cartTotal < CART_CONFIG.freeGiftGoal && giftItem) {
        await fetch("/cart/change.js", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: giftItem.key, quantity: 0 }),
        });
        await new Promise((resolve) => setTimeout(resolve, 400));
        await refreshCartDrawer();
      }

      const url = getCacheBustedUrl("/cart.js");
      const updatedCart = await fetch(url, {
        headers: {
          "Cache-Control": "no-cache, no-store, must-revalidate",
          Pragma: "no-cache",
        },
        cache: "no-store",
      }).then((r) => r.json());

      let updatedTotal = 0;
      updatedCart.items.forEach((item) => {
        if (item.handle !== CART_CONFIG.freeGiftHandle)
          updatedTotal += item.final_line_price;
      });
      updatedTotal = updatedTotal / 100;
      updateProgressBar(updatedTotal);
      hideGiftControls(updatedCart);
    } catch (err) {
      console.error("handleFreeGift", err);
    } finally {
      setTimeout(() => {
        isProcessingGift = false;
      }, 200);
    }
  }

  // -------------------------------
  // CART UI UPDATE
  // -------------------------------
  async function updateCartUI() {
    try {
      const url = getCacheBustedUrl("/cart.js");
      const cart = await fetch(url, {
        headers: {
          "Cache-Control": "no-cache, no-store, must-revalidate",
          Pragma: "no-cache",
        },
        cache: "no-store",
      }).then((r) => r.json());

      let cartTotal = 0;

      cart.items.forEach((item) => {
        if (item.handle !== CART_CONFIG.freeGiftHandle)
          cartTotal += item.final_line_price;
      });
      cartTotal = cartTotal / 100;

      updateProgressBar(cartTotal);
      hideGiftControls(cart);

      await handleFreeGift(cartTotal, cart);
      await refreshMobileCartCount();
    } catch (err) {
      console.error("updateCartUI", err);
    }
  }

  async function refreshMobileCartCount() {
    try {
      const url = getCacheBustedUrl("/cart.js");
      const cart = await fetch(url, {
        headers: { "Cache-Control": "no-cache" },
        cache: "no-store",
      }).then((r) => r.json());

      const countEl = document.querySelector("#mobile-cart-button span");
      if (!countEl) return;

      const totalCount = cart.items.reduce(
        (sum, item) => sum + item.quantity,
        0
      );
      countEl.textContent = totalCount;
    } catch (err) {
      console.error("Mobile cart count update failed:", err);
    }
  }

  // -------------------------------
  // DEBOUNCED MONITOR
  // -------------------------------
  function monitorCartDebounced() {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(async () => {
      if (isUpdating) {
        console.log("Update already in progress, skipping...");
        return;
      }
      isUpdating = true;

      try {
        await refreshCartDrawer();
        await updateCartUI();
      } catch (err) {
        console.error("Monitor cart error:", err);
      } finally {
        setTimeout(() => {
          isUpdating = false;
        }, 300);
      }
    }, DEBOUNCE_DELAY);
  }

  // -------------------------------
  // SUBSCRIPTION BUTTON
  // -------------------------------
  // function initSubscriptionButton() {
  //   const btn = document.getElementById("subscribe-checkout-btn");
  //   if (!btn) return;

  //   if (btn.hasAttribute("data-listener-added")) return;
  //   btn.setAttribute("data-listener-added", "true");

  //   initializedButtons.add(btn);

  //   btn.addEventListener(
  //     "click",
  //     async (e) => {
  //       e.preventDefault();
  //       e.stopPropagation();
  //       e.stopImmediatePropagation();

  //       if (btn.hasAttribute("data-processing")) return;
  //       btn.setAttribute("data-processing", "true");

  //       btn.classList.add("loading");
  //       btn.disabled = true;
  //       const originalHTML = btn.innerHTML;
  //       btn.dataset.originalHTML = originalHTML;
  //       btn.innerHTML = "Loading...";

  //       try {
  //         const productsWithPlans = await getProductsWithSellingPlans();

  //         if (productsWithPlans.length === 0) {
  //           alert("No subscription products found in cart.");
  //           resetButton(btn, originalHTML);
  //           return;
  //         }

  //         resetButton(btn, originalHTML);
  //         openSubscriptionPopup(productsWithPlans);
  //       } catch (err) {
  //         console.error("Subscription error:", err);
  //         alert("Something went wrong. Please try again.");
  //         resetButton(btn, originalHTML);
  //       } finally {
  //         btn.removeAttribute("data-processing");
  //       }
  //     },
  //     { once: false, passive: false }
  //   );
  // }
function initSubscriptionButton() {
  const btn = document.getElementById("subscribe-checkout-btn");
  if (!btn) return;

  // 🆕 Remove old listener if exists
  if (btn.hasAttribute("data-listener-added")) {
    btn.removeAttribute("data-listener-added");
    const newBtn = btn.cloneNode(true);
    btn.parentNode.replaceChild(newBtn, btn);
    // Update reference to new button
    const updatedBtn = document.getElementById("subscribe-checkout-btn");
    if (updatedBtn) {
      updatedBtn.setAttribute("data-listener-added", "true");
      attachSubscriptionListener(updatedBtn);
    }
    return;
  }

  btn.setAttribute("data-listener-added", "true");
  attachSubscriptionListener(btn);
}
  function attachSubscriptionListener(btn) {
  initializedButtons.add(btn);

  btn.addEventListener(
    "click",
    async (e) => {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();

      if (btn.hasAttribute("data-processing")) return;
      btn.setAttribute("data-processing", "true");

      btn.classList.add("loading");
      btn.disabled = true;
      const originalHTML = btn.innerHTML;
      btn.dataset.originalHTML = originalHTML;
      btn.innerHTML = "Loading...";

      try {
        const productsWithPlans = await getProductsWithSellingPlans();

        if (productsWithPlans.length === 0) {
          alert("No subscription products found in cart.");
          resetButton(btn, originalHTML);
          return;
        }

        resetButton(btn, originalHTML);
        openSubscriptionPopup(productsWithPlans);
      } catch (err) {
        console.error("Subscription error:", err);
        alert("Something went wrong. Please try again.");
        resetButton(btn, originalHTML);
      } finally {
        btn.removeAttribute("data-processing");
      }
    },
    { once: false, passive: false }
  );
}

  function resetButton(btn, originalHTML) {
    btn.classList.remove("loading");
    btn.disabled = false;
    if (originalHTML) btn.innerHTML = originalHTML;
    delete btn.dataset.originalHTML;
    btn.removeAttribute("data-processing");
  }

  function pollSubscriptionButton(attempts = 0) {
    const btn = document.getElementById("subscribe-checkout-btn");
    if (btn && !btn.hasAttribute("data-listener-added")) {
      initSubscriptionButton();
      return;
    }
    if (attempts < 100)
      setTimeout(() => pollSubscriptionButton(attempts + 1), 100);
  }

  // -------------------------------
  // INIT
  // -------------------------------
  document.addEventListener("DOMContentLoaded", () => {
    injectPopupStyles();

    setTimeout(() => {
      updateCartUI();
    }, 600);

    const cartContainer = document.querySelector("#CartDrawer-CartItems");
    if (cartContainer) {
      let observerTimeout;

      const observer = new MutationObserver((mutations) => {
        const relevantMutation = mutations.some(
          (mutation) =>
            mutation.type === "childList" &&
            (mutation.addedNodes.length > 0 || mutation.removedNodes.length > 0)
        );

        if (!relevantMutation) return;

        clearTimeout(observerTimeout);
        observerTimeout = setTimeout(() => {
          monitorCartDebounced();
        }, 200);
      });

      observer.observe(cartContainer, {
        childList: true,
        subtree: true,
        attributes: false,
        characterData: false,
      });
    }

    pollSubscriptionButton();

    document.body.addEventListener(
      "click",
      (e) => {
        const target =
          e.target.closest(".quantity__button") ||
          e.target.closest("cart-remove-button") ||
          e.target.closest(".product-form__submit");

        if (target) {
          monitorCartDebounced();
          setTimeout(pollSubscriptionButton, DEBOUNCE_DELAY);
        }
      },
      { passive: true }
    );

    document.body.addEventListener(
      "change",
      (e) => {
        if (e.target.classList.contains("quantity__input")) {
          monitorCartDebounced();
          setTimeout(pollSubscriptionButton, DEBOUNCE_DELAY);
        }
      },
      { passive: true }
    );
  });

  // -------------------------------
  // FETCH OVERRIDE
  // -------------------------------
  const originalFetch = window.fetch;
  window.fetch = function (...args) {
    const url = args[0];
    const isCartUpdate =
      typeof url === "string" &&
      (url.includes("/cart/add") ||
        url.includes("/cart/change") ||
        url.includes("/cart/update"));

    if (isCartUpdate) {
      return originalFetch
        .apply(this, args)
        .then(async (response) => {
          const cloned = response.clone();

          setTimeout(() => {
            monitorCartDebounced();
            setTimeout(pollSubscriptionButton, DEBOUNCE_DELAY);
          }, 100);

          return response;
        })
        .catch((err) => {
          console.error("Fetch error:", err);
          return Promise.reject(err);
        });
    }

    return originalFetch.apply(this, args);
  };

  // Global functions
  window.refreshCartDrawer = refreshCartDrawer;
  window.monitorCart = updateCartUI;

  // Listen for cart changes from theme
  document.addEventListener("cart:updated", () => {
    console.log("Cart updated event received");
    monitorCartDebounced();
  });
})();
