window.addEventListener("DOMContentLoaded", (event) => {
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
        toggleText = event.target.nextElementSibling;
      if (toggleText.textContent === "Get more info") {
        toggleDetails(hideContent, event.target, toggleText, "Hide", "open");
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
          "Fill in all the fields",
          "show",
          "hide",
          "fail",
          4000
        );
      }
    }
  });

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
    });
  }

  // post on the localStorage & class for cards

  function postFormData(id, obj) {
    localStorage.setItem(id, obj);
  }

  function showWishItems(id, formData) {
    const obj = JSON.parse(formData),
      wishNum = listOfCards.children.length + 1;

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
      false
    ).render(wishNum, id);

    listOfCards.append(newWish);
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
      isCompleted
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
    }

    render(wishNum, wishId) {
      const li = document.createElement("li");
      li.classList.add("wish-item");
      li.dataset.id = wishId;
      li.dataset.priority = this.priority;
      li.dataset.currency = this.currency;

      li.innerHTML = `
         <div class="wish__show__content">
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
                    class="wish__item__priority second__heart ${this.secondHeart}"
                  ></div>
                  <div class="wish__item__priority third__heart ${this.thirdHeart}"></div>
                </div>
                <div class="task-actions">
                  <button class="complete-btn"></button>
                  <button class="change-btn"></button>
                  <button class="delete-btn"></button>
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
                      <input type="number" placeholder="0" />
                      <select>
                        <option value="PLN">zł (PLN)</option>
                        <option value="USD">$ (USD)</option>
                        <option value="EUR">€ (EUR)</option>
                        <option value="UAH">₴ (UAH)</option>
                        <option value="KRW">₩ (KRW)</option>
                      </select>
                    </div>
                  </div>
                  <div class="wish-added">
                    <p class="wish__added">Wish was add : "${this.time}"</p>
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

    const allWishes = Object.entries(localStorage);

    allWishes.forEach((item) => {
      showWishItems(item[0], item[1]);
    });
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

  const notificationMessage = document.querySelector("#notificationMessage");

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
    } else if (event.target.classList.contains("")) {
    }
  });

  function competeTask(event) {
    const parentLi = event.target.closest("li.wish-item"),
      linkChild = parentLi.querySelector(".wish_item__link");

    changeStatus(parentLi);
    isWishCompleted();
  }

  function changeStatus(element) {
    const elementData = JSON.parse(localStorage.getItem(element.dataset.id));

    if (elementData.isCompleted === false) {
      elementData.isCompleted = true;
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
});
