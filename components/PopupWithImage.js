import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = document.querySelector(".popup__image");
    this._imageDescription = document.querySelector(".popup__image-text");
    }

    open = ({ name, link }) => {
      this._image.src = link;
      this._image.alt = `Картинка ` + name;
      this._imageDescription = name;

      super.open();
    }
}