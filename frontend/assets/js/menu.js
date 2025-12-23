// Menu rendering & add-to-cart logic
const menuData = [
  {
    category: "Cone Ice Creams",
    items: [
      { name: "Vanilla", price: 80, image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=300&fit=crop" },
      { name: "Chocolate", price: 80, image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop" },
      { name: "Butterscotch", price: 90, image: "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=400&h=300&fit=crop" },
      { name: "Cotton Candy", price: 100, image: "https://images.unsplash.com/photo-1626717129960-1a09dff05df3?w=400&h=300&fit=crop" }
    ]
  },
  {
    category: "Tub Ice Creams",
    items: [
      { name: "Vanilla Chocolate", price: 150, image: "https://images.unsplash.com/photo-1560008581-09826d1de69e?w=400&h=300&fit=crop" },
      { name: "Butterscotch", price: 160, image: "https://images.unsplash.com/photo-1501443762994-82bd5dace89a?w=400&h=300&fit=crop" }
    ]
  },
  {
    category: "Ice Cream Sundaes",
    items: [
      { name: "Hot Chocolate Fudge", price: 180, image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&h=300&fit=crop" },
      { name: "Banana Split", price: 200, image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&h=300&fit=crop" },
      { name: "Choc-A-Mocha", price: 190, image: "https://images.unsplash.com/photo-1570197571499-166b36435e9f?w=400&h=300&fit=crop" },
      { name: "KNS Special (Fresh Nuts)", price: 250, image: "https://images.unsplash.com/photo-1567206563064-6f60f40a2b57?w=400&h=300&fit=crop" }
    ]
  },
  {
    category: "Cake Desserts",
    items: [
      { name: "Apple Crumble", price: 220, image: "https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=400&h=300&fit=crop" },
      { name: "Cookie Dough Overload", price: 240, image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400&h=300&fit=crop" },
      { name: "Brown Bomb", price: 260, image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop" },
      { name: "Truffle Cake", price: 280, image: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=400&h=300&fit=crop" }
    ]
  },
  {
    category: "Fresh Fruit Milkshakes",
    items: [
      { name: "Apple", price: 120, image: "https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?w=400&h=300&fit=crop" },
      { name: "Banana", price: 110, image: "https://images.unsplash.com/photo-1623492229666-8b5373edcdc6?w=400&h=300&fit=crop" },
      { name: "Lychee", price: 140, image: "https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?w=400&h=300&fit=crop" },
      { name: "Watermelon", price: 130, image: "https://images.unsplash.com/photo-1587049352846-4a222e784720?w=400&h=300&fit=crop" },
      { name: "Guava", price: 125, image: "https://images.unsplash.com/photo-1536511132770-e5058c7e8c46?w=400&h=300&fit=crop" },
      { name: "Papaya", price: 115, image: "https://images.unsplash.com/photo-1617112848923-cc2234396a8d?w=400&h=300&fit=crop" },
      { name: "Pineapple", price: 135, image: "https://images.unsplash.com/photo-1550258987-190a2d41a8ba?w=400&h=300&fit=crop" }
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
           ${item.image 
             ? `<img src="${item.image}" alt="${item.name}" onerror="this.parentElement.innerHTML='${getInitials(item.name)}'">`
             : getInitials(item.name)
           }
        </div>
        <div class="card-details">
            <h4>${item.name}</h4>
            <p class="item-price">₹${item.price}</p>
            
            <div class="quantity-selector">
                <button class="qty-btn minus" onclick="updateQuantity('${inputId}', -1)">-</button>
                <input type="number" id="${inputId}" class="qty-input" value="1" min="1" readonly>
                <button class="qty-btn plus" onclick="updateQuantity('${inputId}', 1)">+</button>
            </div>

            <button class="add-btn" onclick="addToCartWrapper('${item.name}', ${item.price}, '${inputId}')">
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
window.addToCartWrapper = function(item, price, inputId) {
    const quantity = parseInt(document.getElementById(inputId).value);
    addToCart(item, price, quantity);
};