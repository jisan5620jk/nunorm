class UiNewsletterPopup extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.initializeElements();
    this.addEventListeners();

    if (Shopify.designMode) {
      console.log("designMode");
      this.addShopifyEventListeners();
    } else {
      this.checkCookieAndSession();
      console.log("not designMode");
    }
  }

  disconnectedCallback() {
    this.removeEventListeners();

    if (Shopify.designMode) {
      this.removeShopifyEventListeners();
    }
  }

  initializeElements() {
    this.form = this.querySelector("form");
    this.closeBtn = this.querySelector(".ui-newsletter-popup__close");
    this.signupStep = this.querySelector(".ui-newsletter-popup__signup");
    this.successStep = this.querySelector(".ui-newsletter-popup__success");
    this.nameInput = this.querySelector(".ui-newsletter-popup__input-name");
    this.emailInput = this.querySelector(".ui-newsletter-popup__input-email");
    this.phoneInput = this.querySelector(".ui-newsletter-popup__input-phone");
    this.marketingConsent = this.querySelector(
      ".ui-newsletter-popup__input-checkbox"
    );
    this.copyBtn = this.querySelector(".ui-newsletter-popup__button-copy");
    this.promoCode = this.querySelector(".ui-newsletter-popup__promo-code");
    this.showSucessPreview = this.hasAttribute("data-show-success-preview");
    this.codeCopiedMessage = this.querySelector(
      ".ui-newsletter-popup__copy-sucesss-message"
    );
    this.mainContent = this.querySelector(".ui-newsletter-popup__main");
    this.messageDiv = this.querySelector(".ui-newsletter-popup-msg");
    console.log("this.showSucessPreview", this.showSucessPreview);
  }

  addShopifyEventListeners() {
    document.addEventListener(
      "shopify:section:load",
      this.handleSectionEvent.bind(this)
    );
    document.addEventListener(
      "shopify:section:select",
      this.handleSectionEvent.bind(this)
    );
    document.addEventListener(
      "shopify:section:deselect",
      this.handleSectionEvent.bind(this)
    );
    document.addEventListener(
      "shopify:section:unload",
      this.handleSectionEvent.bind(this)
    );
  }

  removeShopifyEventListeners() {
    document.removeEventListener(
      "shopify:section:load",
      this.handleSectionEvent.bind(this)
    );
    document.removeEventListener(
      "shopify:section:select",
      this.handleSectionEvent.bind(this)
    );
    document.removeEventListener(
      "shopify:section:deselect",
      this.handleSectionEvent.bind(this)
    );
    document.removeEventListener(
      "shopify:section:unload",
      this.handleSectionEvent.bind(this)
    );
  }

  addEventListeners() {
    this.form.addEventListener("submit", this.handleSubscribe.bind(this));
    this.closeBtn.addEventListener("click", this.closePopup.bind(this));
    this.copyBtn.addEventListener("click", this.copyToClipboard.bind(this));
    this.addEventListener("click", this.handleOutsideClick.bind(this));
    this.phoneInput.addEventListener(
      "input",
      this.toggleConsentRequirement.bind(this)
    );
  }

  removeEventListeners() {
    this.form.removeEventListener("submit", this.handleSubscribe.bind(this));
    this.closeBtn.removeEventListener("click", this.closePopup.bind(this));
    this.copyBtn.removeEventListener("click", this.copyToClipboard.bind(this));
    this.removeEventListener("click", this.handleOutsideClick.bind(this));
    this.phoneInput.removeEventListener(
      "input",
      this.toggleConsentRequirement.bind(this)
    );
  }

  handleOutsideClick(event) {
    if (
      !this.mainContent.contains(event.target) &&
      this.classList.contains("active")
    ) {
      this.closePopup();
    }
  }

  handleSectionEvent(event) {
    console.log("Section event:", event.type, event.detail);
    console.log("this.dataset.sectionId", this.getAttribute("section-id"));
    if (event.detail.sectionId === this.getAttribute("section-id")) {
      switch (event.type) {
        case "shopify:section:load":
        case "shopify:section:select":
          this.openPopup();

          console.log("this.showSucessPreview", this.showSucessPreview);
          if (this.showSucessPreview) this.showSuccessMessage();
          console.log("Opening popup for section:", event.detail.sectionId);
          break;
        case "shopify:section:deselect":
        case "shopify:section:unload":
          this.closePopup();
          console.log("Closing popup for section:", event.detail.sectionId);
          break;
      }
    }
  }

  refreshSettings() {
    if (Shopify.designMode) {
      console.log("refreshSettings designMode");
      this.addShopifyEventListeners();
    } else {
      console.log("refreshSettings not designMode");
      this.checkCookieAndSession();
    }
  }

  // checkCookieAndSession() {
  //   const subscribed = localStorage.getItem("subscribedToNewsletter");
  //   if (subscribed === "true") {
  //     return; // Don't show popup if user is subscribed
  //   }

  //   const popupShown = this.getCookie("newsletterPopupShown");
  //   if (!popupShown) {
  //     this.openPopup();
  //     this.setCookieBasedOnExpiration();
  //   }
  // }

  checkCookieAndSession() {
    const subscribed = localStorage.getItem("subscribedToNewsletter");
    const popupShown = this.getCookie("newsletterPopupShown");

    if (subscribed !== "true" && !popupShown) {
      this.openPopup();
      this.setCookieBasedOnExpiration();
    }
  }

  // handleSubscribe(event) {
  //   event.preventDefault();
  //   const name = this.nameInput.value;
  //   const email = this.emailInput.value;
  //   const phone = this.phoneInput.value;
  //   const consent = this.marketingConsent.checked;

  //   if (consent && name) {
  //     if (phone && !consent) {
  //       this.messageDiv.textContent =
  //         "Please check the consent box to proceed.";
  //       return;
  //     }

  //     const formData = new FormData();
  //     formData.append("u", "5");
  //     formData.append("f", "5");
  //     formData.append("s", "s");
  //     formData.append("c", "0");
  //     formData.append("m", "0");
  //     formData.append("act", "sub");
  //     formData.append("v", "2");
  //     formData.append("or", "e8331ae13a45083b9b47aff5d9397e8d");

  //     formData.append("name", name);
  //     formData.append("email", email);

  //     if (phone) {
  //       formData.append("phone", phone);
  //     }
  //     formData.append("consent", consent);

  //     // Call the submitForm method
  //     this.submitForm(formData);
  //   }
  // }

  handleSubscribe(event) {
    event.preventDefault();

    if (this.validateForm()) {
      const formData = new FormData(this.form);
      this.submitForm(formData);
    }
  }

  toggleConsentRequirement() {
    if (this.phoneInput.value.trim() !== "") {
      this.marketingConsent.setAttribute("required", "");
    } else {
      this.marketingConsent.removeAttribute("required");
    }
    // Update the form's validity state
    this.form.checkValidity();
  }

  validateForm() {
    let isValid = true;
    this.messageDiv.textContent = "";

    if (!this.nameInput.value.trim()) {
      isValid = false;
      this.messageDiv.textContent += "Please enter your name. ";
    }

    if (!this.validateEmail(this.emailInput.value)) {
      isValid = false;
      this.messageDiv.textContent += "Please enter a valid email address. ";
    }

    if (
      this.phoneInput.value.trim() !== "" &&
      !this.validatePhone(this.phoneInput.value)
    ) {
      isValid = false;
      this.messageDiv.textContent += "Please enter a valid phone number. ";
    }

    if (this.phoneInput.value.trim() !== "" && !this.marketingConsent.checked) {
      isValid = false;
      this.messageDiv.textContent +=
        "Please accept the terms when providing a phone number. ";
    }

    return isValid;
  }

  validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  validatePhone(phone) {
    const re = /^\+?[\d\s-]{10,14}$/;
    return re.test(phone);
  }

  // async submitForm(data) {
  //   try {
  //     const response = await fetch("https://nunorm.activehosted.com/proc.php", {
  //       headers: {
  //         Accept: "application/json",
  //         // "Content-Type": "application/x-www-form-urlencoded",
  //       },
  //       body: data,
  //       method: "POST",
  //       // mode: "no-cors",
  //     });

  //     const responseData = await response.json();
  //     const action = responseData.action;

  //     // On successful submission, show the success message
  //     if (action) {
  //       console.log("Form submission successful", action);
  //       this.showSuccessMessage();
  //       // localStorage.setItem("subscribedToNewsletter", "true");
  //       this.setSubscribedFlag();
  //     } else {
  //       console.error("Form submission failed:", responseData);
  //       this.messageDiv.textContent =
  //         "Form submission failed. Please try again.";
  //     }
  //   } catch (error) {
  //     console.error("Submission failed", error);
  //     this.messageDiv.textContent =
  //       "An error occurred. Please try again later.";
  //   }
  // }

  async submitForm(formData) {
    try {
      formData.append("u", "5");
      formData.append("f", "5");
      formData.append("s", "s");
      formData.append("c", "0");
      formData.append("m", "0");
      formData.append("act", "sub");
      formData.append("v", "2");
      formData.append("or", "e8331ae13a45083b9b47aff5d9397e8d");

      const response = await fetch("https://nunorm.activehosted.com/proc.php", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      const responseData = await response.json();

      if (responseData.action) {
        console.log("Form submission successful", responseData.action);
        this.showSuccessMessage();
        this.setSubscribedFlag();
      } else {
        console.error("Form submission failed:", responseData);
        this.messageDiv.textContent =
          "Form submission failed. Please try again.";
      }
    } catch (error) {
      console.error("Submission failed", error);
      this.messageDiv.textContent =
        "An error occurred. Please try again later.";
    }
  }

  showSuccessMessage() {
    this.signupStep.classList.add("is-hidden");
    this.successStep.classList.remove("is-hidden");
  }

  // setSubscribedFlag() {
  //   if (
  //     !this.getCookie("newsletterPopupShown") &&
  //     !localStorage.getItem("subscribedToNewsletter")
  //   ) {
  //     this.setCookieBasedOnExpiration();
  //     localStorage.setItem("subscribedToNewsletter", "true");
  //   }
  // }

  setSubscribedFlag() {
    this.setCookieBasedOnExpiration();
    localStorage.setItem("subscribedToNewsletter", "true");
    console.log("Subscribed flag set in localStorage");
  }

  setCookieBasedOnExpiration() {
    const expirationUnit = this.getAttribute("data-expiration-unit") || "days";
    const expirationValue =
      parseInt(this.getAttribute("data-expiration-value"), 10) || 1;
    const expirationDate = new Date();

    if (expirationUnit === "days") {
      expirationDate.setDate(expirationDate.getDate() + expirationValue);
    } else if (expirationUnit === "hours") {
      expirationDate.setHours(expirationDate.getHours() + expirationValue);
    }

    document.cookie = `newsletterPopupShown=true; expires=${expirationDate.toUTCString()}; path=/`;
  }

  getCookie(name) {
    return document.cookie
      .split("; ")
      .find((row) => row.startsWith(name))
      ?.split("=")[1];
  }

  openPopup() {
    this.classList.add("active");
    this.setAttribute("open", "");
    this.setAttribute("aria-hidden", "false");
    this.setAttribute("tabindex", "0");
    this.setAttribute("role", "dialog");
    this.setAttribute("aria-modal", "true");
    this.setAttribute("aria-labelledby", "ui-newsletter-popup-title");
    this.setAttribute("aria-describedby", "ui-newsletter-popup-description");
  }

  closePopup() {
    this.classList.remove("active");
    this.removeAttribute("open");
    this.setAttribute("aria-hidden", "true");
    this.removeAttribute("tabindex");
  }

  copyToClipboard() {
    const code = this.promoCode.textContent;
    navigator.clipboard
      .writeText(code)
      .then(() => {
        this.codeCopiedMessage.classList.remove("is-hidden");
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
        if (Shopify.designMode)
          this.codeCopiedMessage.textContent = "Can't copy in design mode";

        this.codeCopiedMessage.textContent = "Failed to copy";
        this.codeCopiedMessage.classList.remove("is-hidden");
      });
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.refreshSettings();
    }
  }

  static get observedAttributes() {
    return [
      "data-expiration-unit",
      "data-expiration-value",
      "data-show-success-preview",
    ];
  }
}

customElements.define("ui-newsletter-popup", UiNewsletterPopup);
