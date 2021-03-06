import {
  addClickListenertoEvent,
  formatDate,
  setReminder
} from "./utils.js";
import {
  year
} from "./main.js";

const eventsColor = [{
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
  const eventList = document.getElementById("dayCard__ul");
  createEventList(eventList, event);
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

  monthArray.forEach((month) => {
    let events = localStorgeEvents.find(
      (item) => item.nameOfMonth === month.getAttribute("data-month")
    );

    let ul_cell_calendars = month.querySelectorAll(".cell__calendar-events");

    ul_cell_calendars.forEach((cell, i) => {
      while (cell.children.length >= 1) {
        cell.removeChild(cell.lastChild);
      }
      orderList(events.days[i].events);
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
  span.classList.add("eventItem__span--style");

  list.appendChild(span);
  list.setAttribute("data-id", new Date(event.initDate).getTime());
  list.classList.add("eventItem__li--style");
  styleBackgroundEvent(list, event.type);

  if (event.finnished) {
    list.classList.add("event-done-list");
  }
  addClickListenertoEvent(list, event, year);

  parent.appendChild(list);
};

function orderList(array) {
  array.sort(function (obj1, obj2) {
    let date1 = new Date(obj1.initDate).getTime();
    let date2 = new Date(obj2.initDate).getTime();
    return date1 - date2;
  });
}

//Give style to events list item depending on type of meeting
function styleBackgroundEvent(li, type) {
  const colorMeeting = eventsColor
    .filter((item) => item.type === type)
    .map((el) => el.color);
  li.style.backgroundColor = colorMeeting;
}

export {
  saveEvents,
  getEventsFromLocalStorage,
  createEventList
};