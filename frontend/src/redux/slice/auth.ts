import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type UserGender = 'male' | 'female';

export interface IUser {
  id: string;
  username: string;
  first_name: string;
  second_name: string;
  avatar_url: string | null;
  day_of_birth: Date | null;
  gender: UserGender | null;
}

export type alreadyExistType = 'username' | 'email' | 'login';

export interface AuthState {
  isLoading: boolean;
  alreadyExist: Partial<Record<alreadyExistType, string>>;
  notFound?: boolean;
  badPassword?: boolean;
  user?: IUser;
}

const initialState: AuthState = {
  isLoading: false,
  alreadyExist: {},
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    START: (state) => {
      state.isLoading = true;
      state.alreadyExist = {};
      state.notFound = false;
      state.badPassword = false;
    },
    NOT_FOUND: (state) => {
      state.isLoading = false;
      state.notFound = true;
    },
    BAD_PASSWORD: (state) => {
      state.isLoading = false;
      state.badPassword = true;
    },
    ALREADY_EXIST: (state, action: PayloadAction<alreadyExistType>) => {
      state.isLoading = false;
      switch (action.payload) {
        case 'username': {
          state.alreadyExist[action.payload] = 'Никнейм уже занят';
          break;
        }
        case 'email': {
          state.alreadyExist[action.payload] = 'Почта уже занята';
          break;
        }
        case 'login': {
          state.alreadyExist[action.payload] = 'Логин уже занят';
          break;
        }
      }
    },
    FULFILLED: (state, action: PayloadAction<IUser | undefined>) => {
      state.isLoading = false;
      state.user = action.payload;
    },
  },
});
