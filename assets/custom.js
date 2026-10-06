// $(document).ready(function () {
//   $(".custom-submit-cart-btn").click(function () {
//     var queue = [];
//     var section_id = $(this).attr("data-id");
//     var variant_id = $(section_id).val();
//     var qty = 1;
//     queue.push({ id: variant_id, quantity: qty });
//     let data = {
//       items: queue,
//     };
//     addItemToCart(data);
//   });
// });

// function addItemToCart(data) {
//   // console.log(data);
//   jQuery.ajax({
//     type: "POST",
//     url: "/cart/add.js",
//     data: data,
//     dataType: "json",
//     success: function (carthtml) {
//       console.log("success");
//       document.querySelector('.cart-drawer-content').innerHTML = ""
//     },
//   });
// }
jQuery(document).ready(function($){
  $(window).scroll(function() {
   AOS.init();
  //  console.log('animation run');
});
});




// document.addEventListener("DOMContentLoaded", () => {
//   const loader = document.getElementById("page-loader");
//   const headerWrapper = document.querySelector(".header-wrapper");

//   if (!headerWrapper) return;

//   const initScrollHeader = () => {
//     const headerHeight = headerWrapper.offsetHeight;

//     window.addEventListener("scroll", () => {
//       if (window.scrollY > 700) {
//         headerWrapper.classList.add("custom__header-scroll-dowm");
//         document.body.style.paddingTop = headerHeight + "px";
//       } else {
//         headerWrapper.classList.remove("custom__header-scroll-dowm");
//         document.body.style.paddingTop = "0";
//       }
//     });
//   };

//   const checkLoaderAndInit = () => {
//     if (window.getComputedStyle(loader).display === "none") {
//       initScrollHeader();
//     } else {
//       const interval = setInterval(() => {
//         if (window.getComputedStyle(loader).display === "none") {
//           clearInterval(interval);
//           initScrollHeader();
//         }
//       }, 100);
//     }
//   };

//   checkLoaderAndInit();
// });



// document.addEventListener("DOMContentLoaded", () => {
//   const loader = document.getElementById("page-loader");
//   const headerWrapper = document.querySelector(".header-wrapper");

//   if (!headerWrapper) return;

//   const initScrollHeader = () => {
//     const headerHeight = headerWrapper.offsetHeight;

//     window.addEventListener("scroll", () => {
//       if (window.scrollY > 700) {
//         headerWrapper.classList.add("custom__header-scroll-dowm");
//         document.body.style.paddingTop = headerHeight + "px";
//       } else {
//         headerWrapper.classList.remove("custom__header-scroll-dowm");
//         document.body.style.paddingTop = "0";
//       }
//     });
//   };

//   const checkLoaderAndInit = () => {
//     const loaderStyle = window.getComputedStyle(loader);
//     const loaderHeight = parseFloat(loaderStyle.height);

//     if (loaderStyle.display === "none" || loaderHeight === 0 || loader.classList.contains("loaded")) {
//       initScrollHeader();
//     } else {
//       const interval = setInterval(() => {
//         const style = window.getComputedStyle(loader);
//         const height = parseFloat(style.height);

//         if (style.display === "none" || height === 0 || loader.classList.contains("loaded")) {
//           clearInterval(interval);
//           initScrollHeader();
//         }
//       }, 100);
//     }
//   };

//   checkLoaderAndInit();
// });
