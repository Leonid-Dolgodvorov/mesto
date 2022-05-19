export default class Card {
  constructor(data, cardSelector, imagePopupOpenFunction) {
    this._data = data;
    this._cardSelector = cardSelector;
    this._imagePopupOpenFunction = imagePopupOpenFunction;
  }

  _openImagePopup = () => { 
    this._imagePopupOpenFunction() 
  }

  _getTemplate = () => {
    return document
    .querySelector(this._cardSelector)
    .content.querySelector(".card")
    .cloneNode(true);
  }

  createCard = () => {
    this._card = this._getTemplate();
    this._cardImage = this._card.querySelector(".card__pic");
    this._cardImage.src = this._data.link;
    this._cardImage.alt = this._data.name;
    this._card.querySelector(".card__name").textContent = this._data.name;
    this._setEventListeners();
    return this._card;
  }

  _setEventListeners = () => {
    this.likeButton = this._card.querySelector(".card__like-button");
    this.likeButton.addEventListener("click", this._handleLikeClick);
    this._card.querySelector(".card__delete-button").addEventListener("click", this._handleDeleteCard);
    this._cardImage.addEventListener("click", this._handleImage);
  }

  _handleLikeClick = () => {
    this.likeButton.classList.toggle("card__like-button_yes");
  }

  _handleDeleteCard = () => {
    this._card.remove();
    this._card = null;
  }

  _handleImage = () => {
    const image = document.querySelector(".popup__image");
    const imageDescription = document.querySelector(".popup__image-text");
    image.src = this._data.link;
    image.alt = `Картинка ` + this._data.name;
    imageDescription.textContent = this._data.name;
    this._openImagePopup();
  }
}