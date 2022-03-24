const popupElement = document.querySelector ('.popup');
const profileEditButton = document.querySelector ('.profile__edit')
const closeProfileEditButton = popupElement.querySelector('.popup__closebutton')

function openPopup () {
  popupElement.classList.add('popup_opened')
}

function closePopup () {
  popupElement.classList.remove('popup_opened')
}

profileEditButton.addEventListener('click', openPopup);
closeProfileEditButton.addEventListener('click', closePopup);