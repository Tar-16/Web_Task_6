// Cart modal & cart management
let cart = []; // { name, price, quantity }

// Add to cart
function addToCart(item, price, quantity = 1) {
  const existingItemIndex = cart.findIndex(
    cartItem => cartItem.name === item
  );

  if (existingItemIndex > -1) {
    cart[existingItemIndex].quantity += quantity;
  } else {
    cart.push({ name: item, price, quantity });
  }

  updateCartCount();
}

// Update cart badge count
function updateCartCount() {
  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  document.getElementById("cart-count").innerText = totalCount;
}

// Calculate raw total
function calculateCartTotal() {
  return cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
}

// Open cart modal
function openCartModal() {
  const modal = document.getElementById("cart-modal");
  const cartItemsDiv = document.getElementById("cart-items");

  cartItemsDiv.innerHTML = "";

  if (cart.length === 0) {
    cartItemsDiv.innerHTML = "<p>Your cart is empty.</p>";
    modal.style.display = "block";
    return;
  }

  const ul = document.createElement("ul");
  ul.className = "cart-list";

  cart.forEach((cartItem, index) => {
    const itemTotal = cartItem.price * cartItem.quantity;

    const li = document.createElement("li");
    li.className = "cart-item";
    li.innerHTML = `
      <div class="cart-item-info">
        <span class="cart-item-name">${cartItem.name}</span>
        <span class="cart-item-price">₹${cartItem.price} × ${cartItem.quantity}</span>
      </div>
      <div class="cart-item-actions">
        <span class="cart-item-total">₹${itemTotal}</span>
        <span class="remove-btn" onclick="removeItem(${index})">&times;</span>
      </div>
    `;
    ul.appendChild(li);
  });

  cartItemsDiv.appendChild(ul);

  // ---- TOTAL + DISCOUNT LOGIC ----
  const total = calculateCartTotal();
  const discount = total > 1000 ? total * 0.10 : 0;
  const payable = total - discount;

  const summaryDiv = document.createElement("div");
  summaryDiv.className = "cart-total";
  summaryDiv.innerHTML = `
    <div class="cart-summary">
      <span>Total Amount:</span>
      <span>₹${total.toFixed(2)}</span>
    </div>
    <div class="cart-summary">
      <span>Discount (10% over ₹1000):</span>
      <span>₹${discount.toFixed(2)}</span>
    </div>
    <div class="cart-summary cart-grand-total">
      <strong>Payable:</strong>
      <strong>₹${payable.toFixed(2)}</strong>
    </div>
  `;

  cartItemsDiv.appendChild(summaryDiv);

  modal.style.display = "block";
}

// Remove item
function removeItem(index) {
  cart.splice(index, 1);
  updateCartCount();
  openCartModal();
}

// Close modal
function closeCartModal() {
  document.getElementById("cart-modal").style.display = "none";
}
