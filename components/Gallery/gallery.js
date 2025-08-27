document.addEventListener("DOMContentLoaded", function () {
  // Filter functionality
  const filterButtons = document.querySelectorAll(".filter-btn");
  const sportSections = document.querySelectorAll(".sport-section");

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
        return;
      }

      // Filter sections based on category
      sportSections.forEach((section) => {
        const category = section.getAttribute("data-category");

        if (category === filterValue) {
          section.style.display = "block";
        } else {
          section.style.display = "none";
        }
      });
    });
  });
});
