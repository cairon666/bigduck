import { all, delay, put, takeLatest } from 'redux-saga/effects';

import { authSlice } from '../slices';
import { authTypes } from '../types';

function* fetchLogin() {
    try {
        yield put(authSlice.actions.START());
        yield delay(2000);
        yield put(authSlice.actions.END_SUCCESS());
    } catch (e) {
        yield put(authSlice.actions.END_FAILED('some fail'));
    }
}

function* fetchRegister() {
    try {
        yield put(authSlice.actions.START());
        yield delay(200);
        yield put(authSlice.actions.END_SUCCESS());
    } catch (e) {
        yield put(authSlice.actions.END_FAILED('some fail'));
    }
}

function* authSaga() {
    yield all([takeLatest(authTypes.FETCH_LOGIN, fetchLogin), takeLatest(authTypes.FETCH_REGISTER, fetchRegister)]);
}

export default authSaga;
