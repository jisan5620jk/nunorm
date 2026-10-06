class BGVideo extends HTMLElement {
  constructor() {
    super();
    this.video = null;
    this.observer = null;
    this.handleIntersection = this.handleIntersection.bind(this);
    this.debug = true; // Toggle logging, set to true to enable
  }

  connectedCallback() {
    this.video = this.querySelector("video");

    if (!this.video) {
      console.warn("No video element found in bg-video");
      return;
    }

    // Set initial video properties
    this.video.muted = true;
    this.video.playsInline = true;
    this.video.loop = true;

    // Create and configure intersection observer
    this.observer = new IntersectionObserver(this.handleIntersection, {
      root: null,
      threshold: [0, 0.1],
      // Extend the detection area just 25% of viewport height above and below
      rootMargin: "0% 0px 100% 0px",
    });

    this.observer.observe(this);

    // Log initial state
    this.log("Video initialized");

    // Add event listeners for video state
    this.video.addEventListener("play", () =>
      this.log("Video started playing")
    );
    this.video.addEventListener("pause", () => this.log("Video paused"));

    // Handle page visibility
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        this.video.pause();
        this.log("Page hidden - video paused");
      } else {
        if (this.isInView && !this.video.paused) {
          this.video.play().catch(() => {});
          this.log("Page visible - attempting to resume video");
        }
      }
    });
  }

  log(message) {
    if (this.debug) {
      console.log(`%c[BGVideo] ${message}`, "color: #8B5CF6");
    }
  }

  handleIntersection(entries) {
    const entry = entries[0];
    this.isInView = entry.isIntersecting;

    if (this.isInView) {
      this.log(
        `Video entering view (${Math.round(
          entry.intersectionRatio * 100
        )}% visible)`
      );
      requestAnimationFrame(() => {
        this.video.play().catch((error) => {
          if (error.name === "NotAllowedError") {
            this.log("Autoplay prevented by browser");
          }
        });
      });
    } else {
      this.log("Video leaving view");
      this.video.pause();
    }
  }

  disconnectedCallback() {
    this.log("Cleaning up video element");

    if (this.observer) {
      this.observer.disconnect();
    }

    if (this.video) {
      this.video.pause();
      this.video = null;
    }
  }
}

customElements.define("bg-video", BGVideo);
