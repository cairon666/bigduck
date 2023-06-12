import { createSlice } from '@reduxjs/toolkit';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface State {}

const initialState: State = {};

export const notifySlice = createSlice({
    name: 'notify',
    initialState,
    reducers: {},
});
