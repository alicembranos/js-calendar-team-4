import {addClickListenertoEvent, formatDate} from  "./utils.js"

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
  }
};

const getEventsFromLocalStorage = (year) => {
  let localStorgeEvents = JSON.parse(localStorage.getItem(`data-${year}`));
  const monthArray = document.querySelectorAll("[year='2022']");

  monthArray.forEach((month, index) => {
    let events = localStorgeEvents.find(
      (item) => item.nameOfMonth === month.getAttribute("data-month")
    );
    let ul_cell_calendars = month.querySelectorAll(".cell__calendar-events");

    ul_cell_calendars.forEach((cell, i) => {
      events.days[i].events.forEach((event) => {
        createEventList(cell, event);
      });
    });
  });

  return localStorgeEvents;
};

const createEventList = (parent, event) => {

  while (parent.children.length > 1) {
    parent.removeChild(parent.lastChild);
  };

  const list = document.createElement("li");
  const span = document.createElement("span");

  const date = new Date(formatDate(event.initDate));
  const date1= new Date(formatDate(event.initDate)).getTime();
  let formaterDate = date.toLocaleTimeString("en-US", {
    timeStyle: "short",
    hour12: true,
  });

  list.textContent = formaterDate;
  span.textContent = `${event.title}`;

  list.appendChild(span);
  list.setAttribute("data-id", date1);
  
  if (event.finnished) {
    list.classList.add("event-done-list");
  }
  addClickListenertoEvent(list, event);
  parent.appendChild(list);
};

export {
  saveEvents,
  getEventsFromLocalStorage
};