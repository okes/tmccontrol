/* @flow */

import type {
  Dispatch,
  GetState,
  ThunkAction,
  Reducer,
} from '../../types';

export const AUTH_LOGOUT = 'LOGOUT';
export const AUTH_LOGIN = 'LOGIN';

const isLoggin = (state: Reducer): boolean => {
  const auth = state.auth;

  if (auth.signedIn === false) return false; // Preventing double fetching data

  return true;
};

export const login = (_username: String, _password: String): ThunkAction =>
  (dispatch: Dispatch, getState: GetState) => {
    if (!isLoggin(getState())) {
      dispatch({ type: AUTH_LOGIN, username: _username, password: _password });
    }

    return null;
  };

export const logout = (): ThunkAction =>
  (dispatch: Dispatch, getState: GetState) => {
    if (isLoggin(getState())) {
      dispatch({ type: AUTH_LOGOUT });
    }

    return null;
  };
