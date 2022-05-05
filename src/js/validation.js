import {
  formEvent
} from "./main.js";

import {
  Event
} from "./events.js";

import {
  saveEvents
} from "./localstorage.js";

import {modal} from "./utils.js";

function submitEventForm(e) {
  e.preventDefault();
  const title = formEvent.elements["title"];
  const endDateCheck = formEvent.elements["checkbox__endDate"];

  const reminderCheck = formEvent.elements["checkbox__reminder"];
  const reminder = formEvent.elements["select__reminder"];
  const description = formEvent.elements["description"];
  const type = formEvent.elements["select__eventType"];
  const initialLabel = formEvent.querySelector('label[for="initial"]');
  const endLabel = formEvent.querySelector('label[for="end"]');

  const initDate = new Date(
    `${formEvent.elements["initial__date"].value}T${formEvent.elements["initial__time"].value}`
  );

  const endDate = new Date(
    `${formEvent.elements["end__date"].value}T${formEvent.elements["end__time"].value}`
  );

  let newEvent = new Event(
    title.value,
    description.value,
    initDate,
    endDateCheck.checked,
    endDate,
    reminderCheck.checked,
    reminder.value,
    type.value
  );

  //Input required
  if (newEvent.checkRequiredInputs()) {
    addErrorMessage(title, newEvent.requiredMessages("Title"));
  } else {
    // Validate title
    if (newEvent.checkTitle(title.value.length)) {
      addErrorMessage(title, newEvent.errorMessages(title.name));
    } else {
      removeErrorMessage(title);
    }
  }

  //Validate Initial Date
  if (newEvent.checkInitDate()) {
    addErrorMessage(initialLabel, newEvent.errorMessages("initDate"));
  } else {
    removeErrorMessage(initialLabel);
  }

  //Validate End Date
  if (endDateCheck.checked) {
    if (newEvent.checkEndDate()) {
      addErrorMessage(endLabel, newEvent.errorMessages("endDate"));
    } else {
      removeErrorMessage(endLabel);
    }
  }

  if (!hasErrorMessages(formEvent)) {
    const dateDifference = endDate.getTime() - initDate.getTime();
    const numOfDays = Math.floor(dateDifference / (24 * 60 * 60 * 1000));
    const month = initDate.getMonth();
    const day = initDate.getDate();
    const year = initDate.getFullYear();
    if (endDateCheck.checked) {
      saveEvents(year, month, day, newEvent, numOfDays);

    } else {
      saveEvents(year, month, day, newEvent);
    }
    resetForm();
  }
}

//Add div error message
function addErrorMessage(input, message) {
  if (hasErrorMessage(input)) {
    input.nextElementSibling.firstElementChild.textContent = message;
  } else {
    input.classList.add("invalid");
    const error = createErrorMessage(message);
    input.insertAdjacentElement("afterend", error);
  }
}

//Remove div error message
function removeErrorMessage(input) {
  if (hasErrorMessage(input)) {
    input.classList.remove("invalid");
    input.nextElementSibling.remove();
  }
}

//Check if input has error message
function hasErrorMessage(input) {
  return input.classList.contains("invalid");
}

//Check if form has error messages
function hasErrorMessages(form) {
  return form.getElementsByClassName("invalid").length > 0;
}

//Create div error
function createErrorMessage(message) {
  let div = document.createElement("div");
  let p = document.createElement("p");
  div.classList.add("error-message");
  p.textContent = message;
  div.appendChild(p);
  return div;
}

function resetForm() {

  formEvent.querySelector('label[for="end"]').classList.add("hide");
  formEvent.querySelector('[name="select__reminder"]').classList.add("hide");
  // formEvent.reset();
  const invalidInputs = formEvent.querySelectorAll(".invalid");
  if (invalidInputs.length > 1) {
    invalidInputs.forEach(removeErrorMessage);
  }
  modal.classList.toggle("hide");
}

export {
  submitEventForm, resetForm
};