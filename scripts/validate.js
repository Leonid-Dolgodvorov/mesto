const formForValidation = {
  form: '.popup__form',
  formInput: '.popup__input',
  buttonElement: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_invalid',
  errorClass: 'popup__error_active',
  closeButton: '.popup__close-button',
}

const inputErrorActive = (formElement, inputElement, errorMessage, config) => {
  const errorElement = formElement.querySelector(`.popup__error_type_${inputElement.id}`);
  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.errorClass);
};

const inputErrorHide = (formElement, inputElement, config) => {
  const errorElement = formElement.querySelector(`.popup__error_type_${inputElement.id}`);
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.classList.remove(config.errorClass);
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement, config) => {
  if (!inputElement.validity.valid) {
    inputErrorActive(formElement, inputElement, inputElement.validationMessage, config);
  } 
  else if (inputElement.value === "") {
    inputErrorActive(formElement, inputElement, inputElement.validationMessage, config);
  }
  else {
    inputErrorHide(formElement, inputElement, config);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  }); 
}

const toggleButtonState = (inputList, buttonElement, config) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(config.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(config.inactiveButtonClass);
    buttonElement.disabled = false;
  } 
}

const setEventListeners = (formElement, config) => {
  const inputList = Array.from(formElement.querySelectorAll(config.formInput));
  const buttonElement = formElement.querySelector(config.buttonElement);
  toggleButtonState(inputList, buttonElement, config);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, config);
      toggleButtonState(inputList, buttonElement, config);
    });
  });
};

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.form));
  formList.forEach((formElement) => {
  formElement.addEventListener('submit', (evt) => {
  });
    setEventListeners(formElement, config);
});
}

const disableSubmitButton = (buttonElement, config) => {
  buttonElement.classList.add(config.inactiveButtonClass);
  buttonElement.disabled = true;
}

const resetForm = () => {
  const errorInputList = Array.from(document.querySelectorAll('.popup__input'));
  const errorList = Array.from(document.querySelectorAll('.popup__error'));
  errorList.forEach((errorElement) => {
    errorElement.classList.remove('popup__error_active');
    errorElement.textContent = "";
  });
  errorInputList.forEach((inputElement) => {
    inputElement.classList.remove('popup__input_invalid');
    inputElement.value = "";
  });
}

enableValidation(formForValidation);