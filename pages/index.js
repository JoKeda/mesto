import {Section} from "../components/Section.js";
import {Card} from '../components/Card.js';
import {PopupWithForm} from "../components/PopupWithForm.js";
import {FormValidator} from '../components/FormValidator.js';
import {UserInfo} from "../components/UserInfo.js";
import PopupWithImage from "../components/PopupWithImage.js";

//Инициализация карточек
const cardsData = {
    items: [
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
    ],
    renderer: addElement
};

//Определение секции
const cardsSection = new Section(cardsData, '.elements');

//Добавление элемента
function addElement(element) {
    cardsSection.addItem(new Card(element, '#element-template', handleCardClick).generateCard());
}

//Попап карточки
function handleCardClick () {
    new PopupWithImage('.popup__image').open(this._link, this._name);
}

//Отрисовка карточек в секции при инициализации
cardsSection.renderAll();


//Попап добавления карточки
const popupAddCardButton = document.querySelector('.profile__add-button');
const popupAddCard = new PopupWithForm('.popup__element', saveTemplate);

popupAddCardButton.addEventListener('click', () => {
    popupAddCard.open();
});

//Коллбек сабмита формы
function saveTemplate (evt) {
    evt.preventDefault();
    const inputValues = popupAddCard.getInputValues();
    addElement({
        'name' : inputValues['element-title'],
        'link' : inputValues['element-img']
    });
    popupAddCard.close();
}


//Информация о пользователе
const userInfo = new UserInfo({
    'name' : '.profile__data .profile__title',
    'info' : '.profile__data .profile__description'
});

//Попап изменения данных пользователя
const popupEditProfile = new PopupWithForm('.popup__profile', saveProfile);
const popupEditProfileButton = document.querySelector('.profile__edit-button');

popupEditProfileButton.addEventListener('click', () => {
    const inputValues = userInfo.getUserInfo();
    popupEditProfile.form.querySelector('input[name=title]').value = inputValues['name'];
    popupEditProfile.form.querySelector('input[name=description]').value = inputValues['info'];
    popupEditProfile.open();
});

//Коллбек сохранения профиля
function saveProfile (evt) {
    evt.preventDefault();
    const inputValues = popupEditProfile.getInputValues();
    userInfo.setUserInfo(inputValues['title'], inputValues['description']);
    popupEditProfile.close();
}

//Валидация
const custom = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__botton',
    inactiveButtonClass: 'popup__botton_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};


const userValidator = new FormValidator(custom, popupEditProfile.form);
const popupAddCardValidator = new FormValidator(custom, popupAddCard.form);

userValidator.enableValidation();
popupAddCardValidator.enableValidation();