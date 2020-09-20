import {Card} from './Card.js';
import {FormValidator} from './FormValidator.js';
import {openPopup, closePopup} from './popupController.js';


const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

const elements = document.querySelector('.elements');



/* profile */
const popupProfile = document.querySelector('.popup__profile');
const popupTitle = popupProfile.querySelector('.popup__input_element_title');
const popupDescription = popupProfile.querySelector('.popup__input_element_description');

/* edit */
const popupCloseEdit = popupProfile.querySelector('.popup__close');
const popupEdit = document.querySelector('.profile__edit-button');
const formEdit = popupProfile.querySelector('.popup__form');


/* profile */
const profile = document.querySelector('.profile');
const profileTitle = profile.querySelector('.profile__title');
const profileDescription = profile.querySelector('.profile__description');


/* element */
const element = document.querySelector('.popup__element');
const elementTitle = element.querySelector('.popup__input_element_element-title');
const elementImg = element.querySelector('.popup__input_element_img');


/* popup add */
const popupAdd = document.querySelector('.profile__add-button');
const popupCloseButtonAdd = element.querySelector('.popup__close');
const formAdd = element.querySelector('.popup__form');


/*попап профиля*/
function openPopupProfile() {
    popupTitle.value = profileTitle.textContent;
    popupDescription.value = profileDescription.textContent;
    openPopup(popupProfile);
}

function saveProfile (evt) {
    evt.preventDefault();
    profileTitle.textContent = popupTitle.value;
    profileDescription.textContent = popupDescription.value;
    closePopup(popupProfile);
}



/* объявление Element */
function addInitialCards() {
    initialCards.forEach( item => {
        const element = new Card(item, '#element-template').generateCard();
        elements.append(element);
    });
}

function addElement(element) {
    const template = new Card(element, '#element-template');
    elements.prepend(template.generateCard());
}

function openPopupElement() {
    elementTitle.value = '';
    elementImg.value = '';
    openPopup(element);
}

function saveTemplate (evt) {
    evt.preventDefault();
    addElement({
     'name' : elementTitle.value,
     'link' :  elementImg.value
    });
    closePopup(element);
}


popupCloseEdit.addEventListener('click', () => {closePopup(popupProfile);});
popupEdit.addEventListener('click', openPopupProfile);
formEdit.addEventListener('submit', saveProfile);
popupAdd.addEventListener('click', openPopupElement);
popupCloseButtonAdd.addEventListener('click', () => {closePopup(element);});
formAdd.addEventListener('submit', saveTemplate);

addInitialCards();


/*
* Валидация
* */
const custom = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__botton',
    inactiveButtonClass: 'popup__botton_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};


const userValidator = new FormValidator(custom, popupProfile.querySelector(custom.formSelector));
const elementValidador = new FormValidator(custom, element.querySelector(custom.formSelector));

userValidator.enableValidation();
elementValidador.enableValidation();