const a = document.querySelector(".love");
const notification = document.querySelector(".notification");
const clickCountDisplay = document.getElementById("clickCount");
const heartCountDisplay = document.getElementById("heartCount");
let clickCount = 0; // Счётчик кликов
let heartCount = 0; // Счётчик сердечек

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

// Массив с путями к изображениям фона
const backgrounds = [
  "images/background1.jpg",
  "images/background2.jpg",
  "images/background3.jpg",
];

a.addEventListener("click", (event) => {
  // Увеличиваем счётчик кликов
  clickCount++;
  clickCountDisplay.textContent = clickCount;

  // Показать уведомление
  notification.classList.add("show");
  setTimeout(() => {
    notification.classList.remove("show");
  }, 3000); // Уведомление исчезает через 3 секунды

  // Меняем фон на случайное изображение
  const randomBackground =
    backgrounds[Math.floor(Math.random() * backgrounds.length)];
  document.body.style.backgroundImage = `url('${randomBackground}')`;
  document.body.style.backgroundSize = "cover"; // Заполнение всего фона
  document.body.style.transition = "background-image 0.5s ease-in-out"; // Плавный переход

  // Создаём сердечки и увеличиваем счётчик сердечек
  createHearts(event.clientX, event.clientY);
});

// Функция для создания сердечек
function createHearts(x, y) {
  for (let i = 0; i < 50; i++) {
    // Создаём 10 сердечек
    const heart = document.createElement("div");
    heart.classList.add("heart");

    // Случайный угол и скорость
    const angle = Math.random() * 2 * Math.PI; // Угол в радианах
    const distance = Math.random() * 100 + 50; // Случайное расстояние от 50 до 150
    const finalX = x + Math.cos(angle) * distance;
    const finalY = y + Math.sin(angle) * distance;

    heart.style.left = `${x}px`;
    heart.style.top = `${y}px`;

    document.body.appendChild(heart);

    // Увеличиваем счётчик сердечек
    heartCount++;
    heartCountDisplay.textContent = heartCount;

    // Устанавливаем анимацию
    heart.animate(
      [
        { transform: `translate(0, 0)` },
        { transform: `translate(${finalX - x}px, ${finalY - y}px)` },
      ],
      {
        duration: 1500,
        easing: "ease-out",
      }
    );

    // Удаляем сердечко через 4 секунды
    setTimeout(() => {
      heart.remove();
    }, 4000);
  }
}
