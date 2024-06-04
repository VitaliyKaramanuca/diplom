
 const cart = JSON.parse(localStorage.getItem('cart')) || [];

 // Функция для отображения данных корзины в текстовом поле
 function displayOrderDetails() {
     const orderDetails = document.getElementById('order-details');
     const orderTotal = document.getElementById('order-total');
     let details = '';
     let total = 0;
     cart.forEach(item => {
         details += `${item.name} x${item.quantity} - ${(item.price * item.quantity)} руб.\n`;
         total += item.price * item.quantity;
     });
     orderDetails.value = details;
     orderTotal.textContent = `Итого: ${total} руб.`;
 }

 // Вызовите функцию для отображения данных корзины при загрузке страницы
 window.onload = displayOrderDetails;

 // Функция для обработки отправки формы
 function submitOrder(event) {
     event.preventDefault();
     const form = document.getElementById('checkout-form');
     const name = form.name.value;
     const phone = form.phone.value;
     const address = form.address.value;
     const orderDetails = form['order-details'].value;
     const orderTotal = document.getElementById('order-total').textContent;

     // Создайте объект с данными заказа
     const order = {
         name,
         phone,
         address,
         orderDetails,
         orderTotal
     };

     // Сохраните данные заказа в hidden input перед отправкой формы
     const orderInput = document.createElement('input');
     orderInput.type = 'hidden';
     orderInput.name = 'order';
     orderInput.value = JSON.stringify(order);
     form.appendChild(orderInput);

     // Отправьте форму
     form.submit();
 }