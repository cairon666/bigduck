import { FetchLoginRequest, FetchRegisterRequest, authTypes } from '../types';

export const fetchLogin = (): FetchLoginRequest => ({
    type: authTypes.FETCH_LOGIN,
});

export const fetchRegister = (): FetchRegisterRequest => ({
    type: authTypes.FETCH_REGISTER,
});
