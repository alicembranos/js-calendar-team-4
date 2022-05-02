class Event {

    constructor(title, description, initDate, existsEndDate, endDate, reminder, reminderTime, type) {
        this.title = title;
        this.description = description;
        this.initDate = initDate;
        this.endDate = !existsEndDate ? null : endDate;
        this.reminder = reminder;
        this.reminderTime = reminderTime;
        this.type = type;
        this.finnished = false;
        //this.form= form;
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
        if (this.title == "" || this.title == null || this.initDate == "" || this.initDate == null) {
            return false;
        };
        return true;
    }

    checkTitle() {
        if (this.title.lenght > 60) {
            return false;
        }
    }

    checkInitDate() {
        if (new Date().getMonth !== this.initDate.getMonth) {
            return false;
        }
    }

    checkEndDate() {
        if (this.initDate.getTime() > this.endDate.getTime()) {
            return false;
        }
    }

    requiredMessages(name) {
        return `${name} field is required.`
    }

    errorMessages(name) {
        switch (name) {
            case this.title:
                return 'Title max lenght is 60 characters.';
            case this.initDate:
                return 'Initial date must be selected in the current month.';
            case this.endDate:
                return 'End date must be greater than initial date.';
            default:
                break;
        }
    }
    //description limit input 500 characters

}