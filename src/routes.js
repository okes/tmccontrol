/* @flow */

import type { Dispatch } from './types';
import { fetchUsersIfNeeded } from './containers/Home/action';
import { fetchUserIfNeeded } from './containers/UserInfo/action';
import HomePage from './containers/Home';
import UserInfoPage from './containers/UserInfo';
import NotFoundPage from './containers/NotFound';

import requireAuthentication from './containers/Auth';

export default [
  {
    name: 'home',
    path: '/',
    exact: true,
    component: requireAuthentication(HomePage), // Add your route here
    loadData: (dispatch: Dispatch) => Promise.all([
      dispatch(fetchUsersIfNeeded()), // Register your server-side call action(s) here
    ]),
  },
  {
    name: 'user info',
    path: '/UserInfo/:id',
    component: requireAuthentication(UserInfoPage),
    loadData: (dispatch: Dispatch, params: Object) => Promise.all([
      dispatch(fetchUserIfNeeded(params.id)),
    ]),
  },
  {
    name: 'Error 404',
    path: '*',
    component: requireAuthentication(NotFoundPage),
  }];
