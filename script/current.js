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

  function convertation() {
    console.log(currencySelect.value);
    if (
      currencySelect.value === "Value" ||
      resultCureencySelect.value === "Value"
    ) {
      thirdNotification.classList.add("show");

      setTimeout(() => {
        thirdNotification.classList.remove("show");
      }, 2000);
    } else if (currencySelect.value === resultCureencySelect.value) {
      notification.classList.add("show");

      setTimeout(() => {
        notification.classList.remove("show");
      }, 2000);
    } else if (
      !inputAmount.value.trim() ||
      inputAmount.value <= 0 ||
      isNaN(inputAmount.value)
    ) {
      numberNotification.classList.add("show");

      inputAmount.placeholder = "Введите число";

      setTimeout(() => {
        numberNotification.classList.remove("show");
      }, 2000);
      return;
    } else {
      debugger;
      let inputCurrency = currencySelect.value,
        outputCurrency = resultCureencySelect.value;

      outputAmount.value = "Loading...";
      converBtn.disabled = true;

      fetch("../JSON/current.json")
        .then((response) => {
          if (!response.ok) {
            console.log(`Ошибка: ${response.status}`);
            throw new Error(`Ошибка: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          const exchangeRate = data[inputCurrency]?.[outputCurrency];
          if (!exchangeRate) {
            outputAmount.value = "Курс не найден";
            converBtn.disabled = false;
            return;
          } else {
            console.log(exchangeRate);

            outputAmount.value = (inputAmount.value * exchangeRate).toFixed(2);
            converBtn.disabled = false;
          }
        })
        .catch((error) => {
          console.error(error);
          outputAmount.value = "Ошибка загрузки курса";
        })
        .finally(() => {
          converBtn.disabled = false;
        });
    }
  }

  function clearing() {
    inputAmount.placeholder = "Введите число";
    outputAmount.placeholder = "Результат";
    inputAmount.value = null;
    outputAmount.value = null;
    currencySelect.selectedIndex = 0;
    resultCureencySelect.selectedIndex = 0;
  }
});
