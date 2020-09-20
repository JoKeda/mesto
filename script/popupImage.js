import {closePopup, openPopup} from "./popupController.js";

const popupImage = {
    'popupImageItemContainer' :  document.querySelector('.popup__image'),
    'popupImageItem' : document.querySelector('.popup__image .popup__image-item'),
    'popupImageItemDescription' : document.querySelector('.popup__image .popup__image-description'),
    'popupImageClose' : document.querySelector('.popup__image .popup__close_image')
};

popupImage.openPopupImage = function(src, alt) {
    this.popupImageItem.src = src;
    this.popupImageItem.alt = alt;
    this.popupImageItemDescription.textContent = alt;
    openPopup(popupImage.popupImageItemContainer);
};

popupImage.popupImageClose.addEventListener('click', () => {
    closePopup(popupImage.popupImageItemContainer);
});


export {popupImage};