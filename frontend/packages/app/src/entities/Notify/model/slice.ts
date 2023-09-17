import { createSlice } from '@reduxjs/toolkit';
import { NotifyScheme } from '@entities/Notify/model/notifyScheme';

const initialState: NotifyScheme = {
    notifies: [],
    isLoading: false,
    hasUnViewed: false,
};

const slice = createSlice({
    name: 'notify',
    initialState,
    reducers: {},
});

export const { actions: notifyActions, reducer: notifyReducer } = slice;
