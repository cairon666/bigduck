import { createSlice } from '@reduxjs/toolkit';

import { Gender } from '../../Api';
import { FetchUserDataAction, FetchUserDataFinallyAction, FetchUserDataSuccessAction } from '../actions/user.actions';

interface IUser {
    id: string;
    email: string;
    first_name: string;
    second_name: string;
    create_at: Date;
    modify_at: Date;
    date_of_birth?: Date;
    gender?: Gender;
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
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(FetchUserDataAction, (state) => {
                state.isLoading = true;
            })
            .addCase(FetchUserDataSuccessAction, (state, action) => {
                console.log(action.payload);
                state.user = action.payload;
            })
            .addCase(FetchUserDataFinallyAction, (state) => {
                state.isLoading = false;
            });
    },
});
