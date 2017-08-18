/* @flow */

import actionAuth from '../containers/Auth/action';
import actionLogin from '../containers/Login/action';
import actionHeader from '../containers/Header/action';
import actionHome from '../containers/Home/action';
import actionUserInfo from '../containers/UserInfo/action';
import type { Store as ReduxStore } from 'redux';

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
  list: Array<Object>,
};

export type Header = {
  readyStatus: string,
  err: any,
  list: Array<Object>,
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

export type Reducer = {
  auth: Auth,
  login: Login,
  header: Header,
  home: Home,
  userInfo: UserInfo,
  router: any,
};

export type Action =
{ type: actionAuth.AUTH_LOGOUT } |
{ type: actionAuth.AUTH_LOGIN, username: string, password: string } |
{ type: actionLogin.LOGIN_REQUESTING } |
{ type: actionLogin.LOGIN_SUCCESS, data: Array<Object> } |
{ type: actionLogin.LOGIN_FAILURE, err: any } |
{ type: actionHeader.HEADER_REQUESTING } |
{ type: actionHeader.HEADER_SUCCESS, data: Array<Object> } |
{ type: actionHeader.HEADER_FAILURE, err: any } |
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
