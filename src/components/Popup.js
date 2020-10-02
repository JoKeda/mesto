export class Popup {
    constructor(selector) {
        this._popupItem = document.querySelector(selector);
    }

    open() {
        this._popupItem.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose);
        this._setEventListeners();
    }

    close() {
        this._popupItem.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose);
    }

    _handleEscClose = (evt) => {
        if (evt.key === "Escape") {
            this.close();
        }
    };

    _setEventListeners() {
        this._popupItem.querySelector('.popup__close').addEventListener('click', () => {
            this.close();
        });
    }
}