import { makeAutoObservable } from 'mobx';

class UserId {
    _id: string | undefined;

    _key = 'User-Id-Key';

    get id(): string | undefined {
        return this._id;
    }

    set id(id: string) {
        localStorage.setItem(this._key, id);
        this._id = id;
    }

    constructor() {
        this._id = localStorage.getItem(this._key) || undefined;
        makeAutoObservable(this);
    }
}

export default new UserId();
