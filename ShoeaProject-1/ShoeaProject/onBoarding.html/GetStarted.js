const next = document.querySelector(".next");
const body = document.querySelector("body");

next.addEventListener("click", function () {
  body.style.transform = "translateX(90%)";
  localStorage.setItem("ListNumber", "1");
  localStorage.setItem("currentPage", "1");
  window.location.href = "/Login/Login.html";
});
