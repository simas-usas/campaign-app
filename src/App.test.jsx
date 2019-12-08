import React from 'react';
import { shallow } from 'enzyme';

import { findByTestAttr, storeFactory } from '../test/testUtils';
import App from './App';

/**
 * Function to create a ShallowWrapper for the main App component.
 * @function setup
 * @param {object} state - State for this setup.
 * @returns {ShallowWrapper}
 */
const setup = (state = {}) => {
  const store = storeFactory(state);
  const wrapper = shallow(<App store={store} />).dive().dive();
  return wrapper;
};

describe('redux properties', () => {
  it('has access to "users" state', () => {
    const users = [
      { id: 1, name: 'Leanne Graham' },
      { id: 2, name: 'Ervin Howell' },
    ];
    const wrapper = setup({ users });
    const usersProp = wrapper.instance().props.users;
    expect(usersProp).toBe(users);
  });
  it('"getUsers" action creator is a function on the props', () => {
    const wrapper = setup();
    const getUsersProp = wrapper.instance().props.getUsers;
    expect(getUsersProp).toBeInstanceOf(Function);
  });
});

it('"getUsers" runs on App mount', () => {
  const getUsersMock = jest.fn();
  const CampaignApp = App.WrappedComponent;
  const props = {
    getUsers: getUsersMock,
    users: [],
  };
  const wrapper = shallow(<CampaignApp {...props} />);

  wrapper.instance().componentDidMount();
  expect(getUsersMock).toHaveBeenCalledTimes(1);
});

describe('when app is launched', () => {
  it('renders loading spinner when there are no users loaded', () => {
    const users = [];
    const wrapper = setup({ users });

    const spinner = findByTestAttr(wrapper, 'spinner');
    expect(spinner.length).toBe(1);
  });
  it('renders campaigns component when there are users loaded', () => {
    const users = [
      { id: 1, name: 'Leanne Graham' },
      { id: 2, name: 'Ervin Howell' },
    ];
    const wrapper = setup({ users });

    const campaignsComponent = findByTestAttr(wrapper, 'campaigns-component');
    expect(campaignsComponent.length).toBe(1);
  });
});
