import {Popup} from "./Popup.js";

export class PopupWithDelete extends Popup {
    constructor(selector, submitCallback) {
        super(selector);
        this.form = this._popupItem.querySelector(".popup__form");
        this._submitCallback = submitCallback;
        this.btn = document.querySelector(`${selector} .popup__botton`);
        this.err = document.querySelector(`${selector} .popup__error`);
    }

    setSubmitAction(callback) {
        this.form.addEventListener("submit", (evt)=> {
            evt.preventDefault();
            callback();
        });
    }

    close() {
        this.err.textContent = '';
        this.err.classList.remove('popup__error_visible');
        super.close();
    }
}