import {
    PostLoginRequest,
    PostRegisterRequest,
    RecoverPasswordConfirmRequest,
    RecoverPasswordSendRequest,
    RecoverPasswordUpdateRequest,
    postPostLogin,
    postPostRegister,
} from '@/features/auth-forms';
import { mapRecord } from '@/shared/utils';
import { createSlice } from '@reduxjs/toolkit';

export interface AuthScheme {
    login: {
        isLoading?: boolean;
        error?: 'emailNotFound' | 'wrongPassword';
        validateError?: Partial<Record<keyof PostLoginRequest, string>>;
    };
    register: {
        isLoading?: boolean;
        error?: 'emailAlreadyExist';
        validateError?: Partial<Record<keyof PostRegisterRequest, string>>;
    };
    recoverPassword: {
        email?: string;
        send: {
            isLoading?: boolean;
            validateError?: Partial<Record<keyof RecoverPasswordSendRequest, string>>;
        };
        confirm: {
            isLoading?: boolean;
            validateError?: Partial<Record<keyof RecoverPasswordConfirmRequest, string>>;
        };
        update: {
            isLoading?: boolean;
            validateError?: Partial<Record<keyof RecoverPasswordUpdateRequest, string>>;
        };
    };
}

const initialState: AuthScheme = {
    login: {},
    register: {},
    recoverPassword: {
        send: {},
        update: {},
        confirm: {},
    },
};

const slice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(postPostLogin.pending, (state) => {
                state.login = {
                    ...initialState.login,
                    isLoading: true,
                };
            })
            .addCase(postPostLogin.rejected, (state, action) => {
                state.login.isLoading = false;

                if (!action.payload) return;

                switch (action.payload.message) {
                    case 'app': {
                        for (const err of action.payload.error) {
                            // switch (err.code) {
                            //     case
                            // }
                        }
                        break;
                    }
                    case 'validate': {
                        state.login.validateError = mapRecord(action.payload.validate, (_, v) => v.message);
                        break;
                    }
                }
            });

        builder
            .addCase(postPostRegister.pending, (state) => {
                state.register = initialState.register;
                state.register.isLoading = true;
            })
            .addCase(postPostRegister.rejected, (state, action) => {
                state.login.isLoading = false;
            });
    },
});

export const { reducer: authReducer } = slice;
