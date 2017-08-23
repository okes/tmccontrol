/* eslint-disable react/sort-comp */
/* @flow */

import React, { PureComponent } from 'react';
import type { Element } from 'react';
import { connect } from 'react-redux';
import type { Connector } from 'react-redux';
import ReactLoading from 'react-loading';

import * as actionAuth from '../Auth/action';
import * as actionLogin from './action';
import actionCognito from '../../utils/cognito/actions';
import CognitoState from '../../utils/cognito/states';
import type { Login as LoginType, Auth as AuthType, Dispatch, Reducer } from '../../types';
import appSecrets from '../../utils/appSecrets';
import LoginCont from '../../components/WrapLogin';

type Props = {
  login: LoginType,
  auth: AuthType,
  cognito: Object,
  setupCognito: () => void,
  authLogin: () => void,
  closeLogin: () => void,
};

// Export this for unit testing more easily
export class Login extends PureComponent {
  props: Props;

  static defaultProps: {
    login: {
      readyStatus: actionLogin.LOGIN_INVALID,
      isopen: false,
      typeopen: actionLogin.TYPE_OPEN_LOGIN,
    },
    auth: {},
    cognito: {},
    setupCognito: () => {},
    authLogin: () => {},
    closeLogin: () => {},
  };

  componentDidMount() {
    const { setupCognito } = this.props;
    setupCognito(appSecrets.aws.config);
  }

  renderUserList = (): Element<any> => {
    const { login, auth, cognito, authLogin, closeLogin } = this.props;

    let el = '';

    if (typeof document !== 'undefined') {
      el = document.querySelector('#divapp');
    }

    if (login.isopen === false) {
      if (el !== null && el !== '') {
        el.classList.remove('d-none');
      }

      return null;
    }

    if (auth.signedIn === true) {
      console.log('login oka');
    }

    if (el !== null && el !== '') {
      el.classList.add('d-none');
    }

    if (cognito.config.region === null && cognito.config.userPool === null) {
      return <ReactLoading type="spin" delay={0} color="#2592db" height={50} width={50} />;
    }

    if (login.typeopen === actionLogin.TYPE_OPEN_LOGIN && cognito.state === CognitoState.LOGGED_IN) { // eslint-disable-line max-len
      closeLogin();
      authLogin();
      return null;
    }

    switch (login.typeopen) {
      case actionLogin.TYPE_OPEN_RESET_PASSWORD:
      case actionLogin.TYPE_OPEN_LOGIN:
        return <LoginCont />;
      default:
        return (
          <div>
            <p>Unrecognised type open state</p>
          </div>
        );
    }
  };

  render() {
    const { renderUserList } = this;
    return (
      renderUserList()
    );
  }
}

const connector: Connector<{}, Props> = connect(
  ({ login, auth, cognito }: Reducer) => ({ login, auth, cognito }),
  (dispatch: Dispatch) => ({
    setupCognito: (_config: Object) => dispatch(actionCognito.configure(_config)),
    authLogin: () => dispatch(actionAuth.login()),
    closeLogin: () => dispatch(actionLogin.closeLogin()),
  }),
);

export default connector(Login);
