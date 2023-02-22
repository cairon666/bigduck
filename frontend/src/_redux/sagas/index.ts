import { all, fork } from 'redux-saga/effects';

import authSaga from './auth.saga';
import notifySaga from './notify.saga';
import userSage from './user.saga';

export function* rootSaga() {
    yield all([fork(authSaga), fork(notifySaga), fork(userSage)]);
}
