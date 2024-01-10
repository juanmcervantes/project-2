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

const eventsArr = [
  {
    day: 09,
    month: 01,
    year: 2024,
    events: [
      {
        title: "Event 1 lorem opsum dolar sit genfa tersd dsad",
        time: "10:00 AM",
      },
      {
        title: "Event 2",
        time: "11:00 AM"
      }
    ]
  },
  {
    day: 15,
    month: 01,
    year: 2024,
    events: [
      {
        title: "Event 1 lorem opsum dolar sit genfa tersd dsad",
        time: "10:00 AM",
      },
    ]
  }
]


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
    
    // CHECKS IF EVENT IS ON PRESENT DAY
    let event = false;
    eventsArr.forEach((eventObj) => {
      if (
        eventObj.day === i &&
        eventObj.month === month + 1 &&
        eventObj.year === year
      ) {
        // IF AN EXISITING EVENT IS FOUND
        event = true;
      }
    })
    

    if (
      i == new Date().getDate() &&
      year == new Date().getFullYear() &&
      month == new Date().getMonth()
      ) {
      if (event) {
        days += `<div class="day today event">${i}</div>`;
      } else {
        days += `<div class="day today">${i}</div>`;
      }
    }

    else {
      if (event) {
        days += `<div class="day event">${i}</div>`;
      } else {
        days += `<div class="day">${i}</div>`;
      }
    }
    }

  // Next month and days

  for (let j = 1; j <= nextDays; j++) {
    days += `<div class="day next-date">${j}</div>`;
  }

  daysContainer.innerHTML = days;
  addListener();
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




// <================= ADD EVENT FUNCTIONS =====================>



const addEventBtn = document.querySelector(".add-event"),
  addEventContainer = document.querySelector(".add-event-wrapper"),
  addEventCloseBtn = document.querySelector(".close"),
  addEventTitle = document.querySelector(".event-name"),
  addEventFrom = document.querySelector(".event-time-from"),
  addEventTo = document.querySelector(".event-time-to");

  addEventBtn.addEventListener("click", () => {
    addEventContainer.classList.toggle("active");
  });
  addEventCloseBtn.addEventListener("click", () => {
    addEventContainer.classList.remove("active");
  });

  document.addEventListener("click", (e) => {
    if(e.target !== addEventBtn && !addEventContainer.contains(e.target)) {
      addEventContainer.classList.remove("active");
    }
  });

  // ALLOWS ONLY A MAXIMUM OF 50 CHARACTERS

  addEventTitle.addEventListener("input", (e) => {
    addEventTitle.value = addEventTitle.value.slice(0, 50);
  });

  // TIME FORMAT

  addEventFrom.addEventListener("input", (e) => {
    // ONLY ALLOWS NUMERICAL VALUES
    addEventFrom.value = addEventFrom.value.replace(/[^0-9:]/g, "");
    // ADDS THE ':' AUTOMATICALLY
    if (addEventFrom.value.length === 2) {
      addEventFrom.value += ":";
    }
    // NO MORE THAN 5 CHARACTERS
    if (addEventFrom.value,length > 5) {
      addEventFrom.value = addEventFrom.value.slice(0, 5);
    }
  });

  addEventTo.addEventListener("input", (e) => {
  // ONLY ALLOWS NUMERICAL VALUES
    addEventTo.value = addEventTo.value.replace(/[^0-9:]/g, "");
  // ADDS THE ':' AUTOMATICALLY
    if (addEventTo.value.length === 2) {
    addEventTo.value += ":";
   }
  // NO MORE THAN 5 CHARACTERS
    if (addEventTo.value, length > 5) {
    addEventTo.value = addEventTo.value.slice(0, 5);
   }
  });



  // ADD LISTENER ON DAYS

  function addListener() {
    const days = document.querySelectorAll(".day");
    days.forEach((day) => {
      day.addEventListener("click", (e) => {
        activeDay = Number(e.target.innerHTML);

        days.forEach((day) => {
          day.classList.remove("active");
        });
        if (e.target.classList.contains("prev-date")) {
          prevMonth();

          setTimeout(() => {
            const days = document.querySelectorAll(".day");
            days.forEach((day)=> {
              if (
                !day.classList.contains("prev-date") &&
                day.innerHTML === e.target.innerHTML
                ) {
                  day.classList.add("active");
                }
            });
          });
        }

      });
    });
  }