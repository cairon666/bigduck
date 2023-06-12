import { all, fork } from 'redux-saga/effects';

import authSaga from './auth.saga';
import userSaga from './user.saga';

export function* rootSaga() {
    yield all([fork(authSaga), fork(userSaga)]);
}
