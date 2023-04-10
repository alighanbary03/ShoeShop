const next = document.querySelector(".next");
const body = document.querySelector("body");

next.addEventListener("click", function () {
  body.style.transform = "translateX(90%)";
  window.location.href = "./pageThree.html";
});
