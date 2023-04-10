const signIn = document.querySelector(".signIn");
const userName = document.querySelector(".Username");
const password = document.querySelector(".password");
const warn = document.querySelector(".warn");
fetch(" http://localhost:3000/users")
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    console.log(data);
    console.log(userName.placeholder);
    signIn.addEventListener("click", function () {
      console.log(data);
      //////
      for (let i = 0; i < data.length; i++) {
        if (
          data[i].username === userName.value &&
          data[i].password === password.value
        ) {
          console.log(data[i].username);
          window.location.href = "/Home/Home.html";
        } else if (i === data.length - 1) {
          console.log(data[i].username);
          warn.classList.add("wrong");
          warn.textContent = "UserName or password is wrong";
          userName.value = "";
          password.value = "";
          setTimeout(() => {
            warn.classList.remove("wrong");

            warn.textContent = "";
          }, 2000);
        }
      }
    });
  });
