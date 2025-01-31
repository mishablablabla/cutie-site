window.addEventListener("DOMContentLoaded", () => {
  const burgerButton = document.querySelector(".burger-button");
  const closeButton = document.querySelector(".close-button");
  const burgerNav = document.querySelector(".burger-nav");
  const overlay = document.createElement("div");

  overlay.classList.add("overlay");
  document.body.appendChild(overlay);

  burgerButton.addEventListener("click", () => {
    burgerNav.classList.add("active");
    overlay.classList.add("active");
  });

  closeButton.addEventListener("click", () => {
    burgerNav.classList.remove("active");
    overlay.classList.remove("active");
  });

  overlay.addEventListener("click", () => {
    burgerNav.classList.remove("active");
    overlay.classList.remove("active");
  });
});
