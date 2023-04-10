let Objectdata;

const ordersList = document.querySelector(".order-container");
const amount = document.querySelector(".amount");
const edit = document.querySelector(".img2");
const shiping = document.querySelector(".imgArrow");
const addCard = document.querySelector(".addCard");
const addressBar = document.querySelector(".address-container");
let address = localStorage.getItem("address");
let ship = localStorage.getItem("ship");
let shiptype = document.querySelector(".p3");
let countinue = document.querySelector(".countinue");
let shipingType_container = document.querySelector(".shipingType-container");
let shipCard = document.querySelector(".type-list");
let shipPrice = document.querySelector(".shipPrice");
let priceTotal = document.querySelector(".priceTotal");
console.log(address);

fetch(`http://localhost:3000/card_List/1`)
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    Objectdata = data;
    console.log(Objectdata);
    //console.log(Objectdata[0].orderList);
    fetch(`http://localhost:3000/address/${address}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        let card = document.createElement("div");
        card.classList.add("addCard");
        card.innerHTML = ` <div class="addCard">
        <div class="location">
          <img class="img1" src="${data.img}" />
        </div>
        <div class="add-info">
          <h3>${data.name}</h3>
          <p class="p1">${data.address}</p>
        </div>
        <div class="edit">
         <a href="./shiping.html"> <img class="img2" src="/images/edit-text.png"  /></a>
        </div>
      </div>`;
        addressBar.insertAdjacentElement("beforeend", card);
        shiping.addEventListener("click", () => {
          window.location.href = `./address.html`;
        });
        edit.addEventListener("click", () => {
          window.location.href = `./shiping.html`;
        });
      });
    if (ship === null) {
      shipCard.innerHTML = ` 
        
          <img class="imgTruck" src="/images/cargo-truck.png" />
          <p class="p3">Choose Shiping Type</p>
          <a href='./address.html' class='a3'><img class="imgArrow" src="/images/right-arrow.png" /></a>
        
    
      `;
      shipingType_container.insertAdjacentElement("beforeend", shipCard);
    } else {
      fetch(`http://localhost:3000/shiptype/${ship}`)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          shipingType_container.innerHTML = "";
          shiptype.textContent = "";
          shipCard.innerHTML = ` 
        <img class="imgTruck" src="${data.img}" />
        <p class="p3">${data.name} </p><span class='sp3'>${data.price}$</span>
       <a href='./address.html' class='a3'> <img class="imgArrow" src="/images/right-arrow.png"/></a>
      </div>
    </div>
    
      `;
          shipingType_container.insertAdjacentElement("beforeend", shipCard);
          shipPrice.textContent = data.price;
        });
    }
    countinue.addEventListener("click", function () {
      console.log(shiptype.textContent);
      if (shiptype.textContent === "Choose Shiping Type") {
        shipingType_container.style.border = "10px solid red";
        setTimeout(() => {
          shipingType_container.style.border = "none";
        }, 1500);
        return;
      } else if (shiptype.textContent === "") {
        window.location.href = "./payment.html";
      }
    });
  });
setTimeout(() => {
  amount.textContent = "";
  for (let index in Objectdata.List) {
    console.log(Objectdata.List);
    let card = document.createElement("div");
    card.classList.add("Card");
    card.innerHTML = `<img src="${
      Objectdata.List[index].img
    }" class="card-img"></img>
  <div class="card-information">
    <div class="card-title">${Objectdata.List[index].title}</div>
    <div class="card-trash  "><i class="gg-trash-empty" id="h"></i></div>
    <div class="card-color">
      <span class="pad ${Objectdata.List[index].SelectedColor}"></span>
      <span class="pad-title">black |</span>
    </div>
    <div class="card-size"><span class="size-pad">size=</span>
      <span class="size-num">${Objectdata.List[index].size}</span></div>
    <div class="card-price">$<span class='total'>${Number(
      Objectdata.List[index].totalNumber
    ).toFixed(2)}</span></div>
    <div class="card-button">
      
      <div class="number">${Objectdata.List[index].quantity}</div>
      
    </div>
  </div>`;
    ordersList.insertAdjacentElement("beforeend", card);

    amount.textContent = Number(
      Number(amount.textContent) + Number(Objectdata.List[index].totalNumber)
    ).toFixed(2);
  }
  priceTotal.textContent = Number(
    Number(amount.textContent) + Number(shipPrice.textContent)
  ).toFixed(2);
}, 600);

console.log(shiptype.textContent);
