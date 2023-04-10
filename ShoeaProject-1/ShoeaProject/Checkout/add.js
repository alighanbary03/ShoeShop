let rad = document.querySelectorAll(".rad");

window.addEventListener("change", () => {
  for (let index in rad) {
    if (rad[index].checked === true) {
      console.log(rad[index].parentElement.id);
      let add = rad[index].parentElement.id;
      localStorage.setItem("address", add);
    }
  }
});
rad.forEach((e) => {
  e.addEventListener("click", function (e) {
    rad.forEach((e) => {
      e.checked = false;
    });
    e.target.checked = true;
  });
});
