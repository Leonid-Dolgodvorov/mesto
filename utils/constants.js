export const initialCards = [
  {
    name: 'Тель-Авив',
    link: 'https://images.unsplash.com/photo-1500990702037-7620ccb6a60a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
]; 

export const profileEditButton = document.querySelector ('.profile__edit');
export const profileName = document.querySelector('.profile__name');
export const profileJob = document.querySelector('.profile__job');
export const popupInputName = document.querySelector('.popup__input_type_name');
export const popupInputJob = document.querySelector('.popup__input_type_job');
export const elementAdd = document.querySelector('.profile__add-button');
export const newProfileForm = document.forms.newProfileForm;
export const newPlaceForm = document.forms.newPlaceForm;

export const validationSettings = {
  form: '.popup__form',
  formInput: '.popup__input',
  buttonElement: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_invalid',
  errorClass: '.popup__error',
  errorActiveClass: 'popup__error_active', 
}