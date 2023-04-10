const orderList = document.querySelector(".order");

fetch("http://localhost:3000/OrderList")
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    console.log(data);
    // for (let index in data) {

    // }
    for (let index2 in data) {
      let card = document.createElement("div");

      card.classList.add("card2");
      card.innerHTML = `<h2 class='Oh2'>Order Number${data[index2].id}</h2>`;

      for (let i = 0; i < data[index2].Order.length; i++) {
        orderList.insertAdjacentElement("beforeend", card);
        console.log("list", data[index2].Order[i]);
        let card2 = document.createElement("div");
        card2.classList.add("card");
        card2.innerHTML = ` 
          <img src="${data[index2].Order[i].img}" />
          <div class="info">
            <h2>${data[index2].Order[i].title}</h2>
  
            <p>${data[index2].Order[i].totalNumber}<span class="wallet">Total</span>$</p>
            
          </div>
        `;

        card.insertAdjacentElement("beforeend", card2);
      }
    }
  });
