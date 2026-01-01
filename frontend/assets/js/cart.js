// Cart modal & cart management
let cart = []; // Stores objects: { name: "Item Name", price: 100, quantity: 1 }

// Modified to support price
function addToCart(item, price, quantity = 1) {
  // Check if item already exists
  const existingItemIndex = cart.findIndex(cartItem => cartItem.name === item);

  if (existingItemIndex > -1) {
    cart[existingItemIndex].quantity += quantity;
  } else {
    cart.push({ name: item, price: price, quantity: quantity });
  }

  updateCartCount();
}

function updateCartCount() {
  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  document.getElementById("cart-count").innerText = totalCount;
  
  // Update total count in modal if exists
  const totalCountEl = document.getElementById("total-count");
  if (totalCountEl) totalCountEl.innerText = totalCount;
}

function calculateCartTotal() {
  return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
}

// existing hook: openCartModal
function openCartModal() {
  const modal = document.getElementById("cart-modal");
  const cartItemsDiv = document.getElementById("cart-items");

  cartItemsDiv.innerHTML = "";

  if (cart.length === 0) {
    cartItemsDiv.innerHTML = "<p>Your cart is empty.</p>";
  } else {
    const ul = document.createElement("ul");
    ul.className = "cart-list";

    cart.forEach((cartItem, index) => {
      const li = document.createElement("li");
      li.className = "cart-item";

      const itemTotal = cartItem.price * cartItem.quantity;

      li.innerHTML = `
        <div class="cart-item-info">
            <span class="cart-item-name">${cartItem.name}</span>
            <span class="cart-item-price">₹${cartItem.price} × ${cartItem.quantity}</span>
        </div>
        <div class="cart-item-actions">
            <span class="cart-item-total">₹${itemTotal}</span>
            <span class="remove-btn" onclick="removeItem(${index})" title="Remove item">&times;</span>
        </div>
      `;
      ul.appendChild(li);
    });
    cartItemsDiv.appendChild(ul);

    // Add total amount display
    const totalDiv = document.createElement("div");
    totalDiv.className = "cart-total";
    totalDiv.innerHTML = `
      <div class="cart-summary">
        <span>Total Items:</span>
        <span>${cart.reduce((sum, item) => sum + item.quantity, 0)}</span>
      </div>
      <div class="cart-summary cart-grand-total">
        <span>Total Amount:</span>
        <span>₹${calculateCartTotal()}</span>
      </div>
    `;
    cartItemsDiv.appendChild(totalDiv);
  }

  modal.style.display = "block";
}

// Helper to remove item
function removeItem(index) {
  cart.splice(index, 1);
  updateCartCount();
  openCartModal(); // Refresh modal
}

// existing hook: closeCartModal
function closeCartModal() {
  document.getElementById("cart-modal").style.display = "none";
}
function calculateTotal() {
  let total = 0;

  cart.forEach(item => {
    total += item.price * item.qty;
  });

  let discount = 0;
  if (total > 1000) {
    discount = total * 0.10;
  }

  const finalTotal = total - discount;

  document.getElementById("total-count").innerText = cart.length;
  document.getElementById("cart-total").innerText = `₹${finalTotal.toFixed(2)}`;

  return { total, discount, finalTotal };
}
