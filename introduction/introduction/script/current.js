window.addEventListener("DOMContentLoaded", () => {
  // Бургер-меню
  const burgerButton = document.querySelector(".burger-button");
  const closeButton = document.querySelector(".close-button");
  const burgerNav = document.querySelector(".burger-nav");
  const overlay = document.createElement("div");

  // Создаём затемнение (overlay)
  overlay.classList.add("overlay");
  document.body.appendChild(overlay);

  // Открытие меню
  burgerButton.addEventListener("click", () => {
    burgerNav.classList.add("active");
    overlay.classList.add("active");
  });

  // Закрытие меню
  closeButton.addEventListener("click", () => {
    burgerNav.classList.remove("active");
    overlay.classList.remove("active");
  });

  // Закрытие меню при клике на затемнение
  overlay.addEventListener("click", () => {
    burgerNav.classList.remove("active");
    overlay.classList.remove("active");
  });
});
