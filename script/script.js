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
/* image */
const popupImage = document.querySelector('.popup__image');
const popupImageItem = popupImage.querySelector('.popup__image-item');
const popupImageDescription = popupImage.querySelector('.popup__image-description');
const popupImageClose = popupImage.querySelector('.popup__close_image');

const elements = document.querySelector('.elements');

/*попапы вкл выкл*/

function openPopup(evt) {
  evt.classList.add('popup_opened');
}

function closePopup(evt) {
  evt.classList.remove('popup_opened');
}

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
    const template = addTemplate(item.name, item.link);
    elements.append(template);
  });
}

/* добавить шаблон */

function addTemplate(elementTitle, elementImage) {
   const elementTemplate = document.querySelector('#element-template').content;

   const template = elementTemplate.cloneNode(true);

   const templateTitle = template.querySelector('.element__title');
   templateTitle.textContent = elementTitle;

   const templateImage = template.querySelector('.element__image');
   templateImage.src = elementImage;
   templateImage.alt = elementTitle;

   templateImage.addEventListener('click', openPopupImage);

   const deleteButton = template.querySelector('.element__delete');
   deleteButton.addEventListener('click', deleteElement);

   const likeButton = template.querySelector('.element__like');
   likeButton.addEventListener('click', likeImage);

   return template;
}

function addElement(elementTitle, elementImage) {
  const template = addTemplate(elementTitle, elementImage);
  elements.prepend(template);
}

function openPopupElement() {
  elementTitle.value = '';
  elementImg.value = '';
  openPopup(element);
}

function deleteElement(evt) {
  evt.target.removeEventListener('click', deleteElement);
  evt.target.parentElement.remove();
}

function saveTemplate (evt) {
  evt.preventDefault();
  addElement(elementTitle.value,elementImg.value);
  closePopup(element);
};

/* тогл на лайк */
function likeImage(evt) {
  const like = evt.target;
  like.classList.toggle('element__like_active');
}

/*создать открытие попапа с картинкой*/
function openPopupImage(evt) {
  popupImageItem.src = evt.target.src;
  popupImageItem.alt = evt.target.alt;

  popupImageDescription.textContent = evt.target.alt;

  openPopup(popupImage);
}

popupCloseEdit.addEventListener('click', () => {closePopup(popupProfile);});
popupEdit.addEventListener('click', openPopupProfile);
formEdit.addEventListener('submit', saveProfile);
popupAdd.addEventListener('click', openPopupElement);
popupCloseButtonAdd.addEventListener('click', () => {closePopup(element);});
formAdd.addEventListener('submit', saveTemplate);
popupImageClose.addEventListener('click', () => {closePopup(popupImage);});

addInitialCards();