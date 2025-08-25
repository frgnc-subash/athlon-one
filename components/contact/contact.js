// Contact form handling
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();

  // Get form values
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const subject = document.getElementById("subject").value;
  const message = document.getElementById("message").value;

  // Simple validation
  if (!name || !email || !subject || !message) {
    alert("Please fill in all fields");
    return;
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert("Please enter a valid email address");
    return;
  }

  // In a real application, you would send this data to a server
  // For this example, we'll just show a success message
  alert(`Thank you for your message, ${name}! We'll get back to you soon.`);

  // Reset the form
  document.getElementById("contactForm").reset();
});

// FAQ functionality
document.querySelectorAll(".faq-question").forEach((question) => {
  question.addEventListener("click", () => {
    const item = question.parentElement;
    item.classList.toggle("active");
  });
});
