/* @flow */
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Container } from 'reactstrap';
import Helmet from 'react-helmet';
import _ from 'lodash';

import 'font-awesome/css/font-awesome.min.css';
import 'simple-line-icons/css/simple-line-icons.css';

import allroutes from '../../routes';
import '../../theme/normalize.css';
import './styles.scss';

import HeaderPage from '../../components/UI/HeaderAdmin';
import SideBarPage from '../../components/UI/SideBarAdmin';
import BreadCrumbPage from '../../components/UI/BreadCrumbAdmin';
import FooterPage from '../../components/UI/FooterAdmin';
import LoginPage from '../Login';

export default () => {
  // Use it when sub routes are added to any route it'll work
  const routeWithSubRoutes = route => (
    <Route
      key={_.uniqueId()}
      exact={route.exact || false}
      path={route.path}
      render={props => (
        // Pass the sub-routes down to keep nesting
        <route.component {...props} routes={route.routes} />
      )}
    />
  );

  return (
    <div>
      <LoginPage />
      <div id="divapp" className="app d-none">
        <Helmet title="Home" />
        <HeaderPage />
        <div className="app-body">
          <SideBarPage />
          <main className="main">
            <BreadCrumbPage />
            <Container fluid>
              <Switch>
                {allroutes.map(route => routeWithSubRoutes(route))}
              </Switch>
            </Container>
          </main>
        </div>
        <FooterPage />
      </div>
    </div>
  );
};
