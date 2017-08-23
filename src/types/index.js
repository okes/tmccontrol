/* @flow */

import type { Store as ReduxStore } from 'redux';
import actionAuth from '../containers/Auth/action';
import actionLogin from '../containers/Login/action';
import actionHome from '../containers/Home/action';
import actionUserInfo from '../containers/UserInfo/action';

export type Auth = {
  signedIn: boolean,
  type: string,
  credentials: Object,
  userInfo: {
    username: string,
    password: string
  }
};

export type Login = {
  readyStatus: string,
  err: any,
  isopen: boolean,
  typeopen: string,
};

export type Home = {
  readyStatus: string,
  err: any,
  list: Array<Object>,
};

export type UserInfo = {
  [userId: string]: {
    readyStatus: string,
    err: any,
    info: Object,
  },
};

export type Cognito = {
  user: Object,
  cache: {
    userName: string,
    email: string,
  },
  state: string,
  error: any,
  userPool: Object,
  attributes: Object,
  creds: any,
  groups: Array,
  config: {
    region: string,
    userPool: string,
    clientId: string,
    identityPool: string,
  }
};

export type Reducer = {
  auth: Auth,
  cognito: Cognito,
  login: Login,
  home: Home,
  userInfo: UserInfo,
  router: any,
};

export type Action =
{ type: actionAuth.AUTH_LOGOUT } |
{ type: actionAuth.AUTH_SAVE_LOGIN, username: string, password: string } |
{ type: actionAuth.AUTH_LOGIN } |
{ type: actionLogin.LOGIN_REQUESTING } |
{ type: actionLogin.LOGIN_SUCCESS, data: Array<Object> } |
{ type: actionLogin.LOGIN_FAILURE, err: any } |
{ type: actionLogin.LOGIN_OPEN, newtype: string } |
{ type: actionLogin.LOGIN_CLOSE } |
{ type: actionHome.USERS_REQUESTING } |
{ type: actionHome.USERS_SUCCESS, data: Array<Object> } |
{ type: actionHome.USERS_FAILURE, err: any } |
{ type: actionUserInfo.USER_REQUESTING, userId: string } |
{ type: actionUserInfo.USER_SUCCESS, userId: string, data: Object } |
{ type: actionUserInfo.USER_FAILURE, userId: string, err: any };

export type Store = ReduxStore<Reducer, Action>;
// eslint-disable-next-line no-use-before-define
export type Dispatch = (action: Action | ThunkAction | PromiseAction | Array<Action>) => any;
export type GetState = () => Object;
export type ThunkAction = (dispatch: Dispatch, getState: GetState) => any;
export type PromiseAction = Promise<Action>;
