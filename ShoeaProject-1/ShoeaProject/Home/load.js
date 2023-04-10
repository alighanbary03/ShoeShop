const card_head = document.querySelector(".products-Section");
let componets = document.querySelectorAll(".btn-company");

fetch("http://localhost:3000/pruducts?mostPopular=true")
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    console.log(data);
    componets[0].classList.add("active");
    for (let index in data) {
      let card = document.createElement("div");
      card.classList.add("card-body");
      card.setAttribute("id", `id="${data[index].pruductNumber}"`);
      card.innerHTML = `
    <img class="Shoeimg" id="${data[index].pruductNumber}"  src="${data[index].img}" alt=" " />
  
  <span id="${data[index].pruductNumber}"  class="product-title">${data[index].description}</span>
  <span id="${data[index].pruductNumber}"  class="product-price">$${data[index].price}</span> </div>`;

      card_head.insertAdjacentElement("beforeend", card);

      card.addEventListener("click", function (e) {
        const pruduct = `name=${data[index].pruductNumber}&type=${data[index].type}&img=${data[index].img}`;
        //const ur = new URLSearchParams(pruduct);
        localStorage.setItem("p", `${pruduct.toString()}`);

        window.location.href = "/shoeaCard/shoe.html";
      });
    }
  });

componets.forEach((e) => {
  e.addEventListener("click", function (e) {
    card_head.innerHTML = "";
    if (e.target.textContent !== "All") {
      fetch(
        `http://localhost:3000/pruducts?mostPopular=true&name=${e.target.textContent}`
      )
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          console.log(data);

          for (let index in data) {
            let card = document.createElement("div");
            // componets[index].classList.remove("active");
            componets.forEach((e) => {
              e.style.backgroundColor = "white";
              e.style.color = "black";
            });
            e.target.style.backgroundColor = "#343a40";
            e.target.style.color = "white";
            card.classList.add("card-body");
            card.setAttribute("id", `id="${data[index].pruductNumber}"`);
            card.innerHTML = `
    <img class="Shoeimg" src="${data[index].img}" alt=" " />
  
  <span class="product-title">${data[index].description}</span>
  <span class="product-price">$${data[index].price}</span> </div>`;

            card_head.insertAdjacentElement("beforeend", card);
          }
        });
      e.target.classList.remove("active");
    }
  });
});

let cardList = document.querySelector(".card");
cardList.addEventListener("click", function () {
  window.location.href = "/Card/cardList.html";
});
const company_logo = document.querySelectorAll(".company-logo");
company_logo.forEach((e) => {
  e.addEventListener("click", function (e) {
    console.log(e.target.alt);
    localStorage.setItem("brandname", e.target.alt);
    window.location.href = "/showBrands/brand.html";
  });
});
componets[0].addEventListener("click", () => {
  location.reload();
});
let seeAll = document.querySelector(".see-all");
seeAll.addEventListener("click", () => {
  window.location.href = "/showBrands/mostPopular.html";
});
