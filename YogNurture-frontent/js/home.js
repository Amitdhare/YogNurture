document.addEventListener("DOMContentLoaded", () => {
  const images = [
    "css/Css_image/hero-yoga.jpg",
    "css/Css_image/hero2-yoga.jpg",
    "css/Css_image/hero-yoga3.jpg"
  ];

  let index = 0;
  const hero = document.querySelector(".hero");

  // set first image initially
  hero.style.backgroundImage = `url(${images[index]})`;

  setInterval(() => {
    index = (index + 1) % images.length;
    hero.style.backgroundImage = `url(${images[index]})`;
  }, 4000); // 4 sec me change
});

