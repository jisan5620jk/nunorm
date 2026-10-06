
(function () {
  class MyAccordion extends HTMLElement {
    constructor() {
      super();
      this._onResize = this._onResize.bind(this);
      this._observer = null;
    }

    connectedCallback() {
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => this._init(), { once: true });
      } else {
        this._init();
      }
    }

    disconnectedCallback() {
      window.removeEventListener('resize', this._onResize);
      if (this._observer) this._observer.disconnect();
    }

    _init() {
      const items = Array.from(this.querySelectorAll('.my_accordion_item'));
      items.forEach(item => {
        const header = item.querySelector('.my_accordion_header');
        const content = item.querySelector('.my_accordion_content');
        if (!header || !content) return;

        header.setAttribute('aria-expanded', 'false');
        content.setAttribute('aria-hidden', 'true');
        content.style.overflow = 'hidden';
        content.style.maxHeight = '0px';

        header.addEventListener('click', () => this._toggle(item, true));
        header.addEventListener('keydown', (evt) => {
          if (evt.key === 'Enter' || evt.key === ' ') {
            evt.preventDefault();
            this._toggle(item, true);
          }
        });

        const imgs = content.querySelectorAll('img');
        imgs.forEach(img => {
          if (!img.complete) {
            img.addEventListener('load', () => this._fixOpenHeights(item));
            img.addEventListener('error', () => this._fixOpenHeights(item));
          }
        });
      });

      window.addEventListener('resize', this._onResize);

      this._observer = new MutationObserver(() => this._recalcAllOpen());
      this._observer.observe(this, { childList: true, subtree: true, characterData: true });

      this._recalcAllOpen();
    }

    _toggle(item) {
      const header = item.querySelector('.my_accordion_header');
      const content = item.querySelector('.my_accordion_content');
      if (!header || !content) return;

      const isActive = item.classList.toggle('active');

      if (isActive) {
        header.setAttribute('aria-expanded', 'true');
        content.setAttribute('aria-hidden', 'false');
        requestAnimationFrame(() => {
          const height = content.scrollHeight;
          content.style.maxHeight = height + 'px';
        });
      } else {
        header.setAttribute('aria-expanded', 'false');
        content.setAttribute('aria-hidden', 'true');
        requestAnimationFrame(() => {
          content.style.maxHeight = '0px';
        });
      }
    }

    _fixOpenHeights(item) {
      if (!item.classList.contains('active')) return;
      const content = item.querySelector('.my_accordion_content');
      if (!content) return;
      content.style.transition = 'none';
      content.style.maxHeight = 'none';
      const height = content.scrollHeight;
      void content.offsetHeight;
      content.style.transition = '';
      content.style.maxHeight = height + 'px';
    }

    _recalcAllOpen() {
      const openItems = Array.from(this.querySelectorAll('.my_accordion_item.active'));
      openItems.forEach(item => this._fixOpenHeights(item));
    }

    _onResize() {
      this._recalcAllOpen();
    }
  }

  if (!customElements.get('my-accordion')) {
    customElements.define('my-accordion', MyAccordion);
  }
})();

