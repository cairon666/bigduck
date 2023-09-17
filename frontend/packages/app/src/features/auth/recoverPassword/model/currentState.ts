import { makeAutoObservable } from 'mobx';
import routeHistory, { routerPaths } from '@shared/routeHistory';

export enum Stages {
    send = 'send',
    confirm = 'confirm',
    update = 'update',
}

class CurrentState {
    stage: Stages = Stages.send;

    email: string = '';

    password: string = '';

    clear() {
        this.stage = Stages.send;
        this.email = '';
    }

    send(email: string) {
        this.stage = Stages.confirm;
        this.email = email;
    }

    confirm() {
        this.stage = Stages.update;
    }

    update(password: string) {
        routeHistory.push(routerPaths.loginWithParams(this.email, password));
        this.clear();
    }

    constructor() {
        makeAutoObservable(this);
    }
}

export const currentState = new CurrentState();
