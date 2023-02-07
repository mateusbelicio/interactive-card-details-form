class Input {
  valid = false;

  constructor(input) {
    this._input = input;
    this._type = input.id;
    this._field = input.closest('.form__field');
    this._error = this._field.querySelector('.form__error-msg');
    this._cardElement = document.querySelector(`.card__${this._type}`);

    this._addHandlerInputValue();
  }

  /**
   * Checks whether the validation is correct or not
   * @public
   * @returns {Boolean} [true | false]
   */
  isValidValue() {
    return this._validade(this._input.value);
  }

  /**
   * Checks if the current input is empty
   * @public
   * @returns {Boolean} [true | false] - true if input is empty and false otherwise
   */
  isBlank() {
    return this._input.value === '' ? true : false;
  }

  /**
   * Renders the error message according to the error type
   * @public
   * @param {Boolean} blankMsg - If true, the error message will indicate that the input is empty, otherwise it will indicate that there is an error in the format of the input
   */
  renderErrorMessage(blankMsg = true) {
    this._error.textContent = blankMsg ? "Can't be blank" : this.errorMessage;
  }

  /**
   * Renders the error alert
   * @public
   */
  renderErrorAlert() {
    this._input.dataset.valid = false;
    this.valid = false;
  }

  /**
   * Clears the messages that indicate the error
   * @public
   */
  clearErrorMessage() {
    this._error.textContent = '';
  }

  /**
   * Clears the alerts that indicate the error
   * @public
   */
  clearErrorAlert() {
    this._input.dataset.valid = true;
    this.valid = true;
  }

  /**
   * Clears the error messages, the current input values ​​and the data displayed on the card
   * @public
   */
  clearAll() {
    this.clearErrorMessage();
    this.clearErrorAlert();
    this._input.value = '';
    this.renderValue();
  }

  /**
   * Render the input value on the card
   * @public
   */
  renderValue() {
    this._cardElement.textContent = this._input.value || this._placeholder;
  }

  /**
   * Changes the input value to match the mask value
   * @private
   */
  _maskValue() {
    this._input.value = this._mask(this._input.value);
  }

  /**
   * Adds an event handler on inputs
   * @private
   */
  _addHandlerInputValue() {
    this._input.addEventListener('input', () => {
      this._maskValue();
      this.renderValue();
    });
  }
}

// CLASS NUMBER =================================================
class InputNumber extends Input {
  _placeholder = '0000 0000 0000 0000';
  errorMessage = 'Wrong format, some numbers are missing';

  constructor(input) {
    super(input);
  }

  /**
   * Changes the input value to match the allowed and desired input type
   * @private
   * @param {String} value - the current value on the input
   * @returns {String} the changed value to match the mask value
   */
  _mask(value) {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{4})(\d)/, '$1 $2')
      .replace(/(\d{4})(\d)/, '$1 $2')
      .replace(/(\d{4})(\d)/, '$1 $2')
      .replace(/(\s\d{4})\d+?$/, '$1');
  }

  /**
   * Checks if the input value is valid
   * @private
   * @param {String} value - the current value on the input
   * @returns {Boolean} [true | false] - if true, the input is valid and no errors are displayed
   */
  _validade(value) {
    return value.length < this._placeholder.length ? false : true;
  }
}

// CLASS NAME =================================================
class InputName extends Input {
  _placeholder = 'Jane Appleseed';
  errorMessage = 'Wrong format';

  constructor(input) {
    super(input);
  }

  /**
   * Changes the input value to match the allowed and desired input type
   * @private
   * @param {String} value - the current value on the input
   * @returns {String} the changed value to match the mask value
   */
  _mask(value) {
    return value.replace(/[0-9!@#¨$%^&*)(+=._,.;/[{}?'"\]\\-]+/g, '');
  }

  /**
   * Checks if the input value is valid
   * @private
   * @param {String} value - the current value on the input
   * @returns {Boolean} [true | false] - if true, the input is valid and no errors are displayed
   */
  _validade(value) {
    const invalidsChar = /([()[\]{},.;~^´`-])/;

    if ([...value].some((char) => invalidsChar.test(char))) return false;
    if (![...value].some((char) => char === ' ')) return false;
    if (value.split(' ').some((word) => word.length === 0)) return false;

    return true;
  }
}

// CLASS MONTH =================================================
class InputMonth extends Input {
  _placeholder = '00';
  errorMessage = 'Invalid date';

  constructor(input) {
    super(input);
  }

  /**
   * Checks if the month entered is valid
   * @returns {Boolean} [true | false] - True is the month is valid
   */
  dateIsValid() {
    const month = +this._field.querySelector('#month').value;
    const year = +this._field.querySelector('#year').value;

    const date = new Date().toISOString().split('-');
    const currentMonth = +date[1];
    const currentYear = +date[0].slice(-2);

    if (year === currentYear && month < currentMonth) return false;
    return true;
  }

  /**
   * Changes the input value to match the allowed and desired input type
   * @private
   * @param {String} value - the current value on the input
   * @returns {String} the changed value to match the mask value
   */
  _mask(value) {
    return value
      .replace(/\D/g, '')
      .replace(/^([1-9]{1})/, '0$1')
      .replace(/^(0)0/, '$1')
      .replace(/^(0[2-9])\d/, '$1')
      .replace(/^0(1[0-2])/, '$1')
      .replace(/^(01)[3-9]/, '$1')
      .replace(/^(1[0-2])\d/, '$1')
      .replace(/^(1)([3-9])/, '$1');
  }

  /**
   * Checks if the input value is valid
   * @private
   * @param {String} value - the current value on the input
   * @returns {Boolean} [true | false] - if true, the input is valid and no errors are displayed
   */
  _validade(value) {
    return +value >= 1 && +value <= 12 && this.dateIsValid() ? true : false;
  }
}

// CLASS YEAR =================================================
class InputYear extends Input {
  _placeholder = '00';
  errorMessage = 'Invalid date';

  constructor(input) {
    super(input);
  }

  /**
   * Checks if the year entered is valid
   * @returns {Boolean} [true | false] - True is the year is valid
   */
  dateIsValid() {
    const month = +this._field.querySelector('#month').value;
    const year = +this._field.querySelector('#year').value;

    const date = new Date().toISOString().split('-');
    const currentYear = +date[0].slice(-2);

    if (year < currentYear || year > currentYear + 10) return false;
    return true;
  }

  /**
   * Changes the input value to match the allowed and desired input type
   * @private
   * @param {String} value - the current value on the input
   * @returns {String} the changed value to match the mask value
   */
  _mask(value) {
    return value.replace(/\D/g, '').replace(/(\d{2})\d+?$/, '$1');
  }

  /**
   * Checks if the input value is valid
   * @private
   * @param {String} value - the current value on the input
   * @returns {Boolean} [true | false] - if true, the input is valid and no errors are displayed
   */
  _validade(value) {
    if (value.length < 2 || !this.dateIsValid()) return false;
    return true;
  }
}

// CLASS CODE =================================================
class InputCode extends Input {
  _placeholder = '000';
  errorMessage = 'Wrong format, some numbers are missing';

  constructor(input) {
    super(input);
  }

  /**
   * Changes the input value to match the allowed and desired input type
   * @private
   * @param {String} value - the current value on the input
   * @returns {String} the changed value to match the mask value
   */
  _mask(value) {
    return value.replace(/\D/g, '').replace(/(\d{3})\d+?$/, '$1');
  }

  /**
   * Checks if the input value is valid
   * @private
   * @param {String} value - the current value on the input
   * @returns {Boolean} [true | false] - if true, the input is valid and no errors are displayed
   */
  _validade(value) {
    return value.length < this._placeholder.length ? false : true;
  }
}

export const name = new InputName(document.getElementById('name'));
export const number = new InputNumber(document.getElementById('number'));
export const month = new InputMonth(document.getElementById('month'));
export const year = new InputYear(document.getElementById('year'));
export const code = new InputCode(document.getElementById('cvc'));
