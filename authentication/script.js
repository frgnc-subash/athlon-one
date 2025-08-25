// DOM Elements
const loginForm = document.getElementById('loginForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const togglePassword = document.querySelector('.toggle-password');
const rememberCheckbox = document.getElementById('remember');
const loginBtn = document.querySelector('.login-btn');
const socialBtns = document.querySelectorAll('.social-btn');

// Password Toggle
togglePassword.addEventListener('click', function() {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    this.classList.toggle('fa-eye');
    this.classList.toggle('fa-eye-slash');
});

// Form Validation
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePassword(password) {
    return password.length >= 6;
}

function showError(input, message) {
    const inputContainer = input.closest('.input-container');
    inputContainer.style.borderColor = '#ff4444';
    
    const existingError = inputContainer.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.style.cssText = 'color: #ff4444; font-size: 0.8rem; margin-top: 5px;';
    errorDiv.textContent = message;
    inputContainer.appendChild(errorDiv);
}

function clearError(input) {
    const inputContainer = input.closest('.input-container');
    inputContainer.style.borderColor = 'rgba(0, 255, 0, 0.3)';
    
    const existingError = inputContainer.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
}

// Real-time validation
emailInput.addEventListener('blur', function() {
    if (this.value && !validateEmail(this.value)) {
        showError(this, 'Please enter a valid email address');
    } else {
        clearError(this);
    }
});

passwordInput.addEventListener('blur', function() {
    if (this.value && !validatePassword(this.value)) {
        showError(this, 'Password must be at least 6 characters');
    } else {
        clearError(this);
    }
});

// Form Submission
loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    const remember = rememberCheckbox.checked;
    
    let isValid = true;
    
    if (!email) {
        showError(emailInput, 'Email is required');
        isValid = false;
    } else if (!validateEmail(email)) {
        showError(emailInput, 'Please enter a valid email address');
        isValid = false;
    }
    
    if (!password) {
        showError(passwordInput, 'Password is required');
        isValid = false;
    } else if (!validatePassword(password)) {
        showError(passwordInput, 'Password must be at least 6 characters');
        isValid = false;
    }
    
    if (!isValid) return;
    
    // Show loading state
    loginBtn.classList.add('loading');
    loginBtn.innerHTML = '<span>Signing In...</span>';
    
    // Simulate API call
    setTimeout(() => {
        showSuccessMessage('Login successful! Redirecting...');
        
        if (remember) {
            localStorage.setItem('rememberMe', 'true');
            localStorage.setItem('userEmail', email);
        } else {
            localStorage.removeItem('rememberMe');
            localStorage.removeItem('userEmail');
        }
        
        setTimeout(() => {
            window.location.href = '../index.html';
        }, 2000);
        
    }, 1500);
});

// Success Message
function showSuccessMessage(message) {
    const existingSuccess = document.querySelector('.success-message');
    if (existingSuccess) {
        existingSuccess.remove();
    }
    
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.style.cssText = `
        background: rgba(0, 255, 0, 0.1);
        border: 1px solid #00ff00;
        color: #00ff00;
        padding: 15px;
        border-radius: 10px;
        margin-bottom: 20px;
        text-align: center;
        font-weight: 500;
    `;
    successDiv.textContent = message;
    loginForm.insertBefore(successDiv, loginForm.firstChild);
}

// Social Login
socialBtns.forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        const provider = this.classList.contains('google') ? 'Google' : 'Facebook';
        
        this.style.opacity = '0.7';
        this.style.pointerEvents = 'none';
        
        setTimeout(() => {
            showSuccessMessage(`${provider} login successful! Redirecting...`);
            setTimeout(() => {
                window.location.href = '../index.html';
            }, 2000);
        }, 1500);
    });
});

// Forgot Password
document.querySelector('.forgot-password').addEventListener('click', function(e) {
    e.preventDefault();
    const email = emailInput.value.trim();
    
    if (!email || !validateEmail(email)) {
        showError(emailInput, 'Please enter a valid email address first');
        emailInput.focus();
        return;
    }
    
    this.style.opacity = '0.7';
    this.textContent = 'Sending...';
    
    setTimeout(() => {
        showSuccessMessage('Password reset link sent to your email!');
        this.style.opacity = '1';
        this.textContent = 'Forgot Password?';
    }, 1500);
});

// Check for remembered user
window.addEventListener('load', function() {
    const remembered = localStorage.getItem('rememberMe');
    const rememberedEmail = localStorage.getItem('userEmail');
    
    if (remembered === 'true' && rememberedEmail) {
        emailInput.value = rememberedEmail;
        rememberCheckbox.checked = true;
    }
});