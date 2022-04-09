const profileEditButton = document.querySelector ('.profile__edit');
const profilePopup = document.querySelector('.popup_type_profile');
const closeProfilePopup = profilePopup.querySelector('.popup__close-button');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const popupInputName = profilePopup.querySelector('.popup__input_type_name');
const popupInputJob = profilePopup.querySelector('.popup__input_type_job');
const placePopup = document.querySelector('.popup_type_addplace');
const closePlacePopup = placePopup.querySelector('.popup__close-button');
const popupInputPlace = placePopup.querySelector('.popup__input_type_place');
const popupInputPlaceLink = placePopup.querySelector('.popup__input_type_place-link');
/* const ESC_KEY = "Escape"; */
const popupFormName = document.querySelector('.popup__form_type_name');
const popupFormPlace = document.querySelector('.popup__form_type_place');
const imagePopup = document.querySelector('.popup_type_image');
const closeImagePopup = imagePopup.querySelector('.popup__close-button');
const elementsList = document.querySelector('.elements__list');
const elementAdd = document.querySelector('.profile__add-button');
const popupPic = document.querySelector('.popup__image');
const popupPicText = document.querySelector('.popup__image-text');
const template = document.querySelector("#element-template");

const openPopup = (popup) => () => { 
  popup.classList.add('popup_opened');
};

const closePopup = (popup) => () => { 
  popup.classList.remove('popup_opened');
};

/* function onDocumentKeyUp(event){
  if (event.key === ESC_KEY) {
      closePopup();
  }
} */

function openProfileEdit () {
  openPopup(profilePopup)();
  popupInputName.value = profileName.textContent;
  popupInputJob.value = profileJob.textContent;
}

function handleSaveProfile (e) {
  e.preventDefault();
  profileName.textContent = popupInputName.value;
  profileJob.textContent = popupInputJob.value;
  closePopup(profilePopup)();
};

function handleLikeClick (e) {
  e.target.classList.toggle('elements__like-button_yes');
};

function handleDeleteElement (e) {
  e.target.closest(".elements__element").remove();
};

const handleRiseElement = (e) => {
  popupPic.src = e.target.src;
  popupPic.alt = e.target.alt;
  popupPicText.textContent = e.target.alt;
  openPopup(imagePopup)();
};

const createElement = (element) => {
  const newElement = template.content.querySelector(".elements__element").cloneNode(true);
  const likeButton = newElement.querySelector('.elements__like-button');
  const deleteButton = newElement.querySelector(".elements__delete-button");
  const elementPic = newElement.querySelector(".elements__pic");

  newElement.querySelector(".elements__name").textContent = element.name;
  elementPic.src = element.link;
  elementPic.alt = `Картинка ` + element.name;
   
  likeButton.addEventListener("click", handleLikeClick);
  deleteButton.addEventListener("click", handleDeleteElement);
  elementPic.addEventListener('click', handleRiseElement);
  return newElement;
};

const renderElement = (createdElement) => {
  elementsList.prepend(createdElement);
};

const handleRenderNewElement = (e) => {
  e.preventDefault();
  const newElement = { name: popupInputPlace.value, link: popupInputPlaceLink.value };
  renderElement(createElement(newElement));
  closePopup(placePopup)();
  popupInputPlace.value = '';
  popupInputPlaceLink.value = '';
};

initialCards.forEach((element) => renderElement(createElement(element)));

profileEditButton.addEventListener('click', openProfileEdit);
closeProfilePopup.addEventListener('click', closePopup(profilePopup));
popupFormName.addEventListener('submit', handleSaveProfile);
elementAdd.addEventListener("click", openPopup(placePopup));
popupFormPlace.addEventListener("submit", handleRenderNewElement);
closePlacePopup.addEventListener('click', closePopup(placePopup));
closeImagePopup.addEventListener('click', closePopup(imagePopup));