const div = document.querySelector("div");
let productN = [];
const obj = localStorage.getItem("p");

console.log(obj);
const ur = new URLSearchParams(obj);
let show;

const product = [];
let proD;
for (let [key, value] of ur) {
  product.push([key, value]);
}
console.log(product);
console.log(product[2][1]);
const list = async function () {
  let res = await fetch("http://localhost:3000/card_List");
  let data = await res.json();
  console.log(data.length);

  if (data.length === 0) {
    data.push({ List: [], id: 1 });

    productN = data[0].List;
    console.log(productN.length);
    console.log(data.length);
  } else if (data.length >= 1) {
    productN = data[0].List;
    console.log(data[0]);
    console.log(data[0].List.length);
  }
  console.log(data);
};
list();
fetch(`http://localhost:3000/pruducts?${product[2][0]}=${product[2][1]}`)
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    console.log(data);

    let card = document.createElement("div");
    card.classList.add("card-body");
    card.setAttribute("id", `id="${data[0].pruductNumber}"`);
    card.innerHTML = `
    <img class="Shoeimg" id="${data[0].pruductNumber}"  src="${data[0].img}" alt=" " />
    <a class="prev" onclick="plusSlides(-1)">❮</a>
    <a class="next" onclick="plusSlides(1)">❯</a>
  
  <div class=flex-title> 
  <span id="${data[0].pruductNumber}"  class="product-title title">${data[0].title}</span>
  <img src="/images/like.svg" alt="" />
  </div>
  <img src="/images/Capturesingle.PNG" alt="" />


  
  
        <div class = 'product-info' > 
        <span id="${data[0].pruductNumber}"  class="product-discription">Discription:</span>
        <p id="${data[0].pruductNumber}"  class="product-discription">${data[0].description}</p>
        <div class = 'size-color' > 
        <span > size</span>
        <span > color</span>

        <div class='size err'>
        <span class='circle size b ${data[0].size[0]}' > 40</span>
        <span class='circle size b ${data[0].size[1]}' > 41</span>
        <span  class='circle size b ${data[0].size[2]}'> 42</span>
        </div>
        <div class='color err '>
        <span class='circle colorPad col1 none ${data[0].colors[0]}' ></span>
        <span class='circle colorPad  col2 none ${data[0].colors[1]}' ></span>
        <span  class='circle colorPad col3 none ${data[0].colors[2]}'></span>
        </div>
        <div class='quan '>
        <span class='quantity ' >Quantity</span>
        <div class='value' >
        <div class='plus s'>+</div>
        <span class='num s'>1</span>
        <div class='neg s'>-</div>
        </div>
        
        </div>
        
        </div>
        <div class='ship'>
        <div class='price'>
        <span class='Tprice'>totalPrice</span>
         <span>$<span class='total s'>${data[0].price}.00</span></span> 
        </div>
        <button class='add'>Add to card</button>
        </div>
        </div>
        
  
  
  
  </div>
  


  
  
  
  `;

    div.insertAdjacentElement("beforeend", card);

    const Add = document.querySelector(".add");
    const plus = document.querySelector(".plus");
    const neg = document.querySelector(".neg");
    const num = document.querySelector(".num");
    const total = document.querySelector(".total");
    plus.addEventListener("click", function () {
      num.textContent = Number(num.textContent) + 1;
      total.textContent = Number(
        Number(total.textContent) + data[0].price
      ).toFixed(2);
    });
    neg.addEventListener("click", function () {
      if (Number(num.textContent) > 1) {
        num.textContent = Number(num.textContent) - 1;
        total.textContent = Number(
          Number(total.textContent) - data[0].price
        ).toFixed(2);
      }
    });

    const colorPad = document.querySelectorAll(".colorPad");
    const color = document.querySelector(".color");
    colorPad.forEach((e) => {
      e.addEventListener("click", function (e) {
        data[0].selectedColor = e.target.classList[4];
        console.log(e.target.classList);

        e.target.classList.add("select");
      });
    });

    const size = document.querySelectorAll(".size");
    const sizeErr = document.querySelector(".err");
    size.forEach((e) => {
      e.addEventListener("click", function (e) {
        data[0].size = e.target.classList[3];
        console.log(e.target.classList);

        e.target.classList.add("select");
      });
    });

    Add.addEventListener("click", function () {
      if (data[0].selectedColor === undefined) {
        color.style.border = "4px red solid";
        color.style.borderRadius = "10px";
        color.insertAdjacentHTML("afterbegin", "<p>forgot!<p>");
        setTimeout(() => {
          color.style.border = "none";
          color.children[0].remove();
        }, 2000);
        return;
      }
      if (data[0].size.length === 3) {
        sizeErr.style.border = "4px red solid";
        sizeErr.style.borderRadius = "10px";
        sizeErr.insertAdjacentHTML("afterbegin", "<p>Select one of them!<p>");
        setTimeout(() => {
          sizeErr.style.border = "none";
          sizeErr.children[0].remove();
        }, 2000);

        return;
      }
      console.log(productN.length);

      if (productN.length === 0) {
        proD = [
          {
            img: data[0].img,
            title: data[0].title,
            productNumber: data[0].img,

            productPrice: data[0].price,
            quantity: Number(num.textContent),
            totalNumber: Number(total.textContent),
            FakeId: 1,
            SelectedColor: data[0].selectedColor,
            size: data[0].size,
          },
        ];
      }
      console.log(productN.length);
      if (productN.length !== 0) {
        productN.push({
          img: data[0].img,
          title: data[0].title,
          productNumber: data[0].img,

          productPrice: data[0].price,
          quantity: Number(num.textContent),
          totalNumber: Number(total.textContent),
          FakeId: productN.length + 1,
          SelectedColor: data[0].selectedColor,
          size: data[0].size,
        });
      }
      console.log(data[0].selectedColor);

      let post = "POST";
      let Put = "PUT";

      fetch(
        `http://localhost:3000/${
          productN.length === 0 ? "card_List" : "card_List/1"
        }`,
        {
          method: productN.length === 0 ? "POST" : "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            List: productN.length === 0 ? proD : productN,
            id: 1,
          }),
        }
      );

      alert("successfully added");
    });
  });

async function delo() {
  await fetch("http://localhost:3000/card_List/1", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify([
      {
        id: 1,
      },
    ]),
  });
}
