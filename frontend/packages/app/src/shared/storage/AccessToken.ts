import { makeAutoObservable } from 'mobx';

class AccessToken {
    _token: string | undefined;

    _key = 'Access-Token-Key';

    get token(): string | undefined {
        return this._token;
    }

    set token(token: string) {
        localStorage.setItem(this._key, token);
        this._token = token;
    }

    constructor() {
        this._token = localStorage.getItem(this._key) || undefined;
        makeAutoObservable(this);
    }
}

export default new AccessToken();
