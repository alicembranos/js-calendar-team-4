import {
  formEvent,
  arrayLocaStorageYear,
  year
} from "./main.js";
import {
  submitEventForm,
  resetForm
} from "./validation.js";

const modal = document.getElementById("modal__containerCreate");
const modalEventInfo = document.getElementById("modal__containerInfo");
const eventInfo = document.getElementById("modal__infoEvent");
const cancelBtnModal = document.getElementById("form__cancelBtn");
const modalInfo = document.getElementById("modal__containerInfo");

const getWeeksDays = (parentElement, locale) => {
  const weekDays = [...Array(7).keys()];
  const intlWeekDays = new Intl.DateTimeFormat(locale, {
    weekday: "long",
  });

  weekDays.forEach((weekDay) => {
    const weekDayElement = document.createElement("h6");
    const date = new Date(2021, 10, weekDay + 1);
    const weekDayName = intlWeekDays.format(date);

    weekDayElement.textContent =
      weekDayName.charAt(0).toUpperCase() + weekDayName.slice(1);
    weekDayElement.classList.add("weekDay");
    parentElement.appendChild(weekDayElement);
  });
};

const getCurrentDate = (locale) => {
  const intl = new Intl.DateTimeFormat(locale, {
    month: "long",
  });
  const months = document.querySelectorAll("[data-month]");

  const currentMonth = intl.format(new Date());

  const currentDay = new Date().getDate();
  let currentMonthElements;
  let i;

  Array.from(months).forEach((month, index) => {
    if (month.getAttribute("data-month") === currentMonth) {
      months[index].classList.remove("hide");
      months[index].setAttribute("currentMonth", "current");
      currentMonthElements = months[index];
      i = index;
    }
  });

  const dayElements = currentMonthElements.querySelectorAll("[value]");
  Array.from(dayElements).forEach((day) => {
    if (day.textContent === currentDay.toString()) {
      const parentDay = day.parentElement.nextElementSibling;
      const listEvents = parentDay.querySelectorAll("li");
      day.classList.add("currentDay__p");
      arrayLocaStorageYear[i].days.forEach((dayEvent) => {
        if (dayEvent.number.toString() == day.textContent) {
          dayEvent.events.forEach((ev, index) => {
            console.log(ev.reminder);
            if(ev.reminder){
              setReminder(ev, year, listEvents[index])
            }
          });
        }
      });
    }
  });
};

const getFirstDayOfMonth = (year, numberOfMonths) => {
  const months = document.querySelectorAll("[data-month]");

  numberOfMonths.forEach((number) => {
    const startOn = new Date(year, number, 0).getDay();

    let currentMonth = months[number].querySelectorAll("[value]");

    currentMonth.forEach((day) => {
      if (day.textContent === "1") {
        day.parentNode.parentNode.setAttribute(
          "style",
          `grid-column-start: ${startOn + 1}`
        );
      }
    });
  });
};

const setDays2 = (parentElement, numbersOfDays) => {
  const cellDayTemplate = document.getElementById("template").content;
  let cellNumber = cellDayTemplate.querySelector(".cell__calendar_day");
  const fragment = document.createDocumentFragment();

  [...Array(numbersOfDays).keys()].forEach((day) => {
    cellNumber.textContent = day + 1;
    cellNumber.setAttribute("value", day + 1);

    const clone = cellDayTemplate.cloneNode(true);
    const buttonEvent = clone.querySelector(".btn-event");
    buttonEvent.addEventListener("click", (e) => {
      openForm(e);
    });
    fragment.appendChild(clone);
  });
  parentElement.appendChild(fragment);
};

function openForm(e) {
  const day = parseInt(
    e.target.parentNode.firstElementChild.lastElementChild.textContent
  );
  let month = e.target.parentNode.parentNode.parentNode.getAttribute("data-month");
  const year = e.target.parentNode.parentNode.parentNode.getAttribute("year");

  month = month.charAt(0).toUpperCase() + month.slice(1);
  const date = new Date(`${month} ${day}, ${year}`);
  var isoDateTime = new Date(
    date.getTime() - date.getTimezoneOffset() * 60000
  ).toISOString();

  formEvent.elements["initial__date"].value = isoDateTime.substring(0, 10);
  formEvent.elements["initial__time"].value = "00:00";
  formEvent.elements["end__date"].value = isoDateTime.substring(0, 10);
  formEvent.elements["end__time"].value = "00:00";
  modal.classList.toggle("hide");
  // formEvent.parentElement.classList.toggle("hide");
}

modal.addEventListener("click", (e) => {
  if (
    e.target.id === "modal__containerCreate" ||
    e.target.id === "form__cancelBtn"
  ) {
    e.preventDefault();
    modal.classList.toggle("hide");
  } else if (e.target.id === "checkbox__endDate") {
    const inputDateEnd = formEvent.querySelector("label[for=end]");
    inputDateEnd.classList.toggle("hide");
  } else if (e.target.id === "checkbox__reminder") {
    const reminder = formEvent.querySelector("label[for=select__reminder]");
    reminder.classList.toggle("hide");
  } else if (e.target.id === "form__acceptBtn") {
    submitEventForm(e);
    resetForm();
    modal.classList.toggle("hide");
  }
});

//Add click listener to all li over the calendar cells
function addClickListenertoEvent(element, event) {

  element.addEventListener("click", () => {
    if (event.finnished) list.classList.add("event-done-list");

    document.getElementById("modal__info").textContent = event.title;
    document.getElementById("modal__initalDate").textContent = formatDate(event.initDate);
    document.getElementById("modal__endDate").textContent = (event.endDate !== null ? formatDate(event.endDate) : "");
    document.getElementById("modal__eventType").textContent = event.type;
    document.getElementById("modal__description").textContent = event.description;

    const doneButton = document.getElementById("modal__doneBtn");

    doneButton.addEventListener("click", () => {
      event.finnished = true;
      element.classList.add("event-done-list");
      doneEventUpdate("Event finnished");
      saveToLocalStorage(year);
      if (event.remind); //TODO clear interval
    });

    modalEventInfo.classList.toggle("hide");
    eventInfo.classList.toggle("hide");
  });
}

//Update Headline From Event Info Modal
function doneEventUpdate(textInfo) {
  const h2DoneInfo = document.getElementById("modal__info__state");
  h2DoneInfo.textContent = textInfo
}

//Format date to locale format
function formatDate(date) {
  const dateConstructor = new Date(date);
  return dateConstructor.toLocaleTimeString("en-US", {
    day: 'numeric', // numeric, 2-digit
    year: 'numeric', // numeric, 2-digit
    month: 'long', // numeric, 2-digit, long, short, narrow
    hour: 'numeric', // numeric, 2-digit
    minute: 'numeric',
  });
}

//Manage eventlistener delegation
modalEventInfo.addEventListener("click", (e) => {
  if (
    e.target.id === "modal__containerInfo" ||
    e.target.id === "modal__exitBtn"
  ) {
    modalEventInfo.classList.toggle("hide");
    eventInfo.classList.toggle("hide");
  } else if (e.target.id === "modal__doneBtn") {

  }
});

//Set up reminder for events
function setReminder(event, year, li) {

  const currentTime = new Date().getTime();
  const initialDate = new Date(formatDate(event.initDate)).getTime();
  const timeToTimoutReminder = currentTime - (event.reminderTime * 60000);
  console.log(timeToTimoutReminder);
  const timeToTimeoutEnd = initialDate - currentTime;
  console.log(timeToTimeoutEnd);

  // let liFilterElement = document.querySelector(`[data-id="${initialDate}"]`);

  if (new Date().getTime() >= initialDate) {
    console.log("primer if");
    event.finnished = true;
    li.classList.add("event-done-list");
    saveToLocalStorage(year);
  } else {
    console.log("else del primer if");
    if (initialDate - Date.now() <= event.reminderTime * 60000) {
      console.log("segundo if");
      displayEventInfoModal(li, event);
      doneEventUpdate(`Less than ${event.reminderTime} minutes left!`);
    } else {
      console.log("else del segundo if");
      //Reminder x minutes before the event
      event.intervalIDstart = setTimeout(() => {
        displayEventInfoModal(li, event);
        doneEventUpdate(`Less than ${event.reminderTime} minutes left!`);
      }, timeToTimoutReminder);
    }
    event.intervalIDend = setTimeout(() => {
      displayEventInfoModal(li, event);
      doneEventUpdate(`Your event starts now!`);
      updateEventDone(event, year, li);
    }, timeToTimeoutEnd);
  }

}


//Update event finnished
function updateEventDone(event, year, li) {
  event.finnished = true;
  li.classList.add("event-done-list");
  saveToLocalStorage(year);
}

//Save array lo localstorage
const saveToLocalStorage = (year) => {
  localStorage.setItem((`data-${year}`), JSON.stringify(arrayLocaStorageYear));
}

//Display event info modal window
function displayEventInfoModal(element, event) {
  document.getElementById("modal__info").textContent = event.title;
  document.getElementById("modal__initalDate").textContent = formatDate(event.initDate);
  document.getElementById("modal__endDate").textContent = (event.endDate !== null ? formatDate(event.endDate) : "")
  document.getElementById("modal__eventType").textContent = event.type;
  document.getElementById("modal__description").textContent = event.description;

  const doneButton = document.getElementById("modal__doneBtn");

  doneButton.addEventListener("click", () => {
    event.finnished = true;
    element.classList.add("event-done-list");
    doneEventUpdate("Event finnished.");
    saveToLocalStorage(year)
    if (event.remind); //TODO clear interval
  });

  modalEventInfo.classList.toggle("hide");
  eventInfo.classList.toggle("hide");
}

export {
  getWeeksDays,
  getCurrentDate,
  getFirstDayOfMonth,
  setDays2,
  addClickListenertoEvent,
  setReminder,
  formatDate
};