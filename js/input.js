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

    this._addHandlerChangeValue();
  }

  _renderValue() {
    this._cardElement.textContent = this._input.value || this._defaultValues[this._type];
  }

  _maskValue() {
    const inputValue = this._input.value;
    const defaultValue = this._defaultValues[this._type];
    const currentValue = this._cardElement.textContent;

    if (
      this._type !== 'name' &&
      (inputValue.length > defaultValue.length ||
        isNaN(inputValue.slice(-1)) ||
        inputValue.slice(-1) === ' ')
    ) {
      this._input.value = inputValue.slice(0, -1);
    }

    if (this._type === 'number' && inputValue.length >= currentValue.length) {
      if (
        this._input.value.length === 4 ||
        this._input.value.length === 9 ||
        this._input.value.length === 14
      )
        this._input.value += ' ';
    }
  }

  _addHandlerChangeValue() {
    this._input.addEventListener('input', () => {
      this._maskValue();
      this._renderValue();
    });
  }
}

export const inputName = new Input(document.getElementById('name'));
export const inputNumber = new Input(document.getElementById('number'));
export const inputMonth = new Input(document.getElementById('month'));
export const inputYear = new Input(document.getElementById('year'));
export const inputCode = new Input(document.getElementById('cvc'));
