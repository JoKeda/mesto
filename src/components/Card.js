export class Card {
    constructor(data, selectorTemplate, userId, {handleCardClick, handleCardDelete, handleCardLike}) {
        this._name = data.name;
        this._link = data.link;
        this._cardId = data._id;
        this._cardAuthor = data.owner;
        this._userId = userId;
        this._likes_score = data.likes.length;
        this._selectorTemplate = selectorTemplate;
        this.handleCardClick = handleCardClick;
        this.handleCardDelete = handleCardDelete;
        this.handleCardLike = handleCardLike;
    }

    _getTemplate() {
        return document
            .querySelector(this._selectorTemplate)
            .content
            .querySelector('.element')
            .cloneNode(true);
    }

    generateCard() {
        this._element = this._getTemplate();
        this._cardImage = this._element.querySelector('.element__image');
        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;
        this._element.querySelector('.element__title').textContent = this._name;
        this._element.querySelector('.element__like-score').textContent = this._likes_score;
        this._deleteBtn = this._element.querySelector('.element__delete');
        this._canBeDeleted = this._cardAuthor._id === this._userId;
        if (!this._canBeDeleted) this._deleteBtn.remove();

        this._setEventListener();
        return this._element;
    };

    _deleteCard = () => {
        this.handleCardDelete(this._cardId, this._element);
    };
    
    _likeCard = () => {
        this.handleCardLike(this._cardId, this._element);
    };

    _setEventListener = () => {
        if (this._canBeDeleted) this._deleteBtn.addEventListener('click', this._deleteCard);
        this._element.querySelector('.element__like').addEventListener('click', this._likeCard);
        this._cardImage.addEventListener('click', () => {this.handleCardClick(this)});
    };

}