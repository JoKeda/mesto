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
        this.liked = false;

        if (data.likes && Array.isArray(data.likes)) {
            data.likes.forEach((item) => {
               if (item._id === this._userId) this.liked = true;
            });
        }
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
        this._deleteBtn = this._element.querySelector('.element__delete');
        this._canBeDeleted = this._cardAuthor._id === this._userId;
        if (!this._canBeDeleted) this._deleteBtn.remove();
        this._likeNode = this._element.querySelector('.element__like');
        this._likesScoreNode = this._element.querySelector('.element__like-score');
        this._likesScoreNode.textContent = this._likes_score;

        if (this.liked) this._likeNode.classList.add('element__like_active');

        this._setEventListener();
        return this._element;
    };

    _deleteCard = () => {
        this.handleCardDelete(this._cardId, this._element);
    };
    
    _likeCard = () => {
        this.handleCardLike(this._cardId, this._likeNode, this._likesScoreNode);
    };

    _setEventListener = () => {
        if (this._canBeDeleted) this._deleteBtn.addEventListener('click', this._deleteCard);
        this._element.querySelector('.element__like').addEventListener('click', this._likeCard);
        this._cardImage.addEventListener('click', () => {this.handleCardClick(this)});
    };

}