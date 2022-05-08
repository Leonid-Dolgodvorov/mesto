import { initialCards } from "./cards.js";
import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";

const profileEditButton = document.querySelector ('.profile__edit');
const profilePopup = document.querySelector('.popup_type_profile');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const popupInputName = profilePopup.querySelector('.popup__input_type_name');
const popupInputJob = profilePopup.querySelector('.popup__input_type_job');
const placePopup = document.querySelector('.popup_type_add-place');
const popupInputPlace = placePopup.querySelector('.popup__input_type_place');
const popupInputPlaceLink = placePopup.querySelector('.popup__input_type_place-link');
const popupFormName = document.querySelector('.popup__form_type_name');
const popupFormPlace = document.querySelector('.popup__form_type_place');
const imagePopup = document.querySelector('.popup_type_image');
const elementsList = document.querySelector('.elements__list');
const elementAdd = document.querySelector('.profile__add-button');

const settings = {
  form: '.popup__form',
  formInput: '.popup__input',
  buttonElement: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_invalid',
  errorClass: '.popup__error',
  errorActiveClass: 'popup__error_active', 
}

const newProfileForm = document.forms.newProfileForm;
const newPlaceForm = document.forms.newPlaceForm;

const newProfileFormValidator = new FormValidator(settings, newProfileForm);
newProfileFormValidator.enableValidation();

const newPlaceFormValidator = new FormValidator(settings, newPlaceForm);
newPlaceFormValidator.enableValidation();

const openPopup = (popup) => () => { 
  popup.classList.add('popup_opened');
  popup.addEventListener("click", overlayClose);
  document.addEventListener("keydown", onDocumentKeyUp);
};

const closePopup = (popup) => () => { 
  popup.classList.remove('popup_opened');
  popup.removeEventListener("click", overlayClose);
  document.removeEventListener("keydown", onDocumentKeyUp);
};

const onDocumentKeyUp = (event) => {
  if (event.key === "Escape") {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened)();
  }
}

const overlayClose = (evt) => {
  if (evt.target === evt.currentTarget ||
  evt.target.classList.contains("popup__close-button")) {
    closePopup(evt.currentTarget)();
  }
}

const openProfileEdit = () => {
  newProfileFormValidator.resetForm();
  popupInputName.value = profileName.textContent;
  popupInputJob.value = profileJob.textContent;
  openPopup(profilePopup)();
}

const openAddPlace = () => {
  newPlaceFormValidator.resetForm();
  newPlaceFormValidator.disableSubmitButton();
  popupInputPlace.value ='';
  popupInputPlaceLink.value ='';
  openPopup(placePopup)();
}

const handleSaveProfile = (e) => {
  e.preventDefault();
  profileName.textContent = popupInputName.value;
  profileJob.textContent = popupInputJob.value;
  closePopup(profilePopup)();
};

const createElement = (cardData) => {
  const newElement = new Card(cardData, "#element-template", openPopup(imagePopup))
  return newElement.createCard();
};

const renderElement = (cardData) => {
  elementsList.prepend(createElement(cardData));
};

const handleRenderNewElement = (e) => {
  e.preventDefault();
  const newElement = { name: popupInputPlace.value, link: popupInputPlaceLink.value };
  renderElement(newElement);
  newPlaceFormValidator.disableSubmitButton();
  closePopup(placePopup)();
};

initialCards.forEach((cardData) => renderElement(cardData));

profileEditButton.addEventListener('click', openProfileEdit);
popupFormName.addEventListener('submit', handleSaveProfile);
elementAdd.addEventListener("click", openAddPlace);
popupFormPlace.addEventListener("submit", handleRenderNewElement);