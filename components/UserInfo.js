export class UserInfo {
    constructor(userObject) {
        this._name = document.querySelector(userObject.name);
        this._info = document.querySelector(userObject.info);
    }

    getUserInfo() {
        return {
            'name' : this._name.textContent,
            'info' : this._info.textContent
        }
    }

    setUserInfo(name, info) {
        this._name.textContent = name;
        this._info.textContent = info;
    }
}