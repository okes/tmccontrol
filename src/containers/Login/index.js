/* eslint-disable react/sort-comp */
/* @flow */

import React, { PureComponent } from 'react';
import type { Element } from 'react';
import { connect } from 'react-redux';
import type { Connector } from 'react-redux';

import * as action from './action';
import type { Login as LoginType, Auth as AuthType, Dispatch, Reducer } from '../../types';
import styles from './styles.scss';
import FormText from '../../components/FormText';

type Props = {
  login: LoginType,
  auth: AuthType,
  fetchLoginIfNeeded: () => void,
};

// Export this for unit testing more easily
export class Login extends PureComponent {
  props: Props;

  static defaultProps: {
    login: {
      readyStatus: 'LOGIN_INVALID',
      list: null,
    },
    fetchLoginIfNeeded: () => {},
    auth: {},
  };

  componentDidMount() {
    this.props.fetchLoginIfNeeded();
  }

  renderUserList = (): Element<any> => {
    const { login, auth } = this.props;

    if (!login.readyStatus || login.readyStatus === action.LOGIN_INVALID ||
      login.readyStatus === action.LOGIN_REQUESTING) {
      return <p>Loading...</p>;
    }

    if (login.readyStatus === action.LOGIN_FAILURE) {
      return <p>Oops, Failed to load list!</p>;
    }

    if (auth.signedIn === true) {
      console.log('autorizado');
    }

    return (
      <div className={styles.Login}>
        <div className={styles.ContLogin}>
          <FormText name="Nombre" />
        </div>
      </div>
    );
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
    fetchLoginIfNeeded: () => dispatch(action.fetchLoginIfNeeded()),
  }),
);

export default connector(Login);
