
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
        total += item.price;
        const div = document.createElement('div');
        div.classList.add('product-card');
        div.innerHTML = `
          <h3>${item.productName}</h3>
          <p>Precio: $${item.price.toFixed(2)}</p>
          <button onclick="removeItem(${index})">Eliminar</button>
        `;
        cartItemsContainer.appendChild(div);
      });

      totalContainer.textContent = `Total: $${total.toFixed(2)}`;
    }

    function removeItem(index) {
      cart.splice(index, 1);
      localStorage.setItem('cart', JSON.stringify(cart));
      renderCart();
    }

    renderCart();