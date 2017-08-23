/* @flow */

import type {
  Dispatch,
  GetState,
  ThunkAction,
  Reducer,
} from '../../types';

export const LOGIN_CLOSE = 'LOGIN_CLOSE';
export const LOGIN_OPEN = 'LOGIN_OPEN';
export const LOGIN_INVALID = 'LOGIN_INVALID';
export const LOGIN_REQUESTING = 'LOGIN_REQUESTING';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const TYPE_OPEN_LOGIN = 'TYPE_OPEN_LOGIN';
export const TYPE_OPEN_REGISTER = 'TYPE_OPEN_REGISTER';
export const TYPE_OPEN_RESET_PASSWORD = 'TYPE_OPEN_RESET_PASSWORD';
export const TYPE_OPEN_CHANGE_PASSWORD = 'TYPE_OPEN_CHANGE_PASSWORD';
export const TYPE_OPEN_UPDATE_EMAIL = 'TYPE_OPEN_UPDATE_EMAIL';

const isIgual = (state: Reducer, _state:Boolean, _newtype: String): boolean => {
  const login = state.login;

  if (_state === true) {
    if (login.isopen === _state && login.typeopen === _newtype) return true;
  } else if (login.isopen === _state) {
    return true;
  }

  return false;
};

export const openLogin = (_type: String): ThunkAction =>
  (dispatch: Dispatch, getState: GetState) => {
    if (!isIgual(getState(), true, _type)) {
      dispatch({ type: LOGIN_OPEN, newtype: _type });
    }

    return null;
  };

export const closeLogin = (): ThunkAction =>
  (dispatch: Dispatch, getState: GetState) => {
    if (!isIgual(getState(), false, '')) {
      dispatch({ type: LOGIN_CLOSE });
    }

    return null;
  };
