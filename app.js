// ELEMENTS
const btnLogin = document.querySelector(".login-btn");
const inputUsername = document.querySelector(".username");
const inputPassword = document.querySelector(".password");
const loginStatus = document.querySelector(".login-status");
const bankContainer = document.querySelector(".bank-container");
const loginForm = document.querySelector(".login-form");
const btnLogout = document.querySelector(".logout-btn");
const depositForm = document.querySelector(".deposit-form");
const depositInput = document.querySelector(".deposit-input");
const totalBalanceContainer = document.querySelector(".total-balance");
const widthdrawForm = document.querySelector(".widthdraw-form");
const widthdrawInput = document.querySelector(".widthdraw-input");
const loanForm = document.querySelector(".loan-form");
const loanInput = document.querySelector(".loan-input");
const historySection = document.querySelector(".history");
const depositSlots = document.querySelector(".deposit-slots");
const widthdrawSlots = document.querySelector(".widthdraw-slots");
const loanSlots = document.querySelector(".loan-slots");
const totalDepositContainer = document.querySelector(".total-deposit-amount");
const totalWidthdrawContainer = document.querySelector(
  ".total-widthdraw-amount"
);
const totalLoanContainer = document.querySelector(".total-loan-amount");

// USERNAME & PASSWORD
const USERNAME = "admin";
const PASSWORD = "admin";

// HISTORY CONTAINER
const historyArr = [];

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
    historySection.classList.remove("hidden");
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
  historySection.classList.add("hidden");
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

// DEPOSIT FORM EVENT HANDLER
depositForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const amount = Number(depositInput.value);

  if (amount >= 1) {
    // send deposit object to history array
    const depositObj = {
      type: "Deposit",
      amount,
      time: new Date().toISOString(),
    };

    historyArr.push(depositObj);

    const deposits = filterHistory(historyArr, "Deposit");
    renderSlot(depositSlots, deposits, "emerald");

    // calculating total deposit amount
    const totalDepositAmount = deposits.reduce(
      (acc, dp) => (acc += dp.amount),
      0
    );
    totalDepositContainer.textContent = totalDepositAmount;

    // successfull deposit
    const prevBalance = Number(totalBalanceContainer.textContent);
    const currBalance = prevBalance + amount;
    totalBalanceContainer.textContent = currBalance;

    // update status
    renderStatusMessage(`Deposit successfull ${amount}`, "text-emerald-500");

    // clear field
    depositInput.value = "";
    depositInput.blur();
  } else {
    // unsuccessfull
    renderStatusMessage(
      "Deposit amount should be grater than 0.",
      "text-rose-500"
    );

    // clear field
    depositInput.value = "";
    depositInput.blur();
  }
});

// WIDTHDRAW FORM EVENT HANDLER
widthdrawForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const amount = Number(widthdrawInput.value);
  const prevBalance = Number(totalBalanceContainer.textContent);

  if (amount >= 1 && amount <= prevBalance) {
    // send widthdraw object to history array
    const widthdrawObj = {
      type: "Widthdraw",
      amount,
      time: new Date().toISOString(),
    };

    historyArr.push(widthdrawObj);

    const widthdraws = filterHistory(historyArr, "Widthdraw");
    renderSlot(widthdrawSlots, widthdraws, "amber");

    // calculating total widthdraw amount
    const totalWidthdrawAmount = widthdraws.reduce(
      (acc, wd) => (acc += wd.amount),
      0
    );
    totalWidthdrawContainer.textContent = totalWidthdrawAmount;

    // successfull widthdraw
    const currBalance = prevBalance - amount;
    totalBalanceContainer.textContent = currBalance;

    // update status
    renderStatusMessage(`Widthdraw successfull ${amount}`, "text-emerald-500");

    // clear field
    widthdrawInput.value = "";
    widthdrawInput.blur();
  } else {
    // unsuccessfull
    renderStatusMessage(
      "Widthdraw amount must be greater than 0 and less or equal than total balance.",
      "text-rose-500"
    );

    // clear field
    widthdrawInput.value = "";
    widthdrawInput.blur();
  }
});

// LOAN FORM EVENT HANDLER
loanForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const amount = Number(loanInput.value);
  const prevBalance = Number(totalBalanceContainer.textContent);
  const estimatedLoanAmount = prevBalance * (prevBalance / 100) * 10;

  if (amount >= 0 && amount <= estimatedLoanAmount) {
    // send loan object to history array
    const loanObj = {
      type: "Loan",
      amount,
      time: new Date().toISOString(),
    };

    historyArr.push(loanObj);

    const loans = filterHistory(historyArr, "Loan");
    renderSlot(loanSlots, loans, "violet");

    // calculating total loan amount
    const totalLoanAmount = loans.reduce((acc, ln) => (acc += ln.amount), 0);
    totalLoanContainer.textContent = totalLoanAmount;

    //success
    const currBalance = prevBalance + amount;
    totalBalanceContainer.textContent = currBalance;

    renderStatusMessage(`Loan successfull ${amount}`, "text-emerald-500");

    // clear field
    loanInput.value = "";
    loanInput.blur();
  } else {
    // unssuccessfull
    renderStatusMessage("Loan unsuccessfull", "text-rose-500");

    // clear field
    loanInput.value = "";
    loanInput.blur();
  }
});

// RENDER HISTORY
function filterHistory(arr, text) {
  return arr.filter((obj) => obj.type === text);
}

// RENDER SLOT
function renderSlot(slotsEl, arr, color) {
  slotsEl.textContent = "";

  arr.forEach((obj) => {
    const template = `
        <div class="slot flex gap-3 bg-${color}-50 p-3 border border-${color}-500 rounded">
          <p class="slot-amount font-medium text-${color}-500">
            $${obj.amount}
          </p>
          <p class="slot-time text-gray-600">${new Date(
            obj.time
          ).toLocaleDateString()} ${new Date(obj.time).toLocaleTimeString()}</p>
        </div>
      `;

    slotsEl.insertAdjacentHTML("afterbegin", template);
  });
}
