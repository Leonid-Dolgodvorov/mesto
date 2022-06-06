export default class Card {
  constructor(data, cardSelector, { handleCardClick, handleDeleteCard, handleLikeClick, userData }) {
    this._data = data;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteCard = handleDeleteCard;
    this._handleLikeClick = handleLikeClick;
    this._userData = userData;
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
    this.likeCountCard();
    this._toggleLike();
    this._setEventListeners();
    this._setDeleteCard();
    return this._card;
  }

  _setEventListeners = () => {
    this._card.querySelector(".card__like-button")
    .addEventListener("click", () => { 
      this._handleLikeClick(this._data._id);
    });
    this._card.querySelector(".card__delete-button")
    .addEventListener("click", () => { this._handleDeleteCard(this._card, this._data._id) });
    this._cardImage
    .addEventListener("click", () => { this._handleCardClick(this._name, this._link) });
  }

  _setDeleteCard() {
    if (this._userData._id !== this._data.owner._id) {
        this._card.querySelector('.card__delete-button').remove();
    }
  }

  checkLike() {
    return this._data.likes.some((like) => like._id === this._userData._id);
  }

  setLike(data) {
    this._data.likes = data.likes;
    this.likeCountCard();
    this._toggleLike();
  }

  likeCountCard() {
    this._card.querySelector('.card__likes-quantity').textContent = this._data.likes.length;
  }

  _toggleLike() {
    if (this.checkLike()) {
      this._card.querySelector('.card__like-button').classList.add('card__like-button_yes');
    } else {
      this._card.querySelector('.card__like-button').classList.remove('card__like-button_yes');
    }
  }
}