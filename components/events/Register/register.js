document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".registration-form");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Basic validation
    let isValid = true;
    const requiredFields = form.querySelectorAll("[required]");

    requiredFields.forEach((field) => {
      if (!field.value.trim()) {
        isValid = false;
        field.style.borderColor = "red";
      } else {
        field.style.borderColor = "#333";
      }
    });

    if (isValid) {
      // In a real application, you would submit the form data to a server
      alert("Registration submitted successfully! We will contact you soon.");
      form.reset();
    } else {
      alert("Please fill in all required fields.");
    }
  });
});


