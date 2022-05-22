import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, { handleSubmit }) {
    super(popupSelector);
    this._handleSubmit = handleSubmit;
    this._form = this._popup.querySelector('.popup__form');
    this._popupInputList = this._popup.querySelectorAll('.popup__input');
  }

  _getInputValues = () => {    
    const data = {};
    this._popupInputList.forEach(input => data[input.name] = input.value);
    return data;
  }

  setEventListeners = () => {
    super.setEventListeners();
    this._popup.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleSubmit(this._getInputValues());
    });
  }

  close = () => {
    super.close();
    this._form.reset();
  }
}