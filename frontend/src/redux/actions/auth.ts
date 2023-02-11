import { AppDispatch } from '../store';
import { authSlice } from '../slice/auth';
import httpClient, { Beda } from '../../services/httpClient';
import { CodeError, DatabaseCodes } from '../types';

export interface registerActionProps {
  login: string;
  password: string;
  username: string;
  first_name: string;
  second_name: string;
  email: string;
}

export const registerAction =
  (props: registerActionProps) => async (dispatch: AppDispatch) => {
    try {
      dispatch(authSlice.actions.START());
      await httpClient.register(
        props.login,
        props.password,
        props.username,
        props.first_name,
        props.second_name,
        props.email,
      );
      dispatch(authSlice.actions.FULFILLED());
    } catch (e) {
      if (e instanceof Beda) {
        switch (e.code) {
          case CodeError.Database: {
            switch (e.details[0]) {
              case DatabaseCodes.NotFound: {
                dispatch(authSlice.actions.NOT_FOUND());
                break;
              }
              case DatabaseCodes.AuthBadPassword: {
                dispatch(authSlice.actions.BAD_PASSWORD());
                break;
              }
            }
            break;
          }
        }
      }
    }
  };

export interface loginActionProps {
  login: string;
  password: string;
  username: string;
  first_name: string;
  second_name: string;
  email: string;
}

export const loginAction =
  (props: loginActionProps) => async (dispatch: AppDispatch) => {
    try {
      dispatch(authSlice.actions.START());
      // await new Promise(res => setTimeout(res, 3000)) // эмуляция запроса, чтобы кнопка была в disabled
      await httpClient.login(props.login, props.password);
      dispatch(authSlice.actions.FULFILLED());
    } catch (e) {
      if (e instanceof Beda) {
        switch (e.code) {
          case CodeError.Database: {
            switch (e.details[0]) {
              case DatabaseCodes.EmailAlreadyExist: {
                dispatch(authSlice.actions.ALREADY_EXIST('email'));
                break;
              }
              case DatabaseCodes.LoginAlreadyExist: {
                dispatch(authSlice.actions.ALREADY_EXIST('login'));
                break;
              }
              case DatabaseCodes.UsernameAlreadyExist: {
                dispatch(authSlice.actions.ALREADY_EXIST('username'));
                break;
              }
            }
            break;
          }
        }
      }
    }
  };
