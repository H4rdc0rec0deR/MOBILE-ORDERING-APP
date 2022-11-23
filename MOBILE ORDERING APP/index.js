import { menuArray } from "./data.js";

const orderArray = [];
const modalOuter = document.getElementById("modal-outer");
const totalPrice = document.getElementById("price");
const consentForm = document.getElementById("consent-form");

document.addEventListener("click", function (e) {
  if (e.target.dataset.add) {
    handleAddBtnClick(e.target.dataset.add);
  } else if (e.target.dataset.remove) {
    handleRemoveBtnClick(e.target.dataset.remove);
  } else if (e.target.id === "submit-button") {
    handleCompleteOrderBtn();
  } else if (e.target.id === "modal-outer") {
    outsideClick(e);
  }
});

function handleAddBtnClick(foodId) {
  const targetFoodObj = menuArray.filter(function (food) {
    return JSON.stringify(food.id) === foodId;
  })[0];
  orderArray.push(targetFoodObj);
  renderOrder();
  renderPositions();
}

function renderOrder() {
  document.getElementById("hidden-order").style.display = "flex";
}

function handleRemoveBtnClick(foodId) {
  const foodObjIndex = orderArray.findIndex(
    (food) => JSON.stringify(food.id) === foodId
  );
  orderArray.splice(foodObjIndex, 1);
  renderPositions();
}

function renderPositions() {
  document.getElementById("order").innerHTML = getYourOrderHtml();
}

function getYourOrderHtml() {
  let yourOrderHtml = "";
  orderArray.forEach(function (food) {
    yourOrderHtml += `
  <div class="positions">
  <div class="order-inner"
      <div class="position">
        <p>${food.name}</p>
        <button class="remove" data-remove="${food.id}">remove</button>
      </div>
    <p>$${food.price}</p>
  </div>
  <div>
     `;
  });
  getTotalPriceHtml();
  return yourOrderHtml;
}

function getTotalPriceHtml() {
  let total = 0;
  if (orderArray.length > 0) {
    orderArray.forEach(function (food) {
      total += food.price;
    });
  }
  return (totalPrice.innerHTML = "$" + total);
}

function handleCompleteOrderBtn() {
  if (orderArray.length > 0) {
    modalOuter.classList.add("open");
  }
}

consentForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const formData = new FormData(consentForm);
  const name = formData.get("fullName");
  document.getElementById("hidden-order").innerHTML = `
  <div class="message-box">
    <p class="message">Thanks, ${name}! Your order is on its way!</p>
  </div>
  `;
});

function outsideClick(e) {
  const isOutside = !e.target.closest(".modal");
  if (isOutside) {
    modalOuter.classList.remove("open");
  }
}

function getMenuHtml() {
  let menuHtml = "";
  menuArray.forEach(function (food) {
    menuHtml += `
<div class="food">
  <div class="food-inner" data-food="${food.id}">
    <span class="food-emoji">${food.emoji}</span>
    <div class="food-details">
      <p class="name">${food.name}</p>
      <p class="food-text">${food.ingredients}</p>
      <p class="price">$${food.price}</p>
    </div>
    <button class="add-button" id="add-button" data-add="${food.id}">+</button>        
  </div>
</div>
`;
  });
  return menuHtml;
}

function render() {
  document.getElementById("menu").innerHTML = getMenuHtml();
}

render();
