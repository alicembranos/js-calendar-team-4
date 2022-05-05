export class Event {

    constructor(title, description, initDate, existsEndDate, endDate, reminder, reminderTime, type) {
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

    createEventMessage() {
        return `${this.title} has been succesfully added to your calendar.`;
    }

    removeEventMessage() {
        return `${this.title} has been succesfully removed from your calendar`;
    }

    checkRequiredInputs() {
        if (this.title == "" || this.title == null) {
            return true;
        } 
    }

    //Less than 60 characters
    checkTitle(num) {
        if (num > 60) {
            return true;
        }
    }

    //Init date is in the current month
    checkInitDate() {
        if (((new Date()).getMonth() !== this.initDate.getMonth()) || new Date() >= this.initDate) {
            return true;
        }
    }

    //End date is greater than init date
    checkEndDate() {
        if (this.initDate.getTime() > this.endDate.getTime()) {
            return true;
        }
    }

    checkReminder() {
        if(this.reminder && this.reminderTime == "") {
            return true;
        }
    }

    requiredMessages(name) {
        return `${name} field is required.`
    }

    errorMessages(name) {
        switch (name) {
            case "title":
                return 'Title max lenght is 60 characters.';
            case "initDate":
                return 'Initial date must be in the current month or greater than the current day.';
            case "endDate":
                return 'End date must be greater than initial date.';
            case "reminder":
                return 'You must select a reminder time.';
            default:
                break;
        }
    }
    //description limit input 500 characters

}