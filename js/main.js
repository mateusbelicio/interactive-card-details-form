import * as inputs from './input.js';

// Selecting DOM elements
const form = document.querySelector('.form');
const continueButton = document.querySelector('.details__complete-state .btn');

// Separating inputs according to their fieldsets
const dateInputs = [inputs.month, inputs.year];
const noDateInputs = [inputs.name, inputs.number, inputs.code];
const allInputs = [inputs.name, inputs.number, inputs.month, inputs.year, inputs.code];

/**
 * Controls the form checking all inputs to validade and submit the form
 * @param {Event} event - stores the event object with information about the triggered event
 */
const controlForm = function (event) {
  event.preventDefault();

  // Checking if the inputs that not represents the expiration date are valids
  noDateInputs.forEach((i) => {
    if (i.isValidValue()) {
      i.clearErrorAlert();
      i.clearErrorMessage();
    } else if (i.isBlank()) {
      i.renderErrorAlert();
      i.renderErrorMessage();
    } else {
      i.renderErrorMessage(false);
      i.renderErrorAlert();
    }
  });

  // Checking if the expiration date inputs are valids
  dateInputs.forEach((i) => {
    if (i.isValidValue()) {
      i.clearErrorAlert();
    } else if (i.isBlank()) {
      i.renderErrorAlert();
      i.renderErrorMessage();
    } else {
      i.renderErrorMessage(false);
      i.renderErrorAlert();
    }
  });

  // Checking if ALL the expiration date inputs are valids to clear the error message
  dateInputs.every((i) => i.isValidValue()) && inputs.year.clearErrorMessage();

  // Submiting the form case all inputs are valids
  if (allInputs.every((i) => i.valid === true)) {
    document.querySelector('.details__form').dataset.validaded = true;
  }
};

//////////////////////////////////////////////////////
// EVENTS HANDLERS
form.addEventListener('submit', controlForm);

continueButton.addEventListener('click', () => {
  document.querySelector('.details__form').dataset.validaded = false;
  allInputs.forEach((i) => i.clearAll());
});

window.addEventListener('load', () => {
  allInputs.forEach((i) => i.renderValue());
});
