import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {
  shape,
  oneOf,
  string,
  number,
  func,
} from 'prop-types';

import aUser from '../../store/user/actions.js';
import {ASYNC_STATUSES} from '../../consts/index.js';

const {
  PENDING,
  SUCCESS,
  ERROR,
} = ASYNC_STATUSES;

const withAuthForm = (Component) => {
  class WithAuthForm extends PureComponent {
    constructor(props) {
      super(props);
      this.state = {
        userEmail: ``,
        userPassword: ``,
      };
      this._handleFormSubmit = this._handleFormSubmit.bind(this);
      this._handleEmailChange = this._handleEmailChange.bind(this);
      this._handlePasswordChange = this._handlePasswordChange.bind(this);
    }

    _handleFormSubmit(evt) {
      const {userEmail, userPassword} = this.state;
      const {handleAuthLogin} = this.props;

      evt.preventDefault();
      handleAuthLogin({userEmail, userPassword});
    }

    _handleEmailChange(value) {
      this.setState({userEmail: value});
    }

    _handlePasswordChange(value) {
      this.setState({userPassword: value});
    }

    render() {
      const {userEmail, userPassword} = this.state;
      const {userGetStatus} = this.props;

      return (
        <Component
          {...this.props}
          userEmail={userEmail}
          userPassword={userPassword}
          userGetStatus={userGetStatus}
          onFormSubmit={this._handleFormSubmit}
          onEmailChange={this._handleEmailChange}
          onPasswordChange={this._handlePasswordChange}
        />
      );
    }
  }

  WithAuthForm.propTypes = {
    city: shape({
      location: shape({
        latitude: number.isRequired,
        longitude: number.isRequired,
        zoom: number.isRequired,
      }).isRequired,
      name: string.isRequired,
    }).isRequired,
    user: shape({}),
    userGetStatus: oneOf([PENDING, SUCCESS, ERROR]).isRequired,
    handleAuthLogin: func.isRequired,
  };

  WithAuthForm.defaultProps = {
    user: null,
  };

  return WithAuthForm;
};

const mapStateToProps = ({rData, rUser}) => ({
  city: rData.city,
  user: rUser.user,
  userGetStatus: rUser.userGetStatus,
});

const mapDispatchToProps = (dispatch) => ({
  handleAuthLogin: (payload) => dispatch(aUser.authLogin(payload)),
});

export {withAuthForm};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthForm
);
