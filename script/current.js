window.addEventListener("DOMContentLoaded", () => {
  const currencySelect = document.querySelector("#fromCurrency"),
    resultCureencySelect = document.querySelector("#toCurrency"),
    converBtn = document.querySelector(".convert-button"),
    inputAmount = document.querySelector("#inputAmount"),
    outputAmount = document.querySelector("#outputAmount"),
    notification = document.querySelector(".notification"),
    clearBtn = document.querySelector(".clear-button"),
    numberNotification = document.querySelector(".second_notification"),
    thirdNotification = document.querySelector(".third_notification");

  window.addEventListener("keydown", (event) => {
    event.preventDefault();

    switch (event.key) {
      case "Backspace":
        inputAmount.value = inputAmount.value.slice(0, -1);
        break;
      case "Enter":
        convertation();
        break;
      case "Escape":
        inputAmount.value = "";
        outputAmount.value = "";
        break;
      default:
        if (!isNaN(event.key)) {
          inputAmount.value += event.key;
        }
        break;
    }
  });

  converBtn.addEventListener("click", convertation);
  clearBtn.addEventListener("click", clearing);

  async function convertation() {
    if (
      currencySelect.value === "Value" ||
      resultCureencySelect.value === "Value"
    ) {
      addClass(thirdNotification, "show");

      removeNotification(thirdNotification, "show", 2000);
    } else if (currencySelect.value === resultCureencySelect.value) {
      addClass(notification, "show");

      removeNotification(notification, "show", 2000);
    } else if (
      !inputAmount.value.trim() ||
      inputAmount.value <= 0 ||
      isNaN(inputAmount.value)
    ) {
      addClass(numberNotification, "show");
      inputAmount.placeholder = "Write a num";

      removeNotification(numberNotification, "show", 2000);
      return;
    } else {
      getData();
    }
  }

  async function getData() {
    let inputCurrency = currencySelect.value,
      outputCurrency = resultCureencySelect.value;

    outputAmount.value = "Loading...";
    converBtn.disabled = true;

    try {
      const response = await fetch("../JSON/current.json");
      if (!response.ok) {
        throw new Error(`Ошибка: ${response.status}`);
      }
      const data = await response.json();
      const exchangeRate = data[inputCurrency]?.[outputCurrency];

      if (!exchangeRate) {
        outputAmount.value = "Курс не найден";
        return;
      }

      outputAmount.value = (inputAmount.value * exchangeRate).toFixed(2);
    } catch (error) {
      console.error(error);
      outputAmount.value = "Ошибка загрузки курса";
    } finally {
      converBtn.disabled = false;
    }
  }

  function removeNotification(element, classToRemove, time) {
    setTimeout(() => {
      element.classList.remove(classToRemove);
    }, time);
  }

  function addClass(element, classToAdd) {
    element.classList.add(classToAdd);
  }

  function clearing() {
    inputAmount.placeholder = "Write a num";
    outputAmount.placeholder = "Result";
    inputAmount.value = null;
    outputAmount.value = null;
    currencySelect.selectedIndex = 0;
    resultCureencySelect.selectedIndex = 0;
  }
});
