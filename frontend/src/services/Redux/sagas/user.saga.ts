import { PayloadAction } from '@reduxjs/toolkit/src/createAction';
import { Action } from 'redux';
import { all, call, delay, put, takeLatest } from 'redux-saga/effects';

import { BadRequest, HTTPError, Unauthorized, fetchUserData } from '../../Api';
import { RefreshTokensAction } from '../actions';
import {
    FetchUserDataAction,
    FetchUserDataErrorAction,
    FetchUserDataFinallyAction,
    FetchUserDataSuccessAction,
} from '../actions/user.actions';

function onAuthFetch<Payload, SuccessPayload>(
    fetch: (data: Payload) => Promise<SuccessPayload>,
    onSuccessAction: (data: SuccessPayload) => Action,
    errorAction: (apiError: HTTPError) => Action,
    finallyActon: () => Action,
) {
    return function* (action: PayloadAction<Payload>) {
        try {
            yield delay(1000);
            const resp: SuccessPayload = yield call(fetch, action.payload);
            yield put(onSuccessAction(resp));
        } catch (e) {
            if (e instanceof BadRequest) {
                yield put(errorAction(yield e.response.json));
            } else if (e instanceof Unauthorized) {
                yield put(
                    RefreshTokensAction({
                        action,
                    }),
                );
            }
        } finally {
            yield put(finallyActon());
        }
    };
}

function* userSaga() {
    yield all([
        takeLatest(
            FetchUserDataAction,
            onAuthFetch(
                fetchUserData,
                FetchUserDataSuccessAction,
                FetchUserDataErrorAction,
                FetchUserDataFinallyAction,
            ),
        ),
    ]);
}

export default userSaga;
