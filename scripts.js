// Get product data from the API and show the product list
document.addEventListener("DOMContentLoaded", function () {
  fetch("https://fakestoreapi.com/products")
    .then((response) => response.json())
    .then((products) => {
      // Create the product list
      const productList = document.getElementById("product-list");
      products.forEach((product) => {
        const productElement = document.createElement("div");
        productElement.classList.add("product");
        productElement.innerHTML = `
                    <h3>${product.title}</h3>
                    <img src="${product.image}" alt="${product.title}" style="width: 100px; height: 100px;">
                    <p>$${product.price}</p>
                    <button onclick="viewProduct(${product.id})">View Details</button>
                `;
        productList.appendChild(productElement);
      });
    })
    .catch((error) => {
      console.error("Error fetching products:", error);
    });
});

// Display product details when a product is selected
function viewProduct(productId) {
  fetch(`https://fakestoreapi.com/products/${productId}`)
    .then((response) => response.json())
    .then((product) => {
      // Show product details
      document.getElementById("product-name").textContent = product.title;
      document.getElementById("product-description").textContent =
        product.description;
      document.getElementById(
        "product-price"
      ).textContent = `$${product.price}`;
      document.getElementById("product-image").src = product.image;
      document.getElementById("product-image").alt = product.title;

      // Change view from the product list to product details section
      document.getElementById("product-list").style.display = "none";
      document.getElementById("product-detail").style.display = "block";
    })
    .catch((error) => {
      console.error("Error fetching product details:", error);
    });
}

// Return to the product list and reset the layout
function goBack() {
  // Show product list and hide product details
  document.getElementById("product-list").style.display = "grid";
  document.getElementById("product-detail").style.display = "none";
}
