/* eslint-disable react/sort-comp */
/* @flow */

import React, { PureComponent } from 'react';
import type { Element } from 'react';
import { connect } from 'react-redux';
import type { Connector } from 'react-redux';
import ReactLoading from 'react-loading';

import * as actionLogin from './action';
import actionCognito from '../../utils/cognito/actions';
import type { Login as LoginType, Auth as AuthType, Dispatch, Reducer } from '../../types';
import appSecrets from '../../utils/appSecrets';
import LoginCont from '../../components/WrapLogin';

type Props = {
  login: LoginType,
  auth: AuthType,
  cognito: Object,
  setupCognito: () => void,
};

// Export this for unit testing more easily
export class Login extends PureComponent {
  props: Props;

  static defaultProps: {
    login: {
      readyStatus: actionLogin.LOGIN_INVALID,
      typeopen: actionLogin.TYPE_OPEN_LOGIN,
    },
    auth: {},
    cognito: {},
    setupCognito: () => {},
  };

  componentDidMount() {
    const { setupCognito } = this.props;
    setupCognito(appSecrets.aws.config);
  }

  renderUserList = (): Element<any> => {
    const { login, auth, cognito } = this.props;

    let el = '';

    if (typeof document !== 'undefined') {
      el = document.querySelector('#divapp');
    }

    if (auth.isopen === false) {
      if (el !== null && el !== '') {
        el.classList.remove('d-none');
      }

      return null;
    }

    if (el !== null && el !== '') {
      el.classList.add('d-none');
    }

    if (cognito.config.region === null && cognito.config.userPool === null) {
      return <ReactLoading type="spin" delay={0} color="#2592db" height={50} width={50} />;
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
  }),
);

export default connector(Login);
