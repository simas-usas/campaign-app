import React from 'react';
import { shallow } from 'enzyme';
import { findByTestAttr, checkProps } from '../../../test/testUtils';
import Pagination from './Pagination';

const defaultProps = {
  campaigns: [
    { id: 12, name: 'Rhyno', startDate: '10/13/2027', endDate: '1/25/2018', Budget: 333333, userId: 1 },
    { id: 43, name: 'ZoomZoom', startDate: '9/6/2007', endDate: '11/10/2017', Budget: 444444, userId: 2 },
  ],
  page: 1,
  rowsPerPage: 25,
  setPage: () => {},
  setRowsPerPage: () => {},
};

/**
* Function to create a ShallowWrapper for Pagination component.
* @function setup
* @param {object} props - Component props specific to this setup.
* @returns {ShallowWrapper}
*/
const setup = (props = {}) => {
  const setupProps = { ...defaultProps, ...props };
  return shallow(<Pagination {...setupProps} />);
};

it('does not throw warning with expected props', () => {
  checkProps(Pagination, defaultProps);
});

it('renders pagination component', () => {
  const wrapper = setup();
  const paginationComponent = findByTestAttr(wrapper, 'pagination');
  expect(paginationComponent.length).toBe(1);
});
