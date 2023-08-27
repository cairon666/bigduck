import { NotifyScheme } from '@/entities/Notify/model/notifyScheme';
import { createSlice } from '@reduxjs/toolkit';

const initialState: NotifyScheme = {
    notifies: [],
    isLoading: false,
    hasUnViewed: false,
};

const slice = createSlice({
    name: 'notify',
    initialState: initialState,
    reducers: {},
});

export const { actions: notifyActions, reducer: notifyReducer } = slice;
