// Sticky header functionality
const header = document.getElementById("mainHeader");

window.addEventListener("scroll", function () {
  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

// Billing toggle functionality
document.addEventListener("DOMContentLoaded", function () {
  const billingToggle = document.getElementById("billingToggle");
  const priceElements = document.querySelectorAll(".price");

  billingToggle.addEventListener("change", function () {
    if (this.checked) {
      // Switch to annual billing
      priceElements.forEach((element) => {
        const annualPrice = element.getAttribute("data-annual");
        element.textContent = annualPrice;
        element.innerHTML = annualPrice + "<span>/year</span>";
      });
    } else {
      // Switch to monthly billing
      priceElements.forEach((element) => {
        const monthlyPrice = element.getAttribute("data-monthly");
        element.textContent = monthlyPrice;
        element.innerHTML = monthlyPrice + "<span>/month</span>";
      });
    }
  });

  // FAQ accordion functionality
  const faqQuestions = document.querySelectorAll(".faq-question");

  faqQuestions.forEach((question) => {
    question.addEventListener("click", () => {
      const item = question.parentElement;
      item.classList.toggle("active");
    });
  });

  // Plan card hover effect for touch devices
  const planCards = document.querySelectorAll(".plan-card");

  planCards.forEach((card) => {
    card.addEventListener(
      "touchstart",
      function () {
        this.classList.add("hover");
      },
      { passive: true }
    );

    card.addEventListener(
      "touchend",
      function () {
        this.classList.remove("hover");
      },
      { passive: true }
    );
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: "smooth",
        });
      }
    });
  });
});

