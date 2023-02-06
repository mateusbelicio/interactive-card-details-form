import { inputs } from './input.js';

const form = document.querySelector('.form');
const continueButton = document.querySelector('.details__complete-state .btn');

const validadeInputs = function () {
  inputs.forEach((i) => {
    if (i.input.value.length === 0) i.renderError();
    else i.clearError();
  });

  if (inputs.every((i) => i.valid === true)) {
    document.querySelector('.details__form').dataset.validaded = true;
  }
};

const controlForm = function (event) {
  event.preventDefault();
  validadeInputs();
};

form.addEventListener('submit', controlForm);
continueButton.addEventListener('click', () => {
  document.querySelector('.details__form').dataset.validaded = false;
  inputs.forEach((i) => i.clearAll());
});
