// Create fullscreen viewer elements
const fullscreenViewer = document.createElement('div');
fullscreenViewer.className = 'fullscreen-viewer';
fullscreenViewer.innerHTML = `
    <div class="fullscreen-content">
        <span class="close-btn">&times;</span>
        <img src="" alt="Full screen image">
        <div class="image-info">
            <h3 class="fullscreen-title"></h3>
            <p class="fullscreen-desc"></p>
        </div>
    </div>
`;

// Add to body
document.body.appendChild(fullscreenViewer);

// Add CSS for fullscreen viewer (injecting via JavaScript)
const style = document.createElement('style');
style.textContent = `
    .fullscreen-viewer {
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.95);
        z-index: 1000;
        justify-content: center;
        align-items: center;
        opacity: 0;
        transition: opacity 0.3s ease;
    }
    
    .fullscreen-viewer.active {
        display: flex;
        opacity: 1;
    }
    
    .fullscreen-content {
        position: relative;
        max-width: 90%;
        max-height: 90%;
    }
    
    .fullscreen-content img {
        max-width: 100%;
        max-height: 80vh;
        object-fit: contain;
        border-radius: 8px;
    }
    
    .close-btn {
        position: absolute;
        top: -40px;
        right: 0;
        color: white;
        font-size: 35px;
        cursor: pointer;
        transition: color 0.3s;
    }
    
    .close-btn:hover {
        color: #00ff00;
    }
    
    .image-info {
        color: white;
        text-align: center;
        margin-top: 15px;
    }
    
    .fullscreen-title {
        font-size: 1.5rem;
        margin-bottom: 5px;
    }
    
    @media (max-width: 768px) {
        .fullscreen-content {
            max-width: 95%;
        }
        
        .close-btn {
            top: -30px;
            font-size: 30px;
        }
    }
`;
document.head.appendChild(style);

// Add click event to all gallery items
document.addEventListener('DOMContentLoaded', function() {
    // Your existing code...
    
    // New code for fullscreen images
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const imgSrc = this.querySelector('img').src;
            const title = this.querySelector('.image-title') ? this.querySelector('.image-title').textContent : '';
            const desc = this.querySelector('.image-desc') ? this.querySelector('.image-desc').textContent : '';
            
            // Set content for fullscreen viewer
            const fullscreenImg = fullscreenViewer.querySelector('img');
            fullscreenImg.src = imgSrc;
            fullscreenImg.alt = title;
            
            fullscreenViewer.querySelector('.fullscreen-title').textContent = title;
            fullscreenViewer.querySelector('.fullscreen-desc').textContent = desc;
            
            // Show fullscreen viewer
            fullscreenViewer.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        });
    });
    
    // Close fullscreen viewer
    const closeBtn = fullscreenViewer.querySelector('.close-btn');
    closeBtn.addEventListener('click', function() {
        fullscreenViewer.classList.remove('active');
        document.body.style.overflow = ''; // Re-enable scrolling
    });
    
    // Close when clicking outside image
    fullscreenViewer.addEventListener('click', function(e) {
        if (e.target === fullscreenViewer) {
            fullscreenViewer.classList.remove('active');
            document.body.style.overflow = ''; // Re-enable scrolling
        }
    });
    
    // Close with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && fullscreenViewer.classList.contains('active')) {
            fullscreenViewer.classList.remove('active');
            document.body.style.overflow = ''; // Re-enable scrolling
        }
    });
    
    // Your existing code continues...
});
document.addEventListener("DOMContentLoaded", function () {
  // Filter functionality
  const filterButtons = document.querySelectorAll(".filter-btn");
  const sportSections = document.querySelectorAll(".sport-section");
  const viewMoreButtons = document.querySelectorAll(".view-more .btn");

  // Store the original state of all images
  let originalState = [];
  sportSections.forEach((section) => {
    const images = section.querySelectorAll(".gallery-item");
    originalState.push({
      section: section,
      images: images,
      visibleCount: images.length,
    });
  });

  function setViewMoreVisibility(section, shouldShow) {
    const viewMore = section.querySelector('.view-more');
    if (!viewMore) return;
    viewMore.style.display = shouldShow ? 'block' : 'none';
  }

  function refreshViewMoreLimitedState() {
    sportSections.forEach((section) => {
      const images = section.querySelectorAll('.gallery-item');
      // Show button only when there are more than 6 images total
      setViewMoreVisibility(section, images.length > 6);
    });
  }

  // Function to show limited images (6 per section)
  function showLimitedImages() {
    sportSections.forEach((section) => {
      const images = section.querySelectorAll(".gallery-item");
      images.forEach((img, index) => {
        if (index < 6) {
          img.style.display = "block";
        } else {
          img.style.display = "none";
        }
      });
      // We are limiting items, so show View More if there are more items
      setViewMoreVisibility(section, images.length > 6);
    });
  }

  // Function to show all images in a section
  function showAllImages(section) {
    const images = section.querySelectorAll(".gallery-item");
    images.forEach((img) => {
      img.style.display = "block";
    });
    // All images are visible for this section; hide its View More button
    setViewMoreVisibility(section, false);
  }

  // Initialize page with limited images
  showLimitedImages();

  // Filter button functionality
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Remove active class from all buttons
      filterButtons.forEach((btn) => btn.classList.remove("active"));

      // Add active class to clicked button
      button.classList.add("active");

      const filterValue = button.getAttribute("data-filter");

      // Show all sections if "all" is selected
      if (filterValue === "all") {
        sportSections.forEach((section) => {
          section.style.display = "block";
        });
        showLimitedImages();
        refreshViewMoreLimitedState();
        return;
      }

      // Filter sections based on category
      sportSections.forEach((section) => {
        const category = section.getAttribute("data-category");

        if (category === filterValue) {
          section.style.display = "block";
          showAllImages(section); // Show all images for the selected sport
          // Hide View More for the selected category since everything is visible
          setViewMoreVisibility(section, false);
        } else {
          section.style.display = "none";
        }
      });
    });
  });

  // View More button functionality
  viewMoreButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault();

      // Find the parent sport section
      const sportSection = button.closest(".sport-section");
      const category = sportSection.getAttribute("data-category");

      // Hide the button immediately to avoid flicker
      setViewMoreVisibility(sportSection, false);

      // Find and click the corresponding filter button
      const correspondingFilterButton = document.querySelector(
        `.filter-btn[data-filter="${category}"]`
      );
      if (correspondingFilterButton) {
        correspondingFilterButton.click();
      }
    });
  });
});
