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
    });
  }

  // Function to show all images in a section
  function showAllImages(section) {
    const images = section.querySelectorAll(".gallery-item");
    images.forEach((img) => {
      img.style.display = "block";
    });
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
        return;
      }

      // Filter sections based on category
      sportSections.forEach((section) => {
        const category = section.getAttribute("data-category");

        if (category === filterValue) {
          section.style.display = "block";
          showAllImages(section); // Show all images for the selected sport
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
