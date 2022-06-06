import './index.css';
import Api from "../components/Api.js"
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupDeleteConfirm from "../components/PopupDeleteConfirm.js"
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import FormValidator from "../components/FormValidator.js";
import {
  avatarEdit,
  profileEditButton,
  popupInputName,
  popupInputJob,
  cardAddButton,
  validationSettings,
  newProfileForm,
  newPlaceForm,
  newAvatarForm
 } from "../utils/constants.js";

const api = new Api({
  url: "https://mesto.nomoreparties.co/v1/cohort-42/",
  headers: {
    "Content-Type": "application/json",
    authorization: "99d52bd8-e655-4215-bbec-aa898a3f57c0",
  },
});

const loading = (popupSelector, processInProgress) => {
  const saveButton = document.querySelector(popupSelector).querySelector('.popup__save-button');

  if (processInProgress) {
    saveButton.textContent = 'Загрузка…';
  }
  else {
    saveButton.textContent = 'Сохранить';
  }
}

const newProfileFormValidator = new FormValidator(validationSettings, newProfileForm);
newProfileFormValidator.enableValidation();

const newPlaceFormValidator = new FormValidator(validationSettings, newPlaceForm);
newPlaceFormValidator.enableValidation();

const newAvatarFormValidator = new FormValidator(validationSettings, newAvatarForm);
newAvatarFormValidator.enableValidation();

const imagePopup = new PopupWithImage('.popup_type_image');

const deletePopup = new PopupDeleteConfirm('.popup_type_delete', ( { card, cardId } ) => {
  loading('.popup_type_delete', true)
  api.deleteCard(cardId)
    .then(() => {
      card.remove();
      loading('.popup_type_delete', false)
      deletePopup.close();
      })
    .catch((error) => {
      console.log(error);
      loading('.popup_type_delete', false)
      })
  }
)

const renderCard = (data, userData) => {
  const newCard = new Card(
    data, 
    "#card-template", 
    {
      handleCardClick: () => { imagePopup.open(data) },
      handleDeleteCard: (card, cardId) => {
        deletePopup.open({ card, cardId });
        },
      handleLikeClick: (cardId) => {
        if (newCard.checkLike()) {
          api.deleteLike(cardId)
            .then((data) => {
              newCard.likeCountCard(data);
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          api.addLike(cardId)
            .then((data) => {
              newCard.likeCountCard(data);
            })
            .catch((err) => {
              console.log(err);
            });
        }
      },
      userData: userData
    }
  )
  return newCard.createCard();
}

const userInfo = new UserInfo({ 
  nameSelector: '.profile__name', 
  jobSelector: '.profile__job',
  avatarSelector: '.profile__avatar',
  id: ""
});

const cardList = new Section({ 
  items: {}, 
  renderer: (data, userData) => {
    cardList.addItem(renderCard(data, userData), 'end');
  }
}, 
'.elements__list');

Promise.all([api.getInitialCards(), api.getUserInfo()])
  .then(([initialCards, userData]) => {
    userInfo.setUserInfo(userData.name, userData.about, userData.avatar, userData._id);
    cardList.setRenderedItems(initialCards);
    cardList.renderItems(userData);
  })
  .catch((error) => {
    console.log(error);
});


const avatarPopup = new PopupWithForm( 
  '.popup_type_avatar', 
  {
    handleSubmit: (input) => {
      loading('.popup_type_avatar', true);
      api.editAvatar(input.avatar)
        .then(data => {
          document.querySelector('.profile__avatar').src=input.avatar;
          loading('.popup_type_avatar', false);
          profilePopup.close();
        })
        .catch((err) => {
          loading('.popup_type_avatar', false);
          console.log(err)
        })
    }
});

const profilePopup = new PopupWithForm( 
  '.popup_type_profile', 
  {
    handleSubmit: (input) => {
      loading('.popup_type_profile', true);
      api.editUserInfo({
        name: input.name,
        about: input.job
      })
        .then((data) => {
          userInfo.setUserInfo(data.name, data.about, data.avatar, data._id);
          loading('.popup_type_profile', false);
          profilePopup.close();
        })
        .catch((err) => {
          loading('.popup_type_profile', false);
          console.log(err)
        })
    }
});

const placePopup = new PopupWithForm(
  '.popup_type_add-place', 
  {
    handleSubmit: (inputPlaceInfo) => {
      loading('.popup_type_add-place', true);
      api.addCard({
        name: inputPlaceInfo.place,
        link: inputPlaceInfo.link
      })
        .then((inputPlaceInfo) => {
          cardList.addItem(renderCard(inputPlaceInfo, userInfo.getUserInfo()), 'start');
          loading('.popup_type_add-place', false);
          placePopup.close();
        })
        .catch((err) => { 
          console.log(err)
          loading('.popup_type_add-place', false)
        })      
    }
  }
)

avatarEdit.addEventListener('click', () => { 
  newAvatarFormValidator.disableSubmitButton();
  newAvatarFormValidator.resetForm();
  avatarPopup.open()
});

profileEditButton.addEventListener('click', () => { 
  const currentUserInfo = userInfo.getUserInfo();
  popupInputName.value = currentUserInfo.name;
  popupInputJob.value = currentUserInfo.job;
  newProfileFormValidator.disableSubmitButton();
  newProfileFormValidator.resetForm();
  profilePopup.open()
});

cardAddButton.addEventListener("click", () => {
  newPlaceFormValidator.disableSubmitButton();
  newPlaceFormValidator.resetForm();
  placePopup.open() 
});

avatarPopup.setEventListeners();
deletePopup.setEventListeners();
imagePopup.setEventListeners();
profilePopup.setEventListeners();
placePopup.setEventListeners();