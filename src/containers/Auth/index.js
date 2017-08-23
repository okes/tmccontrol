/* eslint-disable react/sort-comp */
/* @flow */

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import type { Element } from 'react';
import type { Connector } from 'react-redux';

import * as actionLogin from '../Login/action';
import type { Auth as AuthType, Login as LoginType, Dispatch, Reducer } from '../../types';

type Props = {
  auth: AuthType,
  login: LoginType,
  showLogin: () => void,
};

export default function (Component) {
  class AuthenticatedComponent extends PureComponent {
    // Export this for unit testing more easily
    props: Props;

    static defaultProps: {
      auth: {},
      login: {},
      showLogin: () => {},
    };

    componentDidMount() { }

    renderUserList = (): Element<any> => {
      const { login, auth, showLogin } = this.props;

      if (auth.signedIn === true) {
        return (
          <Component {...this.props} />
        );
      }

      if (login.isopen !== true) {
        showLogin();
      }

      return null;
    }

    render() {
      const { renderUserList } = this;
      return (
        renderUserList()
      );
    }
  }

  const connector: Connector<{}, Props> = connect(
    ({ login, auth }: Reducer) => ({ login, auth }),
    (dispatch: Dispatch) => ({
      showLogin: () => dispatch(actionLogin.openLogin(actionLogin.TYPE_OPEN_LOGIN)),
    }),
  );

  return connector(AuthenticatedComponent);
}
