window.addEventListener("DOMContentLoaded", () => {
  const a = document.querySelector(".love");
  const notification = document.querySelector(".notification");
  const clickCountDisplay = document.getElementById("clickCount");
  const heartCountDisplay = document.getElementById("heartCount");
  let clickCount = 0; // Счётчик кликов
  let heartCount = 0; // Счётчик сердечек

  a.addEventListener("click", (event) => {
    // Увеличиваем счётчик кликов
    clickCount++;
    clickCountDisplay.textContent = clickCount;

    // Показать уведомление
    notification.classList.add("show");
    setTimeout(() => {
      notification.classList.remove("show");
    }, 3000); // Уведомление исчезает через 3 секунды

    createHearts(event.clientX, event.clientY);
  });

  // Функция для создания сердечек
  function createHearts(x, y) {
    for (let i = 0; i < 50; i++) {
      const heart = document.createElement("div");
      heart.classList.add("heart");

      const angle = Math.random() * 2 * Math.PI;
      const distance = Math.random() * 100 + 50;
      const finalX = x + Math.cos(angle) * distance;
      const finalY = y + Math.sin(angle) * distance;

      heart.style.left = `${x}px`;
      heart.style.top = `${y}px`;

      document.body.appendChild(heart);

      heartCount++;
      heartCountDisplay.textContent = heartCount;

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

      setTimeout(() => {
        heart.remove();
      }, 4000);
    }
  }
});
