import './index.css';
import {Section} from "../components/Section.js";
import {Card} from '../components/Card.js';
import {PopupWithForm} from "../components/PopupWithForm.js";
import {FormValidator} from '../components/FormValidator.js';
import {UserInfo} from "../components/UserInfo.js";
import PopupWithImage from "../components/PopupWithImage.js";
import {API} from "../components/API.js";
import {PopupWithDelete} from "../components/PopupWithDelete.js";



const api = new API({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-16',
    headers: {
        authorization: 'fcc8d5b9-93cb-49a5-813c-436684405cdf',
        'Content-Type': 'application/json'
    }
});

const userId = '9522e55b7d9813c7bc9619e3';

//Инициализация карточек
let cardsData = {
    items: [],
    renderer: addElement
};

//Информация о пользователе
const userInfo = new UserInfo({
    'name' : '.profile__data .profile__title',
    'info' : '.profile__data .profile__description',
    'avatar' : '.profile .profile__avatar'
});

//Определение секции
let cardsSection;


Promise.all(
    [api.getInitialCards(), api.getUserInfo()])
    .then(([cardsDataRes, userInfoRes]) => {
        cardsData.items = cardsDataRes;

        //Загрузка и опреледеление секции
        cardsSection = new Section(cardsData, '.elements');

        //Первичная отрисовка
        cardsSection.renderAllFirstTime(addElementFistTime);

        //Обновление данных пользователя
        userInfo.setUserInfo(userInfoRes.name, userInfoRes.about);
        userInfo.setUserPicture(userInfoRes.avatar);
        popupUserPicture.form.querySelector('.popup__input_element_img').value = userInfoRes.avatar;


        //Добавление слушателей событий открытия форм

        popupEditProfileButton.addEventListener('click', () => {
            const inputValues = userInfo.getUserInfo();
            popupEditProfile.form.querySelector('input[name=title]').value = inputValues['name'];
            popupEditProfile.form.querySelector('input[name=description]').value = inputValues['info'];
            userValidator.resetForm();
            popupEditProfile.open();
        });

        popupAddCardButton.addEventListener('click', () => {
            popupAddCardValidator.resetForm();
            popupAddCard.open();
        });

        popupUserPictureBtn.addEventListener('click', () => {
            popupUserPicture.form.querySelector('input[name=avatar-img]').value = userInfo.getUserPicture().src;
            popupUserPictureValidator.resetForm();
            popupUserPicture.open();
        });

    }).catch((err) => {
        console.log(err);
    });

//Попап изменения аватара
const popupUserPicture = new PopupWithForm('.popup__avatar', updateUserPicture);
const popupUserPictureBtn = document.querySelector('.profile__avatar');


//Обновление фотографии профиля
function updateUserPicture() {
    let inputValues = popupUserPicture.getInputValues(),
        old_value = popupUserPicture.btn.textContent;

    popupUserPicture.btn.textContent = 'Сохранение..';

    api.updateUserPicture(inputValues['avatar-img'])
        .then((res) => {
            userInfo._avatar.src = res.avatar;
        })
        .then(() => {
            popupUserPicture.btn.textContent = old_value;
            popupUserPicture.close();
        })
        .catch((err) => {
            popupUserPicture.err.classList.add('popup__error_visible');
            popupUserPicture.btn.textContent = old_value;
            popupUserPicture.err.textContent = err;
        });
}

//Добавление элемента
function addElement(element) {
    cardsSection.addItem(new Card(element, '#element-template', userId, {handleCardClick, handleCardDelete, handleCardLike}).generateCard());
}

//Первичное добавление элемента
function addElementFistTime(element) {
    cardsSection.addItemFirstTime(new Card(element, '#element-template', userId, {handleCardClick, handleCardDelete, handleCardLike}).generateCard());
}


//Клик лайка
function handleCardLike(cardId, likeNode, likeScore) {
    if (likeNode.classList.contains('element__like_active')) {
        api.deleteLikeCard(cardId).then((res) => {
            likeScore.textContent = res.likes.length;
            likeNode.classList.remove('element__like_active');
        }).catch((err) => {
            console.log(err);
        });
    } else {
        api.putLikeCard(cardId).then((res) => {
            likeScore.textContent = res.likes.length;
            likeNode.classList.add('element__like_active');
        }).catch((err) => {
            console.log(err);
        });
    }
}

//Попап карточки
const popupCard = new PopupWithImage('.popup__image');


function handleCardClick () {
    popupCard.open(this._link, this._name);
}


//Попап удаления карточки
const popupDeleteCard = new PopupWithDelete('.popup__delete');


function handleCardDelete(cardId, element) {
    popupDeleteCard.open();

    let old_value = popupDeleteCard.btn.textContent;

    popupDeleteCard.setSubmitAction(() => {
        popupDeleteCard.btn.textContent = 'Удаление..';
        api.deleteCard(cardId).then(() => {
            element.remove();
        })
        .then(() => {
            popupDeleteCard.btn.textContent = old_value;
            popupDeleteCard.close();
        }).catch((err) => {
            popupDeleteCard.err.textContent = err;
            popupDeleteCard.err.classList.add('popup__error_visible');
            popupDeleteCard.btn.textContent = old_value;
        });
    });

}


//Попап добавления карточки
const popupAddCardButton = document.querySelector('.profile__add-button');
const popupAddCard = new PopupWithForm('.popup__element', saveTemplate);


//Коллбек сабмита формы
function saveTemplate (evt) {
    evt.preventDefault();
    const inputValues = popupAddCard.getInputValues();

    let old_value = popupAddCard.btn.textContent;

    popupAddCard.btn.textContent = 'Добавление..';

    api.setCard(inputValues['element-title'], inputValues['element-img'])
        .then((response) => {
            addElement({
                'name' : response.name,
                'link' : response.link,
                'likes' : response.likes,
                'owner' : response.owner,
                '_id' : response._id
            });
        })
        .then(() => {
            popupAddCard.btn.textContent = old_value;
            popupAddCard.close();
        })
        .catch((err) => {
            popupAddCard.err.textContent = err;
            popupAddCard.err.classList.add('popup__error_visible');
            popupAddCard.btn.textContent = old_value;
        });


}


//Попап изменения данных пользователя
const popupEditProfile = new PopupWithForm('.popup__profile', saveProfile);
const popupEditProfileButton = document.querySelector('.profile__edit-button');


//Коллбек сохранения профиля
function saveProfile (evt) {
    evt.preventDefault();
    const inputValues = popupEditProfile.getInputValues();

    let old_value = popupEditProfile.btn.textContent;

    popupEditProfile.btn.textContent = 'Сохранение..';

    api.setUserInfo(inputValues['title'], inputValues['description'])
        .then((res) => {
            userInfo.setUserInfo(res.name, res.about);
            popupEditProfile.btn.textContent = old_value;
            popupEditProfile.close();
        }).catch((err) => {
            popupEditProfile.err.textContent = err;
            popupEditProfile.err.classList.add('popup__error_visible');
            popupEditProfile.btn.textContent = old_value;
        });

}

//Добавление слушателей событий модальных окон
popupUserPicture.setEventListeners();
popupCard.setEventListeners();
popupDeleteCard.setEventListeners();
popupEditProfile.setEventListeners();
popupAddCard.setEventListeners();

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
const popupUserPictureValidator = new FormValidator(custom, popupUserPicture.form);

popupUserPictureValidator.enableValidation();
userValidator.enableValidation();
popupAddCardValidator.enableValidation();