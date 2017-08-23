/* eslint-disable react/sort-comp */
/* @flow */

import React, { PureComponent } from 'react';
import type { Element } from 'react';
import { connect } from 'react-redux';
import type { Connector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Badge, Nav, NavItem } from 'reactstrap';
import classNames from 'classnames';

import type { Auth as AuthType, Reducer } from '../../../types';

type Props = {
  auth: AuthType,
};

// Export this for unit testing more easily
export class SideBarAdmin extends PureComponent {
  props: Props;

  static defaultProps: {
    auth: {},
    router: {},
  };

  componentDidMount() { }

  handleClick = (e) => {
    e.preventDefault();
    e.target.parentElement.classList.toggle('open');
  }

  renderUserList = (): Element<any> => {
    const { handleClick, props } = this;

    const arrlist = {
      items: [
        {
          name: 'Dashboard',
          url: '/UserInfo/1',
          icon: 'icon-speedometer',
          badge: {
            variant: 'info',
            text: 'NEW',
          },
        },
        {
          title: true,
          name: 'UI elements',
          wrapper: {
            element: 'span',
            attributes: {},
          },
          class: '',
        },
        {
          divider: true,
        },
        {
          title: true,
          name: 'Extras',
        },
        {
          name: 'Components',
          url: '/components',
          icon: 'icon-puzzle',
          children: [
            {
              name: 'Buttons',
              url: '/components/buttons',
              icon: 'icon-puzzle',
            },
            {
              name: 'Social Buttons',
              url: '/components/social-buttons',
              icon: 'icon-puzzle',
            },
            {
              name: 'Cards',
              url: '/components/cards',
              icon: 'icon-puzzle',
            },
            {
              name: 'Forms',
              url: '/components/forms',
              icon: 'icon-puzzle',
            },
            {
              name: 'Modals',
              url: '/components/modals',
              icon: 'icon-puzzle',
            },
            {
              name: 'Switches',
              url: '/components/switches',
              icon: 'icon-puzzle',
            },
            {
              name: 'Tables',
              url: '/components/tables',
              icon: 'icon-puzzle',
            },
            {
              name: 'Tabs',
              url: '/components/tabs',
              icon: 'icon-puzzle',
            },
          ],
        },
        {
          name: 'Icons',
          url: '/icons',
          icon: 'icon-star',
          children: [
            {
              name: 'Font Awesome',
              url: '/icons/font-awesome',
              icon: 'icon-star',
              badge: {
                variant: 'secondary',
                text: '4.7',
              },
            },
            {
              name: 'Simple Line Icons',
              url: '/icons/simple-line-icons',
              icon: 'icon-star',
            },
          ],
        },
        {
          name: 'Widgets',
          url: '/widgets',
          icon: 'icon-calculator',
          badge: {
            variant: 'info',
            text: 'NEW',
          },
        },
        {
          name: 'Charts',
          url: '/charts',
          icon: 'icon-pie-chart',
        },
        {
          name: 'Pages',
          url: '/pages',
          icon: 'icon-star',
          children: [
            {
              name: 'Login',
              url: '/login',
              icon: 'icon-star',
            },
            {
              name: 'Register',
              url: '/register',
              icon: 'icon-star',
            },
            {
              name: 'Error 404',
              url: '/404',
              icon: 'icon-star',
            },
            {
              name: 'Error 500',
              url: '/500',
              icon: 'icon-star',
            },
          ],
        },
      ],
    };

    const wrapper = (item) => {
      if (!item.wrapper) {
        return item.name;
      }
      return React.createElement(item.wrapper.element, item.wrapper.attributes, item.name);
    };

    const getbadge = (badge) => {
      if (badge) {
        const classes = classNames(badge.class);
        return (<Badge className={classes} color={badge.variant}>{badge.text}</Badge>);
      }
      return null;
    };

    const navItem = (item, key) => {
      const classes = classNames('nav-link', item.class);
      return (
        <NavItem key={key}>
          <NavLink to={item.url} className={classes} activeClassName="active">
            <i className={item.icon} />{item.name}{getbadge(item.badge)}
          </NavLink>
        </NavItem>
      );
    };

    const navDropdown = (item, key) => {
      let activeroute = 'nav-item nav-dropdown';
      if (props.router.location.pathname.indexOf(item.url) > -1) {
        activeroute = 'nav-item nav-dropdown open';
      }

      return (
        <li key={key} className={activeroute}>
          <a className="nav-link nav-dropdown-toggle" onClick={handleClick} role="button" tabIndex={key}>
            <i className={item.icon} />{item.name}
          </a>
          <ul className="nav-dropdown-items">
            {navList(item.children)}
          </ul>
        </li>
      );
    };

    const gettitle = (title, key) => {
      if (title.title === true) {
        const classes = classNames('nav-title', title.class);
        return (<li key={key} className={classes}>{wrapper(title)}</li>);
      } else if (title.divider === true) {
        return (<li key={key} className="divider" />);
      }
      return navDropdown(title, key);
    };

    const getNavLink = (item, idx) => (
      (item.title || item.divider || item.children) ? gettitle(item, idx) : navItem(item, idx)
    );

    const navList = items => items.map((item, index) => getNavLink(item, index));

    return (
      <div className="sidebar">
        <nav className="sidebar-nav">
          <Nav>
            {navList(arrlist.items)}
          </Nav>
        </nav>
      </div>
    );
  }

  render() {
    const { renderUserList } = this;
    const { auth } = this.props;
    return (
      (auth.signedIn) ? renderUserList() : null
    );
  }
}

const connector: Connector<{}, Props> = connect(
  ({ auth, router }: Reducer) => ({ auth, router }),
  () => ({}),
);

export default connector(SideBarAdmin);
