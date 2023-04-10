const list = document.querySelector(".container-List");
const total_Price = document.querySelector(".total-price");
const check_btn = document.querySelector(".check-btn");
let a;
let card_list;

async function run() {
  let res = await fetch(`http://localhost:3000/card_List/1`);
  let data = await res.json();

  card_list = data;
  console.log(data);
}
run();

fetch(`http://localhost:3000/card_List/1`)
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    console.log(data.List.length);
    a = data;
    for (let index in data.List) {
      let card = document.createElement("div");
      card.classList.add("card-layout");

      card.innerHTML = `
      
      <div class="Card">
        <img src="${data.List[index].img}" class="card-img"></img>
        <div class="card-information">
          <div class="card-title">${data.List[index].title}</div>
          <div class="card-trash  "><i class="gg-trash-empty" id="${+index}"></i></div>
          <div class="card-color">
            <span class="pad"></span>
            <span class="pad-title">ShoeColor|</span>
          </div>
          <div class="card-size"><span class="size-pad">size=</span>
            <span class="size-num">${data.List[index].size}</span></div>
          <div class="card-price">$<span class='total'>${
            data.List[index].productPrice
          }</span></div>
          <div class="card-button">
            <div class="plus" id="${data.List[index].productPrice}">+</div>
            <div class="number">1</div>
            <div class="neg"id="${data.List[index].productPrice}">-</div>
          </div>
        </div>
      </div>
     
  `;
      list.insertAdjacentElement("beforeend", card);

      let pad = document.querySelectorAll(".pad");
      let quantity = document.querySelectorAll(".number");
      let total = document.querySelectorAll(".total");

      pad[index].style.backgroundColor = `${data.List[index].SelectedColor}`;
      quantity[index].textContent = `${data.List[index].quantity}`;
      pad[index].style.backgroundColor = `${data.List[index].SelectedColor}`;
      total[index].textContent = `${Number(
        data.List[index].quantity * data.List[index].productPrice
      )}`;
    }
    let neg = document.querySelectorAll(".neg");
    let plus = document.querySelectorAll(".plus");
    let trash = document.querySelectorAll(".card-trash");

    plus.forEach((e) => {
      e.addEventListener("click", function (e) {
        console.log(+e.target.id);
        if (e.target.parentElement.children[1].textContent >= 0) {
          e.target.parentElement.children[1].textContent =
            Number(e.target.parentElement.children[1].textContent) + 1;
          console.log(Number(e.target.id));
          e.target.parentElement.parentElement.children[4].children[0].textContent =
            Number(
              e.target.parentElement.parentElement.children[4].children[0]
                .textContent
            ) + Number(e.target.id);
          total_Price.textContent = Number(
            Number(total_Price.textContent) + Number(e.target.id)
          ).toFixed(2);
        }
      });
    });
    neg.forEach((e) => {
      e.addEventListener("click", function (e) {
        let totalPrice = Number(
          e.target.parentElement.parentElement.children[4].children[0]
            .textContent
        );
        let PtotalPrice =
          e.target.parentElement.parentElement.children[4].children[0]
            .textContent;

        let Pquantity = Number(e.target.parentElement.children[1].textContent);
        if (e.target.parentElement.children[1].textContent > 0) {
          e.target.parentElement.children[1].textContent =
            Number(e.target.parentElement.children[1].textContent) - 1;
          e.target.parentElement.parentElement.children[4].children[0].textContent =
            e.target.parentElement.parentElement.children[4].children[0]
              .textContent - Number(e.target.id);
          total_Price.textContent = Number(
            Number(total_Price.textContent) - Number(e.target.id)
          ).toFixed(2);
        }

        totalPrice.toString();
        console.log(PtotalPrice.toString(), Pquantity, totalPrice);
      });
    });

    let modal = document.querySelector(".modal");
    let deletee = document.querySelector(".delete");
    let cancel = document.querySelector(".cancel");
    let modal_card = document.querySelector(".Card");
    trash.forEach((e) => {
      e.addEventListener("click", function (e) {
        let eNum = e.target.id;

        modal.classList.add("open");

        console.log(card_list.List);

        console.log(e.target.id);
        modal_card.innerHTML = `
            <img src="${data.List[e.target.id].img}" class="card-img"></img>
            <div class="card-information">
              <div class="card-title">${data.List[e.target.id].title}</div>
              <div class="card-trash  "><i class="gg-trash-empty" id="${
                data.List[e.target.id].id
              }"></i></div>
              <div class="card-color">
                <span class="pad"></span>
                <span class="pad-title">color|</span>
              </div>
              <div class="card-size"><span class="size-pad">size=</span>
                <span class="size-num">${
                  data.List[e.target.id].size
                }</span></div>
              <div class="card-price">$<span class='total'>${Number(
                data.List[e.target.id].productPrice *
                  data.List[e.target.id].quantity
              )}</span></div>
              <div class="card-button">
                <div class="plus ">+</div>
                <div class="number">1</div>
                <div class="neg">-</div>
              </div>
            </div>`;

        deletee.addEventListener("click", function (ev) {
          console.log(e.target.id);

          async function del() {
            card_list.List.splice(eNum, 1);
            await fetch(`http://localhost:3000/card_List/1`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(card_list),
            });
          }
          del();
          console.log(e.target.id);
          e.target.parentElement.parentElement.parentElement.parentElement.remove();

          modal.style.visibility = "hidden";
        });
      });
    });
    cancel.addEventListener("click", () => {
      modal.classList.remove("open");
    });
    console.log(card_list);
    for (let indexx = 2; indexx < data.length; indexx++) {
      console.log(data[indexx].totalNumber);
      total_Price.textContent = Number(
        Number(total_Price.textContent) + Number(data[indexx].totalNumber)
      ).toFixed(2);
    }

    check_btn.addEventListener("click", function () {
      fetch(`http://localhost:3000`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderList: card_list,
        }),
      });
      window.location.href = "/Checkout/checkout.html";
    });
  });

let dataa;
let shallowCopy;
async function put(event, e) {
  card_list.List.splice(e, 1);
  console.log(card_list.List);
  await fetch(`http://localhost:3000/card_List/1`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(card_list),
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {});
}

async function post() {
  await fetch(`http://localhost:3000/card_List`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: "real data" }),
  });
}
