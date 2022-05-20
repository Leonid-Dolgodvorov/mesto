import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(containerSelector) {
    super(containerSelector);
    this._image = document.querySelector(".popup__image");
    this._imageDescription = document.querySelector(".popup__image-text");
    }

    open = ({ name, link }) => {
      super.open();
      this._image.src = link;
      this._image.alt = `Картинка ` + name;
      this._imageDescription = name;
    }
}