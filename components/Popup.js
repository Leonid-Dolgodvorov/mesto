export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }
  
  _handleEscClose = (evt) => {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  _overlayClose = (evt) => {
    if (evt.target.classList.contains('popup')) {
      this.close();
    }
  }

  open() {
    this._popup.classList.add('popup_opened');
    this._popup.addEventListener("click", this._overlayClose());
    this._popup.addEventListener("keydown", this._handleEscClose());
  }

  close() {
    this._popup.classList.remove('popup_opened');
    this._popup.removeEventListener("click", this._overlayClose());
    this._popup.removeEventListener("keydown", this._handleEscClose());
  }

  setEventListeners = () => {
    this._popup.querySelector('.popup__close-button').addEventListener('click', this.close());
  }
}