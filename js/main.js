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