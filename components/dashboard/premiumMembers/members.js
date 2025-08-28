// Mobile menu functionality
const menuToggle = document.getElementById("menu-toggle");
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");

if (menuToggle && sidebar && overlay) {
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
}

// Close sidebar when clicking outside on mobile
document.addEventListener("click", function (event) {
  if (!sidebar || !overlay || !menuToggle) return;
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
const logoutBtn = document.getElementById("logout-btn");
if (logoutBtn) {
  logoutBtn.addEventListener("click", function (e) {
    e.preventDefault();
    if (confirm("Are you sure you want to logout?")) {
      try {
        localStorage.removeItem("athlonIsLoggedIn");
        localStorage.removeItem("athlonIsMember");
        localStorage.removeItem("athlonMemberPlan");
      } catch (_) {}
      alert("You have been logged out.");
      window.location.href = "/components/authentication/signIn/signIn.html";
    }
  });
}

// Function to handle manage premium button
const managePremiumBtn = document.getElementById("manage-premium-btn");
if (managePremiumBtn) {
  managePremiumBtn.addEventListener("click", function () {
    alert("Redirecting to subscription management...");
    window.location.href = "/components/membership/membership.html";
  });
}

// Notification button functionality
const notificationsBtn = document.getElementById("notifications-btn");
if (notificationsBtn) {
  notificationsBtn.addEventListener("click", function () {
    alert("Showing notifications...");
  });
}

// Settings button functionality
const settingsBtn = document.getElementById("settings-btn");
if (settingsBtn) {
  settingsBtn.addEventListener("click", function () {
    alert("Opening premium settings...");
    window.location.href = "/components/membership/membership.html";
  });
}

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
  // Gate: require logged-in and membership, else redirect appropriately
  try {
    const isLoggedIn = localStorage.getItem("athlonIsLoggedIn") === "true";
    const isMember = localStorage.getItem("athlonIsMember") === "true";
    if (!isLoggedIn) {
      window.location.replace("/components/authentication/signIn/signIn.html");
      return;
    }
    if (!isMember) {
      window.location.replace("/components/dashboard/dashboard.html");
      return;
    }
  } catch (_) {}

  // Adjust layout on resize
  window.addEventListener("resize", function () {
    if (window.innerWidth > 992 && sidebar && overlay) {
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

  // SPA-style section switching (premium)
  const sectionMap = {
    dashboard: document.getElementById("dashboard-section"),
    workouts: document.getElementById("workouts-section"),
    progress: document.getElementById("progress-section"),
    community: document.getElementById("community-section"),
    settings: document.getElementById("settings-section"),
  };

  function showSection(name) {
    Object.values(sectionMap).forEach((el) => {
      if (!el) return;
      el.style.display = "none";
    });
    const target = sectionMap[name];
    if (target) target.style.display = "grid";
  }

  const navLinks = document.querySelectorAll('.nav-links a[data-section]');
  navLinks.forEach((link) => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const section = this.getAttribute('data-section');
      navLinks.forEach((l) => l.classList.remove('active'));
      this.classList.add('active');
      showSection(section);
      if (window.innerWidth <= 992 && sidebar && overlay) {
        sidebar.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  });

  // Wire premium actions
  const scheduleCoachBtn = document.getElementById('schedule-coach-btn');
  if (scheduleCoachBtn) {
    scheduleCoachBtn.addEventListener('click', function () {
      alert('Opening coach scheduler...');
    });
  }

  const messageCoachBtn = document.getElementById('message-coach-btn');
  if (messageCoachBtn) {
    messageCoachBtn.addEventListener('click', function () {
      alert('Opening coach chat...');
    });
  }

  const exportPremiumBtn = document.getElementById('export-premium-progress-btn');
  if (exportPremiumBtn) {
    exportPremiumBtn.addEventListener('click', function () {
      alert('Preparing premium progress export...');
    });
  }

  const managePremiumSettingsBtn = document.getElementById('manage-premium-btn-settings');
  if (managePremiumSettingsBtn) {
    managePremiumSettingsBtn.addEventListener('click', function () {
      window.location.href = '/components/membership/membership.html';
    });
  }
});
