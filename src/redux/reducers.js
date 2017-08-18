/* @flow */

import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';

import auth from '../containers/Auth/reducer';
import login from '../containers/Login/reducer';
import header from '../containers/Header/reducer';
import home from '../containers/Home/reducer';
import userInfo from '../containers/UserInfo/reducer';

export default combineReducers({
  auth,
  login,
  header,
  home,
  userInfo,
  router,
});
