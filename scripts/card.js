import { openPopup, imagePopup } from "./index.js";

export class Card {
  constructor(data, cardSelector) {
    this._data = data;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    return document.querySelector(this._cardSelector).content.querySelector(".elements__element").cloneNode(true);
  }

  createCard() {
    console.log(this);
    this._card = this._getTemplate();
    this._cardImage = this._card.querySelector(".elements__pic");
    this._setEventListeners();
    this._cardImage.src = this._data.link;
    this._cardImage.alt = this._data.name;
    this._card.querySelector(".elements__name").textContent = this._data.name;
    return this._card;
  }

  _setEventListeners() {
    this._card.querySelector(".elements__like-button").addEventListener("click", () => { this._handleLikeClick() } );
    this._card.querySelector(".elements__delete-button").addEventListener("click", () => { this._handleDeleteCard() } );
    this._cardImage.addEventListener("click", () => { this._handleImage() } );
  }

  _handleLikeClick() {
    this._card.querySelector(".elements__like-button").classList.toggle(".elements__like-button_yes");
  }

  _handleDeleteCard() {
    this._card.closest(".elements__element").remove();
  }

  _handleImage() {
    const image = document.querySelector(".popup__image");
    const imageDescription = document.querySelector(".elements__name");
    image.src = this._cardImage.src;
    image.alt = `Картинка ` + this._cardImage.alt;
    imageDescription.textContent = this._cardImage.alt;
    openPopup(imagePopup);
  }
}