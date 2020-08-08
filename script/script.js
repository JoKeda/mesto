/*profile*/
let profile = document.querySelector('.profile');

let profileTitle = profile.querySelector('.profile__title');

let profileDescription = profile.querySelector('.profile__description');

let popupOpenBotton = document.querySelector('.profile__edit-button');

/*popup*/
let popup = document.querySelector('.popup');

let formElement = document.querySelector('.popup__form');

let popupTitle = popup.querySelector('.popup__input_title');

let popupDescription = popup.querySelector('.popup__input_description');

let popupCloseButton = document.querySelector('.popup__close');

function popupClose() {
  popup.classList.remove('popup_opened');
}

function popupOpen() {
  popupTitle.value = profileTitle.textContent;
  popupDescription.value = profileDescription.textContent;
  popup.classList.add('popup_opened');
}

function formSubmitHandler (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  profileTitle.textContent = popupTitle.value;
  profileDescription.textContent = popupDescription.value;
  popupClose();
};

popupOpenBotton.addEventListener('click', popupOpen);
popupCloseButton.addEventListener('click', popupClose);
formElement.addEventListener('submit', formSubmitHandler);