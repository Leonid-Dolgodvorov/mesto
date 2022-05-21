import './index.css';
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import FormValidator from "../components/FormValidator.js";
import { 
  initialCards,
  profileEditButton,
  profileName,
  profileJob,
  popupInputName,
  popupInputJob,
  elementAdd,
  validationSettings,
  newProfileForm,
  newPlaceForm
 } from "../utils/constants.js";

const newProfileFormValidator = new FormValidator(validationSettings, newProfileForm);
newProfileFormValidator.enableValidation();

const newPlaceFormValidator = new FormValidator(validationSettings, newPlaceForm);
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