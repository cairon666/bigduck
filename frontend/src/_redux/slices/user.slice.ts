import { createSlice } from '@reduxjs/toolkit';

interface State {
    user?: {
        first_name: string;
        second_name: string;
        email: string;
    };
}

const initialState: State = {
    user: {
        first_name: 'Иван',
        second_name: 'Иванов',
        email: 'ivan_ivanov@gmail.cum',
    },
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
});
