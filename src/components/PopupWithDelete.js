import {Popup} from "./Popup.js";

export class PopupWithDelete extends Popup {
    constructor(selector, submitCallback) {
        super(selector);
        this.form = this._popupItem.querySelector(".popup__form");
        this._submitCallback = submitCallback;
        this.btn = document.querySelector(`${selector} .popup__botton`);
    }

    setSubmitAction(callback) {
        this.form.addEventListener("submit", (evt)=> {
            evt.preventDefault();
            callback();
        });
    }
}