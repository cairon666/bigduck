import { createSlice } from '@reduxjs/toolkit';

interface State {
    has_unviewed: boolean;
    isLoading: boolean;
    notifies: any[];
}

const initialState: State = {
    has_unviewed: false,
    isLoading: false,
    notifies: [],
};

export const notifySlice = createSlice({
    name: 'notify',
    initialState,
    reducers: {},
});
