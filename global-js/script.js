function animateCounter(elementId, finalValue, duration) {
  let startTime = null;
  const element = document.getElementById(elementId);
  const initialValue = 0;

  function updateCounter(timestamp) {
    if (!startTime) startTime = timestamp;
    const progress = Math.min((timestamp - startTime) / duration, 1);
    const currentValue = Math.floor(progress * finalValue);
    element.textContent = currentValue.toLocaleString();

    if (progress < 1) {
      requestAnimationFrame(updateCounter);
    } else {
      element.textContent = finalValue.toLocaleString();
    }
  }

  requestAnimationFrame(updateCounter);
}

// Initialize counters when stats section is in view
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter("stat1", 12500, 2000);
        animateCounter("stat2", 98500, 2000);
        animateCounter("stat3", 25000, 2000);
        animateCounter("stat4", 4500, 2000);
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

observer.observe(document.querySelector(".stats"));

const header = document.getElementById("mainHeader");

window.addEventListener("scroll", function () {
  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

// dynamic navbar
fetch("/components/navbar/navBar.html")
  .then((response) => response.text())
  .then((data) => {
    document.getElementById("navbar-container").innerHTML = data;
    // after inserting navbar, load navbar.js
    const script = document.createElement("script");
    script.src = "/components/navbar/navBar.js";
    document.body.appendChild(script);
  });
