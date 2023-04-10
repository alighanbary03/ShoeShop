"use strict";

let orderNumber = localStorage.getItem("orderNumber");
const body = document.querySelector("body");
const h3 = document.querySelector(".h3");
h3.style.visibility = "hidden";
const loader = document.querySelector(".loader");
const payPage = document.querySelector(".wallet");
const confirm = document.querySelector(".confirm");
const input = document.querySelector(".input");
const int = document.querySelector(".in");
const success = document.querySelector(".success");
const orderView = document.querySelector(".orderView");
let cash = 0;
let nIntervId;
let nIntervId2;
let a = 1;
let local;
let start = false;
let dataa;

fetch("http://localhost:3000/card_List/1")
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    console.log(data);
    cash = data.cash;
    payPage.textContent = cash;
    dataa = data;
    console.log(dataa.List);
  });

confirm.addEventListener("click", function () {
  success.style.visibility = "visible";
});
input.addEventListener("click", function () {
  Order.call();
});
orderView.addEventListener("click", function () {
  orderListPage.call();
  window.location.href = "/orderList/orders.html";
});
function Order() {
  fetch(`http://localhost:3000/OrderList`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      Order: dataa.List,
      id: orderNumber++,
    }),
  });
}
function orderListPage() {
  fetch(`http://localhost:3000/card_list/1`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(),
  });
  success.classList.add("vis");
}
