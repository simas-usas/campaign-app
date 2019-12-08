import React from 'react';
import { shallow } from 'enzyme';
import { findByTestAttr, checkProps } from '../../../test/testUtils';
import Table from './Table';

const defaultProps = {
  data: [
    { id: 12, name: 'Rhyno', startDate: '10/13/2027', endDate: '1/25/2018', Budget: 333333, userId: 1 },
    { id: 43, name: 'ZoomZoom', startDate: '9/6/2007', endDate: '11/10/2017', Budget: 444444, userId: 2 },
  ],
  users: [
    { id: 1, name: 'Leanne Graham' },
    { id: 2, name: 'Ervin Howell' },
  ],
};

/**
* Function to create a ShallowWrapper for Table component.
* @function setup
* @param {object} props - Component props specific to this setup.
* @returns {ShallowWrapper}
*/
const setup = (props = {}) => {
  const setupProps = { ...defaultProps, ...props };
  return shallow(<Table {...setupProps} />);
};

it('does not throw warning with expected props', () => {
  checkProps(Table, defaultProps);
});

describe('if there are campaigns loaded', () => {
  let wrapper;
  const data = [
    { id: 12, name: 'Rhyno', startDate: '10/13/2017', endDate: '1/25/2018', Budget: 333333, userId: 1 },
    { id: 99, name: 'BlackSheep', startDate: '9/6/2027', endDate: '11/10/2017', Budget: 9999999, userId: 22 },
    { id: 43, name: 'ZoomZoom', startDate: '9/6/2007', endDate: '11/10/2017', Budget: 444444, userId: 2 },
  ];
  beforeEach(() => {
    wrapper = setup({ data });
  });
  it('renders table of campaigns', () => {
    const dataTable = findByTestAttr(wrapper, 'table');
    expect(dataTable.length).toBe(1);
  });
  it('renders correct number of rows without invalid dates', () => {
    const dataTableRows = findByTestAttr(wrapper, 'row');
    expect(dataTableRows.length).toBe(2);
  });
});
