// MaplePrints Main JavaScript Functionality
// Premium Business Cards Website

class MaplePrints {
  constructor() {
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.initAnimations();
    this.setupFormHandlers();
    this.initCarousels();
    this.setupScrollAnimations();
    this.initWhatsAppIntegration();
  }

  setupEventListeners() {
    // Mobile menu toggle
    const menuToggle = document.querySelector(".menu-toggle");
    const navMenu = document.querySelector(".nav-menu");

    if (menuToggle) {
      menuToggle.addEventListener("click", () => {
        navMenu.classList.toggle("active");
        menuToggle.classList.toggle("active");
      });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute("href"));
        if (target) {
          target.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      });
    });

    // Button hover effects
    document.querySelectorAll(".btn-primary, .btn-secondary").forEach((btn) => {
      btn.addEventListener("mouseenter", this.animateButtonHover);
      btn.addEventListener("mouseleave", this.resetButtonHover);
    });
  }

  initAnimations() {
    // Initialize Anime.js animations for non-hero elements
    if (typeof anime !== "undefined") {
      // Floating cards animation
      anime({
        targets: ".floating-card",
        translateY: [-10, 10],
        duration: 3000,
        direction: "alternate",
        loop: true,
        easing: "easeInOutSine",
        delay: anime.stagger(200),
      });
    }
  }

  setupScrollAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-in");

          // Trigger specific animations based on element class
          if (entry.target.classList.contains("package-card")) {
            this.animatePackageCard(entry.target);
          } else if (entry.target.classList.contains("testimonial-card")) {
            this.animateTestimonialCard(entry.target);
          }
        }
      });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll(".animate-on-scroll").forEach((el) => {
      observer.observe(el);
    });
  }

  animatePackageCard(card) {
    if (typeof anime !== "undefined") {
      anime({
        targets: card,
        opacity: [0, 1],
        translateY: [50, 0],
        scale: [0.9, 1],
        duration: 800,
        easing: "easeOutBack",
      });
    }
  }

  animateTestimonialCard(card) {
    if (typeof anime !== "undefined") {
      anime({
        targets: card,
        opacity: [0, 1],
        translateX: [-30, 0],
        duration: 600,
        easing: "easeOutQuart",
      });
    }
  }

  animateButtonHover(e) {
    const btn = e.target;
    if (typeof anime !== "undefined") {
      anime({
        targets: btn,
        scale: 1.05,
        duration: 200,
        easing: "easeOutQuart",
      });
    }

    // Add glow effect
    btn.style.boxShadow =
      "0 0 20px rgba(255, 64, 129, 0.5), 0 0 40px rgba(255, 168, 114, 0.3)";
    btn.style.transform = "translateY(-2px)";
  }

  resetButtonHover(e) {
    const btn = e.target;
    if (typeof anime !== "undefined") {
      anime({
        targets: btn,
        scale: 1,
        duration: 200,
        easing: "easeOutQuart",
      });
    }

    // Remove glow effect
    btn.style.boxShadow = "";
    btn.style.transform = "";
  }

  initCarousels() {
    // Initialize Splide carousel for testimonials
    if (typeof Splide !== "undefined") {
      const testimonialCarousel = document.querySelector(
        ".testimonial-carousel"
      );
      if (testimonialCarousel) {
        new Splide(testimonialCarousel, {
          type: "loop",
          perPage: 1,
          perMove: 1,
          autoplay: true,
          interval: 5000,
          pauseOnHover: true,
          arrows: true,
          pagination: true,
          gap: "2rem",
          breakpoints: {
            768: {
              perPage: 1,
              gap: "1rem",
            },
          },
        }).mount();
      }

      // Initialize package showcase carousel
      const packageCarousel = document.querySelector(".package-carousel");
      if (packageCarousel) {
        new Splide(packageCarousel, {
          type: "loop",
          perPage: 3,
          perMove: 1,
          autoplay: false,
          arrows: true,
          pagination: false,
          gap: "2rem",
          breakpoints: {
            1024: {
              perPage: 2,
            },
            768: {
              perPage: 1,
              gap: "1rem",
            },
          },
        }).mount();
      }
    }
  }

  setupFormHandlers() {
    // Customer details form
    const customerForm = document.getElementById("customer-form");
    if (customerForm) {
      customerForm.addEventListener("submit", this.handleFormSubmit.bind(this));
    }

    // File upload handling
    const fileUpload = document.getElementById("file-upload");
    const dropZone = document.querySelector(".drop-zone");

    if (dropZone && fileUpload) {
      // Drag and drop functionality
      dropZone.addEventListener("dragover", (e) => {
        e.preventDefault();
        dropZone.classList.add("drag-over");
      });

      dropZone.addEventListener("dragleave", () => {
        dropZone.classList.remove("drag-over");
      });

      dropZone.addEventListener("drop", (e) => {
        e.preventDefault();
        dropZone.classList.remove("drag-over");
        const files = e.dataTransfer.files;
        this.handleFileUpload(files);
      });

      // Click to upload
      dropZone.addEventListener("click", () => {
        fileUpload.click();
      });

      fileUpload.addEventListener("change", (e) => {
        this.handleFileUpload(e.target.files);
      });
    }

    // Input validation
    document.querySelectorAll("input[required]").forEach((input) => {
      input.addEventListener("blur", this.validateInput);
      input.addEventListener("input", this.clearValidationError);
    });
  }

  handleFormSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    // Validate form
    if (this.validateForm(form)) {
      // Generate WhatsApp message
      const message = this.generateWhatsAppMessage(formData);

      // Open WhatsApp
      this.openWhatsApp(message);

      // Show success message
      this.showSuccessMessage();
    }
  }

  validateForm(form) {
    let isValid = true;
    const requiredFields = form.querySelectorAll("[required]");

    requiredFields.forEach((field) => {
      if (!this.validateField(field)) {
        isValid = false;
      }
    });

    return isValid;
  }

  validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = "";

    // Clear previous errors
    this.clearValidationError({ target: field });

    // Required field validation
    if (field.hasAttribute("required") && !value) {
      errorMessage = "This field is required";
      isValid = false;
    }

    // Email validation
    if (field.type === "email" && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        errorMessage = "Please enter a valid email address";
        isValid = false;
      }
    }

    // Phone validation
    if (field.name === "whatsapp" && value) {
      const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
      if (!phoneRegex.test(value.replace(/\s/g, ""))) {
        errorMessage = "Please enter a valid phone number";
        isValid = false;
      }
    }

    if (!isValid) {
      this.showFieldError(field, errorMessage);
    }

    return isValid;
  }

  showFieldError(field, message) {
    field.classList.add("error");

    // Create or update error message element
    let errorElement = field.parentNode.querySelector(".error-message");
    if (!errorElement) {
      errorElement = document.createElement("div");
      errorElement.className = "error-message";
      field.parentNode.appendChild(errorElement);
    }

    errorElement.textContent = message;
    errorElement.style.display = "block";
  }

  clearValidationError(e) {
    const field = e.target;
    field.classList.remove("error");

    const errorElement = field.parentNode.querySelector(".error-message");
    if (errorElement) {
      errorElement.style.display = "none";
    }
  }

  validateInput(e) {
    const field = e.target;
    if (field.hasAttribute("required") || field.value.trim()) {
      MaplePrints.prototype.validateField(field);
    }
  }

  handleFileUpload(files) {
    const file = files[0];
    if (file) {
      // Validate file type
      const allowedTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "application/pdf",
      ];
      if (allowedTypes.includes(file.type)) {
        // Show file preview
        this.showFilePreview(file);

        // Update form data
        const fileInput = document.getElementById("file-upload");
        fileInput.files = files;
      } else {
        this.showFileError("Please upload a JPG, PNG, or PDF file.");
      }
    }
  }

  showFilePreview(file) {
    const previewContainer = document.querySelector(".file-preview");
    if (!previewContainer) return;

    if (file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        previewContainer.innerHTML = `
                    <img src="${
                      e.target.result
                    }" alt="File preview" class="preview-image">
                    <div class="file-info">
                        <span class="file-name">${file.name}</span>
                        <span class="file-size">${this.formatFileSize(
                          file.size
                        )}</span>
                    </div>
                `;
        previewContainer.style.display = "block";
      };
      reader.readAsDataURL(file);
    } else {
      previewContainer.innerHTML = `
                <div class="file-icon pdf-icon"></div>
                <div class="file-info">
                    <span class="file-name">${file.name}</span>
                    <span class="file-size">${this.formatFileSize(
                      file.size
                    )}</span>
                </div>
            `;
      previewContainer.style.display = "block";
    }
  }

  showFileError(message) {
    const errorContainer = document.querySelector(".upload-error");
    if (errorContainer) {
      errorContainer.textContent = message;
      errorContainer.style.display = "block";

      setTimeout(() => {
        errorContainer.style.display = "none";
      }, 5000);
    }
  }

  formatFileSize(bytes) {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  }

  initWhatsAppIntegration() {
    // Setup WhatsApp CTA buttons
    document.querySelectorAll("[data-whatsapp]").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        const messageType = btn.dataset.whatsapp;
        const message = this.getWhatsAppTemplate(messageType);
        this.openWhatsApp(message);
      });
    });
  }

  getWhatsAppTemplate(type) {
    const templates = {
      "existing-design": `Hi MaplePrints! I'm interested in your premium business card package.

Package: 1000 Business Cards - $250
I already have a design ready for upload.
Please send me the file upload instructions.

Ready to order!`,

      "need-design": `Hi MaplePrints! I need help designing premium business cards.

Package: 1000 Business Cards - $250
I need design assistance ($20 consultation fee).
Please connect me with a designer.

Looking forward to working with you!`,

      "general-inquiry": `Hi MaplePrints! I have a question about your premium business cards.

Could you please provide more information about your services?`,

      "rush-order": `Hi MaplePrints! I need premium business cards urgently.

Is there any way to expedite the 10-12 day delivery timeline?
Please let me know about rush order options.`,
    };

    return templates[type] || templates["general-inquiry"];
  }

  generateWhatsAppMessage(formData) {
    const name = formData.get("name") || "";
    const whatsapp = formData.get("whatsapp") || "";
    const email = formData.get("email") || "";
    const business = formData.get("business") || "";
    const notes = formData.get("notes") || "";
    const designType = formData.get("design-type") || "existing-design";

    let message = `Hi MaplePrints! `;

    if (designType === "existing-design") {
      message += `I have a design ready for premium business cards.\n\n`;
    } else {
      message += `I need help designing premium business cards.\n\n`;
    }

    message += `Package: 1000 Business Cards - $250\n`;

    if (name) message += `Name: ${name}\n`;
    if (whatsapp) message += `WhatsApp: ${whatsapp}\n`;
    if (email) message += `Email: ${email}\n`;
    if (business) message += `Business: ${business}\n`;
    if (notes) message += `Notes: ${notes}\n`;

    message += `\nReady to proceed! Please guide me through the next steps.`;

    return message;
  }

  openWhatsApp(message) {
    const phoneNumber = "1234567890"; // Replace with actual MaplePrints WhatsApp number
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${+14378186152}?text=${encodedMessage}`;

    // Show loading state
    this.showLoadingState();

    // Open WhatsApp in new tab
    window.open(whatsappUrl, "_blank");

    // Track conversion (if analytics available)
    this.trackConversion("whatsapp_click");

    // Hide loading state after delay
    setTimeout(() => {
      this.hideLoadingState();
    }, 2000);
  }

  showLoadingState() {
    const loadingOverlay = document.createElement("div");
    loadingOverlay.className = "loading-overlay";
    loadingOverlay.innerHTML = `
            <div class="loading-content">
                <div class="spinner"></div>
                <p>Connecting you to MaplePrints...</p>
            </div>
        `;
    document.body.appendChild(loadingOverlay);

    setTimeout(() => {
      loadingOverlay.classList.add("active");
    }, 10);
  }

  hideLoadingState() {
    const loadingOverlay = document.querySelector(".loading-overlay");
    if (loadingOverlay) {
      loadingOverlay.classList.remove("active");
      setTimeout(() => {
        loadingOverlay.remove();
      }, 300);
    }
  }

  showSuccessMessage() {
    const successMessage = document.createElement("div");
    successMessage.className = "success-message";
    successMessage.innerHTML = `
            <div class="success-content">
                <div class="success-icon">✓</div>
                <h3>Thank you!</h3>
                <p>We've received your request and will connect you with MaplePrints shortly.</p>
            </div>
        `;
    document.body.appendChild(successMessage);

    setTimeout(() => {
      successMessage.classList.add("active");
    }, 10);

    setTimeout(() => {
      successMessage.classList.remove("active");
      setTimeout(() => {
        successMessage.remove();
      }, 300);
    }, 3000);
  }

  trackConversion(event) {
    // Placeholder for analytics tracking
    if (typeof gtag !== "undefined") {
      gtag("event", event, {
        event_category: "engagement",
        event_label: "whatsapp_contact",
        value: 250,
      });
    }

    console.log(`Conversion tracked: ${event}`);
  }

  // Utility functions
  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  throttle(func, limit) {
    let inThrottle;
    return function () {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  }
}

// Initialize the application when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new MaplePrints();
});

// Add some additional utility functions for enhanced UX
window.MaplePrintsUtils = {
  // Smooth scroll to element
  scrollToElement: (selector, offset = 0) => {
    const element = document.querySelector(selector);
    if (element) {
      const elementPosition =
        element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: "smooth",
      });
    }
  },

  // Copy text to clipboard
  copyToClipboard: async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (err) {
      console.error("Failed to copy text: ", err);
      return false;
    }
  },

  // Format currency
  formatCurrency: (amount, currency = "USD") => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 0,
    }).format(amount);
  },

  // Check if element is in viewport
  isInViewport: (element) => {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  },
};
