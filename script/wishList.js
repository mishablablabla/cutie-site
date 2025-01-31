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
        for (let i = 0; i <= index; i++) {
          list[i].style.backgroundImage =
            "url('/img/wishList-priority-true.svg')";
        }
      });

      item.addEventListener("mouseleave", () => {
        list.forEach((el, i) => {
          if (i > selectedIndex) {
            el.style.backgroundImage =
              "url('/img/wishList-priority-false.svg')";
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
        list.forEach((el, i) => {
          if (i <= index) {
            el.style.backgroundImage = "url('/img/wishList-priority-true.svg')";
          } else {
            el.style.backgroundImage =
              "url('/img/wishList-priority-false.svg')";
          }
        });
      });
    });
  }

  function resetOnClickOutside(list) {
    document.addEventListener("click", () => {
      selectedIndex = -1;
      list.forEach((el) => {
        el.style.backgroundImage = "url('/img/wishList-priority-false.svg')";
      });
    });
  }
});
