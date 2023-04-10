let produts = [];
let put;
const userCardsTemplate = document.querySelector("[user-cards-template]");
const dataSearch = document.querySelector("[data-search]");
const data_user_cards_container = document.querySelector(
  "[data-user-cards-container]"
);
console.log(userCardsTemplate);
dataSearch.addEventListener("input", (e) => {
  let value = e.target.value.toLowerCase();
  produts.forEach((product) => {
    console.log(product);
    let isVis = product.name.toLowerCase().includes(value);
    product.element.classList.toggle("hide", !isVis);
  });
});
fetch("http://localhost:3000/pruducts")
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    produts = data.map((product) => {
      let card = userCardsTemplate.content.cloneNode(true).children[0];

      console.log(product);
      const header = card.querySelector("[data-header]");
      const body = card.querySelector("[data-body]");
      const img = card.querySelector("[data-img]");
      header.textContent = product.type;
      body.textContent = product.name;
      img.src = product.img;
      data_user_cards_container.append(card);
      return {
        name: product.name,
        type: product.type,

        element: card,
      };
    });
  });
