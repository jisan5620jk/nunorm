const Swiper = window.Swiper;

new Swiper('[data-icons-row-slider]', {
    slidesPerView: 1,
    pagination: {
      el: '[data-icons-row-slider-pagination]',
      clickable: true
    }
}); 