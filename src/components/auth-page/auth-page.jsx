import React from 'react';
import {
  shape,
  oneOf,
  string,
  number,
  func,
} from 'prop-types';
import {Link, Redirect} from 'react-router-dom';

import PageHeader from '../page-header/page-header.jsx';
import {AppRoute, AsyncStatus} from '../../consts/consts.js';

const {
  PENDING,
  SUCCESS,
  ERROR,
} = AsyncStatus;

const AuthPage = ({
  city,
  userEmail,
  userPassword,
  user,
  userGetStatus,
  onFormSubmit,
  onEmailChange,
  onPasswordChange,
}) => {
  if (user !== null && userGetStatus === SUCCESS) {
    return <Redirect to={AppRoute.ROOT} />;
  }
  if (user === null && userGetStatus === ERROR) {
    return (
      <div className="page page--gray page--login">
        <PageHeader user={user} />
        <main className="page__main page__main--login">
          <div className="page__login-container container">
            <section className="login">
              <h1 className="login__title">Sign in</h1>
              <form className="login__form form" onSubmit={onFormSubmit}>
                <div className="login__input-wrapper form__input-wrapper">
                  <label className="visually-hidden">E-mail</label>
                  <input
                    className="login__input form__input"
                    value={userEmail}
                    type="email"
                    name="email"
                    placeholder="Email"
                    required
                    onChange={(evt) => onEmailChange(evt.target.value)}
                  />
                </div>
                <div className="login__input-wrapper form__input-wrapper">
                  <label className="visually-hidden">Password</label>
                  <input
                    className="login__input form__input"
                    value={userPassword}
                    type="password"
                    name="password"
                    placeholder="Password"
                    required
                    onChange={(evt) => onPasswordChange(evt.target.value)}
                  />
                </div>
                <button
                  className="login__submit form__submit button"
                  type="submit"
                >
                  Sign in
                </button>
              </form>
            </section>
            <section className="locations locations--login locations--current">
              <div className="locations__item">
                <Link className="locations__item-link" to={AppRoute.ROOT}>
                  <span>{city.name}</span>
                </Link>
              </div>
            </section>
          </div>
        </main>
      </div>
    );
  }
  return null;
};

AuthPage.propTypes = {
  city: shape({
    location: shape({
      latitude: number.isRequired,
      longitude: number.isRequired,
      zoom: number.isRequired,
    }).isRequired,
    name: string.isRequired,
  }).isRequired,
  userEmail: string.isRequired,
  userPassword: string.isRequired,
  user: shape({}),
  userGetStatus: oneOf([PENDING, SUCCESS, ERROR]).isRequired,
  onFormSubmit: func.isRequired,
  onEmailChange: func.isRequired,
  onPasswordChange: func.isRequired,
};

AuthPage.defaultProps = {
  user: null,
};


export default AuthPage;
