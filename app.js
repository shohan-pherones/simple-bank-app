// ELEMENTS
const btnLogin = document.querySelector(".login-btn");
const inputUsername = document.querySelector(".username");
const inputPassword = document.querySelector(".password");
const loginStatus = document.querySelector(".login-status");
const bankContainer = document.querySelector(".bank-container");
const loginForm = document.querySelector(".login-form");
const btnLogout = document.querySelector(".logout-btn");

// USERNAME & PASSWORD
const USERNAME = "admin";
const PASSWORD = "admin";

// LOGIN EVENT HANDLER
btnLogin.addEventListener("click", (e) => {
  e.preventDefault();

  const username = inputUsername.value;
  const password = inputPassword.value;

  if (username === USERNAME && password === PASSWORD) {
    renderStatusMessage("Login successfull!", "text-emerald-500");
    bankContainer.classList.remove("hidden");
    loginForm.classList.add("hidden");
    btnLogout.classList.remove("hidden");
  } else {
    renderStatusMessage("Incorrect username or password!", "text-rose-500");
  }

  // clear fields
  inputUsername.value = inputPassword.value = "";
});

// LOGOUT EVENT HANDLER
btnLogout.addEventListener("click", () => {
  renderStatusMessage("Logout successfull!", "text-emerald-500");
  bankContainer.classList.add("hidden");
  loginForm.classList.remove("hidden");
  btnLogout.classList.add("hidden");
});

// RENDER STATUS MESSAGE
function renderStatusMessage(message, color) {
  loginStatus.classList.remove("hidden");
  loginStatus.textContent = message;

  if (loginStatus.classList.contains("text-emerald-500")) {
    loginStatus.classList.remove("text-emerald-500");
  }

  if (loginStatus.classList.contains("text-rose-500")) {
    loginStatus.classList.remove("text-rose-500");
  }

  loginStatus.classList.add(color);
}
