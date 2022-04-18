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
const popupPic = document.querySelector('.popup__image');
const popupPicText = document.querySelector('.popup__image-text');
const template = document.querySelector("#element-template");
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

function onDocumentKeyUp(event) {
  if (event.key === "Escape") {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened)();
  }
}

function overlayClose(evt){
  evt.target.classList.remove("popup_opened");
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
  disableSubmitButton(newCardSubmitButton, formForValidation);
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
  disableSubmitButton(newCardSubmitButton, formForValidation);
  popupInputPlace.value = '';
  popupInputPlaceLink.value = '';
};

initialCards.forEach((element) => renderElement(createElement(element)));

profileEditButton.addEventListener('click', openProfileEdit);
profilePopupClose.addEventListener('click', closePopup(profilePopup));
popupFormName.addEventListener('submit', handleSaveProfile);
elementAdd.addEventListener("click", openAddPlace);
popupFormPlace.addEventListener("submit", handleRenderNewElement);
placePopupClose.addEventListener('click', closePopup(placePopup));
imagePopupClose.addEventListener('click', closePopup(imagePopup));