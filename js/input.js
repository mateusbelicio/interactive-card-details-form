class Input {
  _defaultValues = {
    number: '0000 0000 0000 0000',
    name: 'Jane Appleseed',
    month: '00',
    year: '00',
    cvc: '000',
  };

  constructor(input) {
    this._input = input;
    this._field = input.closest('.form__field');
    this._error = this._field.querySelector('.form__error-msg');
    this._type = input.id;
    this._cardElement = document.querySelector(`.card__${this._type}`);

    this._addHandlerChangeValue.bind(this)();
  }

  _renderValue() {
    this._cardElement.textContent = this._input.value || this._defaultValues[this._type];
  }

  _addHandlerChangeValue() {
    this._input.addEventListener('input', this._renderValue.bind(this));
  }
}

export const inputName = new Input(document.getElementById('name'));
export const inputNumber = new Input(document.getElementById('number'));
export const inputMonth = new Input(document.getElementById('month'));
export const inputYear = new Input(document.getElementById('year'));
export const inputCode = new Input(document.getElementById('cvc'));
