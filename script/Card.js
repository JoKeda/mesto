import {popupImage} from './popupImage.js';

export class Card {
    constructor(data, selectorTemplate) {
        this._name = data.name;
        this._link = data.link;
        this._selectorTemplate = selectorTemplate;
    }

    _getTemplate() {
        return document
            .querySelector(this._selectorTemplate)
            .content
            .querySelector('.element')
            .cloneNode(true);
    }

    generateCard() {
        this._element = this._getTemplate();
        this._cardImage = this._element.querySelector('.element__image');
        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;
        this._element.querySelector('.element__title').textContent = this._name;
        this._setEventListener();
        return this._element;
    };

    _deleteCard = () => {
        this._element.remove();
        this._element = null;
    };
    
    _likeCard = () => {
        this._element.querySelector('.element__like').classList.toggle('element__like_active');
    };

    _openPopup = () => {
        popupImage.openPopupImage(this._link, this._name);
    };

    _setEventListener = () => {
        this._element.querySelector('.element__delete').addEventListener('click', this._deleteCard);
        this._element.querySelector('.element__like').addEventListener('click', this._likeCard);
        this._cardImage.addEventListener('click', this._openPopup);
    };

}