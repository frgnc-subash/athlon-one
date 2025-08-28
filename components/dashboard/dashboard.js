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

// Function to show a temporary message and redirect
function showRedirectMessage(message, url, delay = 1500) {
  const msgDiv = document.createElement("div");
  msgDiv.textContent = message;
  msgDiv.style.position = "fixed";
  msgDiv.style.top = "20px";
  msgDiv.style.left = "50%";
  msgDiv.style.transform = "translateX(-50%)";
  msgDiv.style.backgroundColor = "#00ff00";
  msgDiv.style.color = "#000";
  msgDiv.style.padding = "10px 20px";
  msgDiv.style.borderRadius = "5px";
  msgDiv.style.zIndex = "1000";
  msgDiv.style.fontWeight = "bold";
  msgDiv.style.boxShadow = "0 2px 6px rgba(0,0,0,0.3)";
  document.body.appendChild(msgDiv);

  setTimeout(() => {
    window.location.href = url;
  }, 800);
}

// Upgrade to premium buttons (sidebar + premium overlay cards)
const upgradeButtons = [
  document.getElementById("upgrade-btn"),
  ...document.querySelectorAll(".premium-overlay .btn-premium"),
];

upgradeButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    showRedirectMessage(
      "Redirecting to membership plans...",
      "/components/membership/membership.html"
    );
  });
});

// Notification button functionality
document
  .getElementById("notifications-btn")
  .addEventListener("click", function () {
    alert("Showing notifications...");
  });

// Settings button functionality
document.getElementById("settings-btn").addEventListener("click", function () {
  alert("Opening settings...");
  window.location.href = "/components/settings/settings.html";
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
  animateValue("stat1", 0, 10000, 2000);
  animateValue("stat2", 0, 50000, 2000);
  animateValue("stat3", 0, 25000, 2000);
  animateValue("stat4", 0, 4500, 2000);

  // Adjust layout on resize
  window.addEventListener("resize", function () {
    if (window.innerWidth > 992) {
      sidebar.classList.remove("active");
      overlay.classList.remove("active");
      document.body.style.overflow = "";
    }
  });
});
