/* @flow */

import type {
  Dispatch,
  GetState,
  ThunkAction,
  Reducer,
} from '../../types';
import appSecrets from '../appSecrets';

export const FETCH_SUCCESS = 'FETCH_SUCCESS';
export const FETCH_ERROR = 'FETCH_ERROR';

const isLoggin = (state: Reducer): boolean => {
  const auth = state.auth;

  if (auth.signedIn === false) return false; // Preventing double fetching data

  return true;
};

export const fetchData = (url: String, namesave: String, axios: any): ThunkAction =>
  (dispatch: Dispatch) => axios.get(url)
    .then((res) => {
      const newdata = res.data.Items;
      return dispatch({ type: FETCH_SUCCESS, data: newdata, method: namesave });
    })
    .catch((err) => {
      console.log(err.message);
      dispatch({ type: FETCH_ERROR, error: err.message });
    });

const getQueryString = (params) => {
  const esc = encodeURIComponent;
  const eq = '=';
  return Object.keys(params)
    .map(k => esc(k) + eq + esc(params[k]))
    .join('&');
};

export const loadAllData = (): ThunkAction =>
  (dispatch: Dispatch, getState: GetState, axios: any) => {
    if (!isLoggin(getState())) {
      const method = 'cuentasget';
      const namesave = 'cuentas';
      const service = 'aws';
      const query = { type: 1 };
      const _objservice = appSecrets[service];
      const qst = '?';
      const qs = qst + getQueryString(query);
      const apiurl = _objservice.urlapi + _objservice.api[method] + qs;

      return dispatch(fetchData(apiurl, namesave, axios));
    }

    /* istanbul ignore next */
    return null;
  };
