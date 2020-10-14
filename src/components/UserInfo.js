import {API} from './API.js';

export class UserInfo {
    constructor(userObject) {
        this._name = document.querySelector(userObject.name);
        this._info = document.querySelector(userObject.info);
        this._avatar = document.querySelector(userObject.avatar);
    }

    getUserInfo() {
        return {
            'name' : this._name.textContent,
            'info' : this._info.textContent
        }
    }

    setUserInfo(name, info) {
        return new API({
            baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-16',
            headers: {
                authorization: 'fcc8d5b9-93cb-49a5-813c-436684405cdf',
                'Content-Type': 'application/json'
            }
        }).setUserInfo(name, info).then((response) => {
            this._name.textContent = response.name;
            this._info.textContent = response.about;
        });
    }

    getUserPicture() {
        return this._avatar
    }

    setUserPicture(src) {
        this._avatar.src = src;
    }
}