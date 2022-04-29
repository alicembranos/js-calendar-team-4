class Event {
    
    constructor(title, description, initDate, existsEndDate, endDate, reminder, reminderTime, type, finnished) {
        this.title = title;
        this.description = description;
        this.initDate = initDate;
        this.endDate = !existsEndDate ? null : endDate;
        this.reminder = reminder;
        this.reminderTime = reminderTime;
        this.type = type;
        this.finnished = false;
    }

    setFinnished(value) {
        this.finnished = value;
    }

}