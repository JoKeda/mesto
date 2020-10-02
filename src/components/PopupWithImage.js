import {Popup} from "./Popup.js";

export default class PopupWithImage extends Popup{
    constructor(selector) {
        super(selector);
        this._popupImage = this._popupItem.querySelector('.popup__image-item');
        this._popupImageDescription = this._popupItem.querySelector('.popup__image-description');
    }

    open(src, alt) {
        this._popupImage.src = src;
        this._popupImage.alt = alt;
        this._popupImageDescription.textContent = alt;

        super.open();
    }
}