export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  addItem = (element, place) => {
    if (place === 'start') {
      this._container.prepend(element);
    } 
    else if (place === 'end') {
      this._container.append(element);
    } 
  }

  rendererItems = () => {
    this._items.forEach(item => {
      this._renderer(item);
    });
  }
}