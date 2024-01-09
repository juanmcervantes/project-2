const calendar = document.querySelector(".calendar"),
  date = document.querySelector(".date"),
  daysContainer = document.querySelector(".days"),
  prev = document.querySelector(".prev"),
next = document.querySelector(".next");

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
  for (let i = 1; i < lastDate; i++) {
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

  daysContainer.innerHTML = days;
}

initCalendar();