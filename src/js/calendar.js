const locale = "us";
const numberOfMonths = [...Array(12).keys()];

function createMiniCalendar(year, previous) {
  const miniCalendarContainer = document.getElementById(
    "dayCard-calendar__div"
  );
  const mainCalendar = document.querySelectorAll(`[year = "${year}"]`);
  if (previous) {
    let test = Array.from(mainCalendar);
    test.reverse().forEach((months) => {
      let newMonth = months.cloneNode(true);
      miniCalendarContainer.insertBefore(
        newMonth,
        miniCalendarContainer.firstChild
      );
    });
  } else {
    Array.from(mainCalendar).forEach((months) => {
      let newMonth = months.cloneNode(true);
      miniCalendarContainer.appendChild(newMonth);
    });
  }

  const allUlElements = miniCalendarContainer.querySelectorAll(
    ".cell__calendar-events"
  );
  const allPencils = miniCalendarContainer.querySelectorAll(".pencil-create");
  const ulHeaderCell = miniCalendarContainer.querySelectorAll(
    ".cell__calendar_eventType"
  );
  const headerCell = miniCalendarContainer.querySelectorAll(
    ".dayCard-calendar__div .mainCalendar .calendar>h2"
  );
  const weekdays = miniCalendarContainer.querySelectorAll(
    ".dayCard-calendar__div .days__container .weekDay"
  );

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

export { createMiniCalendar };
