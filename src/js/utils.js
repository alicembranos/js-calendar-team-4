const getWeeksDays = (parentElement, locale) => {
  const weekDays = [...Array(7).keys()];
  const intlWeekDays = new Intl.DateTimeFormat(locale, { weekday: "long" });

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
      months[index].classList.remove("hidden");
      months[index].setAttribute("currentMonth", "current");
      currentMonthElements = months[index];
    }
  });
  const dayElements = currentMonthElements.querySelectorAll("[value]");
  Array.from(dayElements).forEach((day) => {
    if (day.textContent === currentDay.toString()) {
      day.classList.add("currentDay");
    }
  });
};

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

const createDayCell = (parentElement, numbersOfDays) => {
  const cellDayTemplate = document.getElementById("cellDay");
  const cell = cellDayTemplate.content.firstElementChild.cloneNode(true);
  cell
};

const setDays2 = (parentElement, numbersOfDays) => {
  const cellDayTemplate = document.getElementById("cell__calendar").content;
  let cellNumber = cellDayTemplate.getElementById("cell__calendar-header");
  const fragment = document.createDocumentFragment();

  [...Array(numbersOfDays).keys()].forEach((day) => {
    cellNumber.textContent = day + 1;
    cellNumber.setAttribute("value", day + 1);
    const clone = cellDayTemplate.cloneNode(true);
    fragment.appendChild(clone);
  });
  parentElement.appendChild(fragment);
};

function addOpenFormListener(cell, month, day) {
  cell.querySelector('edit-btn').addEventListener("click", () => {
    
  });
}


export { getWeeksDays, getCurrentDate, getFirstDayOfMonth, setDays2 };
