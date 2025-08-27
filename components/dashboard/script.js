// Landing Page JavaScript
function animateCounter(elementId, finalValue, duration) {
  let startTime = null
  const element = document.getElementById(elementId)
  const initialValue = 0

  function updateCounter(timestamp) {
    if (!startTime) startTime = timestamp
    const progress = Math.min((timestamp - startTime) / duration, 1)
    const currentValue = Math.floor(progress * finalValue)
    element.textContent = currentValue.toLocaleString()

    if (progress < 1) {
      requestAnimationFrame(updateCounter)
    } else {
      element.textContent = finalValue.toLocaleString()
    }
  }

  requestAnimationFrame(updateCounter)
}

// Initialize counters when stats section is in view
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter("stat1", 12500, 2000)
        animateCounter("stat2", 98500, 2000)
        animateCounter("stat3", 25000, 2000)
        animateCounter("stat4", 4500, 2000)
        observer.unobserve(entry.target)
      }
    })
  },
  { threshold: 0.5 },
)

const statsSection = document.querySelector(".stats")
if (statsSection) {
  observer.observe(statsSection)
}

// Header scroll effect
const header = document.getElementById("mainHeader")
if (header) {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled")
    } else {
      header.classList.remove("scrolled")
    }
  })
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

function navigateToDashboard() {
  // Add slide-out animation to current page
  document.body.classList.add("slide-out")

  // Navigate to dashboard after animation completes
  setTimeout(() => {
    window.location.href = "dashboard.html"
  }, 500)
}
