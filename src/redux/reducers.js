/* @flow */

import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';

import cognito from '../utils/cognito/reducers';
import auth from '../containers/Auth/reducer';
import login from '../containers/Login/reducer';
import home from '../containers/Home/reducer';
import userInfo from '../containers/UserInfo/reducer';

export default combineReducers({
  auth,
  cognito,
  login,
  home,
  userInfo,
  router,
});
