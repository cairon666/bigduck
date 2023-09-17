import { makeAutoObservable } from 'mobx';
import AccessToken from './AccessToken';
import UserId from './UserId';

class Storage {
    public userId;

    public accessToken;

    constructor() {
        this.userId = UserId;
        this.accessToken = AccessToken;

        makeAutoObservable(this);
    }
}

export default new Storage();
