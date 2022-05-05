// const year = 2022;
const locale = 'us'
const numberOfMonths = [...Array(12).keys()]

const calendar = (year) => {
    let calendarMonth = [];
    numberOfMonths.map(numberOfMonth => {
        const date = new Date(year)
        let intl = new Intl.DateTimeFormat(locale, {
            month: 'long'
        })
        let nameOfMonths = intl.format(new Date(year, numberOfMonth))

        let numbersOfDays = new Date(year, numberOfMonth + 1, 0).getDate();

        let days = [];

        for (let i = 1; i <= numbersOfDays; i++) {
            days.push({
                number: i,
                events: [],
            });
        };

        calendarMonth.push({
            'year': year,
            'nameOfMonth': nameOfMonths,
            'numbersOfDays': numbersOfDays,
            'days': days,
        })
    })
    return calendarMonth;
}


function createMiniCalendar() {
    const miniCalendarContainer = document.getElementById("dayCard-calendar__div");
    const mainCalendar = document.getElementById("mainCalendar").cloneNode(true);
    miniCalendarContainer.appendChild(mainCalendar);

    const allUlElements = miniCalendarContainer.querySelectorAll(".cell__calendar-events");
    const allPencils = miniCalendarContainer.querySelectorAll(".pencil-create");
    const ulHeaderCell = miniCalendarContainer.querySelectorAll(".cell__calendar_eventType");
    const headerCell = miniCalendarContainer.querySelectorAll(".dayCard-calendar__div .mainCalendar .calendar>h2");
    const weekdays = miniCalendarContainer.querySelectorAll(".dayCard-calendar__div .days__container .weekDay");

    allUlElements.forEach((el) => {
        el.remove();
    });

    allPencils.forEach((el) => {
        el.remove();
    });

    ulHeaderCell.forEach((el) => {
        el.remove();
    });

    headerCell.forEach((el) => {
        el.remove();
    });

    weekdays.forEach((weekDay) => {
        weekDay.textContent = weekDay.textContent.substring(0, 3);
    });
}

export {
    createMiniCalendar
};