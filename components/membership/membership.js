document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("formModal");
  const closeBtn = document.querySelector(".close");
  const chooseBtns = document.querySelectorAll(".choose-btn");
  const planInput = document.getElementById("plan");
  const paymentSelect = document.getElementById("payment");
  const paymentFields = document.querySelectorAll(".payment-field");
  const form = document.getElementById("registerForm");

  // Hide all payment fields by default
  hideAllPaymentFields();

  // Open modal with selected plan
  chooseBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const plan = btn.dataset.plan;
      planInput.value = plan;
      modal.style.display = "block";
    });
  });

  // Close modal (X button)
  closeBtn.addEventListener("click", () => {
    closeModal();
  });

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
});
