// Menu rendering & add-to-cart logic
const menuData = [
  {
    category: "Cone Ice Creams",
    items: ["Vanilla", "Chocolate", "Butterscotch", "Cotton Candy"]
  },
  {
    category: "Tub Ice Creams",
    items: ["Vanilla Chocolate", "Butterscotch"]
  },
  {
    category: "Ice Cream Sundaes",
    items: [
      "Hot Chocolate Fudge",
      "Banana Split",
      "Choc-A-Mocha",
      "KNS Special (Fresh Nuts)"
    ]
  },
  {
    category: "Cake Desserts",
    items: [
      "Apple Crumble",
      "Cookie Dough Overload",
      "Brown Bomb",
      "Truffle Cake"
    ]
  },
  {
    category: "Fresh Fruit Milkshakes",
    items: [
      "Apple",
      "Banana",
      "Lychee",
      "Watermelon",
      "Guava",
      "Papaya",
      "Pineapple"
    ]
  }
];

const menuContainer = document.getElementById("menu-container");

// Helper to get image initials or placeholder
function getInitials(name) {
  return name.split(" ").map(n => n[0]).join("").substring(0, 2).toUpperCase();
}

menuData.forEach((section, index) => {
  const div = document.createElement("div");
  div.className = "menu-category";

  let html = `<h3>${section.category}</h3><div class="menu-grid">`;

  section.items.forEach((item, itemIndex) => {
    // Unique ID for the quantity input
    const inputId = `qty-${index}-${itemIndex}`;
    
    html += `
      <div class="menu-item">
        <div class="card-image">
           <!-- Placeholder for Image -->
           ${getInitials(item)}
        </div>
        <div class="card-details">
            <h4>${item}</h4>
            
            <div class="quantity-selector">
                <button class="qty-btn minus" onclick="updateQuantity('${inputId}', -1)">-</button>
                <input type="number" id="${inputId}" class="qty-input" value="1" min="1" readonly>
                <button class="qty-btn plus" onclick="updateQuantity('${inputId}', 1)">+</button>
            </div>

            <button class="add-btn" onclick="addToCartWrapper('${item}', '${inputId}')">
              Add to Cart
            </button>
        </div>
      </div>`;
  });

  html += "</div>";
  div.innerHTML = html;
  menuContainer.appendChild(div);
});

// Helper function to update quantity input value
window.updateQuantity = function(inputId, change) {
    const input = document.getElementById(inputId);
    let newVal = parseInt(input.value) + change;
    if (newVal < 1) newVal = 1;
    input.value = newVal;
};

// Wrapper to get quantity before calling main addToCart
window.addToCartWrapper = function(item, inputId) {
    const quantity = parseInt(document.getElementById(inputId).value);
    addToCart(item, quantity);
};
