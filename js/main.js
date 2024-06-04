const swiper = new Swiper('.swiper', {
    // Optional parameters
    effect: 'fade',
    autoplay: {
        delay: 4000,
        disableOnInteraction: false,
      },
  
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
  });



  

  document.querySelectorAll('.accordeon__triger').forEach((item) => {
    item.addEventListener('click', () => {
      item.parentNode.classList.toggle('accordeon__item--active')
    })
  });

  const menuItems = document.querySelectorAll('.menu__choice-item');

    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            const selectedItemText = item.textContent;
            document.getElementById('selected__menu__choice-item').textContent = selectedItemText;
        });
    });


    function showMenu(sectionId) {
      // Скрыть все секции
      const sections = document.querySelectorAll('.food-section');
      sections.forEach(section => {
          section.classList.remove('active');
      });

      // Показать выбранную секцию
      const activeSection = document.getElementById(sectionId);
      if (activeSection) {
          activeSection.classList.add('active');
      }

      
  }

  


let cart = [];

document.addEventListener('DOMContentLoaded', () => {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const foodItem = button.closest('.food-item');
            const itemName = foodItem.getAttribute('data-name');
            const itemPrice = parseFloat(foodItem.getAttribute('data-price'));
            addToCart(itemName, itemPrice);
        });
    });

    // Load cart from localStorage
    loadCart();

    // Add event listener to close cart when clicking outside
    document.addEventListener('click', (event) => {
        const cartSidebar = document.getElementById('cart-sidebar');
        const cartIcon = document.getElementById('cart-icon');
        const clickInsideCart = cartSidebar.contains(event.target);
        const clickOnCartIcon = cartIcon.contains(event.target);

        if (cartSidebar.classList.contains('open') && !clickInsideCart && !clickOnCartIcon) {
            closeCart();
        }
    });

    // Prevent closing cart when clicking inside it or on cart icon
    document.getElementById('cart-sidebar').addEventListener('click', (event) => {
        event.stopPropagation();
    });
    document.getElementById('cart-icon').addEventListener('click', (event) => {
        event.stopPropagation();
    });
});

function addToCart(itemName, itemPrice) {
    const existingItem = cart.find(item => item.name === itemName);
    if (existingItem) {
        if (existingItem.quantity < 10) {
            existingItem.quantity++;
        }
    } else {
        cart.push({ name: itemName, price: itemPrice, quantity: 1 });
    }
    updateCart();
}

function increaseQuantity(index) {
    if (cart[index].quantity < 10) {
        cart[index].quantity++;
        updateCartItem(index);
    }
}

function decreaseQuantity(index) {
    if (cart[index].quantity > 0) {
        cart[index].quantity--;
        updateCartItem(index);
    }
}

function removeItem(index) {
    cart.splice(index, 1);
    updateCart();
}

function clearCart() {
    cart = [];
    updateCart();
}

function updateCart() {
    const cartCountElement = document.getElementById('cart-count');
    const cartItemsElement = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');

    // Update cart count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCountElement.textContent = totalItems;
    if (totalItems > 0) {
        cartCountElement.classList.add('nonzero');
    } else {
        cartCountElement.classList.remove('nonzero');
    }

    // Update cart items
cartItemsElement.innerHTML = '';
let total = 0;
cart.forEach((item, index) => {
    const itemElement = document.createElement('div');
    itemElement.classList.add('cart-item');
    itemElement.dataset.index = index;
    
    const itemNamePriceElement = document.createElement('div');
    itemNamePriceElement.classList.add('item-name-price');
    itemNamePriceElement.innerHTML = `
        <span class="item-name">${item.name}</span> - 
        <span class="item-total">${(item.price * item.quantity)} руб.</span>
    `;
    
    const quantityControlsElement = document.createElement('div');
    quantityControlsElement.classList.add('quantity-controls');
    quantityControlsElement.innerHTML = `
        <button onclick="decreaseQuantity(${index})">-</button>
        <input type="text" value="${item.quantity}" readonly>
        <button onclick="increaseQuantity(${index})">+</button>
    `;
    
    const removeItemElement = document.createElement('button');
    removeItemElement.classList.add('remove-item');
    removeItemElement.onclick = () => removeItem(index);
    removeItemElement.innerHTML = `<img src="images/remove-icon.png" alt="Remove">`;
    
    const controlsContainer = document.createElement('div');
    controlsContainer.classList.add('controls-container');
    controlsContainer.appendChild(quantityControlsElement);
    controlsContainer.appendChild(removeItemElement);
    
    itemElement.appendChild(itemNamePriceElement);
    itemElement.appendChild(controlsContainer);
    
    cartItemsElement.appendChild(itemElement);
    total += item.price * item.quantity;
}); 

// Optional: update total price element here if you have one
const totalPriceElement = document.querySelector('.total-price');
if (totalPriceElement) {
    totalPriceElement.textContent = `Total: ${total} руб.`;
}



    // Update total price
    cartTotalElement.textContent = `Итого: ${total} руб.`;

    // Save cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
}

function updateCartItem(index) {
    const cartItemElement = document.querySelector(`.cart-item[data-index="${index}"]`);
    const item = cart[index];
    if (cartItemElement) {
        cartItemElement.querySelector('.item-total').textContent = `${(item.price * item.quantity).toFixed(2)}руб.`;
        cartItemElement.querySelector('input').value = item.quantity;
    }
    updateCartCountAndTotal();
}

function updateCartCountAndTotal() {
    const cartCountElement = document.getElementById('cart-count');
    const cartTotalElement = document.getElementById('cart-total');

    // Update cart count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCountElement.textContent = totalItems;
    if (totalItems > 0) {
        cartCountElement.classList.add('nonzero');
    } else {
        cartCountElement.classList.remove('nonzero');
    }

    // Update total price
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    cartTotalElement.textContent = `Итого: ${total.toFixed(2)}руб.`;

    // Save cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
}

function loadCart() {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
        cart = JSON.parse(storedCart);
        updateCart();
    }
}

function toggleCart() {
    const cartSidebar = document.getElementById('cart-sidebar');
    cartSidebar.classList.toggle('open');
}

function closeCart() {
    const cartSidebar = document.getElementById('cart-sidebar');
    cartSidebar.classList.remove('open');
}

function proceedToCheckout() {
    // Сохраните корзину в localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    // Перенаправьте на страницу оформления заказа
    window.location.href = 'make_order.html';
}

// Не рабочие ссылки с меню на акции и о нас 

// document.getElementById('scrollToPromotions').addEventListener('click', function(event) {
//     event.preventDefault();
//     document.getElementById('promotions').scrollIntoView({ behavior: 'smooth' });
// });

// document.getElementById('scrollToAbout').addEventListener('click', function(event) {
//     event.preventDefault();
//     document.getElementById('about').scrollIntoView({ behavior: 'smooth' });
// });


function onEntry(entry) {
    entry.forEach(change => {
      if (change.isIntersecting) {
       change.target.classList.add('element-show');
      }
    });
  }
  
  let options = {
    threshold: [0.5] };
  let observer = new IntersectionObserver(onEntry, options);
  let elements = document.querySelectorAll('.element-animation');
  
  for (let elm of elements) {
    observer.observe(elm);
  }



const menuBtn = document.querySelector('.menu_btn');
const menuClose = document.querySelector('.menu_close');
const menuItemsA = document.querySelector('.menu__items');

menuBtn.addEventListener('click', ()=>{
    menuItemsA.classList.toggle('menu__items--open');
});

menuClose.addEventListener('click', ()=>{
    menuItemsA.classList.remove('menu__items--open');
});
