import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface IUser {
    first_name: string;
    second_name: string;
    email: string;
}

interface State {
    user?: IUser;
    isLoading: boolean;
}

const initialState: State = {
    isLoading: true,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        START: (state: State) => {
            state.isLoading = true;
        },
        END_SUCCESS: (state: State, actions: PayloadAction<IUser>) => {
            state.isLoading = false;
            state.user = actions.payload;
        },
        END_FAILED: (state: State) => {
            state.isLoading = false;
        },
    },
});
