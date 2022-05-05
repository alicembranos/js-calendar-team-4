import { addClickListenertoEvent, formatDate, setReminder } from "./utils.js";
import { year } from "./main.js";

const eventsColor = [
  {
    type: "Meeting",
    color: "#DFF4E6",
  },
  {
    type: "Personal",
    color: "#FFC1AD",
  },
  {
    type: "Study",
    color: "#FFF68F",
  },
  {
    type: "Tinder",
    color: "#FF6379",
  },
];

const saveEvents = (year, month, day, event, duration = 0) => {
  // TODO: Save events to local storage with 3+ months of duration
  if (localStorage.getItem(`data-${year}`)) {
    let newEvent = JSON.parse(localStorage.getItem(`data-${year}`));

    for (let i = 0; i <= duration; i++) {
      if (newEvent[month].days[day - 1 + i]) {
        newEvent[month].days[day - 1 + i].events.push(event);
      } else {
        for (let j = 0; j <= duration - i; j++) {
          newEvent[month + 1].days[j].events.push(event);
        }
      }
    }
    localStorage.setItem(`data-${year}`, JSON.stringify(newEvent));
    getEventsFromLocalStorage(year);
    if (event.reminder) {
      if (new Date().getDate() == new Date(event.initDate).getDate()) {
        setReminder(event, year);
      }
    }
  }
};

const getEventsFromLocalStorage = (year) => {
  let localStorgeEvents = JSON.parse(localStorage.getItem(`data-${year}`));
  const monthArray = document.querySelectorAll(`[year = "${year}"]`);

  monthArray.forEach((month, index) => {
    let events = localStorgeEvents.find(
      (item) => item.nameOfMonth === month.getAttribute("data-month")
    );

    let ul_cell_calendars = month.querySelectorAll(".cell__calendar-events");

    ul_cell_calendars.forEach((cell, i) => {
      while (cell.children.length >= 1) {
        console.log("borras???");
        cell.removeChild(cell.lastChild);
      }
      events.days[i].events.forEach((event) => {
        createEventList(cell, event);
      });
    });
  });

  return localStorgeEvents;
};

const createEventList = (parent, event) => {
  const list = document.createElement("li");
  const span = document.createElement("span");

  const date = new Date(formatDate(event.initDate));
  // const date1= new Date(formatDate(event.initDate)).getTime();
  let formaterDate = date.toLocaleTimeString("en-US", {
    timeStyle: "short",
    hour12: true,
  });

  list.textContent = formaterDate;
  span.textContent = `${event.title}`;

  list.appendChild(span);
  list.setAttribute("data-id", new Date(event.initDate).getTime());
  list.classList.add("eventItem__li--style");

  if (event.finnished) {
    list.classList.add("event-done-list");
  }
  addClickListenertoEvent(list, event, year);

  parent.appendChild(list);
};

export { saveEvents, getEventsFromLocalStorage };
