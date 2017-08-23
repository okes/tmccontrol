/* eslint-disable react/sort-comp */
/* @flow */

import React, { PureComponent } from 'react';
import type { Element } from 'react';
import { connect } from 'react-redux';
import type { Connector } from 'react-redux';
import { Container, Row } from 'reactstrap';
import ReactLoading from 'react-loading';

import * as actionLogin from '../../containers/Login/action';
import CognitoState from '../../utils/cognito/states';
import type { Login as LoginType, Reducer } from '../../types';
import FormLogin from './AuthFormLogin';
import FormLoginNewPassRequired from './AuthFormLoginNewPassRequired';
import FormLoginEmailVerification from './AuthFormLoginEmailVerification';
import FormLoginConfirm from './AuthFormLoginConfirm';
import FormLoginPassReset from './AuthFormLoginPassReset';

type Props = {
  login: LoginType,
  cognitostate: string,
};

// Export this for unit testing more easily
export class WrapLogin extends PureComponent {
  props: Props;

  static defaultProps: {
    login: {},
    cognitostate: '',
  };

  state = {
    cognitostate: this.props.cognitostate,
  }

  componentDidMount() { }

  componentWillReceiveProps(nextPros) {
    const { cognitostate } = this.state;
    if (cognitostate !== nextPros.cognitostate) {
      this.setState({ cognitostate: nextPros.cognitostate });
    }
  }

  renderPassReset = (): Element<any> => <FormLoginPassReset />;

  renderUserList = (): Element<any> => {
    const { login } = this.props;
    const { cognitostate } = this.state;

    console.log(login.typeopen);

    switch (cognitostate) {
      case CognitoState.AUTHENTICATED:
      case CognitoState.LOGGING_IN:
        return <ReactLoading type="spin" delay={0} color="#2592db" height={50} width={50} />;
      case CognitoState.LOGGED_OUT:
      case CognitoState.LOGIN_FAILURE:
        return <FormLogin />;
      case CognitoState.MFA_REQUIRED:
        return <div>MFA REQUIRED</div>;
      case CognitoState.NEW_PASSWORD_REQUIRED:
        return <FormLoginNewPassRequired />;
      case CognitoState.EMAIL_VERIFICATION_REQUIRED:
        return <FormLoginEmailVerification />;
      case CognitoState.CONFIRMATION_REQUIRED:
        return <FormLoginConfirm />;
      default:
        return (
          <div>
            <p>Unrecognised cognito state</p>
          </div>
        );
    }
  }

  render() {
    const { renderUserList, renderPassReset } = this;
    const { login } = this.props;
    return (
      /* eslint-disable max-len */
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            {(actionLogin.TYPE_OPEN_LOGIN === login.typeopen) ? renderUserList() : renderPassReset()}
          </Row>
        </Container>
      </div>
      /* eslint-enable max-len */
    );
  }
}

const connector: Connector<{}, Props> = connect(
  ({ login, cognito }: Reducer) => ({ login, cognitostate: cognito.state }),
  () => ({ }),
);

export default connector(WrapLogin);
