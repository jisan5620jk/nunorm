class AnnouncementBar extends HTMLElement {
  constructor() {
    super();
    this.swiper = null;
    this.colors = (this.dataset.colors || "").split(",");
  }

  connectedCallback() {
    this.loop = this.dataset.loop === "true";
    this.autoplay = this.dataset.autoplay === "true";
    this.interval = parseInt(this.dataset.interval || "5000");

    this.initializeSwiper();
  }

  disconnectedCallback() {
    if (this.swiper) {
      this.swiper.destroy();
      this.swiper = null;
    }
  }

  initializeSwiper() {
    const autoplayConfig = this.autoplay
      ? {
          delay: this.interval,
          disableOnInteraction: false,
        }
      : false;

    this.swiper = new Swiper(this.querySelector(".swiper"), {
      loop: this.loop,
      autoplay: autoplayConfig,
      direction: "horizontal",
      allowTouchMove: true,
      autoHeight: true,
      effect: "fade",
      fadeEffect: {
        crossFade: true,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      on: {
        init: (swiper) => {
          // Set initial color
          const initialIndex = swiper.realIndex;
          if (this.colors[initialIndex]) {
            this.style.setProperty(
              "--announcement-bar-nav-color",
              this.colors[initialIndex]
            );
          }
        },
        slideChange: (swiper) => {
          // Update color on slide change
          const currentIndex = swiper.realIndex;
          if (this.colors[currentIndex]) {
            this.style.setProperty(
              "--announcement-bar-nav-color",
              this.colors[currentIndex]
            );
          }
        },
      },
    });
  }
}

window.customElements.define("announcement-bar", AnnouncementBar);
