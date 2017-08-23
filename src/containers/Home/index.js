/* eslint-disable react/sort-comp */
/* @flow */

import React, { PureComponent } from 'react';
import type { Element } from 'react';
import { connect } from 'react-redux';
import type { Connector } from 'react-redux';

import * as action from './action';
import type { Home as HomeType, Auth as AuthType, Dispatch, Reducer } from '../../types';

type Props = {
  home: HomeType,
  auth: AuthType,
  fetchUsersIfNeeded: () => void,
};

// Export this for unit testing more easily
export class Home extends PureComponent {
  props: Props;

  static defaultProps: {
    home: {
      readyStatus: 'USERS_INVALID',
      list: null,
    },
    fetchUsersIfNeeded: () => {},
    auth: {},
  };

  componentDidMount() {
    this.props.fetchUsersIfNeeded();
  }

  renderUserList = (): Element<any> => {
    const { home, auth } = this.props;

    if (!home.readyStatus || home.readyStatus === action.USERS_INVALID ||
      home.readyStatus === action.USERS_REQUESTING) {
      return <p>cargando...</p>;
    }

    if (home.readyStatus === action.USERS_FAILURE) {
      return <p>Oops, Failed to load list!</p>;
    }

    if (auth.signedIn === true) {
      console.log('hi');
    }

    return (
      <div>nopo
        a<br />sd
        as<br />ds
        di<br />sabl<br />edsa
        de<br />fau<br />ltd
        sa<br />dsad
        asdd<br />sad<br />sa
        defa<br />ult<br />dsa
        defa<br />ult<br />dsasd
        sa<br />dsad<br />sd
        s<br />d
        s<br />
        dis<br />abledsads
        <br />
        <br />
        disa<br />bl<br />edsads
        s<br />
        def<br />aul<br />tds<br />asdsd
        s<br />
        d<br />efaul<br />tds<br />asdsd
        <br />
        <br />
        sa<br />dsa<br />ds<br />dds
        de<br />faults
        def<br />aul<br />tdsa
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
  ({ home, auth }: Reducer) => ({ home, auth }),
  (dispatch: Dispatch) => ({
    fetchUsersIfNeeded: () => dispatch(action.fetchUsersIfNeeded()),
  }),
);

export default connector(Home);
