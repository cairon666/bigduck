import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { User } from '../../api';

interface InitState {
    user?: User;
}

const initialState: InitState = {};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        SET_USER: (state, action: PayloadAction<User>) => {
            state.user = action.payload;
        },
    },
});
