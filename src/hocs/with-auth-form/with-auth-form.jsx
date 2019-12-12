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
