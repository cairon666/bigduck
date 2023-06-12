import { Action } from 'redux';
import { all, call, delay, put, takeLatest } from 'redux-saga/effects';

import {
    ApiError,
    HTTPError,
    fetchLogin,
    fetchRecoverPasswordConfirm,
    fetchRecoverPasswordSend,
    fetchRecoverPasswordUpdate,
    fetchRegister,
} from '../../_api';
import {
    LoginAction,
    RecoverPasswordConfirmAction,
    RecoverPasswordSendAction,
    RecoverPasswordUpdateAction,
    RegisterAction,
    fetchAction,
} from '../actions';

function onAction<FetchData, SuccessData>(fetch: (payload: FetchData) => Promise<SuccessData>) {
    return function* (action: { payload: fetchAction<FetchData, SuccessData> }) {
        try {
            yield delay(500); // TODO: remove
            const resp: SuccessData = yield call(fetch, action.payload.data);
            if (action.payload.onSuccess) {
                yield call(action.payload.onSuccess, resp);
            }
        } catch (e: unknown) {
            if (e instanceof HTTPError) {
                if (action.payload.onError) {
                    yield call(action.payload.onError, yield e.response.json());
                }
            }
        } finally {
            if (action.payload.onEnd) {
                yield call(action.payload.onEnd);
            }
        }
    };
}

function onActionRequest<FetchData, SuccessData>(
    fetch: (payload: FetchData) => Promise<SuccessData>,
    onErrorAction: (error: ApiError) => Action,
    onSuccessAction: (data: SuccessData) => Action,
    finallyAction: () => Action,
) {
    return function* (action: { payload: FetchData }) {
        try {
            yield delay(500); // TODO: remove
            const resp: SuccessData = yield call(fetch, action.payload);
            yield put(onSuccessAction(resp));
        } catch (e: unknown) {
            if (e instanceof HTTPError) {
                yield put(onErrorAction(yield e.response.json()));
            }
        } finally {
            yield put(finallyAction());
        }
    };
}

function* authSaga() {
    yield all([
        takeLatest(LoginAction, onAction(fetchLogin)),
        takeLatest(RegisterAction, onAction(fetchRegister)),
        takeLatest(RecoverPasswordSendAction, onAction(fetchRecoverPasswordSend)),
        takeLatest(RecoverPasswordConfirmAction, onAction(fetchRecoverPasswordConfirm)),
        takeLatest(RecoverPasswordUpdateAction, onAction(fetchRecoverPasswordUpdate)),
    ]);
}

export default authSaga;
