const list = document.querySelector(".container-brand");
const brand_Name = document.querySelector(".brandName");
const brandName = localStorage.getItem("brandname");

console.log(brandName);
brand_Name.textContent = brandName;
fetch(`http://localhost:3000/pruducts?name=${brandName}`)
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    console.log(data);
    brandName.textContent = data[0].name;
    for (let index in data) {
      let card = document.createElement("div");
      card.classList.add("card-body");
      card.setAttribute("id", `id="${data[index].pruductNumber}"`);
      card.innerHTML = `
    <img class="Shoeimg" id="${data[index].pruductNumber}"  src="${data[index].img}" alt=" " />
  
  <span id="${data[index].pruductNumber}"  class="product-title">${data[index].description}</span>
  <span id="${data[index].pruductNumber}"  class="product-price">$${data[index].price}</span> </div>`;

      list.insertAdjacentElement("beforeend", card);
      card.addEventListener("click", function (e) {
        const pruduct = `name=${data[index].pruductNumber}&type=${data[index].type}&img=${data[index].img}`;
        //const ur = new URLSearchParams(pruduct);
        localStorage.setItem("p", `${pruduct.toString()}`);

        window.location.href = "/shoeaCard/shoe.html";
      });
    }
  });
