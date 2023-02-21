import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface State {
    isLoading: boolean;
    isSuccess: boolean;
    error?: string;
}

const initialState: State = {
    isLoading: false,
    isSuccess: false,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        START: (state: State) => {
            state.isLoading = true;
            state.isSuccess = false;
            state.error = undefined;
        },
        END_SUCCESS: (state: State) => {
            state.isLoading = false;
            state.isSuccess = true;
        },
        END_FAILED: (state: State, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.error = action.payload;
        },
        CLEAR: (state: State) => {
            state.isLoading = false;
            state.isSuccess = false;
        },
    },
});
