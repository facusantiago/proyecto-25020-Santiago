// Función para agregar al carrito (desde index.html)
function addToCart(productName, price) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  const existingItem = cart.find(item => item.productName === productName);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ productName, price, quantity: 1 });
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  alert(`${productName} ha sido agregado al carrito.`);
}

// Funciones para carrito.html
if (window.location.pathname.includes("carrito.html")) {
  const cartItemsContainer = document.getElementById('cart-items');
  const totalContainer = document.getElementById('total');

  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  function renderCart() {
    cartItemsContainer.innerHTML = '';
    let total = 0;

    if (cart.length === 0) {
      cartItemsContainer.innerHTML = '<p>Tu carrito está vacío.</p>';
      totalContainer.textContent = '';
      return;
    }

    cart.forEach((item, index) => {
      const subtotal = item.price * item.quantity;
      total += subtotal;

      const div = document.createElement('div');
      div.classList.add('product-card');
      div.innerHTML = `
        <h3>${item.productName}</h3>
        <p>Precio: $${item.price.toFixed(2)}</p>
        <label>
          Cantidad:
          <input type="number" min="1" value="${item.quantity}" onchange="updateQuantity(${index}, this.value)">
        </label>
        <p>Subtotal: $${subtotal.toFixed(2)}</p>
        <button onclick="removeItem(${index})">Eliminar</button>
      `;
      cartItemsContainer.appendChild(div);
    });

    totalContainer.textContent = `Total: $${total.toFixed(2)}`;
  }

  window.removeItem = function(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
  }

  window.updateQuantity = function(index, newQty) {
    const qty = parseInt(newQty);
    if (qty < 1 || isNaN(qty)) return;
    cart[index].quantity = qty;
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
  }

  window.clearCart = function() {
    if (confirm("¿Estás seguro de que querés vaciar el carrito?")) {
      cart = [];
      localStorage.removeItem('cart');
      renderCart();
    }
  }

  renderCart();
}
