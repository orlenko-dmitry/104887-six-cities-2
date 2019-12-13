import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {
  shape,
  string,
  number,
  func,
} from 'prop-types';

import aUser from '../../store/user/actions.js';

const withAuthForm = (Component) => {
  class WithAuthForm extends PureComponent {
    constructor(props) {
      super(props);
      this.state = {
        userEmail: ``,
        userPassword: ``,
      };
      this._formSubmitHandler = this._formSubmitHandler.bind(this);
      this._emailChangeHandler = this._emailChangeHandler.bind(this);
      this._passwordChangeHandler = this._passwordChangeHandler.bind(this);
    }

    _formSubmitHandler(evt) {
      const {userEmail, userPassword} = this.state;
      const {authLogin} = this.props;

      evt.preventDefault();
      authLogin({userEmail, userPassword});
    }

    _emailChangeHandler(value) {
      this.setState({userEmail: value});
    }

    _passwordChangeHandler(value) {
      this.setState({userPassword: value});
    }

    render() {
      const {userEmail, userPassword} = this.state;

      return (
        <Component
          {...this.props}
          userEmail={userEmail}
          userPassword={userPassword}
          onFormSubmit={this._formSubmitHandler}
          onEmailChange={this._emailChangeHandler}
          onPasswordChange={this._passwordChangeHandler}
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
    authLogin: func.isRequired,
  };

  WithAuthForm.defaultProps = {
    user: null,
  };

  return WithAuthForm;
};

const mapStateToProps = ({rData, rUser}) => ({
  city: rData.city,
  user: rUser.user,
});

const mapDispatchToProps = (dispatch) => ({
  authLogin: (payload) => dispatch(aUser.authLogin(payload)),
});

export {withAuthForm};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthForm
);
