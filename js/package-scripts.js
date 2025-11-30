// Mobile Menu Toggle
document.addEventListener("DOMContentLoaded", function () {
  console.log("Page loaded");

  const menuToggle = document.getElementById("menuToggle");
  const navMenu = document.querySelector(".nav-menu");

  console.log("Menu toggle element:", menuToggle);
  console.log("Nav menu element:", navMenu);

  if (menuToggle && navMenu) {
    console.log("Mobile menu initialized successfully");

    menuToggle.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      console.log("Menu toggle clicked");
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
      console.log("Menu toggle touched");
      navMenu.classList.toggle("active");
      menuToggle.classList.toggle("active");
    });
  } else {
    console.log("ERROR: Menu elements not found", {
      menuToggle: !!menuToggle,
      navMenu: !!navMenu,
    });
  }
});

// FAQ and Timeline - Run after DOM is ready
document.addEventListener("DOMContentLoaded", function () {
  // FAQ Toggle Functionality
  document.querySelectorAll(".faq-question").forEach((question) => {
    question.addEventListener("click", () => {
      const faqItem = question.parentElement;
      const isActive = faqItem.classList.contains("active");

      // Close all FAQ items
      document.querySelectorAll(".faq-item").forEach((item) => {
        item.classList.remove("active");
      });

      // Open clicked item if it wasn't active
      if (!isActive) {
        faqItem.classList.add("active");
      }
    });
  });

  // Timeline Animation
  const timelineItems = document.querySelectorAll(".timeline-item");
  const timelineObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-in");
        }
      });
    },
    { threshold: 0.3 }
  );

  timelineItems.forEach((item) => {
    timelineObserver.observe(item);
  });
});

// Video Lightbox Implementation
class VideoLightbox {
  constructor(galleryItems) {
    this.galleryItems = galleryItems;
    this.currentIndex = 0;
    this.lightbox = document.getElementById("videoLightbox");
    this.lightboxVideo = document.getElementById("lightboxVideo");
    this.lightboxTitle = document.getElementById("lightboxTitle");
    this.closeBtn = document.getElementById("closeLightbox");
    this.prevBtn = document.getElementById("prevVideo");
    this.nextBtn = document.getElementById("nextVideo");
    this.playPauseBtn = document.getElementById("playPause");

    this.init();
  }

  init() {
    // Close button
    this.closeBtn.addEventListener("click", () => this.close());

    // Navigation buttons
    this.prevBtn.addEventListener("click", () => this.previous());
    this.nextBtn.addEventListener("click", () => this.next());

    // Play/Pause button
    this.playPauseBtn.addEventListener("click", () =>
      this.togglePlayPause()
    );

    // Keyboard navigation
    document.addEventListener("keydown", (e) => {
      if (this.lightbox.classList.contains("active")) {
        switch (e.key) {
          case "Escape":
            this.close();
            break;
          case "ArrowLeft":
            this.previous();
            break;
          case "ArrowRight":
            this.next();
            break;
          case " ":
            e.preventDefault();
            this.togglePlayPause();
            break;
        }
      }
    });

    // Click outside to close
    this.lightbox.addEventListener("click", (e) => {
      if (e.target === this.lightbox) {
        this.close();
      }
    });

    // Video events
    this.lightboxVideo.addEventListener("play", () => {
      this.playPauseBtn.innerHTML = "⏸ Pause";
    });

    this.lightboxVideo.addEventListener("pause", () => {
      this.playPauseBtn.innerHTML = "▶ Play";
    });
  }

  open(index) {
    this.currentIndex = index;
    const item = this.galleryItems[index];

    // Show lightbox first
    this.lightbox.classList.add("active");
    document.body.style.overflow = "hidden";

    // Set title
    this.lightboxTitle.textContent = item.title;

    // Update navigation buttons
    this.updateNavigation();

    // Optimize video loading for smooth playback
    this.lightboxVideo.pause();
    this.lightboxVideo.currentTime = 0;

    // Set video attributes for better mobile performance
    this.lightboxVideo.preload = "metadata";
    this.lightboxVideo.playsinline = true;
    this.lightboxVideo.muted = true;

    // Load video source
    this.lightboxVideo.src = item.src;

    // Wait for video to be ready, then play
    const playWhenReady = () => {
      this.lightboxVideo.play().catch((error) => {
        console.log("Video autoplay prevented:", error);
        // Fallback: user will need to manually play
      });
    };

    this.lightboxVideo.addEventListener("loadeddata", playWhenReady, {
      once: true,
    });

    // Fallback timeout
    setTimeout(() => {
      if (this.lightboxVideo.readyState >= 2) {
        playWhenReady();
      }
    }, 500);
  }

  close() {
    this.lightbox.classList.remove("active");
    document.body.style.overflow = "";

    // Pause and reset video
    this.lightboxVideo.pause();
    this.lightboxVideo.currentTime = 0;

    setTimeout(() => {
      this.lightboxVideo.src = "";
    }, 300);
  }

  next() {
    if (this.currentIndex < this.galleryItems.length - 1) {
      this.open(this.currentIndex + 1);
    }
  }

  previous() {
    if (this.currentIndex > 0) {
      this.open(this.currentIndex - 1);
    }
  }

  togglePlayPause() {
    if (this.lightboxVideo.paused) {
      this.lightboxVideo.play().catch(() => {});
    } else {
      this.lightboxVideo.pause();
    }
  }

  updateNavigation() {
    this.prevBtn.disabled = this.currentIndex === 0;
    this.nextBtn.disabled =
      this.currentIndex === this.galleryItems.length - 1;
  }
}

// Simple Gallery Implementation
function createGalleryItem(item, index, lightbox) {
  const galleryItem = document.createElement("div");
  galleryItem.className = "gallery-item";
  galleryItem.dataset.index = index;

  // Create media element (video or image)
  let mediaElement;
  if (item.type === "video") {
    mediaElement = document.createElement("video");
    mediaElement.src = item.src;
    mediaElement.muted = true;
    mediaElement.loop = true;
    mediaElement.preload = "metadata";
    mediaElement.playsinline = true;

    // Force video styling for mobile compatibility
    mediaElement.style.width = "100%";
    mediaElement.style.height = "100%";
    mediaElement.style.objectFit = "cover";
    mediaElement.style.display = "block";
    mediaElement.style.borderRadius = "inherit";
    mediaElement.style.maxWidth = "100%";
    mediaElement.style.maxHeight = "100%";

    // Auto-play on hover with error handling
    galleryItem.addEventListener("mouseenter", () => {
      if (mediaElement.readyState >= 1) {
        mediaElement.play().catch(() => {
          // Retry loading if failed
          mediaElement.load();
          setTimeout(() => mediaElement.play().catch(() => {}), 100);
        });
      } else {
        // Load and then play
        mediaElement.load();
        mediaElement.addEventListener(
          "loadeddata",
          () => {
            mediaElement.play().catch(() => {});
          },
          { once: true }
        );
      }
    });
    galleryItem.addEventListener("mouseleave", () => {
      mediaElement.pause();
      mediaElement.currentTime = 0;
    });

    // Touch support for mobile
    galleryItem.addEventListener("touchstart", () => {
      if (mediaElement.paused) {
        mediaElement.play().catch(() => {});
      } else {
        mediaElement.pause();
      }
    });

    // Click to open lightbox
    if (lightbox) {
      galleryItem.addEventListener("click", () => {
        lightbox.open(index);
      });
    }

    // Add click cursor
    galleryItem.style.cursor = "pointer";
  } else {
    mediaElement = document.createElement("img");
    mediaElement.src = item.src;
    mediaElement.alt = item.title;
  }

  const label = document.createElement("div");
  label.className = "gallery-item-label";
  label.textContent = item.title;

  galleryItem.appendChild(mediaElement);
  galleryItem.appendChild(label);

  return galleryItem;
}

// Initialize the simple gallery when page loads
document.addEventListener("DOMContentLoaded", function () {
  const galleryContainer = document.getElementById("recentOrdersGallery");

  if (galleryContainer) {
    // Gallery items for recent orders with lightbox support
    const galleryItems = [
      {
        type: "video",
        src: "resources/recent-orders/1.mp4",
        title: "Premium Gold Foil Cards",
      },
      {
        type: "video",
        src: "resources/recent-orders/2.mp4",
        title: "Luxury Matte Finish",
      },
      {
        type: "video",
        src: "resources/recent-orders/3.mp4",
        title: "Embossed Business Cards",
      },
      {
        type: "video",
        src: "resources/recent-orders/4.mp4",
        title: "UV Spot Gloss Design",
      },
      {
        type: "video",
        src: "resources/recent-orders/5.mp4",
        title: "Velvet Touch Cards",
      },
      {
        type: "image",
        src: "resources/hero-cards.jpg",
        title: "Multi-finish Showcase",
      },
    ];

    // Initialize video lightbox (if it exists)
    let lightbox = null;
    if (typeof VideoLightbox !== "undefined") {
      lightbox = new VideoLightbox(galleryItems);
    }

    // Create gallery items
    galleryItems.forEach((item, index) => {
      const galleryItem = createGalleryItem(item, index, lightbox);
      galleryContainer.appendChild(galleryItem);
    });

    console.log("Package gallery loaded successfully");
  }
});

// Package Video Carousel Class
class PackageVideoCarousel {
  constructor(containerId) {
    console.log(
      "PackageVideoCarousel constructor called with:",
      containerId
    );
    this.container = document.getElementById(containerId);

    if (!this.container) {
      console.warn(`Container with id ${containerId} not found`);
      return;
    }

    console.log("Container found:", this.container);

    this.currentIndex = 0;
    this.videoItems = [];
    this.videos = [
      {
        src: "resources/carousel-videos/1.mp4",
        title: "Package Video 1",
      },
      {
        src: "resources/carousel-videos/2.mp4",
        title: "Package Video 2",
      },
      {
        src: "resources/carousel-videos/3.mp4",
        title: "Package Video 3",
      },
    ];

    console.log("Videos array:", this.videos);
    this.init();
  }

  init() {
    this.createVideoElements();
    this.setupControls();
    this.updatePositions();
  }

  createVideoElements() {
    console.log("Creating video elements...");
    this.videos.forEach((videoData, index) => {
      console.log(`Creating video ${index + 1}:`, videoData.src);

      const videoItem = document.createElement("div");
      videoItem.className = "video-item";

      const video = document.createElement("video");
      video.src = videoData.src;
      video.muted = true;
      video.loop = true;
      video.playsInline = true;
      video.preload = "metadata";
      video.style.pointerEvents = "none";
      video.controls = false;
      video.setAttribute("webkit-playsinline", "");
      video.setAttribute("playsinline", "");

      // Add error handling
      video.addEventListener("error", (e) => {
        console.error(
          `Video ${index + 1} failed to load:`,
          e,
          videoData.src
        );
      });

      video.addEventListener("loadeddata", () => {
        console.log(`Video ${index + 1} loaded successfully`);
        if (index === this.currentIndex) {
          video
            .play()
            .catch((e) => console.log("Autoplay prevented:", e));
        }
      });

      videoItem.appendChild(video);
      this.container.appendChild(videoItem);
      this.videoItems.push(videoItem);

      console.log(`Video ${index + 1} added to container`);
    });

    this.videoItems = this.container.querySelectorAll(".video-item");
    console.log("Total video items created:", this.videoItems.length);
  }

  setupControls() {
    const prevBtn = document.getElementById("prevVideoBtn");
    const nextBtn = document.getElementById("nextVideoBtn");

    if (prevBtn) {
      prevBtn.addEventListener("click", () => this.navigate(-1));
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", () => this.navigate(1));
    }

    // Auto-advance videos every 5 seconds
    setInterval(() => {
      this.navigate(1);
    }, 5000);
  }

  navigate(direction) {
    const previousIndex = this.currentIndex;
    this.currentIndex =
      (this.currentIndex + direction + this.videos.length) %
      this.videos.length;

    // Stop previous video
    const prevVideo =
      this.videoItems[previousIndex].querySelector("video");
    if (prevVideo) {
      prevVideo.pause();
      prevVideo.currentTime = 0;
    }

    this.updatePositions();

    // Play current video with delay
    setTimeout(() => {
      const currentVideo =
        this.videoItems[this.currentIndex].querySelector("video");
      if (currentVideo) {
        currentVideo.preload = "auto";
        currentVideo
          .play()
          .catch((e) => console.log("Video play failed:", e));
      }
    }, 200);
  }

  updatePositions() {
    this.videoItems.forEach((item, index) => {
      item.classList.remove("active", "left", "right", "hidden");

      if (index === this.currentIndex) {
        item.classList.add("active");
      } else if (
        index ===
        (this.currentIndex - 1 + this.videos.length) % this.videos.length
      ) {
        item.classList.add("left");
      } else if (index === (this.currentIndex + 1) % this.videos.length) {
        item.classList.add("right");
      } else {
        item.classList.add("hidden");
      }
    });
  }
}

// Initialize package video carousel when page loads
document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM loaded, looking for packageVideoCarousel...");
  const carouselContainer = document.getElementById(
    "packageVideoCarousel"
  );

  if (carouselContainer) {
    console.log("Found carousel container, initializing...");
    const packageVideoCarousel = new PackageVideoCarousel(
      "packageVideoCarousel"
    );
  } else {
    console.error("Could not find packageVideoCarousel container");
  }
});
