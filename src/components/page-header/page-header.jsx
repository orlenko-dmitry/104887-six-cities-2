import React from 'react';
import {shape} from 'prop-types';
import {Link} from 'react-router-dom';

import {AppRoute, AxiosConfig} from '../../consts/consts.js';

const PageHeader = ({user}) => (
  <header className="header">
    <div className="container">
      <div className="header__wrapper">
        <div className="header__left">
          <Link className="header__logo-link" to={AppRoute.ROOT}>
            <img
              className="header__logo"
              src="/img/logo.svg"
              alt="6 cities logo"
              width={81}
              height={41}
            />
          </Link>
        </div>
        <nav className="header__nav">
          <ul className="header__nav-list">
            <li className="header__nav-item user">
              {
                user === null
                  ? (
                    <Link className="header__nav-link header__nav-link--profile" to={AppRoute.AUTH}>
                      <div className="header__avatar-wrapper user__avatar-wrapper" />
                      <span className="header__login">Sign in</span>
                    </Link>
                  ) : (
                    <Link className="header__nav-link header__nav-link--profile" to={AppRoute.FAVORITE}>
                      <div
                        className="header__avatar-wrapper user__avatar-wrapper"
                        style={{
                          backgroundImage: `url(${AxiosConfig.BASE_URL}${user.avatar_url})`,
                          borderRadius: `50%`,
                        }}
                      />
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
