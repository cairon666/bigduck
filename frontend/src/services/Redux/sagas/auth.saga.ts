import { all, call, delay, put, takeLatest } from 'redux-saga/effects';

import {
    BadRequest,
    fetchLogin,
    fetchRecoverPasswordConfirm,
    fetchRecoverPasswordSend,
    fetchRecoverPasswordUpdate,
    fetchRefreshResponse,
    fetchRefreshTokens,
    fetchRegister,
} from '../../Api';
import _AsyncStorage from '../../AsyncStorage';
import {
    LoginAction,
    RecoverPasswordConfirmAction,
    RecoverPasswordSendAction,
    RecoverPasswordUpdateAction,
    RefreshTokensAction,
    RegisterAction,
    fetchAction,
} from '../actions';

function onAction<FetchData, SuccessData>(fetch: (payload: FetchData) => Promise<SuccessData>) {
    return function* (action: { payload: fetchAction<FetchData, SuccessData> }) {
        try {
            yield delay(1000); // TODO: remove
            const resp: SuccessData = yield call(fetch, action.payload.data);
            if (action.payload.onSuccess) {
                yield call(action.payload.onSuccess, resp);
            }
        } catch (e: unknown) {
            if (e instanceof BadRequest) {
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

function* onRefreshToken(action: ReturnType<typeof RefreshTokensAction>) {
    try {
        const resp: fetchRefreshResponse = yield call(fetchRefreshTokens);
        _AsyncStorage.setAccessToken(resp.access_token);
        yield put(action.payload.action);
    } catch (e) {
        window.location.href = window.location.origin + '/auth/login';
    }
}

function* authSaga() {
    yield all([
        takeLatest(RefreshTokensAction, onRefreshToken),
        takeLatest(LoginAction, onAction(fetchLogin)),
        takeLatest(RegisterAction, onAction(fetchRegister)),
        takeLatest(RecoverPasswordSendAction, onAction(fetchRecoverPasswordSend)),
        takeLatest(RecoverPasswordConfirmAction, onAction(fetchRecoverPasswordConfirm)),
        takeLatest(RecoverPasswordUpdateAction, onAction(fetchRecoverPasswordUpdate)),
    ]);
}

export default authSaga;
