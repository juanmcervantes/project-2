const calendar = document.querySelector(".calendar"),
  date = document.querySelector(".date"),
  daysContainer = document.querySelector(".days"),
  prev = document.querySelector(".prev"),
next = document.querySelector(".next"),
  todayBtn = document.querySelector(".today-btn"),
  gotoBtn = document.querySelector(".goto-btn"),
  dateInput = document.querySelector(".date-input");

let today = new Date();
let activeDay;
let month = today.getMonth();
let year = today.getFullYear();

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// <================= CURRENT MONTH =====================>
// Function to ADD DAYS

function initCalendar() {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const prevLastDay = new Date(year, month, 0);
  const prevDays = prevLastDay.getDate();
  const lastDate = lastDay.getDate();
  const day = firstDay.getDay();
  const nextDays = 7 - lastDay.getDay() - 1;

  // Update the month and year at top of calendar
  date.innerHTML = months[month] + " " + year;

  // Add days
  let days = "";

  // Previous month and days
  for (let x = day; x > 0; x--) {
    days += `<div class="day prev-date">${prevDays - x + 1}</div>`;
  }

  // Current month and days
  for (let i = 1; i <= lastDate; i++) {
    if (
      i == new Date().getDate() &&
      year == new Date().getFullYear() &&
      month == new Date().getMonth()
      ) {
      days += `<div class="day today">${i}</div>`;
    }
    else {
      days += `<div class="day">${i}</div>`;
    }
    }

  // Next month and days

  for (let j = 1; j <= nextDays; j++) {
    days += `<div class="day next-date">${j}</div>`;
  }

  daysContainer.innerHTML = days;
}

initCalendar();


// <================= PREVIOUS MONTH =====================>

function prevMonth() {
  month--;
  if (month < 0) {
    month = 11;
    year--;
  }
  initCalendar();
}


// <================= NEXT MONTH =====================>

function nextMonth() {
  month++;
  if (month > 11) {
    month = 0;
    year++;
  }
  initCalendar();
}

// <================= EVENT LISTENERS FOR PREVIOUS AND NEXT MONTH =====================>

prev.addEventListener("click", prevMonth);
next.addEventListener("click", nextMonth);

// 

todayBtn.addEventListener("click", () => {
  today = new Date();
  month = today.getMonth();
  year = today.getFullYear();
  initCalendar();
});

dateInput.addEventListener("keyup", (e) => {
  // THIS ALLOWS FOR ONLY NUMERICAL VALUES IN THE INPUT
  dateInput.value = dateInput.value.replace(/[^0-9/]/g, "");
  
  // ADDS SLASH
  if (dateInput.value.length === 2) {
    dateInput.value += "/";
  }
  
  // MAXIMUM OF 7 CHARACTERS
  if (dateInput.value.length > 7) {
    dateInput.value = dateInput.value.slice(0, 7);
  }
  
  // IF DELETE BUTTON IS CLICKED
  if (e.inputType === "deleteContentBackward") {
    if (dateInput.value.length === 3) {
      dateInput.value = dateInput.value.slice(0, 2);
    }
  }
});



// GO TO DESIRED DATE

function gotoDate() {
  console.log("here");
  const dateArr = dateInput.value.split("/");
  if (dateArr.length === 2) {
    if (dateArr[0] > 0 && dateArr[0] < 13 && dateArr[1].length === 4) {
      month = dateArr[0] - 1;
      year = dateArr[1];
      initCalendar();
      return;
    }
  }
  alert("Date is invalid!");
}

gotoBtn.addEventListener("click", gotoDate);