document.addEventListener("DOMContentLoaded", function () {
  // Filter buttons functionality
  const filterButtons = document.querySelectorAll(".filter-btn");
  const trendingCards = document.querySelectorAll(".trending-card");

  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Remove active class from all buttons
      filterButtons.forEach((btn) => btn.classList.remove("active"));

      // Add active class to clicked button
      this.classList.add("active");

      const filterValue = this.textContent.trim().toLowerCase();

      // Show all cards if "All Sports" is selected
      if (filterValue === "all sports") {
        trendingCards.forEach((card) => {
          card.style.display = "block";
        });
        return;
      }

      // Map filter text to category values
      const filterMap = {
        "team sports": "team",
        "individual sports": "solo",
        "extreme sports": "extreme",
        "water sports": "water",
      };

      const categoryToFilter = filterMap[filterValue] || filterValue;

      // Filter cards based on data-categories attribute
      trendingCards.forEach((card) => {
        const categories = card.getAttribute("data-categories");

        if (categories && categories.includes(categoryToFilter)) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      });
    });
  });
});
