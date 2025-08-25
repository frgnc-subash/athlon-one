// DOM Elements
const step1Form = document.getElementById("step1Form");
const step2Form = document.getElementById("step2Form");
const progressSteps = document.querySelectorAll(".step");
const stepForms = document.querySelectorAll(".step-form");
const fullNameInput = document.getElementById("fullName");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirmPassword");
const genderInput = document.getElementById("gender");
const birthdateInput = document.getElementById("birthdate");
const weightInput = document.getElementById("weight");
const heightInput = document.getElementById("height");
const termsCheckbox = document.getElementById("terms");
const togglePasswordIcons = document.querySelectorAll(".toggle-password");
const continueBtn = document.querySelector(".continue-btn");
const backBtn = document.querySelector(".back-btn");
const signupBtn = document.querySelector(".signup-btn");
const strengthMeter = document.getElementById("strengthMeter");
const passwordStrengthText = document.getElementById("passwordStrengthText");
const termsError = document.getElementById("termsError");

// Form Data Object
let formData = {
  fullName: "",
  email: "",
  password: "",
  gender: "",
  birthdate: "",
  weight: "",
  height: "",
  terms: false,
};

// Toggle Password Visibility
togglePasswordIcons.forEach((icon) => {
  icon.addEventListener("click", function () {
    const input = this.parentElement.querySelector("input");
    const type =
      input.getAttribute("type") === "password" ? "text" : "password";
    input.setAttribute("type", type);
    this.classList.toggle("fa-eye");
    this.classList.toggle("fa-eye-slash");
  });
});

// Email Validation
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Password Validation
function validatePassword(password) {
  return password.length >= 8;
}

// Password Strength Check
function checkPasswordStrength(password) {
  let strength = 0;

  if (password.length >= 8) strength += 20;
  if (password.match(/[a-z]+/)) strength += 20;
  if (password.match(/[A-Z]+/)) strength += 20;
  if (password.match(/[0-9]+/)) strength += 20;
  if (password.match(/[!@#$%^&*(),.?":{}|<>]+/)) strength += 20;

  return Math.min(strength, 100);
}

// Update Password Strength Indicator
passwordInput.addEventListener("input", function () {
  const strength = checkPasswordStrength(this.value);
  strengthMeter.style.width = `${strength}%`;

  if (strength < 40) {
    strengthMeter.style.background = "#ff4444";
    passwordStrengthText.textContent = "Weak password";
    passwordStrengthText.style.color = "#ff4444";
  } else if (strength < 70) {
    strengthMeter.style.background = "#ffcc00";
    passwordStrengthText.textContent = "Medium password";
    passwordStrengthText.style.color = "#ffcc00";
  } else {
    strengthMeter.style.background = "#00ff00";
    passwordStrengthText.textContent = "Strong password";
    passwordStrengthText.style.color = "#00ff00";
  }

  if (this.value === "") {
    strengthMeter.style.width = "0";
    passwordStrengthText.textContent = "Password strength";
    passwordStrengthText.style.color = "#888";
  }
});

// Name Validation
function validateName(name) {
  return name.length >= 2;
}

// Birthdate Validation
function validateBirthdate(date) {
  if (!date) return false;

  const birthdate = new Date(date);
  const today = new Date();
  let age = today.getFullYear() - birthdate.getFullYear();
  const monthDiff = today.getMonth() - birthdate.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthdate.getDate())
  ) {
    age--;
  }

  return age >= 13;
}

// Show Error Message
function showError(input, message) {
  const formGroup = input.closest(".form-group");
  const errorContainer = formGroup.querySelector(".error-container");

  input.style.borderColor = "#ff4444";

  const errorDiv = document.createElement("div");
  errorDiv.className = "error-message";
  errorDiv.textContent = message;

  errorContainer.innerHTML = "";
  errorContainer.appendChild(errorDiv);
}

// Show Terms Error
function showTermsError(message) {
  termsError.innerHTML = "";
  const errorDiv = document.createElement("div");
  errorDiv.className = "error-message";
  errorDiv.textContent = message;
  termsError.appendChild(errorDiv);
}

// Clear Error
function clearError(input) {
  const formGroup = input.closest(".form-group");
  const errorContainer = formGroup.querySelector(".error-container");

  input.style.borderColor = "rgba(0, 255, 0, 0.3)";
  errorContainer.innerHTML = "";
}

// Clear Terms Error
function clearTermsError() {
  termsError.innerHTML = "";
}

// Validate Step 1
function validateStep1() {
  const fullName = fullNameInput.value.trim();
  const email = emailInput.value.trim();
  const password = passwordInput.value;
  const confirmPassword = confirmPasswordInput.value;

  let isValid = true;

  if (!fullName) {
    showError(fullNameInput, "Full name is required");
    isValid = false;
  } else if (!validateName(fullName)) {
    showError(fullNameInput, "Name must be at least 2 characters");
    isValid = false;
  } else {
    clearError(fullNameInput);
  }

  if (!email) {
    showError(emailInput, "Email is required");
    isValid = false;
  } else if (!validateEmail(email)) {
    showError(emailInput, "Please enter a valid email address");
    isValid = false;
  } else {
    clearError(emailInput);
  }

  if (!password) {
    showError(passwordInput, "Password is required");
    isValid = false;
  } else if (!validatePassword(password)) {
    showError(passwordInput, "Password must be at least 8 characters");
    isValid = false;
  } else {
    clearError(passwordInput);
  }

  if (!confirmPassword) {
    showError(confirmPasswordInput, "Please confirm your password");
    isValid = false;
  } else if (password !== confirmPassword) {
    showError(confirmPasswordInput, "Passwords do not match");
    isValid = false;
  } else {
    clearError(confirmPasswordInput);
  }

  return isValid;
}

// Validate Step 2
function validateStep2() {
  const gender = genderInput.value;
  const birthdate = birthdateInput.value;
  const weight = weightInput.value;
  const height = heightInput.value;
  const terms = termsCheckbox.checked;

  let isValid = true;

  if (!gender) {
    showError(genderInput, "Please select your gender");
    isValid = false;
  } else {
    clearError(genderInput);
  }

  if (!birthdate) {
    showError(birthdateInput, "Birthdate is required");
    isValid = false;
  } else if (!validateBirthdate(birthdate)) {
    showError(birthdateInput, "You must be at least 13 years old");
    isValid = false;
  } else {
    clearError(birthdateInput);
  }

  if (!weight) {
    showError(weightInput, "Weight is required");
    isValid = false;
  } else if (weight < 1) {
    showError(weightInput, "Please enter a valid weight");
    isValid = false;
  } else {
    clearError(weightInput);
  }

  if (!height) {
    showError(heightInput, "Height is required");
    isValid = false;
  } else if (height < 1) {
    showError(heightInput, "Please enter a valid height");
    isValid = false;
  } else {
    clearError(heightInput);
  }

  if (!terms) {
    showTermsError("You must accept the terms and conditions");
    isValid = false;
  } else {
    clearTermsError();
  }

  return isValid;
}

// Save Step 1 Data
function saveStep1Data() {
  formData.fullName = fullNameInput.value.trim();
  formData.email = emailInput.value.trim();
  formData.password = passwordInput.value;
}

// Go to Step 2
function goToStep2() {
  // Update progress indicator
  progressSteps[0].classList.remove("active");
  progressSteps[1].classList.add("active");

  // Hide step 1, show step 2
  step1Form.classList.add("hidden");
  step2Form.classList.remove("hidden");
}

// Go back to Step 1
function goBackToStep1() {
  // Update progress indicator
  progressSteps[0].classList.add("active");
  progressSteps[1].classList.remove("active");

  // Hide step 2, show step 1
  step2Form.classList.add("hidden");
  step1Form.classList.remove("hidden");
}

// Show Success Message
function showSuccessMessage(message) {
  const existingSuccess = document.querySelector(".success-message");
  if (existingSuccess) {
    existingSuccess.remove();
  }

  const successDiv = document.createElement("div");
  successDiv.className = "success-message";
  successDiv.textContent = message;
  step2Form.insertBefore(successDiv, step2Form.firstChild);
}

// Handle Step 1 Form Submission
step1Form.addEventListener("submit", function (e) {
  e.preventDefault();

  if (validateStep1()) {
    saveStep1Data();
    goToStep2();
  }
});

// Handle Back Button Click
backBtn.addEventListener("click", function () {
  goBackToStep1();
});

// Handle Step 2 Form Submission
step2Form.addEventListener("submit", function (e) {
  e.preventDefault();

  if (validateStep2()) {
    // Save remaining form data
    formData.gender = genderInput.value;
    formData.birthdate = birthdateInput.value;
    formData.weight = weightInput.value;
    formData.height = heightInput.value;
    formData.terms = termsCheckbox.checked;

    // Show loading state
    signupBtn.classList.add("loading");
    signupBtn.innerHTML = "<span>Creating Account...</span>";

    // Simulate API call
    setTimeout(() => {
      showSuccessMessage("Account created successfully! Redirecting...");

      // Save to localStorage (simulating account creation)
      localStorage.setItem("userEmail", formData.email);
      localStorage.setItem("userName", formData.fullName);

      // Redirect to dashboard after delay
      setTimeout(() => {
        window.location.href = "dashboard.html";
      }, 2000);
    }, 1500);
  }
});

// Set max date for birthdate input (13 years ago)
window.addEventListener("load", function () {
  const today = new Date();
  const maxDate = new Date(
    today.getFullYear() - 13,
    today.getMonth(),
    today.getDate()
  );
  birthdateInput.max = maxDate.toISOString().split("T")[0];
});
