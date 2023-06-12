import { createAction } from '@reduxjs/toolkit';

import {
    fetchLoginRequest,
    fetchLoginResponse,
    fetchRecoverPasswordConfirmRequest,
    fetchRecoverPasswordSendRequest,
    fetchRecoverPasswordUpdateRequest,
    fetchRegisterRequest,
} from '../../_api';
import { fetchAction } from './types';

export const LoginAction = createAction<fetchAction<fetchLoginRequest, fetchLoginResponse>>('LoginAction');
export const RegisterAction = createAction<fetchAction<fetchRegisterRequest, unknown>>('RegisterAction');

export const RecoverPasswordSendAction =
    createAction<fetchAction<fetchRecoverPasswordSendRequest, unknown>>('RecoverPasswordSendAction');
export const RecoverPasswordConfirmAction =
    createAction<fetchAction<fetchRecoverPasswordConfirmRequest, unknown>>('RecoverPasswordConfirmAction');
export const RecoverPasswordUpdateAction =
    createAction<fetchAction<fetchRecoverPasswordUpdateRequest, unknown>>('RecoverPasswordUpdateAction');
