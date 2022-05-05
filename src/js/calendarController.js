import {
  calendar,
  buildCalendar,
  numberOfMonths,
  buildPreviousCalendar,
  createMiniCalendar,
} from "./main.js";

const nextMonth = (currentMonth) => {
  let numberOfYears = 0;
  if (currentMonth.nextElementSibling) {
    nextNavigation(currentMonth);
  } else {
    numberOfYears = currentMonth.getAttribute("year");
    const nextYear = calendar(parseInt(numberOfYears) + 1);

    buildCalendar(nextYear, parseInt(numberOfYears) + 1, numberOfMonths);
    createMiniCalendar(parseInt(numberOfYears) + 1);
    nextNavigation(currentMonth);
  }
};

const previousMonth = (currentMonth) => {
  let numberOfYears = 0;

  if (currentMonth.previousElementSibling) {
    previousNavigation(currentMonth);
  } else {
    numberOfYears = currentMonth.getAttribute("year");
    const previousYear = calendar(parseInt(numberOfYears) - 1);

    buildPreviousCalendar(
      previousYear,
      parseInt(numberOfYears) + 1,
      numberOfMonths
    );
    createMiniCalendar(parseInt(numberOfYears) + 1, true);
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
