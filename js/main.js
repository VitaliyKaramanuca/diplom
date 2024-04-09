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