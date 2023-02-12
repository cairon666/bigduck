import { createSlice } from '@reduxjs/toolkit';

export interface AuthState {
    isLoading: boolean;
    notFound?: boolean;
    badPassword?: boolean;
    loginOK?: boolean;
}

const initialState: AuthState = {
    isLoading: false,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        START: (state) => {
            state.isLoading = true;
            state.notFound = false;
            state.badPassword = false;
        },
        NOT_FOUND: (state) => {
            state.isLoading = false;
            state.notFound = true;
        },
        BAD_PASSWORD: (state) => {
            state.isLoading = false;
            state.badPassword = true;
        },
        FULFILLED_LOGIN: (state) => {
            state.isLoading = false;
            state.loginOK = true;
        },
    },
});
