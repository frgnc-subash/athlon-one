const header = document.getElementById("mainHeader");

window.addEventListener("scroll", function () {
  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

(function () {
  // Highlight active nav link
  function highlightActiveLink() {
    const navLinks = document.querySelectorAll(".nav-links a");
    let currentPath = window.location.pathname;

    // Normalize: treat "/" and "/index.html" the same
    if (currentPath === "/") currentPath = "/index.html";

    navLinks.forEach((link) => {
      if (link.getAttribute("href") === currentPath) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  }

  // Safe init (works even if loaded dynamically)
  document.addEventListener("DOMContentLoaded", highlightActiveLink);
  highlightActiveLink();
  
  // Conditionally show Dashboard link if user logged in; set href based on membership
  function toggleDashboardLink() {
    try {
      const isLoggedIn = localStorage.getItem("athlonIsLoggedIn") === "true";
      const isMember = localStorage.getItem("athlonIsMember") === "true";
      const dashboardLink = document.getElementById("dashboardLink");
      if (dashboardLink) {
        dashboardLink.style.display = isLoggedIn ? "inline-block" : "none";
        dashboardLink.setAttribute(
          "href",
          isMember
            ? "/components/dashboard/premiumMembers/members.html"
            : "/components/dashboard/dashboard.html"
        );
      }
    } catch (_) {}
  }
  document.addEventListener("DOMContentLoaded", toggleDashboardLink);
  toggleDashboardLink();
  
  // Hamburger toggle for small screens
  function setupHamburger() {
    const hamburgerBtn = document.getElementById("hamburgerBtn");
    if (!hamburgerBtn || !header) return;

    function toggleMenu() {
      const isExpanded = hamburgerBtn.getAttribute("aria-expanded") === "true";
      const next = String(!isExpanded);
      hamburgerBtn.setAttribute("aria-expanded", next);
      if (next === "true") {
        header.classList.add("menu-open");
      } else {
        header.classList.remove("menu-open");
      }
    }

    hamburgerBtn.addEventListener("click", toggleMenu);

    // Close menu when resizing to large screens
    window.addEventListener("resize", function () {
      if (window.innerWidth > 768 && header.classList.contains("menu-open")) {
        header.classList.remove("menu-open");
        hamburgerBtn.setAttribute("aria-expanded", "false");
      }
    });
  }

  document.addEventListener("DOMContentLoaded", setupHamburger);
  setupHamburger();
})();
