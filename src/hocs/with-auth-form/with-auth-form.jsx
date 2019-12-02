import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {
  shape,
  string,
  number,
  func,
} from 'prop-types';

import aData from '../../store/data/actions.js';

const withAuthForm = (Component) => {
  class WithAuthForm extends PureComponent {
    constructor(props) {
      super(props);
      this.state = {
        userEmail: ``,
        userPassword: ``,
      };
      this.formSubmitHandler = this.formSubmitHandler.bind(this);
      this.emailChangeHandler = this.emailChangeHandler.bind(this);
      this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
    }

    formSubmitHandler(evt) {
      const {userEmail, userPassword} = this.state;
      const {authLogin} = this.props;

      evt.preventDefault();
      authLogin({userEmail, userPassword});
    }

    emailChangeHandler(value) {
      this.setState({userEmail: value});
    }

    passwordChangeHandler(value) {
      this.setState({userPassword: value});
    }

    render() {
      const {userEmail, userPassword} = this.state;

      return (
        <Component
          {...this.props}
          userEmail={userEmail}
          userPassword={userPassword}
          onFormSubmit={this.formSubmitHandler}
          onEmailChange={this.emailChangeHandler}
          onPasswordChange={this.passwordChangeHandler}
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
    signInHandler: func.isRequired,
    authLogin: func.isRequired,
  };

  return WithAuthForm;
};

const mapStateToProps = ({rData}) => ({
  city: rData.city,
});

const mapDispatchToProps = (dispatch) => ({
  signInHandler: () => dispatch(aData.signIn()),
  authLogin: (payload) => dispatch(aData.authLogin(payload)),
});

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthForm
);
