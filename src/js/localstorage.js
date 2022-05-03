function saveEvents(year, month, day, event, duration) {
    if (localStorage.getItem(`data-${year}`)) {
        let newEvent = JSON.parse(localStorage.getItem(`data-${year}`));
        for (let i = 0; i <= duration; i++) {
            newEvent[month].days[day - 1 + i].events.push(event);
        }
    }
}

export {saveEvents};