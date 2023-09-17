import { makeAutoObservable } from 'mobx';
import { User } from '@entities/user';

class Session {
    isAuth = false;

    currentUser: User | null = null;

    setCurrentUser(user: User) {
        this.currentUser = user;
        this.isAuth = true;
    }

    clearCurrentUser() {
        this.currentUser = null;
        this.isAuth = false;
    }

    constructor() {
        makeAutoObservable(this);
    }
}

export const session = new Session();
