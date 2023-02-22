import { all, delay, put, takeLatest } from 'redux-saga/effects';

import { notifySlice } from '../slices';
import { notifyTypes } from '../types';

function* fetchNotifies() {
    try {
        yield put(notifySlice.actions.START());
        yield delay(2000);
        yield put(
            notifySlice.actions.END_SUCCESS([
                {
                    id: '1',
                    date: new Date(),
                    title: 'Какое-то название увведомления 1',
                    description: 'Какое-то описание увведомления 1',
                    unviewed: true,
                },
                {
                    id: '2',
                    date: new Date(),
                    title: 'Какое-то название увведомления 2',
                    description:
                        'Какое-то описание увведомления 2 Какое-то описание увведомления 2 Какое-то описание увведомления 2 Какое-то описание увведомления 2 Какое-то описание увведомления 2 Какое-то описание увведомления 2 Какое-то описание увведомления 2 Какое-то описание увведомления 2',
                    unviewed: false,
                },
                {
                    id: '3',
                    date: new Date(),
                    title: 'Какое-то название увведомления 1',
                    description: 'Какое-то описание увведомления 1',
                    unviewed: false,
                },
                {
                    id: '4',
                    date: new Date(),
                    title: 'Какое-то название увведомления 2',
                    description:
                        'Какое-то описание увведомления 2 Какое-то описание увведомления 2 Какое-то описание увведомления 2 Какое-то описание увведомления 2 Какое-то описание увведомления 2 Какое-то описание увведомления 2 Какое-то описание увведомления 2 Какое-то описание увведомления 2',
                    unviewed: false,
                },
            ]),
        );
    } catch (e) {
        yield put(notifySlice.actions.END_FAILED());
    }
}

function* readAllNotifies() {
    try {
        yield put(notifySlice.actions.START());
        yield delay(2000);
        yield put(notifySlice.actions.END_READ_ALL_SUCCESS());
    } catch (e) {
        yield put(notifySlice.actions.END_FAILED());
    }
}

function* notifySaga() {
    yield all([
        takeLatest(notifyTypes.FETCH_NOTIFIES, fetchNotifies),
        takeLatest(notifyTypes.READ_ALL_NOTIFIES, readAllNotifies),
    ]);
}

export default notifySaga;
