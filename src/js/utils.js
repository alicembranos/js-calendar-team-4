import { formEvent } from "./main.js";
import { submitEventForm } from "./validation.js";
import {createEventList} from "./localstorage.js";

const modal = document.getElementById("modal__containerCreate");
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
  const months = document.querySelectorAll("[name]");
  const currentMonth = intl.format(new Date());

  const currentDay = new Date().getDate();
  let currentMonthElements;

  Array.from(months).forEach((month, index) => {
    if (month.getAttribute("name") === currentMonth) {
      months[index].classList.remove("hide");
      months[index].setAttribute("currentMonth", "current");
      currentMonthElements = months[index];
    }
  });
  const dayElements = currentMonthElements.querySelectorAll("[value]");
  Array.from(dayElements).forEach((day) => {
    if (day.textContent === currentDay.toString()) {
      day.classList.add("currentDay__p");
      day.parentElement.parentElement.setAttribute('data-currentday', true);
    }
    day.parentElement.parentElement.addEventListener('click', (e) => {
      if (e.target.matches('.cell__calendar') || e.target.matches('.cell__calendar-day')){
        displayDayCard(e)
      }
    })
  });
};

function displayDayCard(e) {
  const currentDayAside = document.getElementById('dayCard__h1');
  const eventList = document.getElementById('dayCard__ul');
  const calendarEventList = e.target.querySelectorAll('li');
  const currentDay = e.target.querySelector('[value]');
  const regularNumbers = ordinaryNumbers(currentDay.textContent)
  const currentMonth = e.target.parentElement.parentElement.getAttribute('name');
  currentDayAside.textContent = `${regularNumbers} ${currentMonth}`

  if (calendarEventList.length > 0){
    calendarEventList.forEach((event) => {
      const eventTitle = event.textContent.substring(8).trim();
      const eventTime = event.textContent.substring(0,8).trim();
      createEventList(eventList, eventTitle, eventTime);
    })
  }
}

function ordinaryNumbers(number) {
  if (number === '1' || number === '21' || number === '31') {
    return `${number}st`

  }else if (number === '2' || number === '22') {
    return `${number}nd`

  }else if (number === '3') {
    return `${number}rd`

  }else {
    return `${number}th`
  }
}

const getFirstDayOfMonth = (year, numberOfMonths) => {
  const months = document.querySelectorAll("[name]");

  numberOfMonths.forEach((number) => {
    const startOn = new Date(year, number, 0).getDay();

    let currentMonth = months[number + 1].querySelectorAll("[value]");

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
  let month = e.target.parentNode.parentNode.parentNode.getAttribute("name");
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
    modal.classList.toggle("hide");
  }
});

export { getWeeksDays, getCurrentDate, getFirstDayOfMonth, setDays2 };
