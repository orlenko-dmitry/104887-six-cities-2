import React from 'react';
import {shape} from 'prop-types';
import {Link} from 'react-router-dom';

import {ROUTES} from '../../consts';

const PageHeader = ({user}) => (
  <header className="header">
    <div className="container">
      <div className="header__wrapper">
        <div className="header__left">
          <a className="header__logo-link" href="/">
            <img
              className="header__logo"
              src="img/logo.svg"
              alt="6 cities logo"
              width={81}
              height={41}
            />
          </a>
        </div>
        <nav className="header__nav">
          <ul className="header__nav-list">
            <li className="header__nav-item user">
              {
                user === null
                  ? (
                    <Link className="header__nav-link header__nav-link--profile" to={ROUTES.AUTH}>
                      <div className="header__avatar-wrapper user__avatar-wrapper" />
                      <span className="header__login">Sign in</span>
                    </Link>
                  ) : (
                    <Link className="header__nav-link header__nav-link--profile" to={ROUTES.FAVORITE}>
                      <div className="header__avatar-wrapper user__avatar-wrapper" />
                      <span className="header__user-name user__name">{user.email}</span>
                    </Link>
                  )
              }
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </header>
);

PageHeader.propTypes = {
  user: shape({}),
};

PageHeader.defaultProps = {
  user: null,
};

export default PageHeader;
