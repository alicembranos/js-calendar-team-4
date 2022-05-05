import {
  year,
  calendar,
  buildCalendar,
  numberOfMonths,
  getFirstDayOfMonth,
  buildPreviousCalendar,
} from "./main.js";

let numberOfYears = 0;

const nextMonth = (currentMonth) => {
  if (currentMonth.nextElementSibling) {
    nextNavigation(currentMonth);
  } else {
    numberOfYears++;
    const nextYear = calendar(year + numberOfYears);
    buildCalendar(nextYear);
    getFirstDayOfMonth(year + numberOfYears, numberOfMonths);
    nextNavigation(currentMonth);
  }
};

const previousMonth = (currentMonth) => {
  if (currentMonth.previousElementSibling) {
    previousNavigation(currentMonth);
  } else {
    numberOfYears--;
    const previousYear = calendar(year + numberOfYears);
    buildPreviousCalendar(previousYear);
    getFirstDayOfMonth(year + numberOfYears, numberOfMonths);
    previousNavigation(currentMonth);
  }
};

const nextNavigation = (currentMonth) => {
  currentMonth.classList.toggle("hide");
  currentMonth.removeAttribute("currentmonth");
  currentMonth.nextElementSibling.classList.toggle("hide");
  currentMonth.nextElementSibling.setAttribute("currentmonth", "current");
};

const previousNavigation = (currentMonth) => {
  currentMonth.classList.toggle("hide");
  currentMonth.removeAttribute("currentmonth");
  currentMonth.previousElementSibling.classList.toggle("hide");
  currentMonth.previousElementSibling.setAttribute("currentmonth", "current");
};

export { nextMonth, previousMonth };
