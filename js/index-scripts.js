// Mobile Menu Toggle
document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.getElementById("menuToggle");
  const navMenu = document.querySelector(".nav-menu");

  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      navMenu.classList.toggle("active");
      menuToggle.classList.toggle("active");
    });

    // Close menu when clicking on a link
    document.querySelectorAll(".nav-menu a").forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("active");
        menuToggle.classList.remove("active");
      });
    });

    // Add touch event for mobile
    menuToggle.addEventListener("touchstart", function (e) {
      e.preventDefault();
      navMenu.classList.toggle("active");
      menuToggle.classList.toggle("active");
    });
  }
});

// Circular Video Gallery Implementation
class CircularVideoGallery {
  constructor(containerId, controlPrefix) {
    this.container = document.getElementById(containerId);
    this.prevBtn =
      document.getElementById(`${controlPrefix}PrevBtn`) ||
      document.getElementById("prevVideoBtn");
    this.nextBtn =
      document.getElementById(`${controlPrefix}NextBtn`) ||
      document.getElementById("nextVideoBtn");
    this.currentIndex = 0;
    this.videos = [
      "resources/carousel-videos/1.mp4",
      "resources/carousel-videos/2.mp4",
      "resources/carousel-videos/3.mp4",
      "resources/carousel-videos/4.mp4",
      "resources/carousel-videos/5.mp4",
    ];
    this.autoplayInterval = null;

    if (this.container) {
      this.init();
    }
  }

  init() {
    this.createVideoItems();
    this.setupEventListeners();
    this.updateVideoPositions();
    this.startAutoplay();
  }

  createVideoItems() {
    this.container.innerHTML = "";

    this.videos.forEach((videoSrc, index) => {
      const videoItem = document.createElement("div");
      videoItem.className = "video-item";

      const video = document.createElement("video");
      video.src = videoSrc;
      video.muted = true;
      video.loop = true;
      video.playsInline = true;
      video.preload = "metadata";

      // Handle video errors
      video.addEventListener("error", () => {
        console.log(`Video ${index + 1} failed to load`);
        videoItem.style.background =
          "linear-gradient(135deg, #FF4081, #FFD700)";
      });

      // Auto-play when video becomes active
      video.addEventListener("loadeddata", () => {
        if (index === this.currentIndex) {
          video.play().catch(() => { });
        }
      });

      videoItem.appendChild(video);
      this.container.appendChild(videoItem);
    });

    this.videoItems = this.container.querySelectorAll(".video-item");
    console.log(`Created ${this.videoItems.length} video items`);
  }

  setupEventListeners() {
    if (this.prevBtn) {
      this.prevBtn.addEventListener("click", () => {
        this.previous();
        this.stopAutoplay();
      });
    }

    if (this.nextBtn) {
      this.nextBtn.addEventListener("click", () => {
        this.next();
        this.stopAutoplay();
      });
    }

    // Keyboard navigation
    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") {
        this.previous();
        this.stopAutoplay();
      }
      if (e.key === "ArrowRight") {
        this.next();
        this.stopAutoplay();
      }
    });
  }

  updateVideoPositions() {
    this.videoItems.forEach((item, index) => {
      const video = item.querySelector("video");

      // Remove all classes
      item.classList.remove("active", "left", "right", "hidden");

      // Calculate position relative to current index
      const totalVideos = this.videos.length;
      const leftIndex =
        (this.currentIndex - 1 + totalVideos) % totalVideos;
      const rightIndex = (this.currentIndex + 1) % totalVideos;

      if (index === this.currentIndex) {
        // Active video (center)
        item.classList.add("active");
        if (video) {
          video.play().catch(() => { });
        }
      } else if (index === leftIndex) {
        // Left video
        item.classList.add("left");
        if (video) {
          video.pause();
        }
      } else if (index === rightIndex) {
        // Right video
        item.classList.add("right");
        if (video) {
          video.pause();
        }
      } else {
        // Hidden videos
        item.classList.add("hidden");
        if (video) {
          video.pause();
        }
      }
    });
  }

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.videos.length;
    this.updateVideoPositions();
    console.log(`Moved to video ${this.currentIndex + 1}`);
  }

  previous() {
    this.currentIndex =
      (this.currentIndex - 1 + this.videos.length) % this.videos.length;
    this.updateVideoPositions();
    console.log(`Moved to video ${this.currentIndex + 1}`);
  }

  startAutoplay() {
    this.stopAutoplay();
    this.autoplayInterval = setInterval(() => {
      this.next();
    }, 5000);
  }

  stopAutoplay() {
    if (this.autoplayInterval) {
      clearInterval(this.autoplayInterval);
      this.autoplayInterval = null;
    }
  }
}

// Legacy class for compatibility
class HeroCarousel {
  constructor() {
    this.currentIndex = 0;
    this.carouselWrapper = document.querySelector(
      ".carousel-images-wrapper"
    );
    this.prevBtn = document.querySelector(".carousel-btn-prev");
    this.nextBtn = document.querySelector(".carousel-btn-next");
    this.videos = [
      "resources/recent-orders/1.mp4",
      "resources/recent-orders/2.mp4",
      "resources/recent-orders/3.mp4",
      "resources/recent-orders/4.mp4",
      "resources/recent-orders/5.mp4",
    ];

    this.init();
  }

  init() {
    this.createVideoElements();
    this.setupEventListeners();
    this.startAutoRotation();
    this.updateCarousel();
  }

  createVideoElements() {
    // Clear existing content
    this.carouselWrapper.innerHTML = "";

    // Use actual videos from your resources folder
    const videoContent = [
      {
        video: "resources/carousel-videos/1.mp4",
        text: "Premium Gold Foil Cards",
      },
      {
        video: "resources/carousel-videos/2.mp4",
        text: "Luxury Matte Finish",
      },
      {
        video: "resources/carousel-videos/3.mp4",
        text: "Embossed Business Cards",
      },
      {
        video: "resources/carousel-videos/4.mp4",
        text: "UV Spot Gloss Design",
      },
      {
        video: "resources/carousel-videos/5.mp4",
        text: "Velvet Touch Cards",
      },
    ];

    videoContent.forEach((content, index) => {
      const carouselImage = document.createElement("div");
      carouselImage.className = "carousel-image";
      if (index === 0) carouselImage.classList.add("active");

      console.log(
        `Creating carousel item ${index + 1} with colored background`
      );

      // Create immediate colored background with text
      carouselImage.style.background = `linear-gradient(135deg, ${content.color}, #FFD700)`;
      carouselImage.style.opacity = "1";
      carouselImage.style.visibility = "visible";
      carouselImage.style.display = "flex";
      carouselImage.style.alignItems = "center";
      carouselImage.style.justifyContent = "center";
      carouselImage.style.position = "absolute";
      carouselImage.style.top = "0";
      carouselImage.style.left = "0";
      carouselImage.style.width = "100%";
      carouselImage.style.height = "100%";
      carouselImage.style.borderRadius = "24px";

      // Set initial visibility - only first video visible
      if (index === 0) {
        carouselImage.style.opacity = "1";
        carouselImage.style.zIndex = "10";
        carouselImage.style.visibility = "visible";
      } else {
        carouselImage.style.opacity = "0";
        carouselImage.style.zIndex = "1";
        carouselImage.style.visibility = "hidden";
      }
      // Create clean video element - NO TEXT at all
      const video = document.createElement("video");
      video.src = content.video;
      video.muted = true;
      video.loop = true;
      video.autoplay = true;
      video.playsInline = true;
      video.preload = "auto";
      video.style.width = "100%";
      video.style.height = "100%";
      video.style.objectFit = "cover";
      video.style.borderRadius = "24px";
      video.style.display = "block";

      // Handle video error
      video.addEventListener("error", () => {
        console.log(`Video ${index + 1} failed to load`);
        carouselImage.style.background =
          "linear-gradient(135deg, #FF4081, #FFD700)";
      });

      // Auto-play when loaded
      video.addEventListener("loadeddata", () => {
        console.log(`Video ${index + 1} loaded - playing now`);
        video.play().catch(() => console.log("Autoplay blocked"));
      });

      // Force play on active video
      if (index === 0) {
        setTimeout(() => {
          video.play().catch(() => console.log("Initial play blocked"));
        }, 1000);
      }

      carouselImage.appendChild(video);
      this.carouselWrapper.appendChild(carouselImage);
      console.log(
        `Carousel item ${index + 1} created with clean video - NO TEXT`
      );
    });

    this.carouselImages =
      this.carouselWrapper.querySelectorAll(".carousel-image");
    console.log(`Created ${this.carouselImages.length} carousel items`);
  }

  setupEventListeners() {
    this.prevBtn.addEventListener("click", () => {
      this.stopAutoRotation();
      this.previous();
      this.startAutoRotation();
    });

    this.nextBtn.addEventListener("click", () => {
      this.stopAutoRotation();
      this.next();
      this.startAutoRotation();
    });

    // No video setup needed for image carousel
    console.log("Event listeners setup complete");
  }

  updateCarousel() {
    console.log(
      `Updating carousel to show item ${this.currentIndex + 1}`
    );
    this.carouselImages.forEach((image, index) => {
      const video = image.querySelector("video");

      image.classList.remove("active", "prev", "next");

      if (index === this.currentIndex) {
        image.classList.add("active");
        image.style.opacity = "1";
        image.style.zIndex = "10";
        image.style.visibility = "visible";

        // Play video when it becomes active
        if (video) {
          video.play().catch(() => console.log("Video play blocked"));
        }
        console.log(`Activated carousel item ${index + 1}`);
      } else {
        image.style.opacity = "0";
        image.style.zIndex = "1";
        image.style.visibility = "hidden";

        // Pause other videos
        if (video) {
          video.pause();
        }

        if (index === this.getPreviousIndex()) {
          image.classList.add("prev");
        } else if (index === this.getNextIndex()) {
          image.classList.add("next");
        }
      }
    });
  }

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.videos.length;
    this.updateCarousel();
  }

  previous() {
    this.currentIndex =
      (this.currentIndex - 1 + this.videos.length) % this.videos.length;
    this.updateCarousel();
  }

  getPreviousIndex() {
    return (this.currentIndex - 1 + 5) % 5;
  }

  getNextIndex() {
    return (this.currentIndex + 1) % 5;
  }

  startAutoRotation() {
    this.stopAutoRotation();
    this.autoRotateInterval = setInterval(() => {
      this.next();
    }, 4000); // Change video every 4 seconds
  }

  stopAutoRotation() {
    if (this.autoRotateInterval) {
      clearInterval(this.autoRotateInterval);
      this.autoRotateInterval = null;
    }
  }
}

// Initialize circular video galleries when page loads
document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM loaded, initializing video galleries...");

  // Initialize hero video gallery
  const heroVideoGallery = new CircularVideoGallery(
    "heroVideoGallery",
    ""
  );

  // Initialize package video gallery if on package page
  const packageVideoGallery = new CircularVideoGallery(
    "packageVideoGallery",
    "package"
  );

  console.log("Video galleries initialization complete!");
});
