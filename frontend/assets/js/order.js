// Order form & backend API integration
async function handleOrderSubmission(event) {
  event.preventDefault();

  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  // Calculate total amount
  const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const orderData = {
    name: document.getElementById("name").value,
    phone: document.getElementById("phone").value,
    address: document.getElementById("address").value,
    // Format items as strings with prices for backend compatibility
    items: cart.map(item => `${item.name} x ${item.quantity} (₹${item.price * item.quantity})`),
    totalAmount: totalAmount
  };

  try {
    const response = await fetch("http://localhost:3000/place-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(orderData)
    });

    if (response.ok) {
      alert(`Order placed successfully! Total: ₹${totalAmount}`);
      cart = [];
      updateCartCount();
      closeCartModal();
      event.target.reset();
    } else {
      alert("Failed to place order.");
    }
  } catch (error) {
    alert("Server not running.");
  }
}
function validateContact(e) {
  e.preventDefault();

  const name = document.getElementById("contact-name").value.trim();
  const email = document.getElementById("contact-email").value.trim();
  const msg = document.getElementById("contact-msg").value.trim();
  const error = document.getElementById("contact-error");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!name || !email || !msg) {
    error.textContent = "All fields are required";
    return;
  }

  if (!emailRegex.test(email)) {
    error.textContent = "Enter a valid email address";
    return;
  }

  error.textContent = "";
  alert("Message sent successfully!");
  e.target.reset();
}
