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

  // Plan selection and payment modal
  const planButtons = document.querySelectorAll(".btn-plan");
  const paymentModal = document.getElementById("paymentModal");
  const closeModal = document.getElementById("closeModal");
  const modalPlanName = document.getElementById("modalPlanName");
  const modalPlanPrice = document.getElementById("modalPlanPrice");
  const paymentMethods = document.querySelectorAll(".payment-method");
  const paymentForms = document.querySelectorAll(".payment-form");
  const successSection = document.getElementById("paymentSuccess");
  const successButton = document.getElementById("successButton");

  // Open modal when a plan is selected
  planButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const plan = this.getAttribute("data-plan");
      const isAnnual = billingToggle.checked;
      let planName = "";
      let planPrice = "";

      switch (plan) {
        case "basic":
          planName = "Basic Membership";
          planPrice = isAnnual ? "$191.99/year" : "$19.99/month";
          break;
        case "pro":
          planName = "Pro Membership";
          planPrice = isAnnual ? "$383.99/year" : "$39.99/month";
          break;
        case "elite":
          planName = "Elite Membership";
          planPrice = isAnnual ? "$767.99/year" : "$79.99/month";
          break;
      }

      modalPlanName.textContent = planName;
      modalPlanPrice.textContent = planPrice;
      paymentModal.style.display = "flex";
      document.body.style.overflow = "hidden";

      // Reset to card payment when opening modal
      resetPaymentMethods();
    });
  });

  // Close modal
  closeModal.addEventListener("click", function () {
    paymentModal.style.display = "none";
    document.body.style.overflow = "auto";
    resetForms();
  });

  // Close modal when clicking outside
  paymentModal.addEventListener("click", function (e) {
    if (e.target === paymentModal) {
      paymentModal.style.display = "none";
      document.body.style.overflow = "auto";
      resetForms();
    }
  });

  // Payment method selection
  paymentMethods.forEach((method) => {
    method.addEventListener("click", function () {
      // Remove active class from all methods
      paymentMethods.forEach((m) => m.classList.remove("active"));
      // Add active class to clicked method
      this.classList.add("active");

      // Show corresponding form
      const methodName = this.getAttribute("data-method");
      paymentForms.forEach((form) => {
        form.classList.remove("active");
        if (form.id === `${methodName}Form`) {
          form.classList.add("active");
        }
      });
    });
  });

  // Payment form submissions
  document
    .getElementById("submitCard")
    .addEventListener("click", processPayment);
  document
    .getElementById("submitEsewa")
    .addEventListener("click", processPayment);
  document
    .getElementById("submitKhalti")
    .addEventListener("click", processPayment);
  document
    .getElementById("submitBank")
    .addEventListener("click", processPayment);

  // Success button
  successButton.addEventListener("click", function () {
    paymentModal.style.display = "none";
    document.body.style.overflow = "auto";
    resetForms();
  });

  // Process payment function
  function processPayment(e) {
    e.preventDefault();

    // Hide all forms and show success message
    paymentForms.forEach((form) => (form.style.display = "none"));
    successSection.style.display = "block";

    // In a real application, you would:
    // 1. Validate form inputs
    // 2. Send payment details to your server
    // 3. Process payment through appropriate gateway
    // 4. Handle success/error responses
  }

  // Reset forms function
  function resetForms() {
    paymentForms.forEach((form) => {
      form.style.display = "none";
    });
    successSection.style.display = "none";

    // Reset payment method selection
    resetPaymentMethods();
  }

  // Reset payment methods to default (card)
  function resetPaymentMethods() {
    paymentMethods.forEach((method) => method.classList.remove("active"));
    document.querySelector('[data-method="card"]').classList.add("active");

    paymentForms.forEach((form) => form.classList.remove("active"));
    document.getElementById("cardForm").classList.add("active");
  }

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
