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
  }
};

const getEventsFromLocalStorage = (year) => {
  let localStorgeEvents = JSON.parse(localStorage.getItem(`data-${year}`));
  const monthArray = document.querySelectorAll("[year='2022']");

  monthArray.forEach((month, index) => {
    let events = localStorgeEvents.find(
      (item) => item.nameOfMonth === month.getAttribute("name")
    );
    let ul_cell_calendars = month.querySelectorAll(".cell__calendar-events");
    // console.log(ul_cell_calendars);

    ul_cell_calendars.forEach((cell, i) => {
      events.days[i].events.forEach((event) => {
        createEventList(cell, event.title, event.initDate);
      });
    });
  });
};

const createEventList = (parent, title, time) => {
  const list = document.createElement("li");
  const span = document.createElement("span");

  const date = new Date(time);
  let formatDate = date.toLocaleTimeString("en-US", {
    timeStyle: "short",
    hour12: true,
  });

  list.textContent = formatDate;
  span.textContent = `${title}`;

  list.appendChild(span);
  parent.appendChild(list);
};

export { saveEvents, getEventsFromLocalStorage, createEventList };
