/* @flow */

import type {
  Dispatch,
  GetState,
  ThunkAction,
  Reducer,
} from '../../types';

export const HEADER_INVALID = 'HEADER_INVALID';
export const HEADER_REQUESTING = 'HEADER_REQUESTING';
export const HEADER_FAILURE = 'HEADER_FAILURE';
export const HEADER_SUCCESS = 'HEADER_SUCCESS';

export const API_URL = 'https://jsonplaceholder.typicode.com/users';

// Export this for unit testing more easily
export const fetchUsers = (axios: any, URL: string = API_URL): ThunkAction =>
  (dispatch: Dispatch) => {
    dispatch({ type: HEADER_REQUESTING });

    return axios.get(URL)
      .then(res => dispatch({ type: HEADER_SUCCESS, data: res.data }))
      .catch(err => dispatch({ type: HEADER_FAILURE, err: err.message }));
  };

// Preventing dobule fetching data
/* istanbul ignore next */
const shouldFetchUsers = (state: Reducer): boolean => {
  // In development, we will allow action dispatching
  // or your reducer hot reloading won't updated on the view
  if (__DEV__) return true;

  const header = state.header;

  if (header.readyStatus === HEADER_SUCCESS) return false; // Preventing double fetching data

  return true;
};

/* istanbul ignore next */
export const fetchLoginIfNeeded = (): ThunkAction =>
  (dispatch: Dispatch, getState: GetState, axios: any) => {
    /* istanbul ignore next */
    if (shouldFetchUsers(getState())) {
      /* istanbul ignore next */
      return dispatch(fetchUsers(axios));
    }

    /* istanbul ignore next */
    return null;
  };
