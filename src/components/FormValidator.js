export default class FormValidator {
  constructor(config, form) {
    this._config = config;
    this._form = form;
    this._button = this._form.querySelector(this._config.buttonElement);
    this._inputList = Array.from(this._form.querySelectorAll(this._config.formInput));
    this._errorList = Array.from(this._form.querySelectorAll(this._config.errorClass));
  }

_inputErrorActive = (inputElement, errorMessage) => {
  const errorElement = this._form.querySelector(`.popup__error_type_${inputElement.id}`);
  inputElement.classList.add(this._config.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(this._config.errorActiveClass);
};

_inputErrorHide = (inputElement) => {
  const errorElement = this._form.querySelector(`.popup__error_type_${inputElement.id}`);
  inputElement.classList.remove(this._config.inputErrorClass);
  errorElement.classList.remove(this._config.errorActiveClass);
  errorElement.textContent = '';
};

_checkInputValidity = (inputElement) => {
  if (!inputElement.validity.valid) {
    this._inputErrorActive(inputElement, inputElement.validationMessage);
  } 
  else if (inputElement.value === "") {
    this._inputErrorActive(inputElement, inputElement.validationMessage);
  }
  else {
    this._inputErrorHide(inputElement);
  }
}

_hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  }); 
}

_toggleButtonState = () => {
  if (this._hasInvalidInput(this._inputList)) {
    this.disableSubmitButton();
  } else {
    this._button.classList.remove(this._config.inactiveButtonClass);
    this._button.disabled = false;
  } 
}

_setEventListeners = () => {
  this._toggleButtonState();
  this._inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {    
      this._checkInputValidity(inputElement);
      this._toggleButtonState();
    });
  });
}

enableValidation = () => {
  this._setEventListeners();
}

disableSubmitButton = () => {
  this._button.classList.add(this._config.inactiveButtonClass);
  this._button.disabled = true;
}

resetForm = () => {
  this._inputList.forEach((inputForm) => {
    this._inputErrorHide(inputForm);
  });
}
}