export class Popup {
    constructor(selector) {
        this._popupItem = document.querySelector(selector);
        this._handleOverlayClose = this._handleOverlayClose.bind(this);
    }

    open() {
        this._popupItem.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose);
        this._popupItem.addEventListener('mousedown', this._handleOverlayClose);
    }

    close() {
        this._popupItem.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose);
        this._popupItem.removeEventListener('mousedown', this._handleOverlayClose);
    }

    _handleEscClose = (evt) => {
        if (evt.key === "Escape") {
            this.close();
        }
    };

    _handleOverlayClose(evt) {
        if (evt.target === evt.currentTarget) {
          this.close();
        }
      }

    setEventListeners() {
        this._popupItem.querySelector('.popup__close').addEventListener('click', () => {
            this.close();
        });
    }
}