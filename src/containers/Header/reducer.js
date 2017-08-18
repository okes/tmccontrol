/* @flow */

import _ from 'lodash';

import {
  HEADER_INVALID,
  HEADER_REQUESTING,
  HEADER_FAILURE,
  HEADER_SUCCESS,
} from './action';
import type { Header, Action } from '../../types';

type State = Header;

const initialState = {
  readyStatus: HEADER_INVALID,
  err: null,
  list: [],
};

export default (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case HEADER_REQUESTING:
      return _.assign({}, state, { readyStatus: HEADER_REQUESTING });
    case HEADER_FAILURE:
      return _.assign({}, state, {
        readyStatus: HEADER_FAILURE,
        err: action.err,
      });
    case HEADER_SUCCESS:
      return _.assign({}, state, {
        readyStatus: HEADER_SUCCESS,
        list: action.data,
      });
    default:
      return state;
  }
};
