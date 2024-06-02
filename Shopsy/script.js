let cart = [];

function addToCart(name, price, image) {
  // Find the item in the cart by name, price, and image
  let existingItem = cart.find(
    (item) => item.name === name && item.price === price && item.image === image
  );

  if (existingItem) {
    // If the item already exists, increment its quantity
    existingItem.quantity++;
  } else {
    // If the item does not exist, add it to the cart
    cart.push({ name, price, image, quantity: 1 });
  }

  // Update the cart UI
  updateCart();
  // Update the cart count in the header
  updateCartCount();
  // Automatically open the cart when an item is added
  openCart();
}

function updateCart() {
  const cartList = document.querySelector(".listcart");
  cartList.innerHTML = ""; // Clear the cart list

  cart.forEach((item, index) => {
    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");

    cartItem.innerHTML = `
      <img src="${item.image}" alt="${item.name}" class="cart-item-image">
      <div class="cart-item-details">
        <h2>${item.name}</h2>
        <p class="cart-item-price">$${item.price}</p>
        <div class="quantity-control">
          <button onclick="changeQuantity(${index}, -1)">-</button>
          <span>${item.quantity}</span>
          <button onclick="changeQuantity(${index}, 1)">+</button>
        </div>
      </div>
    `;
    cartList.appendChild(cartItem); // Append the cart item to the list
  });
}

function changeQuantity(index, change) {
  let item = cart[index];
  item.quantity += change;
  if (item.quantity <= 0) {
    // Remove item if quantity is zero or less
    cart.splice(index, 1);
  }
  updateCart();
  updateCartCount();
}

function updateCartCount() {
  const cartCount = document.getElementById("cart-count");
  cartCount.textContent = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );
}

function toggleCart() {
  document.body.classList.toggle("showCart");
}

function openCart() {
  document.body.classList.add("showCart");
}
