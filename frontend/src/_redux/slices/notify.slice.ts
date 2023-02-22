import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface NotifyMessage {
    id: string;
    date?: Date;
    title: string;
    description: string;
    unviewed: boolean;
}

interface State {
    notifies?: NotifyMessage[];
    has_unviewed: boolean;
    isLoading: boolean;
}

const initialState: State = {
    has_unviewed: false,
    isLoading: true,
};

export const notifySlice = createSlice({
    name: 'notify',
    initialState,
    reducers: {
        START: (state: State) => {
            state.isLoading = true;
        },
        END_SUCCESS: (state: State, action: PayloadAction<NotifyMessage[]>) => {
            state.isLoading = false;

            state.notifies = action.payload;
            state.has_unviewed = hasUnviewed(state.notifies);
        },
        END_FAILED: (state: State) => {
            state.isLoading = false;
        },
        ADD_NOTIFY: (state: State, action: PayloadAction<NotifyMessage>) => {
            if (state.notifies) {
                state.notifies.push(action.payload);
            } else {
                state.notifies = [action.payload];
            }

            state.has_unviewed = hasUnviewed(state.notifies);
        },
    },
});

function hasUnviewed(notifies?: NotifyMessage[]): boolean {
    if (notifies) {
        for (let i = 0; i < notifies.length; i++) {
            if (notifies[i].unviewed) {
                return true;
            }
        }
    }

    return false;
}
