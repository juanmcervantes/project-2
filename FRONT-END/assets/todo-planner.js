// 1. CONSTANTS FOR QUERY SELECTORS => GLOBAL SCOPE
const calendar = document.querySelector(".calendar"),
  prev = document.querySelector(".prev"),
  next = document.querySelector(".next"),
  date = document.querySelector(".date"),
  dateInput = document.querySelector(".date-input"),
  currentWeekday = document.querySelector(".current-weekday"),
  currentDate = document.querySelector(".current-date"),
  todayBttn = document.querySelector(".today-bttn"),
  goToBttn = document.querySelector(".go-to-bttn"),
  addEventBttn = document.querySelector('.add-event-bttn'),
  monthDays = document.querySelector(".month-days"),
  myEvents = document.querySelector('.events');
//  ---------------------------------------->
  

// 2. CONSTANTS MONTHS NAMES => ARRAY 
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
//  ---------------------------------------->


let today = new Date();
let activeDay;
let month = today.getMonth();
let year = today.getFullYear();

let eventsArr = [];
getTasks();
//  ---------------------------------------->



// 3. CURRENT DATE FUNCTION (TOP OF THE PAGE)
function getActiveDay(date) {
  const day = new Date(year, month, date);
  const dayName = day.toString().split(" ")[0];
  currentWeekday.innerHTML = dayName;
  currentDate.innerHTML = date + " " + months[month] + " " + year;
};
//  ---------------------------------------->


// 4. TIME CONVERSION FUNCTION
function timeConversion(time) {
  let timeArr = time.split(":");
  let timeHour = timeArr[0];
  let timeMin = timeArr[1];
  let timeFormat = timeHour >= 12 ? "PM" : "AM";
  timeHour = timeHour % 12 || 12;
  time = timeHour + ":" + timeMin + " " + timeFormat;
  return time;
};


// 5. CALENDAR FUNCTIONS
// TO DO PLANNER FUNCTION
function toDoPlanner() {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const prevLastDay = new Date(year, month, 0);
  const prevMonthDays = prevLastDay.getDate();
  const lastDate = lastDay.getDate();
  const day = firstDay.getDay();
  const nextMonthDays = 7 - lastDay.getDay() - 1;

  // UPDATES THE CURRENT MONTH AND YEAR AT TOP OF CALENDAR
  date.innerHTML = months[month] + " " + year;
  let days = "";

  // PREVIOUS MONTH AND ITS LAST DAYS
  for (let x = day; x > 0; x--) {
    days += `<div class="day prev-month-date">${prevMonthDays - x + 1}</div>`;
  }

  // CURRENT MONTH AND ITS DAYS
  for (let i = 1; i <= lastDate; i++) {
    
    // CHECKS IF EVENT IS ON CURRENT DAY
    let event = false;
    eventsArr.forEach((eventObj) => {
      if (
        eventObj.day === i &&
        eventObj.month === month + 1 &&
        eventObj.year === year
      ) {
        event = true;
      }
    })
    if (
      i == new Date().getDate() &&
      year == new Date().getFullYear() &&
      month == new Date().getMonth()
      ) {
      activeDay = i;
      getActiveDay(i);
      showEvents(i);
      
      if (event) {
        days += `<div class="day today active event">${i}</div>`;
      } else {
        days += `<div class="day today active">${i}</div>`;
      }
    } else {
      if (event) {
        days += `<div class="day event">${i}</div>`;
      } else {
        days += `<div class="day">${i}</div>`;
      }
    }
  }

  // NEXT MONTH AND ITS DAYS

  for (let j = 1; j <= nextMonthDays; j++) {
    days += `<div class="day next-month">${j}</div>`;
  }

  monthDays.innerHTML = days;
  newTask();

}
toDoPlanner();


// PREVIOUS MONTH FUNCTION
function prevMonth() {
  month--;
  if (month < 0) {
    month = 11;
    year--;
  }
  toDoPlanner();
}


// PREVIOUS MONTH EVENT LISTENER
prev.addEventListener("click", prevMonth);


// NEXT MONTH FUNCTION
function nextMonth() {
  month++;
  if (month > 11) {
    month = 0;
    year++;
  }
  toDoPlanner();
}

// NEXT MONTH EVENT LISTENER
next.addEventListener("click", nextMonth);


// TODAY BUTTON
todayBttn.addEventListener("click", () => {
  today = new Date();
  month = today.getMonth();
  year = today.getFullYear();
  toDoPlanner();
});


// DATE REQUIREMENTS
dateInput.addEventListener("keyup", (e) => {
  // ALLOWS FOR ONLY NUMERICAL VALUES
  dateInput.value = dateInput.value.replace(/[^0-9/]/g, "");
  
  // AUTOMATICALLY ADDS A SLASH
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


// DESIRED DATE (SEARCH DATE INPUT) FUNCTION
function desiredDate() {
  console.log("here");
  const dateArr = dateInput.value.split("/");
  if (dateArr.length === 2) {
    if (dateArr[0] > 0 && dateArr[0] < 13 && dateArr[1].length === 4) {
      month = dateArr[0] - 1;
      year = dateArr[1];
      toDoPlanner();
      return;
    }
  }
  // IF VALUES ARE NOT ACCEPTED, ALERT = 
  alert("Date is invalid!");
}


// DESIRED DATE EVENT LISTENER
goToBttn.addEventListener("click", desiredDate);
//  ---------------------------------------->


// 6. ADDING NEW TASK
// CONSTANTS FOR ADDING EVENT 'SCOPE'
const addNewEvent = document.querySelector(".add-event"),
  addNewEventContainer = document.querySelector(".add-event-container"),
  addNewEventTitle = document.querySelector(".event-name"),
  addStartingTime = document.querySelector(".start-time"),
  addEndTime = document.querySelector(".end-time"),
  addNewEventCloseBttn = document.querySelector(".close");

  // 
  addNewEvent.addEventListener("click", () => {
    addNewEventContainer.classList.toggle("active");
  });

  // 
  addNewEventCloseBttn.addEventListener("click", () => {
    addNewEventContainer.classList.remove("active");
  });

  // 
  document.addEventListener("click", (e) => {
    if (e.target !== addNewEvent && !addNewEventContainer.contains(e.target)) {
      addNewEventContainer.classList.remove("active");
    }
  });

  // ALLOWS ONLY A MAXIMUM OF 50 CHARACTERS
  addNewEventTitle.addEventListener("input", (e) => {
    addNewEventTitle.value = addNewEventTitle.value.slice(0, 50);
  });

  // TIME FORMAT
  addStartingTime.addEventListener("input", (e) => {
    // ONLY ALLOWS NUMERICAL VALUES
    addStartingTime.value = addStartingTime.value.replace(/[^0-9:]/g, "");
    // ADDS THE ':' AUTOMATICALLY
    if (addStartingTime.value.length === 2) {
      addStartingTime.value += ":";
    }
    // NO MORE THAN 5 CHARACTERS
    if (addStartingTime.value.length > 5) {
      addStartingTime.value = addStartingTime.value.slice(0, 5);
    }
  });

  // INPUT REQUIREMENTS
  addEndTime.addEventListener("input", (e) => {
  // ONLY ALLOWS NUMERICAL VALUES
    addEndTime.value = addEndTime.value.replace(/[^0-9:]/g, "");
  // ADDS THE ':' AUTOMATICALLY
    if (addEndTime.value.length === 2) {
    addEndTime.value += ":";
   }
  // MAXIMUM OF 5 CHARACTERS
    if (addEndTime.value.length > 5) {
    addEndTime.value = addEndTime.value.slice(0, 5);
   }
  });
//  ---------------------------------------->


// 7. NEW TASK FUNCTION TO ADD A TASK TO ACTUAL CURRENT DATE
  function newTask() {
    const days = document.querySelectorAll(".day");

    days.forEach((day) => {
      day.addEventListener("click", (e) => {
        activeDay = Number(e.target.innerHTML);
        getActiveDay(e.target.innerHTML);
        showEvents(Number(e.target.innerHTML));

        days.forEach((day) => {
          day.classList.remove("active");
        });

        if (e.target.classList.contains("prev-month-date")) {
          prevMonth();

          setTimeout(() => {
            const days = document.querySelectorAll(".day");
            days.forEach((day)=> {
              if (
                !day.classList.contains("prev-month-date") &&
                day.innerHTML === e.target.innerHTML
                ) {
                  day.classList.add("active");
                  }
            });
          }, 100);

        } else if (e.target.classList.contains("next-month")) {
          nextMonth();

          setTimeout(() => {
            const days = document.querySelectorAll(".day");
            days.forEach((day) => {
              if (
                !day.classList.contains("next-month") &&
                day.innerHTML === e.target.innerHTML
              ) {
                day.classList.add("active");
              }
            });
          }, 100);

        } else {
          e.target.classList.add("active");
        }
      });
    });
  };
//  ---------------------------------------->


// 8. SHOW EVENTS FUNCTIONS
function showEvents(date) {
  let events = "";
  eventsArr.forEach((event) => {
    if (
      date === event.day &&
      month + 1 === event.month &&
      year === event.year
    ) {
      event.events.forEach((event) => {
        events += `<div class="event">
            <div class="title">
              <i class="fas fa-circle"></i>
              <h3 class="event-title">${event.title}</h3>
            </div>
            <div class="event-time">
              <span class="event-time">${event.time}</span>
            </div>
        </div>`;
      });
    }
  });
  if (events === "") {
    events = `<div class="no-event">
            <h3>No Events</h3>
        </div>`;
  }
  myEvents.innerHTML = events;
  saveTasks();
};
//  ---------------------------------------->

// 9. CREATE TASK
addEventBttn.addEventListener("click", () => {
  const taskTitle = addNewEventTitle.value;
  const taskStartTime = addStartingTime.value;
  const taskEndTime = addEndTime.value;
  if (taskTitle === "" || taskStartTime === "" || taskEndTime === "") {
      alert("All fields are requiered.");
      return;
    }
    
    const startTimeReq = taskStartTime.split(":");
    const endTimeReq = taskEndTime.split(":");

    if (
      startTimeReq.length !== 2 ||
      endTimeReq.length !== 2 ||
      startTimeReq[0] > 23 ||
      startTimeReq[1] > 59 ||
      endTimeReq[0] > 23 ||
      endTimeReq[1] > 59
    ) {
      alert("Invalid format!");
    }

    const startTime = timeConversion(taskStartTime);
    const endTime = timeConversion(taskEndTime);
    const newTask = {
      title: taskTitle,
      time: startTime + " - " + endTime,
    };

    let eventAdded = false;
    
    // VERIFIES THAT TASK IS NOT EMPTY 
    if (eventsArr.length > 0) {
      eventsArr.forEach((item) => {
        if (
          item.day === activeDay &&
          item.month === month + 1 &&
          item.year === year
        ) {
          item.events.push(newTask);
          eventAdded = true;
        }
      });
    }
    if(!eventAdded) {
      eventsArr.push({
        day: activeDay,
        month: month + 1,
        year: year,
        events: [newTask],
      });
    }

    // REMOVES ADDING TASK ACTIVE CONTAINER
    addNewEventContainer.classList.remove("active");

    // CLEARS THE INPUT FIELDS
    addNewEventTitle.value = "";
    addStartingTime.value = "";
    addEndTime.value = "";

    showEvents(activeDay);

    const activeDayComp = document.querySelector(".day.active");
    if (!activeDayComp.classList.contains("event")) {
      activeDayComp.classList.add("event");
    }
});
//  ---------------------------------------->


// 10. REMOVE TASK
myEvents.addEventListener("click", (e) => {
  if(e.target.classList.contains("event")) {
    const eventTitle = e.target.children[0].children[1].innerHTML;
    eventsArr.forEach((event) => {
     if (
       event.day === activeDay &&
       event.month === month + 1 &&
       event.year === year
     ) {
       event.events.forEach((item, index) => {
         if (item.title === eventTitle) {
            event.events.splice(index, 1);
          }
       });
      if (event.events.length === 0) {
        eventsArr.splice(eventsArr.indexOf(event), 1);
        const activeDayComp = document.querySelector(".day.active");
        if (activeDayComp.classList.contains("event")) {
          activeDayComp.classList.remove("event");
        }
      }
     }
   });
  showEvents(activeDay);
  }
});
//  ---------------------------------------->


// 11. SAVES TASKS
function saveTasks() {
  localStorage.setItem("events", JSON.stringify(eventsArr));
}
//  ---------------------------------------->


// 12. GETS TASKS
function getTasks() {
  if (localStorage.getItem("events" === null)) {
    return;
  }
  eventsArr.push(...JSON.parse(localStorage.getItem("events")))
}
//  ---------------------------------------->