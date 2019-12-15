import React from 'react';
import {shallow} from 'enzyme';

import {withAuthForm} from './with-auth-form.jsx';
import offers from '../../mocks/offers.js';
import {AsyncStatus} from '../../consts/consts.js';

describe(`e2e test for withAuthForm hoc`, () => {
  const MockComponent = () => <div />;
  const MockComponentWrapped = withAuthForm(MockComponent);
  const city = offers[0].city;

  it(`Should change userEmail, when call _handleEmailChange with value`, () => {
    const wrapper = shallow(
        <MockComponentWrapped
          city={city}
          user={null}
          userGetStatus={AsyncStatus.ERROR}
          authLogin={jest.fn()}
        />
    );

    expect(wrapper.state().userEmail).toEqual(``);

    wrapper.instance()._handleEmailChange(`test`);

    expect(wrapper.state().userEmail).toEqual(`test`);
  });
  it(`Should change userPassword, when call _handlePasswordChange with value`, () => {
    const wrapper = shallow(
        <MockComponentWrapped
          city={city}
          user={null}
          userGetStatus={AsyncStatus.ERROR}
          authLogin={() => {}}
        />
    );

    expect(wrapper.state().userPassword).toEqual(``);

    wrapper.instance()._handlePasswordChange(`qwerty`);

    expect(wrapper.state().userPassword).toEqual(`qwerty`);
  });
  it(`handleAuthLogin should been called with payload, when call _handleFormSubmit`, () => {
    const handleAuthLogin = jest.fn();
    const mockEvent = {preventDefault: () => {}};
    const wrapper = shallow(
        <MockComponentWrapped
          city={city}
          user={null}
          userGetStatus={AsyncStatus.ERROR}
          handleAuthLogin={handleAuthLogin}
        />
    );

    wrapper.instance()._handleEmailChange(`test`);
    wrapper.instance()._handlePasswordChange(`qwerty`);
    wrapper.instance()._handleFormSubmit(mockEvent);

    expect(handleAuthLogin).toHaveBeenNthCalledWith(1, {
      userEmail: `test`,
      userPassword: `qwerty`,
    });
  });
});
