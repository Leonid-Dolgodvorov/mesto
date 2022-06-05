import Popup from './Popup.js';

export default class PopupDeleteConfirm extends Popup {
  constructor(popupSelector, handleSubmit) {
    super(popupSelector);
    this._handleSubmit = handleSubmit;
  }

  open(item) {
    super.open();
    this._card = item;
  }

  setEventListeners() {
    this._popup.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleSubmit(this._card);
    });
    super.setEventListeners();
  }
}