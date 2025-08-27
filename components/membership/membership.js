// membership.js

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
  chooseBtns.forEach(btn => {
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
  window.addEventListener("click", e => {
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
    paymentFields.forEach(field => (field.style.display = "none"));
  }

  // Form submission
  form.addEventListener("submit", e => {
    e.preventDefault();

    const paymentMethod = paymentSelect.value;

    if (paymentMethod === "edigital" && !validateEsewa()) return;
    if (paymentMethod === "qr" && !validateQR()) return;
    if (paymentMethod === "card" && !validateCard()) return;

    alert("✅ Registration submitted successfully!");
    closeModal();
  });

  // eSewa Validation
  function validateEsewa() {
    const number = document.getElementById("esewaNumber").value.trim();
    const txn = document.getElementById("esewaTxn").value.trim();
    const date = document.getElementById("esewaDate").value.trim();
    const confirm = document.getElementById("confirmEsawa").value.trim();

    if (!/^\d{10}$/.test(number)) {
      alert("eSewa number must be 10 digits.");
      return false;
    }
    if (!/^[A-Za-z0-9]{5,}$/.test(txn)) {
      alert("Transaction ID must be at least 5 alphanumeric characters.");
      return false;
    }
    if (!date) {
      alert("Please select transaction date.");
      return false;
    }
    if (!/^\d{4}$/.test(confirm)) {
      alert("Confirm PIN must be 4 digits.");
      return false;
    }
    return true;
  }

  //khalti Validation
  function validateKhalti() {
    const number = document.getElementById("khaltiNumber").value.trim();
    const txn = document.getElementById("khaltiTxn").value.trim();
    const date = document.getElementById("khaltiDate").value.trim();
    const confirm = document.getElementById("confirmKhalti").value.trim();

    if (!/^\d{10}$/.test(number)) {
      alert("Khalti number must be 10 digits.");
      return false;
    }
    if (!/^[A-Za-z0-9]{5,}$/.test(txn)) {
      alert("Transaction ID must be at least 5 alphanumeric characters.");
      return false;
    }
    if (!date) {
      alert("Please select transaction date.");
      return false;
    }
    if (!/^\d{4}$/.test(confirm)) {
      alert("Confirm PIN must be 4 digits.");
      return false;
    }
    return true;
  }

  // QR Validation
  function validateQR() {
    const file = document.getElementById("qrUpload").files[0];
    if (!file) {
      alert("Please upload a QR code image.");
      return false;
    }
    return true;
  }

  // Card Validation
  function validateCard() {
    const number = document.getElementById("cardNumber").value.trim();
    const expiry = document.getElementById("expiry").value.trim();
    const cvv = document.getElementById("cvv").value.trim();

    if (!/^\d{16}$/.test(number)) {
      alert("Card number must be 16 digits.");
      return false;
    }
    if (!expiry) {
      alert("Please select expiry date.");
      return false;
    }
    if (!/^\d{3,4}$/.test(cvv)) {
      alert("CVV must be 3 or 4 digits.");
      return false;
    }
    return true;
  }
});
