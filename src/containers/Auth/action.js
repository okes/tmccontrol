/* @flow */

import type {
  Dispatch,
  GetState,
  ThunkAction,
  Reducer,
} from '../../types';
import appSecrets from '../../utils/appSecrets';

export const AUTH_ISOPEN = 'ISOPEN';
export const AUTH_LOGOUT = 'LOGOUT';
export const AUTH_LOGIN = 'LOGIN';
export const AUTH_SAVE_LOGIN = 'AUTH_SAVE_LOGIN';

export const AUTH_FETCH_SUCCESS = 'AUTH_FETCH_SUCCESS';
export const AUTH_FETCH_ERROR = 'AUTH_FETCH_ERROR';

export const API_URL = 'https://jsonplaceholder.typicode.com/users';

const isLoggin = (state: Reducer): boolean => {
  const auth = state.auth;

  if (auth.signedIn === false) return false; // Preventing double fetching data

  return true;
};

export const fetchDataAllUser = (axios: any): ThunkAction =>
  (dispatch: Dispatch) => {
    const urlss = '?type=1';
    const url = String(appSecrets.aws.urlapi + appSecrets.aws.api.cuentasget + urlss);
    return axios.get(url)
      .then((res) => {
        console.log(res);
        return dispatch({ type: AUTH_FETCH_SUCCESS });
      })
      .catch((err) => {
        console.log(err.message);
        dispatch({ type: AUTH_FETCH_ERROR });
      });
  };

export const login = (): ThunkAction =>
  (dispatch: Dispatch, getState: GetState, axios: any) => {
    if (!isLoggin(getState())) {
      return dispatch(fetchDataAllUser(axios));
    }

    /* istanbul ignore next */
    return null;
  };

export const savelogin = (_username: String, _password: String): ThunkAction =>
  (dispatch: Dispatch, getState: GetState) => {
    if (!isLoggin(getState())) {
      dispatch({ type: AUTH_SAVE_LOGIN, username: _username, password: _password });
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

const isIgual = (state: Reducer): boolean => {
  const auth = state.auth;

  if (auth.isopen === true) return true;

  return false;
};

export const openLogin = (): ThunkAction =>
  (dispatch: Dispatch, getState: GetState) => {
    if (!isIgual(getState())) {
      dispatch({ type: AUTH_ISOPEN });
    }

    return null;
  };
