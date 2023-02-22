import { all, delay, put, takeLatest } from 'redux-saga/effects';

import { userSlice } from '../slices';
import { UserTypes } from '../types';

function* fetchUser() {
    try {
        yield put(userSlice.actions.START());
        yield delay(2000);
        yield put(
            userSlice.actions.END_SUCCESS({
                first_name: 'Иван',
                second_name: 'Иванов',
                email: 'ivan_ivanov@bigduck.com',
            }),
        );
    } catch (e) {
        yield put(userSlice.actions.END_FAILED());
    }
}

function* userSage() {
    yield all([takeLatest(UserTypes.FETCH_USER, fetchUser)]);
}

export default userSage;
