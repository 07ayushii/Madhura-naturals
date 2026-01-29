let cart = JSON.parse(localStorage.getItem("cart")) || [];
let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

// ---------- CART ----------
function addToCart(id) {
  const product = products.find(p => p.id === id);
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Added to cart");
}

function addToWishlist(id) {
  const product = products.find(p => p.id === id);
  wishlist.push(product);
  localStorage.setItem("wishlist", JSON.stringify(wishlist));
  alert("Added to wishlist");
}

// ---------- SHOP PAGE ----------
function loadShop() {
  const container = document.getElementById("shopProducts");
  if (!container) return;

  products.forEach(p => {
    container.innerHTML += `
      <div class="product-card">
        <img src="${p.image}">
        <h3>${p.name}</h3>
        <p>₹${p.price}</p>
        <a href="product.html?id=${p.id}">View Details</a>
        <button onclick="addToCart(${p.id})">Add to Cart</button>
      </div>
    `;
  });
}

// ---------- PRODUCT DETAILS ----------
function loadProductDetails() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  const product = products.find(p => p.id == id);
  if (!product) return;

  document.getElementById("productDetails").innerHTML = `
    <img src="${product.image}">
    <h1>${product.name}</h1>
    <p>${product.description}</p>
    <h2>₹${product.price}</h2>
    <button onclick="addToCart(${product.id})">Add to Cart</button>
    <button onclick="addToWishlist(${product.id})">Add to Wishlist</button>
  `;
}
