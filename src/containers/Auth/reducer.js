/* @flow */

import _ from 'lodash';

import {
  AUTH_LOGIN,
  AUTH_LOGOUT,
  AUTH_SAVE_LOGIN,
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

const configure = (state: State) => {
  if (state.userInfo.username !== '') {
    localStorage.setItem('tmcdataname', state.userInfo.username);
    localStorage.setItem('tmcdatapass', state.userInfo.password);
  } else {
    localStorage.removeItem('tmcdataname');
    localStorage.removeItem('tmcdatapass');
  }

  return _.assign({}, state, {
    signedIn: true,
  });
};

export default (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case AUTH_SAVE_LOGIN:
      return _.assign({}, state, {
        userInfo: {
          username: action.username,
          password: action.password,
        },
      });
    case AUTH_LOGIN:
      return configure(state);
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
