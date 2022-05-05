/* проверка для pusha с ноута
 */
import { initialCards } from "./cards.js";
import { Card } from "./card.js";
import { settings, disableSubmitButton, resetForm } from "./validate.js";

const profileEditButton = document.querySelector ('.profile__edit');
const profilePopup = document.querySelector('.popup_type_profile');
const profilePopupClose = profilePopup.querySelector('.popup__close-button');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const popupInputName = profilePopup.querySelector('.popup__input_type_name');
const popupInputJob = profilePopup.querySelector('.popup__input_type_job');
const placePopup = document.querySelector('.popup_type_addplace');
const placePopupClose = placePopup.querySelector('.popup__close-button');
const popupInputPlace = placePopup.querySelector('.popup__input_type_place');
const popupInputPlaceLink = placePopup.querySelector('.popup__input_type_place-link');
const popupFormName = document.querySelector('.popup__form_type_name');
const popupFormPlace = document.querySelector('.popup__form_type_place');
const imagePopup = document.querySelector('.popup_type_image');
const imagePopupClose = imagePopup.querySelector('.popup__close-button');
const elementsList = document.querySelector('.elements__list');
const elementAdd = document.querySelector('.profile__add-button');
const newCardSubmitButton = document.querySelector('.popup__save-button_new-element');

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
  if (evt.target === evt.currentTarget) {
  closePopup(evt.target.closest('.popup_opened'))();
  }
}

function openProfileEdit () {
  openPopup(profilePopup)();
  resetForm();
  popupInputName.value = profileName.textContent;
  popupInputJob.value = profileJob.textContent;
}

function openAddPlace () {
  openPopup(placePopup)();
  resetForm();
  disableSubmitButton(newCardSubmitButton, settings);
}

function handleSaveProfile (e) {
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
  closePopup(placePopup)();
  disableSubmitButton(newCardSubmitButton, settings);
  popupInputPlace.value = '';
  popupInputPlaceLink.value = '';
};

initialCards.forEach((cardData) => renderElement(cardData));

profileEditButton.addEventListener('click', openProfileEdit);
profilePopupClose.addEventListener('click', closePopup(profilePopup));
popupFormName.addEventListener('submit', handleSaveProfile);
elementAdd.addEventListener("click", openAddPlace);
popupFormPlace.addEventListener("submit", handleRenderNewElement);
placePopupClose.addEventListener('click', closePopup(placePopup));
imagePopupClose.addEventListener('click', closePopup(imagePopup));