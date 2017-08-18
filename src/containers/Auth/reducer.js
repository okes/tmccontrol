/* @flow */

import _ from 'lodash';

import {
  AUTH_LOGIN,
  AUTH_LOGOUT,
} from './action';
import type { Auth, Action } from '../../types';

type State = Auth;

const initialState = {
  signedIn: false,
  type: '',
  credentials: {},
  userInfo: {
    username: '',
    password: '',
  },
};

export default (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case AUTH_LOGIN:
      return _.assign({}, state, {
        signedIn: true,
        type: '',
        credentials: {},
        userInfo: {
          username: action.username,
          password: action.password,
        },
      });
    case AUTH_LOGOUT:
      return _.assign({}, state, {
        signedIn: false,
        type: '',
        credentials: {},
        userInfo: {
          username: '',
          password: '',
        },
      });
    default:
      return state;
  }
};
