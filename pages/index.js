import { initialCards } from "../utils/constants.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import Popup from "../components/Popup.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import FormValidator from "../components/FormValidator.js";

const profileEditButton = document.querySelector ('.profile__edit');
/* const profilePopup = document.querySelector('.popup_type_profile'); */
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const popupInputName = document.querySelector('.popup__input_type_name');
const popupInputJob = document.querySelector('.popup__input_type_job');
/* const placePopup = document.querySelector('.popup_type_add-place'); */
/* const popupInputPlace = placePopup.querySelector('.popup__input_type_place');
const popupInputPlaceLink = placePopup.querySelector('.popup__input_type_place-link'); */
const popupFormName = document.querySelector('.popup__form_type_name');
const popupFormPlace = document.querySelector('.popup__form_type_place');
/* const imagePopup = document.querySelector('.popup_type_image'); */
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

const imagePopup = new PopupWithImage('.popup_type_image');

const renderCard = (data) => {
  const newCard = new Card(data, "#element-template", () => {
    imagePopup.open(data);
  })
  return newCard.createCard();
}

const cardList = new Section({ 
  items: initialCards, 
  renderer: (item) => {
    cardList.addItem(renderCard(item), 'end');
  }
}, '.elements__list');

cardList.rendererItems();

const userInfo = new UserInfo({ 
  nameSelector: profileName, 
  jobSelector: profileJob
});

const profilePopup = new PopupWithForm( 
  '.popup_type_profile', 
  {
    handleSubmit: (input) => {
    userInfo.setUserInfo(input);
    profilePopup.close();
  }
});

const placePopup = new PopupWithForm(
  '.popup_type_add-place', 
  {
    handleSubmit: (newPlaceInfo) => {
      const inputPlaceInfo = {
        name: newPlaceInfo.place,
        link: newPlaceInfo.link
      }
      cardList.addItem(renderCard(inputPlaceInfo), 'start');

      placePopup.close();
    }
  }
)

profileEditButton.addEventListener('click', () => { 
  const currentUserInfo = userInfo.getUserInfo();
  popupInputName.value = currentUserInfo.name;
  popupInputJob.value = currentUserInfo.job;
  newProfileFormValidator.disableSubmitButton();
  newProfileFormValidator.resetForm();

  profilePopup.open()
});

elementAdd.addEventListener("click", () => {
  newPlaceFormValidator.disableSubmitButton();
  newPlaceFormValidator.resetForm();
  placePopup.open() 
});

imagePopup.setEventListeners();
profilePopup.setEventListeners();
placePopup.setEventListeners();