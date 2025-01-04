window.addEventListener("DOMContentLoaded", () => {
  // Дата 8 марта текущего года
  const march8 = new Date(new Date().getFullYear(), 2, 8);

  if (new Date() < march8) {
    march8.setFullYear(march8.getFullYear() - 1);
  }

  const daysEl = document.getElementById("days");
  const hoursEl = document.getElementById("hours");
  const minutesEl = document.getElementById("minutes");
  const secondsEl = document.getElementById("seconds");

  function updateCounter() {
    const now = new Date();
    const diff = now - march8;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    daysEl.textContent = days;
    hoursEl.textContent = hours;
    minutesEl.textContent = minutes;
    secondsEl.textContent = seconds;
  }

  // Обновляем каждую секунду
  setInterval(updateCounter, 1000);
  updateCounter();
});
