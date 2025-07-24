// Product data
const products = [
  {
    id: 1,
    title: "Gaming Beast Pro",
    price: "$2,499",
    specs: "Intel i9-13900K • RTX 4080 • 32GB DDR5 • 1TB NVMe SSD",
  },
  {
    id: 2,
    title: "Office Workstation",
    price: "$899",
    specs: "Intel i5-12400 • GTX 1660 • 16GB DDR4 • 512GB SSD",
  },
  {
    id: 3,
    title: "Creator Studio",
    price: "$3,299",
    specs: "AMD Ryzen 9 7950X • RTX 4090 • 64GB DDR5 • 2TB NVMe SSD",
  },
  {
    id: 4,
    title: "Budget Builder",
    price: "$599",
    specs: "AMD Ryzen 5 5600G • Integrated Graphics • 16GB DDR4 • 256GB SSD",
  },
  {
    id: 5,
    title: "Streaming Machine",
    price: "$1,799",
    specs: "Intel i7-13700K • RTX 4070 • 32GB DDR5 • 1TB SSD",
  },
  {
    id: 6,
    title: "Compact Mini PC",
    price: "$749",
    specs: "Intel i5-13400 • GTX 1650 • 16GB DDR4 • 512GB SSD",
  },
  {
    id: 7,
    title: "Ultimate Gaming Rig",
    price: "$4,999",
    specs: "Intel i9-13900KS • RTX 4090 Ti • 128GB DDR5 • 4TB NVMe SSD",
  },
  {
    id: 8,
    title: "Student Special",
    price: "$449",
    specs: "AMD Ryzen 3 5300G • Integrated Graphics • 8GB DDR4 • 256GB SSD",
  },
]

// Login credentials
const validCredentials = {
  email: "admin@pcstore.com",
  password: "password123",
}

// Check if user is logged in
function checkLoginStatus() {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true"
  const loginModal = document.getElementById("loginModal")
  const mainContent = document.getElementById("mainContent")

  if (isLoggedIn) {
    if (loginModal) loginModal.style.display = "none"
    if (mainContent) mainContent.style.display = "block"
  } else {
    // If not on index page, redirect to index
    if (!window.location.pathname.endsWith("index.html") && !window.location.pathname.endsWith("/")) {
      window.location.href = "index.html"
    }
    if (loginModal) loginModal.style.display = "flex"
    if (mainContent) mainContent.style.display = "none"
  }
}

// Handle login form submission
function handleLogin(event) {
  event.preventDefault()

  const email = document.getElementById("email").value.trim()
  const password = document.getElementById("password").value
  const errorMessage = document.getElementById("error-message")

  if (email === validCredentials.email && password === validCredentials.password) {
    // Login successful
    localStorage.setItem("isLoggedIn", "true")
    localStorage.setItem("userEmail", email)

    // Hide modal and show main content
    document.getElementById("loginModal").style.display = "none"
    document.getElementById("mainContent").style.display = "block"

    errorMessage.style.display = "none"
  } else {
    // Login failed
    errorMessage.textContent = "Invalid email or password. Please try again."
    errorMessage.style.display = "block"
    document.getElementById("password").value = ""
  }
}

// Logout function
function logout() {
  localStorage.removeItem("isLoggedIn")
  localStorage.removeItem("userEmail")
  window.location.href = "index.html"
}

// Function to render products
function renderProducts() {
  const productsContainer = document.getElementById("products-container")

  if (!productsContainer) {
    return // Exit if we're not on the products page
  }

  // Use map function to create product cards
  const productCards = products
    .map((product) => {
      return `
            <div class="product-card">
                <h3>${product.title}</h3>
                <div class="price">${product.price}</div>
                <div class="specs">${product.specs}</div>
                <button class="buy-button" onclick="buyProduct(${product.id})">
                    Add to Cart
                </button>
            </div>
        `
    })
    .join("")

  productsContainer.innerHTML = productCards
}

// Function to handle product purchase
function buyProduct(productId) {
  const product = products.find((p) => p.id === productId)
  if (product) {
    alert(`Added "${product.title}" to cart!\nPrice: ${product.price}`)
  }
}

// Initialize the page when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Check login status first
  checkLoginStatus()

  // Set up login form if it exists
  const loginForm = document.getElementById("loginForm")
  if (loginForm) {
    loginForm.addEventListener("submit", handleLogin)
  }

  // Render products if on products page
  renderProducts()
})
