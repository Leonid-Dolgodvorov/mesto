const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
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

const popupElement = document.querySelector ('.popup');
const profileEditButton = document.querySelector ('.profile__edit');
const closeProfileEditButton = popupElement.querySelector('.popup__closebutton');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const popupName = popupElement.querySelector('.popup__input_type_name');
const popupJob = popupElement.querySelector('.popup__input_type_job');
/* const ESC_KEY = "Escape"; */
const popupForm = document.querySelector('.popup__form');
/* const likeButton = document.querySelector('.elements__likebutton'); */


function openPopup () {
  popupElement.classList.add('popup_opened');
  popupName.value = profileName.textContent;
  popupJob.value = profileJob.textContent;
/*   document.addEventListener('keyup', onDocumentKeyUp); */
}

function closePopup () {
  popupElement.classList.remove('popup_opened');
/*   document.removeEventListener('keyup', onDocumentKeyUp); */
}

/* function onDocumentKeyUp(event){
  if (event.key === ESC_KEY) {
      closePopup();
  }
} */

function saveProfileInfo (evt) {
  evt.preventDefault();
  profileName.textContent = popupName.value;
  profileJob.textContent = popupJob.value;
  closePopup ();
}

/* function touchLike () {
  likeButton.classList.toggle('elements__likebutton_yes');
} */

profileEditButton.addEventListener('click', openPopup);
closeProfileEditButton.addEventListener('click', closePopup);
/* likeButton.addEventListener('click', touchLike); */
popupForm.addEventListener('submit', saveProfileInfo);