window.addEventListener("DOMContentLoaded", () => {
  // priority functionality

  const items = document.querySelectorAll(".taskPriority-img");
  let selectedIndex = -1;

  hoverOnHeart(items);
  downHeart(items);
  resetOnClickOutside(items);

  function hoverOnHeart(list) {
    list.forEach((item, index) => {
      item.addEventListener("mouseenter", () => {
        list.forEach((el, i) => {
          if (i <= index) {
            el.classList.add("true");
            el.classList.remove("false");
          } else {
            el.classList.remove("true");
            el.classList.add("false");
          }
        });
      });

      item.addEventListener("mouseleave", () => {
        list.forEach((el, i) => {
          if (i > selectedIndex) {
            el.classList.remove("true");
            el.classList.add("false");
          }
        });
      });
    });
  }

  function downHeart(list) {
    list.forEach((item, index) => {
      item.addEventListener("click", (event) => {
        event.stopPropagation();
        selectedIndex = index;

        const parent = item.closest(".priority__svg");
        if (parent) {
          parent.setAttribute("data-priority", index + 1);
        }
        list.forEach((el, i) => {
          if (i <= index) {
            el.classList.add("true");
            el.classList.remove("false");
          } else {
            el.classList.remove("true");
            el.classList.add("false");
          }
        });
      });
    });
  }

  function resetOnClickOutside(list) {
    document.addEventListener("click", (event) => {
      if (!event.target.closest(".priority__svg")) {
        selectedIndex = -1;
        list.forEach((el) => {
          el.classList.remove("true");
          el.classList.add("false");

          const parent = el.closest(".priority__svg");
          if (parent) {
            parent.removeAttribute("data-priority");
          }
        });
      }
    });
  }

  // open more info about a card

  const listOfCards = document.querySelector(".items-list");

  listOfCards.addEventListener("click", (event) => {
    if (event.target.classList.contains("toggle-btn")) {
      const hideDiv = event.target.closest(".wish__hide__content"),
        hideContent = hideDiv.querySelector(".details"),
        toggleText = event.target.nextElementSibling,
        parentLi = event.target.closest("li.wish-item");

      parentLi
        .querySelector(".wish__currency-selected")
        .addEventListener("change", () => {
          getCurrencyDataFromLS(parentLi);
        });

      if (toggleText.textContent === "Get more info") {
        toggleDetails(hideContent, event.target, toggleText, "Hide", "open");

        getCurrencyDataFromLS(parentLi);
      } else {
        toggleDetails(
          hideContent,
          event.target,
          toggleText,
          "Get more info",
          "open"
        );
      }
    }
  });

  function toggleDetails(
    details,
    toggleButton,
    infoText,
    text,
    changeingClass
  ) {
    details.classList.toggle(changeingClass);
    toggleButton.classList.toggle(changeingClass);
    infoText.textContent = text;
  }

  // work with data in the localStorage

  const idWishItem = () => crypto.randomUUID(),
    taskTitle = document.querySelector("#taskTitle"),
    taskUrl = document.querySelector("#taskUrl"),
    priceInput = document.querySelector(".price__input"),
    selectCurrency = document.querySelector(".select__currency"),
    priorityOfWishList = document.querySelector(".priority__svg"),
    addWishContainer = document.querySelector(".container");

  addWishContainer.addEventListener("click", (event) => {
    event.preventDefault();

    if (event.target.classList.contains("submit_button")) {
      if (taskTitle.value && taskUrl.value) {
        if (isValidUrl(taskUrl.value)) {
          const newId = idWishItem(),
            formData = getFormData();

          postFormData(newId, formData);
          showWishItems(newId, formData);
          cleanForm(taskTitle, taskUrl, priceInput);
          formMessage(
            notificationMessage,
            "Success",
            "show",
            "hide",
            "good",
            4000
          );
        } else {
          formMessage(
            notificationMessage,
            "Oops! That doesn’t look like a valid link. Try again.",
            "show",
            "hide",
            "fail",
            4000
          );
        }
      } else {
        formMessage(
          notificationMessage,
          "Fill in all the fields",
          "show",
          "hide",
          "fail",
          4000
        );
      }
    }
  });

  function isValidUrl(url) {
    try {
      new URL(url);
      return true;
    } catch (e) {
      return false;
    }
  }

  // get data from localStoragge

  function getFormData() {
    const currentDate = new Date(),
      dateString = currentDate.toLocaleDateString();

    return JSON.stringify({
      title: taskTitle.value,
      url: taskUrl.value,
      price: priceInput.value,
      currency: selectCurrency.value,
      priority: parseInt(priorityOfWishList.getAttribute("data-priority")) || 0,
      time: dateString,
      isCompleted: false,
      isCurrency: false,
    });
  }

  // post on the localStorage & class for cards

  const listOfCurrency = ["PLN", "USD", "EUR", "KRW"];

  function postFormData(id, obj) {
    localStorage.setItem(id, obj);
  }

  function showWishItems(id, formData) {
    const obj = JSON.parse(formData);

    const wishNum = listOfCards.children.length + 1;

    const hearts = {
      1: ["true", "false", "false"],
      2: ["true", "true", "false"],
      3: ["true", "true", "true"],
      default: ["false", "false", "false"],
    };

    const [firstHeart, secondHeart, thirdHeart] =
      hearts[obj.priority] || hearts.default;

    const newWish = new WishCard(
      obj.title,
      obj.url,
      obj.price,
      obj.currency,
      obj.priority,
      obj.time,
      firstHeart,
      secondHeart,
      thirdHeart,
      false,
      obj.updatedAt,
      false
    ).render(wishNum, id);

    if (obj.isCurrency) {
      // return;
    }
    listOfCards.append(newWish);
    return newWish;
  }

  class WishCard {
    constructor(
      title,
      url,
      price,
      currency,
      priority,
      time,
      firstHeart,
      secondHeart,
      thirdHeart,
      isCompleted,
      updatedAt,
      isCurrency
    ) {
      this.title = title;
      this.url = url;
      this.price = price;
      this.currency = currency;
      this.priority = priority;
      this.time = time;
      this.firstHeart = firstHeart;
      this.secondHeart = secondHeart;
      this.thirdHeart = thirdHeart;
      this.isCompleted = isCompleted;
      this.updatedAt = updatedAt;
      this.isCurrency = isCurrency;
    }

    render(wishNum, wishId) {
      const li = document.createElement("li");
      li.classList.add("wish-item");
      li.dataset.id = wishId;
      li.dataset.priority = this.priority;
      li.dataset.currency = this.currency;

      li.innerHTML = `
         <div class="wish__show__content">
         <div class="content">
                <span class="task-number">${wishNum}.</span>
                <span class="task-title">${this.title} wants</span>
                <a
                  class="wish_item-link wish_item__link"
                  href="${this.url}"
                  >a gift :)</a
                >
                <label for="taskPriority">Priority : </label>
                <div class="priority__svg">
                  <div
                    class="wish__item__priority first__heart ${this.firstHeart}"
                  ></div>
                  <div
                    class="wish__item__priority second__heart ${
                      this.secondHeart
                    }"
                  ></div>
                  <div class="wish__item__priority third__heart ${
                    this.thirdHeart
                  }"></div>
                </div>
                <div class="task-actions">
                  <button class="complete-btn"></button>
                  <button class="change-btn"></button>
                  <button class="delete-btn"></button>
                </div>
              </div>
              </div>
              <div class="wish__hide__content">
                <div class="details">
                  <p>
                    Link:
                    <a href="${this.url}" target="_blank"
                      >${this.url}</a
                    >
                  </p>
                  <div class="exchange__form">
                    <p>Exchange gift's price :</p>
                    <input
                      type="text"
                      id="priceTitile"
                      class="wish__currency-input"
                      placeholder="${this.price} ${this.currency}"
                      readonly
                    />
                    <p>to</p>
                    <div class="exchange__output">
                      <input type="number" class="wish__currency-output" placeholder="0" readonly />
                      <select  class="wish__currency-selected">
                        <option value="PLN">zł (PLN)</option>
                        <option selected value="USD">$ (USD)</option>
                        <option value="EUR">€ (EUR)</option>
                        <option value="KRW">₩ (KRW)</option>
                      </select>
                    </div>
                  </div>
                  <div class="wish-added">
                    <p class="wish__added">Wish was add : "${this.time}"</p>
                      ${
                        this.updatedAt
                          ? `<p class="wish__added wish__changed">Last updated : "${this.updatedAt}"</p>`
                          : ""
                      }
                  </div>
                </div>
                <div class="toggle">
                  <button class="toggle-btn"></button>
                  <p class="toggle__text">Get more info</p>
                </div>
              </div>
      `;

      return li;
    }
  }

  // load functionality
  loadWishes();

  function loadWishes() {
    cleanList(listOfCards);

    const allItems = Object.entries(localStorage);
    allItems.forEach(([id, data]) => {
      const parsedData = JSON.parse(data);
      if (!parsedData.isCurrency) {
        const wishItem = showWishItems(id, data);
        isCompletedWish(wishItem);
      }
    });
  }

  function isCompletedWish(item) {
    const id = item.dataset.id,
      data = JSON.parse(localStorage.getItem(id));

    if (data && data.isCompleted) {
      item.classList.add("wishCompleted");
      item.classList.add("strikethrough");
      item.querySelector(".wish_item__link").classList.add("wishCompleted");
    }
  }

  function cleanList(list) {
    list.textContent = "";
  }

  // clean form

  function cleanForm(titleInput, urlInput, priceInput) {
    titleInput.value = "";
    urlInput.value = "";
    priceInput.value = "";
  }

  // notifications

  const notificationMessage = document.querySelector("#notificationMessage"),
    responseMessage = document.querySelector("#responseMessage");

  function formMessage(
    messageDiv,
    text,
    addClass,
    removeClass,
    typeOfMessage,
    timeMotification
  ) {
    messageDiv.textContent = text;

    messageDiv.classList.add(addClass);
    messageDiv.classList.add(typeOfMessage);
    messageDiv.classList.remove(removeClass);

    setTimeout(() => {
      messageDiv.classList.add(removeClass);
      messageDiv.classList.remove(addClass);
      messageDiv.classList.remove(typeOfMessage);
    }, timeMotification);
  }

  // actions with an item

  isWishCompleted();

  listOfCards.addEventListener("click", (event) => {
    if (event.target.classList.contains("complete-btn")) {
      competeTask(event, "wishCompleted", "strikethrough");
    } else if (event.target.classList.contains("delete-btn")) {
      deleteWish(event);
    } else if (event.target.classList.contains("change-btn")) {
      changeWishData(event);
    }
  });

  // complete wish btn
  function competeTask(event) {
    const parentLi = event.target.closest("li.wish-item");

    changeStatus(parentLi);
    isWishCompleted();
  }

  function changeStatus(element) {
    const elementData = JSON.parse(localStorage.getItem(element.dataset.id));

    if (elementData.isCompleted === false) {
      elementData.isCompleted = true;

      formMessage(
        responseMessage,
        "Wish is fulfilled :)",
        "show",
        "hide",
        "success",
        5000
      );
    } else if (elementData.isCompleted === true) {
      elementData.isCompleted = false;
    }
    localStorage.setItem(element.dataset.id, JSON.stringify(elementData));
  }

  function isWishCompleted() {
    const listWishes = document.querySelectorAll("li.wish-item");
    listWishes.forEach((item) => {
      const elementData = JSON.parse(localStorage.getItem(item.dataset.id)),
        wishLink = item.querySelector(".wish_item__link"),
        completeBtn = item.querySelector(".complete-btn");

      if (elementData.isCompleted === true) {
        completeBtn.classList.add("changeCompleteIcon");

        item.classList.add("wishCompleted", "strikethrough");
        wishLink.classList.add("wishCompleted");
      } else {
        completeBtn.classList.remove("changeCompleteIcon");

        item.classList.remove("wishCompleted", "strikethrough");
        wishLink.classList.remove("wishCompleted");
      }
    });
  }

  // delete wish btn

  function deleteWish(event) {
    const parentLi = event.target.closest("li.wish-item");

    localStorage.removeItem(parentLi.dataset.id);
    loadWishes();

    formMessage(
      responseMessage,
      "Succesfully delited",
      "show",
      "hide",
      "success",
      4000
    );
  }

  // change wish data

  function changeWishData(event) {
    const parentLi = event.target.closest("li.wish-item");

    if (parentLi.classList.contains("wishCompleted")) {
      formMessage(
        responseMessage,
        "You cannot change a wish because it has already been fulfilled.",
        "show",
        "hide",
        "fail",
        7000
      );
    } else {
      const showContent = parentLi.querySelector(".wish__show__content"),
        hideData = parentLi.querySelector(".toggle"),
        content = parentLi.querySelector(".content");
      form = document.createElement("div");

      form.classList.add("form");
      hideData.classList.add("hide");
      content.style.display = "none";

      form.innerHTML = `
         <div class="form__actions changeForm">
              <div class="titles">
                <input
                  type="text"
                  id="taskTitle"
                  class="taskTitle changeTitle"
                  name="title"
                  placeholder="Your name"
                  required
                />
                <input
                  type="text"
                  id="taskUrl"
                  class="taskUrl"
                  name="url"
                  placeholder="Link to your wish"
                  required
                />
              </div>

              <div class="exchange__output">
                <input type="number" placeholder="Price" class="price__input" />
                <select class="select__currency">
                  <option value="PLN">zł (PLN)</option>
                  <option value="USD">$ (USD)</option>
                  <option value="EUR">€ (EUR)</option>
                  <option value="UAH">₴ (UAH)</option>
                  <option value="KRW">₩ (KRW)</option>
                </select>
              </div>

              <label for="taskPriority">Priority of your wish:</label>
              <div class="priority__svg">
                <div class="taskPriority-img first__heart"></div>
                <div class="taskPriority-img second__heart"></div>
                <div class="taskPriority-img third__heart"></div>
              </div>
            </div>
      `;

      showContent.append(form);

      const items = parentLi.querySelectorAll(".taskPriority-img");

      hoverOnHeart(items);
      downHeart(items);
      resetOnClickOutside(items);

      // add buttons to save or undo changig

      const btnsDiv = document.createElement("div"),
        saveBtn = document.createElement("button"),
        cancelBtn = document.createElement("button");

      saveBtn.classList.add("submit_button");
      saveBtn.textContent = "Save";

      cancelBtn.classList.add("submit_button");
      cancelBtn.textContent = "Cancel";

      btnsDiv.classList.add("butons__div");

      btnsDiv.append(cancelBtn, saveBtn);
      parentLi.append(btnsDiv);

      saveBtn.addEventListener("click", (event) => {
        saveChanges(event);
      });

      cancelBtn.addEventListener("click", () => {
        hideData.classList.remove("hide");
        hideData.style.display = "";
        content.style.display = "";
        saveBtn.remove();
        form.remove();
        cancelBtn.remove();

        formMessage(
          responseMessage,
          "Action canceled",
          "show",
          "hide",
          "success",
          5000
        );
      });
    }
  }

  function saveChanges(event) {
    const parentLi = event.target.closest("li.wish-item"),
      wishTitle = parentLi.querySelector(".taskTitle").value,
      wishLink = parentLi.querySelector(".taskUrl").value,
      wishInput = parentLi.querySelector(".price__input").value,
      priority = parentLi.querySelectorAll(".taskPriority-img"),
      id = parentLi.dataset.id;

    let storageData = JSON.parse(localStorage.getItem(id)),
      numPriority = 0;

    if (wishTitle && wishLink) {
      const currentDate = new Date(),
        dateString = currentDate.toLocaleDateString();

      priority.forEach((item) => {
        if (item.classList.contains("true")) {
          numPriority++;
        }
      });

      const newObj = {
        title: wishTitle,
        url: wishLink,
        price: wishInput,
        currency: storageData.currency,
        priority: numPriority,
        time: storageData.time,
        isCompleted: storageData.isCompleted,
        updatedAt: dateString,
        isCurrency: false,
      };

      localStorage.setItem(id, JSON.stringify(newObj));

      loadWishes();
      numPriority = 0;

      formMessage(
        responseMessage,
        "Successfully saved.",
        "show",
        "hide",
        "success",
        5000
      );
    } else {
      formMessage(
        responseMessage,
        "Fill in all the fields.",
        "show",
        "hide",
        "fail",
        5000
      );
    }
  }

  // converter in wish items

  // async function convertation(event) {
  //   const parentLi = event.target.closest("li.wish-item"),
  //     output = parentLi.querySelector(".wish__currency-output"),
  //     whichSelect = parentLi.querySelector(".wish__currency-selected").value;

  //   const dataItem = JSON.parse(localStorage.getItem(parentLi.dataset.id));

  //   try {
  //     const response = await fetch(
  //       `https://api.frankfurter.dev/v1/latest?base=${dataItem.currency}`
  //     );

  //     if (!response.ok) {
  //       console.log(`Ошибка: ${response.status}`);
  //       throw new Error(`Ошибка: ${response.status}`);
  //     }

  //     if (whichSelect === dataItem.currency) {
  //       formMessage(
  //         responseMessage,
  //         "Choose diferent currency.",
  //         "show",
  //         "hide",
  //         "fail",
  //         5000
  //       );
  //       output.value = 0;
  //     } else {
  //       const selectedCurrency = parentLi.querySelectorAll(
  //         ".wish__currency-selected"
  //       );

  //       selectedCurrency.forEach((item) => {
  //         item.addEventListener("change", (event) => {
  //           convertation(event);
  //         });
  //       });

  //       const data = await response.json();
  //       const currencyValue = data.rates[whichSelect];

  //       console.log(currencyValue, whichSelect);

  //       output.value = (dataItem.price * currencyValue).toFixed(2);
  //     }

  //     console.log("fromfetch");
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  function getCurrencyDataFromLS(parentItem) {
    const elemntId = parentItem.dataset.id,
      element = JSON.parse(localStorage.getItem(elemntId)),
      elementPrice = element.price,
      elementCurrency = element.currency,
      baseCurrency = JSON.parse(localStorage.getItem(elementCurrency)),
      selectedCurrency = parentItem.querySelector(
        ".wish__currency-selected"
      ).value,
      exchangeRate = baseCurrency.rates[selectedCurrency] * elementPrice;

    changeValues(parentItem, exchangeRate);

    if (elementCurrency == selectedCurrency) {
      formMessage(
        responseMessage,
        "Choose diferent currency.",
        "show",
        "hide",
        "fail",
        5000
      );
    }
  }

  function changeValues(parentItem, result) {
    const outputValue = parentItem.querySelector(".wish__currency-output");

    outputValue.value = result;
  }

  async function setCurrency(arr) {
    for (let item of arr) {
      try {
        console.log(`Запрашиваем данные для ${item}...`);
        const response = await fetch(
          `https://api.frankfurter.dev/v1/latest?base=${item}`
        );

        if (!response.ok) {
          console.log(`Ошибка: ${response.status}`);
          throw new Error(`Ошибка: ${response.status}`);
        }

        const data = await response.json();
        data.isCurrency = true;

        localStorage.setItem(item, JSON.stringify(data));
        console.log(`Data forsa ${item} successfully updated in localStorage`);
      } catch (error) {
        console.error("Error while updating:", error);
      }
    }
  }

  function fetchOrLoadRates(arr) {
    const allExist = arr.every((item) => localStorage.getItem(item) !== null);

    if (allExist) {
      console.log("here");
    } else {
      console.log("naah");
    }
  }

  fetchOrLoadRates(listOfCurrency);

  // update data in localStorage

  function updateInLS() {
    let currency = JSON.parse(localStorage.getItem(listOfCurrency[0])),
      today = new Date().toISOString().split("T")[0];

    if (!currency || currency.date !== today) {
      console.log("Updating currency...");
      setCurrency(listOfCurrency);
    } else {
      console.log("Data is valid");
    }
  }

  updateInLS();
});
