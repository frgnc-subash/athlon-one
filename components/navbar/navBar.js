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
})();
