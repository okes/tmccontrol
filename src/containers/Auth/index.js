/* eslint-disable react/sort-comp */
/* @flow */

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import type { Element } from 'react';
import type { Connector } from 'react-redux';

import LoginPage from '../Login';
import type { Auth as AuthType, Reducer } from '../../types';

type Props = {
  auth: AuthType,
};

export default function (Component) {
  class AuthenticatedComponent extends PureComponent {
    // Export this for unit testing more easily
    props: Props;

    static defaultProps: {
      auth: {},
    };

    componentDidMount() {
      console.log('componentDidMount: AuthenticatedComponent');
    }

    renderUserList = (): Element<any> => {
      const { auth } = this.props;

      if (auth.signedIn === true) {
        return (
          <Component {...this.props} />
        );
      }

      return <LoginPage />;
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
    () => ({ }),
  );

  return connector(AuthenticatedComponent);
}
