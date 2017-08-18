/* eslint-disable react/sort-comp */
/* @flow */

import React, { PureComponent } from 'react';
import type { Element } from 'react';
import { connect } from 'react-redux';
import type { Connector } from 'react-redux';

import config from '../../config';
import * as action from './action';
import type { Login as HeaderType, Auth as AuthType, Dispatch, Reducer } from '../../types';
import styles from './styles.scss';

type Props = {
  header: HeaderType,
  auth: AuthType,
  fetchLoginIfNeeded: () => void,
};

// Export this for unit testing more easily
export class Header extends PureComponent {
  props: Props;

  static defaultProps: {
    header: {
      readyStatus: 'HEADER_INVALID',
      list: null,
    },
    fetchLoginIfNeeded: () => {},
    auth: {},
  };

  componentDidMount() {
    this.props.fetchLoginIfNeeded();
    console.log(this.props.auth);
  }

  componentWillReceiveProps(nextprops) {
    console.log(this.props);
    console.log('nextprops');
    console.log(nextprops);
  }

  renderUserList = (): Element<any> => {
    const { header } = this.props;

    if (!header.readyStatus || header.readyStatus === action.HEADER_INVALID ||
      header.readyStatus === action.HEADER_REQUESTING) {
      return <p>Loading...</p>;
    }

    if (header.readyStatus === action.HEADER_FAILURE) {
      return <p>Oops, Failed to load list!</p>;
    }

    return (
      <div className={styles.header}>
        <img src={require('../App/assets/logo.svg')} alt="Logo" role="presentation" />
        <h1>{config.app.title}</h1>
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
  ({ header, auth }: Reducer) => ({ header, auth }),
  (dispatch: Dispatch) => ({
    fetchLoginIfNeeded: () => dispatch(action.fetchLoginIfNeeded()),
  }),
);

export default connector(Header);
