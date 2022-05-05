import {
    getWeeksDays,
    getCurrentDate,
    getFirstDayOfMonth,
    setDays2,
    onLoadCurrentCard,
} from "./utils.js";
import {
    nextMonth,
    previousMonth
} from "./calendarController.js";
import {
    getEventsFromLocalStorage
} from "./localstorage.js";
import {
    createMiniCalendar
} from "./calendar.js";
const main = document.querySelector("main");

const year = new Date().getFullYear();
const locale = "us-US";

const numberOfMonths = [...Array(12).keys()];
const nextBtn = document.getElementById("dayCard__nextButton");
const previousBtn = document.getElementById("dayCard__previousButton");

const formEvent = document.getElementById("modal__createEventForm");

const calendar = (year) => {
    let calendarMonth = [];
    numberOfMonths.map((numberOfMonth, index) => {
        const date = new Date(year);
        let intl = new Intl.DateTimeFormat(locale, {
            month: "long",
        });

        let nameOfMonths = intl.format(new Date(year, numberOfMonth));
        let numbersOfDays = new Date(year, numberOfMonth + 1, 0).getDate();
        let days = [];

        for (let i = 1; i <= numbersOfDays; i++) {
            days.push({
                number: i,
                events: [],
            });
        }
        calendarMonth.push({
            year: year,
            nameOfMonth: nameOfMonths,
            numbersOfDays: numbersOfDays,
            days: days,
        });
    });

    if (!localStorage.getItem(`data-${year}`)) {
        localStorage.setItem(`data-${year}`, JSON.stringify(calendarMonth));
    }

    return calendarMonth;
};
// calendar(2022);

let newCalendar = calendar(2022);

const buildCalendar = (calendar) => {
    calendar.forEach((month) => {
        let monthElement = document.createElement("div");
        let monthName = document.createElement("h2");
        let daysContainer = document.createElement("div");
        const containerCalendar = document.getElementById("mainCalendar");

        daysContainer.classList.add("days__container");
        monthElement.classList.add("calendar");
        monthElement.classList.add("hide");
        monthElement.setAttribute("data-month", month.nameOfMonth);
        monthElement.setAttribute("year", month.year);
        monthName.textContent = `${month.nameOfMonth.toUpperCase()} ${month.year}`;

        monthElement.appendChild(monthName);
        monthElement.appendChild(daysContainer);
        getWeeksDays(daysContainer, locale);
        setDays2(daysContainer, month.numbersOfDays, year);
        containerCalendar.appendChild(monthElement);
    });
};

const buildPreviousCalendar = (calendar) => {
    calendar.reverse().forEach((month) => {
        let monthElement = document.createElement("div");
        let monthName = document.createElement("h2");
        let daysContainer = document.createElement("div");
        const containerCalendar = document.getElementById("mainCalendar");

        daysContainer.classList.add("days__container");
        monthElement.classList.add("calendar");
        monthElement.classList.add("hide");
        monthElement.setAttribute("data-month", month.nameOfMonth);
        monthElement.setAttribute("year", month.year);
        monthName.textContent = `${month.nameOfMonth.toUpperCase()} ${month.year}`;

        monthElement.appendChild(monthName);
        monthElement.appendChild(daysContainer);
        getWeeksDays(daysContainer, locale);
        setDays2(daysContainer, month.numbersOfDays, year);

        containerCalendar.insertBefore(monthElement, containerCalendar.firstChild);
    });
};

buildCalendar(newCalendar);
getFirstDayOfMonth(year, numberOfMonths);
let arrayLocaStorageYear = getEventsFromLocalStorage(year);
getCurrentDate(locale);
onLoadCurrentCard();

createMiniCalendar(year);

nextBtn.addEventListener("click", () => {
    const currentMonth = document.querySelectorAll('[currentmonth="current"]');
    currentMonth.forEach((e) => {
        nextMonth(e);
    });
});

previousBtn.addEventListener("click", () => {
    const currentMonth = document.querySelectorAll('[currentmonth="current"]');
    currentMonth.forEach((e) => {
        previousMonth(e);
    });
});

export {
    formEvent,
    year,
    calendar,
    buildCalendar,
    numberOfMonths,
    getFirstDayOfMonth,
    arrayLocaStorageYear,
    buildPreviousCalendar,
};