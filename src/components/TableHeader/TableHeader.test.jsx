import React from 'react';
import { shallow } from 'enzyme';
import { findByTestAttr, checkProps } from '../../../test/testUtils';
import TableHeader from './TableHeader';

const defaultProps = {
  order: 'desc',
  orderBy: 'name',
  onRequestSort: () => {},
};

/**
* Function to create a ShallowWrapper for TableHeader component.
* @function setup
* @param {object} props - Component props specific to this setup.
* @returns {ShallowWrapper}
*/
const setup = (props = {}) => {
  const setupProps = { ...defaultProps, ...props };
  return shallow(<TableHeader {...setupProps} />);
};

it('does not throw warning with expected props', () => {
  checkProps(TableHeader, defaultProps);
});

it('renders table header component', () => {
  const wrapper = setup();
  const tableHeaderComponent = findByTestAttr(wrapper, 'table-header');
  expect(tableHeaderComponent.length).toBe(1);
});