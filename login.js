// Login credentials (in a real app, this would be handled server-side)
const validCredentials = {
  email: "admin@pcstore.com",
  password: "password123",
}

// Get form elements
document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm")
  const errorMessage = document.getElementById("error-message")
  const successMessage = document.getElementById("success-message")

  // Handle form submission
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault()

    // Get input values
    const email = document.getElementById("email").value.trim()
    const password = document.getElementById("password").value

    // Hide previous messages
    errorMessage.style.display = "none"
    successMessage.style.display = "none"

    // Validate credentials
    if (email === validCredentials.email && password === validCredentials.password) {
      // Success
      successMessage.textContent = "Login successful! Redirecting..."
      successMessage.style.display = "block"

      // Store login status (in real app, use proper session management)
      localStorage.setItem("isLoggedIn", "true")
      localStorage.setItem("userEmail", email)

      // Redirect after 2 seconds
      setTimeout(() => {
        window.location.href = "products.html"
      }, 2000)
    } else {
      // Error
      errorMessage.textContent = "Invalid email or password. Please try again."
      errorMessage.style.display = "block"

      // Clear password field
      document.getElementById("password").value = ""
    }
  })

  // Check if user is already logged in
  if (localStorage.getItem("isLoggedIn") === "true") {
    const userEmail = localStorage.getItem("userEmail")
    successMessage.textContent = `Already logged in as ${userEmail}`
    successMessage.style.display = "block"
  }
})

// Function to logout (can be called from other pages)
function logout() {
  localStorage.removeItem("isLoggedIn")
  localStorage.removeItem("userEmail")
  window.location.href = "login.html"
}

// Function to check if user is logged in (can be used on other pages)
function isUserLoggedIn() {
  return localStorage.getItem("isLoggedIn") === "true"
}
