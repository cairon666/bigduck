import { UserScheme } from '@/entities/User';
import { getUserDataById } from '@/entities/User/api/getUserDataById';
import { createSlice } from '@reduxjs/toolkit';

const initialState: UserScheme = {
    userData: undefined,
    isLoading: false,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getUserDataById.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getUserDataById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.userData = action.payload;
            })
            .addCase(getUserDataById.rejected, (state, action) => {
                state.isLoading = false;
                console.log(action.payload);
            });
    },
});

export const { actions: userActions } = userSlice;
export const { reducer: userReducer } = userSlice;
