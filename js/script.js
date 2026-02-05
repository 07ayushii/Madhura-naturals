
// ---------- CART ----------
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
 
function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));
}


function updateCartCount() {
  const count = document.getElementById("cartCount");
  if (count) {
    count.innerText = cart.length;
  }
}

updateCartCount();
function loadCart() {
  const cartItems = document.getElementById("cartItems");
  if (!cartItems) return;

  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  let total = 0;

  cartItems.innerHTML = "";

  cart.forEach((item, index) => {
    total += item.price;
    cartItems.innerHTML += `
      <div class="summary-item">
        <span>${item.name}</span>
        <span>₹${item.price}</span>
        <button onclick="removeFromCart(${index})">❌</button>
      </div>
    `;
  });

  cartItems.innerHTML += `<h3>Total: ₹${total}</h3>`;
}

function removeFromCart(index) {
  let cart = JSON.parse(localStorage.getItem("cart"));
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
  updateCartCount();
}

function goToCheckout() {
  window.location.href = "checkout.html";
}

document.addEventListener("DOMContentLoaded", loadCart);


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
        <div class="product-img"
          style="background-image:url('${p.image}')"
          onclick="openProduct(${p.id})">
        </div>

        <div class="product-info">
          <h3>${p.name}</h3>
          <p>₹${p.price}</p>

          <div class="price-cart">
            <button class="add-cart" onclick="addToCart(${p.id})">
              Add to Cart
            </button>
            <button onclick="addToWishlist(${p.id})">❤️</button>
          </div>
        </div>
      </div>
    `;
  });
}

document.addEventListener("DOMContentLoaded", loadShop);


// ---------- PRODUCT DETAILS ----------
function loadProductDetails() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  const product = products.find(p => p.id == id);
  if (!product) return;

  document.getElementById("productDetails").innerHTML = `
  <!-- LEFT -->
  <div class="product-images">
    <img src="${product.image}">
    <div class="thumbnail-row">
      <img src="${product.image}">
    </div>
  </div>

  <!-- RIGHT -->
  <div class="product-info-page">
    <h1>${product.name}</h1>

    <div class="rating">⭐⭐⭐⭐☆ (4.5)</div>

    <div class="product-price">
      ₹${product.price}
      <span>₹${product.price + 200}</span>
    </div>

    <div class="quantity-box">
      <button>-</button>
      <span>1</span>
      <button>+</button>
    </div>

    <div class="product-actions">
      <button class="add-to-cart-btn"
        onclick="addToCart('${product.name}', ${product.price})">
        Add to Cart
      </button>

      <button class="buy-now-btn">
        Buy Now
      </button>
    </div>

    <div class="product-description">
      <h3>Product Details</h3>
      <p>${product.description}</p>
      <ul>
        <li>100% Natural</li>
        <li>No Preservatives</li>
        <li>Farm Fresh</li>
      </ul>
    </div>
  </div>
`;

}

document.addEventListener("DOMContentLoaded", loadProductDetails);
// ---------- orderplace ----------
function placeOrder() {
  alert("Order placed successfully 🎉");
  localStorage.removeItem("cart");
  updateCartCount();
  window.location.href = "index.html";
}
// ----------wishlist
function loadWishlist() {
  const wishlistDiv = document.getElementById("wishlistItems");
  if (!wishlistDiv) return;

  const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
  wishlistDiv.innerHTML = "";

  if (wishlist.length === 0) {
    wishlistDiv.innerHTML = "<p>Your wishlist is empty ❤️</p>";
    return;
  }

  wishlist.forEach((item, index) => {
    wishlistDiv.innerHTML += `
      <div class="product-card">
        <div class="product-img" style="background-image:url('${item.image}')"></div>
        <div class="product-info">
          <h3>${item.name}</h3>
          <p>₹${item.price}</p>

          <div class="price-cart">
            <button class="add-cart" onclick="addToCart(${item.id})">
              Add to Cart
            </button>
            <button onclick="removeFromWishlist(${index})">❌</button>
          </div>
        </div>
      </div>
    `;
  });
}

function removeFromWishlist(index) {
  let wishlist = JSON.parse(localStorage.getItem("wishlist"));
  wishlist.splice(index, 1);
  localStorage.setItem("wishlist", JSON.stringify(wishlist));
  loadWishlist();
}

document.addEventListener("DOMContentLoaded", loadWishlist);


document.addEventListener("DOMContentLoaded", loadWishlist);


function login() {
  localStorage.setItem("user", "loggedIn");
  window.location.href = "profile.html";
}

function logout() {
  localStorage.removeItem("user");
  window.location.href = "login.html";
}
