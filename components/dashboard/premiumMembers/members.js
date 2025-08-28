// Mobile menu functionality
const menuToggle = document.getElementById("menu-toggle");
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");

menuToggle.addEventListener("click", function () {
  sidebar.classList.toggle("active");
  overlay.classList.toggle("active");
  document.body.style.overflow = sidebar.classList.contains("active")
    ? "hidden"
    : "";
});

overlay.addEventListener("click", function () {
  sidebar.classList.remove("active");
  overlay.classList.remove("active");
  document.body.style.overflow = "";
});

// Close sidebar when clicking outside on mobile
document.addEventListener("click", function (event) {
  if (
    window.innerWidth <= 992 &&
    sidebar.classList.contains("active") &&
    !sidebar.contains(event.target) &&
    !menuToggle.contains(event.target)
  ) {
    sidebar.classList.remove("active");
    overlay.classList.remove("active");
    document.body.style.overflow = "";
  }
});

// Function to handle user logout
document.getElementById("logout-btn").addEventListener("click", function (e) {
  e.preventDefault();
  if (confirm("Are you sure you want to logout?")) {
    alert("Logging out...");
    window.location.href = "/components/authentication/signIn/signIn.html";
  }
});

// Function to handle manage premium button
document
  .getElementById("manage-premium-btn")
  .addEventListener("click", function () {
    alert("Redirecting to subscription management...");
    window.location.href = "/components/membership/manage-premium.html";
  });

// Notification button functionality
document
  .getElementById("notifications-btn")
  .addEventListener("click", function () {
    alert("Showing notifications...");
  });

// Settings button functionality
document.getElementById("settings-btn").addEventListener("click", function () {
  alert("Opening premium settings...");
  window.location.href = "/components/settings/premium-settings.html";
});

// Simulate loading animation for stats
function animateValue(id, start, end, duration) {
  const obj = document.getElementById(id);
  if (!obj) return;

  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    obj.innerHTML = Math.floor(progress * (end - start) + start);
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
}

// Animate stat numbers when page loads
document.addEventListener("DOMContentLoaded", function () {
  // Adjust layout on resize
  window.addEventListener("resize", function () {
    if (window.innerWidth > 992) {
      sidebar.classList.remove("active");
      overlay.classList.remove("active");
      document.body.style.overflow = "";
    }
  });

  // Add subtle animation to premium elements
  const premiumElements = document.querySelectorAll(
    ".premium-card, .premium-stat"
  );
  premiumElements.forEach((element, index) => {
    element.style.animationDelay = `${index * 0.1}s`;
    element.classList.add("animate__animated");
  });
});
