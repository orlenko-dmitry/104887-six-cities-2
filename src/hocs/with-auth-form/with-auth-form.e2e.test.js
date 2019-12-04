import React from 'react';
import {shallow} from 'enzyme';

import {withAuthForm} from './with-auth-form.jsx';
import offers from '../../mocks/offers.js';

describe(`e2e test for withAuthForm hoc`, () => {
  const MockComponent = () => <div />;
  const MockComponentWrapped = withAuthForm(MockComponent);
  const city = offers[0];

  it(`Should change userEmail, when call emailChangeHandler with value`, () => {
    const wrapper = shallow(
        <MockComponentWrapped
          city={city}
          user={null}
          authLogin={jest.fn()}
        />
    );

    expect(wrapper.state().userEmail).toEqual(``);

    wrapper.instance().emailChangeHandler(`test`);

    expect(wrapper.state().userEmail).toEqual(`test`);
  });
  it(`Should change userPassword, when call passwordChangeHandler with value`, () => {
    const wrapper = shallow(
        <MockComponentWrapped
          city={city}
          user={null}
          authLogin={() => {}}
        />
    );

    expect(wrapper.state().userPassword).toEqual(``);

    wrapper.instance().passwordChangeHandler(`qwerty`);

    expect(wrapper.state().userPassword).toEqual(`qwerty`);
  });
  it(`authLogin should been called with payload, when call formSubmitHandler`, () => {
    const authLoginHandler = jest.fn();
    const mockEvent = {preventDefault: () => {}};
    const wrapper = shallow(
        <MockComponentWrapped
          city={city}
          user={null}
          authLogin={() => {}}
        />
    );

    wrapper.instance().emailChangeHandler(`test`);
    wrapper.instance().passwordChangeHandler(`qwerty`);
    wrapper.instance().formSubmitHandler(mockEvent);

    expect(authLoginHandler).toHaveBeenNthCalledWith(1, {
      userEmail: `test`,
      userPassword: `qwerty`,
    });
  });
});
