const initialCards = [
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

const popup = document.querySelector ('.popup');
const profileEditButton = document.querySelector ('.profile__edit');
const profilePopup = document.querySelector('.popup_type_profile');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const popupInputName = popup.querySelector('.popup__input_type_name');
const popupInputJob = popup.querySelector('.popup__input_type_job');
const popupInputPlace = popup.querySelector('.popup__input_type_place');
const popupInputPlaceLink = popup.querySelector('.popup__input_type_place-link');
const addPlacePopup = document.querySelector('.popup_type_addplace');
/* const ESC_KEY = "Escape"; */
const popupFormName = document.querySelector('.popup__form_type_name');
const popupFormPlace = document.querySelector('.popup__form_type_place');
const imagePopup = document.querySelector('.popup_type_image');
const elementsList = document.querySelector('.elements__list');
const addElement = document.querySelector('.profile__addbutton');
const popupPic = document.querySelector('.popup__image');
const popupPicText = document.querySelector('.popup__image-text');


const openPopup = (x) => () => { 
  x.classList.add('popup_opened');
  const closeButton = popup.querySelector('.popup__closebutton');
  closeButton.addEventListener("click", closePopup(x));
};

const closePopup = (x) => () => {  
  x.classList.remove('popup_opened');
};

/* function onDocumentKeyUp(event){
  if (event.key === ESC_KEY) {
      closePopup();
  }
} */

profileEditButton.addEventListener('click', () => {
  openPopup(profilePopup)();
  popupInputName.value = profileName.textContent;
  popupInputJob.value = profileJob.textContent;
});

function saveProfileInfo (e) {
  e.preventDefault();
  profileName.textContent = popupInputName.value;
  profileJob.textContent = popupInputJob.value;
  closePopup(profilePopup)();
};

/* popupFormName.addEventListener('submit', saveProfileInfo); */

function touchLike (e) {
  e.target.classList.toggle('elements__likebutton_yes');
};

function deleteElement (e) {
  e.target.closest(".elements__element").remove();
};

const createElement = (x) => {
  const template = document.querySelector("#element-template");
  const newElement = template.content.querySelector(".elements__element").cloneNode(true);
  const likeButton = newElement.querySelector('.elements__likebutton');
  const deleteButton = newElement.querySelector(".elements__deletebutton");
  const elementPic = newElement.querySelector(".elements__pic");

  newElement.querySelector(".elements__name").textContent = x.name;
  newElement.querySelector(".elements__pic").src = x.link;
  newElement.querySelector(".elements__pic").alt = `Картинка ` + x.name;
   
  likeButton.addEventListener("click", touchLike);
  deleteButton.addEventListener("click", deleteElement);
  elementPic.addEventListener('click', () => {});
  return newElement;
};

const renderElement = (x) => {
  elementsList.prepend(x);
};

initialCards.forEach((x) => renderElement(createElement(x)));

addElement.addEventListener("click", openPopup(addPlacePopup));