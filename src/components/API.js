export class API {
    constructor(options) {
        this.baseURL = options.baseUrl;
        this.headers = options.headers;
    }

    getInitialCards() {
        return this.getAnswer(fetch(`${this.baseURL}/cards`, {headers : this.headers}));
    }

    getUserInfo() {
        return this.getAnswer(fetch(`${this.baseURL}/users/me`, {headers : this.headers}));
    }

    setUserInfo(name, info) {
        return this.getAnswer(fetch(`${this.baseURL}/users/me`, {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify({
                name: name,
                about: info
            })
        }));
    }


    setCard(name, link) {
        return this.getAnswer(fetch(`${this.baseURL}/cards`, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify({
                name: name,
                link: link
            })
        }));
    }

    deleteCard(cardId) {
        return this.getAnswer(fetch(`${this.baseURL}/cards/${cardId}`, {
            method: 'DELETE',
            headers: this.headers
        }));
    }

    putLikeCard(cardId) {
        return this.getAnswer(fetch(`${this.baseURL}/cards/likes/${cardId}`, {
            method: 'PUT',
            headers: this.headers
        }));
    }

    deleteLikeCard(cardId) {
        return this.getAnswer(fetch(`${this.baseURL}/cards/likes/${cardId}`, {
            method: 'DELETE',
            headers: this.headers
        }));
    }

    updateUserPicture(userPictureUrl) {
        return this.getAnswer(fetch(`${this.baseURL}/users/me/avatar`, {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify({
                avatar: userPictureUrl
            })
        }));
    }

    getAnswer(promise) {
        return promise
            .then(res => {
                if (res.ok) return res.json();

                return Promise.reject(`Запрос прошел неудачно: ошибка ${res.status}`);
            });
    }
}