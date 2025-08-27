<<<<<<< HEAD
// Sticky header functionality
const header = document.getElementById("mainHeader");

window.addEventListener("scroll", function () {
  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});
=======
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("formModal");
  const closeBtn = document.querySelector(".close");
  const chooseBtns = document.querySelectorAll(".choose-btn");
  const planInput = document.getElementById("plan");
  const paymentSelect = document.getElementById("payment");
  const paymentFields = document.querySelectorAll(".payment-field");
  const form = document.getElementById("registerForm");
>>>>>>> f5451c58879ccb9c5a94b81db31d489ce82385e3

// Billing toggle functionality
document.addEventListener("DOMContentLoaded", function () {
  const billingToggle = document.getElementById("billingToggle");
  const priceElements = document.querySelectorAll(".price");

<<<<<<< HEAD
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
=======
  // Open modal with selected plan
  chooseBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const plan = btn.dataset.plan;
      planInput.value = plan;
      modal.style.display = "block";
>>>>>>> f5451c58879ccb9c5a94b81db31d489ce82385e3
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

<<<<<<< HEAD
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
=======
  // Close modal when clicking outside
  window.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  function closeModal() {
    modal.style.display = "none";
    form.reset();
    hideAllPaymentFields();
  }

  // Payment method change
  paymentSelect.addEventListener("change", () => {
    hideAllPaymentFields();
    const method = paymentSelect.value;

    if (method === "edigital") {
      document.getElementById("esewaField").style.display = "block";
    } else if (method === "khalti") {
      document.getElementById("khaltiField").style.display = "block";
    } else if (method === "qr") {
      document.getElementById("qrField").style.display = "block";
    } else if (method === "card") {
      document.getElementById("cardField").style.display = "block";
    }
  });

  function hideAllPaymentFields() {
    paymentFields.forEach((field) => (field.style.display = "none"));
  }

  // Form submission
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const paymentMethod = paymentSelect.value;

    if (paymentMethod === "edigital" && !validateEsewa()) return;
    if (paymentMethod === "khalti" && !validateKhalti()) return;
    if (paymentMethod === "qr" && !validateQR()) return;
    if (paymentMethod === "card" && !validateCard()) return;

    alert(
      "✅ Registration submitted successfully! We will verify your payment and activate your membership shortly."
    );
    closeModal();
  });

  // eSewa Validation
  function validateEsewa() {
    const txn = document.getElementById("esewaTxn").value.trim();
    const screenshot = document.getElementById("esewaScreenshot").files[0];

    if (!/^[A-Za-z0-9]{5,}$/.test(txn)) {
      alert("Transaction ID must be at least 5 alphanumeric characters.");
      return false;
    }
    if (!screenshot) {
      alert("Please upload a transaction screenshot.");
      return false;
    }
    return true;
  }

  // Khalti Validation
  function validateKhalti() {
    const txn = document.getElementById("khaltiTxn").value.trim();
    const screenshot = document.getElementById("khaltiScreenshot").files[0];

    if (!/^[A-Za-z0-9]{5,}$/.test(txn)) {
      alert("Transaction ID must be at least 5 alphanumeric characters.");
      return false;
    }
    if (!screenshot) {
      alert("Please upload a transaction screenshot.");
      return false;
    }
    return true;
  }

  // QR Validation
  function validateQR() {
    const txn = document.getElementById("bankTxn").value.trim();
    const screenshot = document.getElementById("bankScreenshot").files[0];

    if (!/^[A-Za-z0-9]{5,}$/.test(txn)) {
      alert("Transaction ID must be at least 5 alphanumeric characters.");
      return false;
    }
    if (!screenshot) {
      alert("Please upload a transaction screenshot.");
      return false;
    }
    return true;
  }

  // Card Validation
  function validateCard() {
    const txn = document.getElementById("cardTxn").value.trim();
    const screenshot = document.getElementById("cardScreenshot").files[0];

    if (!/^[A-Za-z0-9]{5,}$/.test(txn)) {
      alert("Transaction ID must be at least 5 alphanumeric characters.");
      return false;
    }
    if (!screenshot) {
      alert("Please upload a transaction screenshot.");
      return false;
    }
    return true;
  }
>>>>>>> f5451c58879ccb9c5a94b81db31d489ce82385e3
});

