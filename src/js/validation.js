import { formEvent } from "./main.js";

import {
    Event
  } from "./events.js";

import {
    saveEvents
} from "./localstorage.js";

  formEvent.elements['checkbox__endDate'].addEventListener("change", () => {
    const inputDateEnd = formEvent.querySelector('label[for=end]');
    inputDateEnd.classList.toggle('hide');
  });
  
  formEvent.elements['checkbox__reminder'].addEventListener("change", () => {
    const reminder = formEvent.querySelector('label[for=select__reminder]');
    reminder.classList.toggle('hide');
  });
  
  formEvent.addEventListener("submit", submitEventForm);
  
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
  
    let newEvent = new Event(title.value, description.value, initDate, endDateCheck, endDate, reminderCheck, reminder.value, type.value);
  
  
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
      console.log('entra');
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
      //add to calendar

    };
  
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
    formEvent.querySelector('select__reminder]').classList.add("hide");
    formEvent.reset();
    const invalidInputs = formEvent.querySelector('.invalid');
    invalidInputs.forEach(removeErrorMessage);
  }