const loginForm = document.getElementById("loginForm");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const togglePassword = document.querySelector(".toggle-password");
const rememberCheckbox = document.getElementById("remember");
const loginBtn = document.querySelector(".login-btn");
const socialBtns = document.querySelectorAll(".social-btn");

togglePassword.addEventListener("click", function () {
  const type =
    passwordInput.getAttribute("type") === "password" ? "text" : "password";
  passwordInput.setAttribute("type", type);
  this.classList.toggle("fa-eye");
  this.classList.toggle("fa-eye-slash");
});

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validatePassword(password) {
  return password.length >= 6;
}

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

function clearError(input) {
  const formGroup = input.closest(".form-group");
  const errorContainer = formGroup.querySelector(".error-container");

  input.style.borderColor = "rgba(0, 255, 0, 0.3)";
  errorContainer.innerHTML = "";
}

emailInput.addEventListener("blur", function () {
  if (this.value && !validateEmail(this.value)) {
    showError(this, "Please enter a valid email address");
  } else {
    clearError(this);
  }
});

passwordInput.addEventListener("blur", function () {
  if (this.value && !validatePassword(this.value)) {
    showError(this, "Password must be at least 6 characters");
  } else {
    clearError(this);
  }
});

loginForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();
  const remember = rememberCheckbox.checked;

  let isValid = true;

  if (!email) {
    showError(emailInput, "Email is required");
    isValid = false;
  } else if (!validateEmail(email)) {
    showError(emailInput, "Please enter a valid email address");
    isValid = false;
  }

  if (!password) {
    showError(passwordInput, "Password is required");
    isValid = false;
  } else if (!validatePassword(password)) {
    showError(passwordInput, "Password must be at least 6 characters");
    isValid = false;
  }

  if (!isValid) return;

  loginBtn.classList.add("loading");
  loginBtn.innerHTML = "<span>Signing In...</span>";

  setTimeout(() => {
    showSuccessMessage("Login successful! Redirecting...");

    if (remember) {
      localStorage.setItem("rememberMe", "true");
      localStorage.setItem("userEmail", email);
    } else {
      localStorage.removeItem("rememberMe");
      localStorage.removeItem("userEmail");
    }

    setTimeout(() => {
      window.location.href = "../index.html";
    }, 2000);
  }, 1500);
});

function showSuccessMessage(message) {
  const existingSuccess = document.querySelector(".success-message");
  if (existingSuccess) {
    existingSuccess.remove();
  }

  const successDiv = document.createElement("div");
  successDiv.className = "success-message";
  successDiv.textContent = message;
  loginForm.insertBefore(successDiv, loginForm.firstChild);
}

socialBtns.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    e.preventDefault();
    const provider = this.classList.contains("google") ? "Google" : "Facebook";

    this.style.opacity = "0.7";
    this.style.pointerEvents = "none";

    setTimeout(() => {
      showSuccessMessage(`${provider} login successful! Redirecting...`);
      setTimeout(() => {
        window.location.href = "/components/dashboard/dashBoard.html";
      }, 2000);
    }, 1500);
  });
});

document
  .querySelector(".forgot-password")
  .addEventListener("click", function (e) {
    e.preventDefault();
    const email = emailInput.value.trim();

    if (!email || !validateEmail(email)) {
      showError(emailInput, "Please enter a valid email address first");
      emailInput.focus();
      return;
    }

    this.style.opacity = "0.7";
    this.textContent = "Sending...";

    setTimeout(() => {
      showSuccessMessage("Password reset link sent to your email!");
      this.style.opacity = "1";
      this.textContent = "Forgot Password?";
    }, 1500);
  });

window.addEventListener("load", function () {
  const remembered = localStorage.getItem("rememberMe");
  const rememberedEmail = localStorage.getItem("userEmail");

  if (remembered === "true" && rememberedEmail) {
    emailInput.value = rememberedEmail;
    rememberCheckbox.checked = true;
  }
});
