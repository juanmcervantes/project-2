
const formSignUp = document.getElementById("saveSignUp");
const buttonSignUp = document.getElementById("button-sign-up");
const legend = document.getElementById("legend");
const iconCheck = document.querySelector("icon-check");

formSignUp.addEventListener("submit", (event) => {
  event.preventDefault();
  let name = document.getElementById("nameSignUp").value;
  let email = document.getElementById("emailSignUp").value;
  let password = document.getElementById("passwordSignUp").value;
  let age = document.getElementById("ageSignUp").value;
  let users = { name: name, email: email, password: password, age: age };
  const signUpJson = JSON.stringify(users);
  console.log(signUpJson);
  console.log(typeof password);
  fetch("http://localhost:4040/api/auth/register", {
    method: "POST",
    heders: { "Content-Type": "application/json" },
    body: signUpJson,
  });
  legend.classList.remove("hidden");
  saveSignUp.classList.add("hidden");
});

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".close-modal");
const btnsOpenModal = document.querySelectorAll(".show-modal"); //querySelectorAll to show all the elements with the same class

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

const openModal = function () {
  console.log("Button clicked");
  modal.classList.remove("hidden"); // Separate with commas to delete more clases
  overlay.classList.remove("hidden");
  buttonSignUp.classList.remove("hidden");
  saveSignUp.classList.remove("hidden");
  legend.classList.add("hidden");
  saveSignUp.reset();
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener("click", openModal); //Function does not have aprenthesis because we only call it when the button is clicked

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  //(e) is a parameter that let us access to the keyboard event
  if ((e.key === "Escape") & !modal.classList.contains("hidden")) {
    //If the modal does not contain the hidden class
    closeModal();
  }
});

//What we learn was to create and recycle function expressions that could be recycle in addEventListeners.
//We also display and hide classes that contained the properties defined in CSS.
//We also learn how to close the modal using the escape key
