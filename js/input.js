class Input {
  valid = false;
  _typesDefinitions = {
    number: {
      placeholder: '0000 0000 0000 0000',
      mask(value) {
        return value
          .replace(/\D/g, '')
          .replace(/(\d{4})(\d)/, '$1 $2')
          .replace(/(\d{4})(\d)/, '$1 $2')
          .replace(/(\d{4})(\d)/, '$1 $2')
          .replace(/(\s\d{4})\d+?$/, '$1');
      },
    },
    name: {
      placeholder: 'Jane Appleseed',
      mask(value) {
        return value.replace(/[0-9!@#¨$%^&*)(+=._,.;/[{}?'"\]\\-]+/g, '');
      },
    },
    month: {
      placeholder: '00',
      mask(value) {
        return value
          .replace(/\D/g, '')
          .replace(/^([2-9]{1})/, '0$1')
          .replace(/^(0)0/, '$1')
          .replace(/^(0[1-9])\d/, '$1')
          .replace(/^(1[0-2])\d/, '$1')
          .replace(/^(1)([3-9])/, '$1');
      },
    },
    year: {
      placeholder: '00',
      mask(value) {
        return value.replace(/\D/g, '').replace(/(\d{2})\d+?$/, '$1');
      },
    },
    cvc: {
      placeholder: '000',
      mask(value) {
        return value.replace(/\D/g, '').replace(/(\d{3})\d+?$/, '$1');
      },
    },
  };

  constructor(input) {
    this.input = input;
    this._field = input.closest('.form__field');
    this._error = this._field.querySelector('.form__error-msg');
    this._type = input.id;
    this._cardElement = document.querySelector(`.card__${this._type}`);

    this._addHandlerInputValue();
  }

  renderError(msg = "Can't be blank") {
    this._error.textContent = msg;
    this.input.dataset.valid = false;
    this.valid = false;
  }

  clearError() {
    this._error.textContent = '';
    this.input.dataset.valid = true;
    this.valid = true;
  }

  clearAll() {
    this.clearError();
    this.input.value = '';
  }

  _renderValue() {
    this._cardElement.textContent =
      this.input.value || this._typesDefinitions[this._type].placeholder;
  }

  _maskValue() {
    this.input.value = this._typesDefinitions[this._type].mask(this.input.value);
  }

  _addHandlerInputValue() {
    this.input.addEventListener('input', () => {
      this._maskValue();
      this._renderValue();
    });
  }
}

const inputName = new Input(document.getElementById('name'));
const inputNumber = new Input(document.getElementById('number'));
const inputMonth = new Input(document.getElementById('month'));
const inputYear = new Input(document.getElementById('year'));
const inputCode = new Input(document.getElementById('cvc'));

export const inputs = [inputName, inputNumber, inputMonth, inputYear, inputCode];
