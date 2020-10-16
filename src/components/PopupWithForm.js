import {Popup} from "./Popup.js";

export class PopupWithForm extends Popup {
    constructor(selector, submitCallback) {
        super(selector);
        this._submitCallback = submitCallback;
        this.form = document.querySelector(`${selector} .popup__form`);
        this.inputs =  this.form.querySelectorAll('input');
        this.btn = document.querySelector(`${selector} .popup__botton`);
        this.err = document.querySelector(`${selector} .popup__error`);
    }

    getInputValues() {
        let values = [];
        this.inputs.forEach(function (item) {
            values[item.name] = item.value;
        });

        return values;
    }

    setEventListeners() {
        super.setEventListeners();

        this.form.addEventListener('submit', this._submitCallback);
    }

    close() {
        this.inputs.forEach(function (item) {
            item.value = '';
        });
        this.err.textContent = '';
        this.err.classList.remove('popup__error_visible');
        this.form.querySelector('.popup__botton').classList.add('popup__botton_disabled');
        super.close();
    }
}