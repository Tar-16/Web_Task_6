// Order form & backend API integration
async function handleOrderSubmission(event) {
  event.preventDefault();

  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  const orderData = {
    name: document.getElementById("name").value,
    phone: document.getElementById("phone").value,
    address: document.getElementById("address").value,
    address: document.getElementById("address").value,
    // Format items as strings for backend compatibility (it uses .join(", "))
    items: cart.map(item => `${item.name} x ${item.quantity}`)
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
      alert("Order placed successfully!");
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
