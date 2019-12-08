import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Table, TableBody, TableCell, TableRow } from '@material-ui/core';
import moment from 'moment';

import TableHeader from '../TableHeader/TableHeader';
import Pagination from '../Pagination/Pagination';

import './_table.scss';

/**
 *  Rounds the given budget so the unit abbreviation can be added
 *    (e.g. thousand is abbreviated to K).
 *  @param {number} budget - Full budget number.
 *  @returns {number} - Rounded out budget with abbreviation letter.
 */
const checkStatus = (from, to) => {
  const today = new Date().getTime();
  return (today >= from && today <= to);
};

/**
 *  Rounds the given budget so the unit abbreviation can be added
 *    (e.g. thousand is abbreviated to K).
 *  @param {number} budget - Full budget number.
 *  @returns {number} - Rounded out budget with abbreviation letter.
 */
const budgetRounded = (budget) => {
  if (Math.abs(Number(budget)) >= 1.0e+6) {
    return `${(Math.abs(Number(budget)) / 1.0e+6).toFixed(2)}M`;
  }
  if (Math.abs(Number(budget)) >= 1.0e+3) {
    return `${(Math.abs(Number(budget)) / 1.0e+3).toFixed(2)}K`;
  }
  return budget;
};

/**
 *  Checks where the row should be placed within the order.
 *  @param {object} a - A row of the column.
 *  @param {object} b - A row of the column.
 *  @param {string} orderBy - Name of the column that needs to be ordered.
 *  @returns {number} - Returns the row's position.
 */
const sortOrder = (a, b, orderBy) => {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
};

/**
 *  Sets the order of descent for the column.
 *  @param {string} order - Order of descent. Can be either asc or desc.
 *  @param {string} orderBy - Column name.
 *  @returns {function} - Calls sortOrder function.
 */
const getSorting = (order, orderBy) => (
  order === 'desc' ? (a, b) => sortOrder(a, b, orderBy) : (a, b) => -sortOrder(a, b, orderBy)
);

/**
 *  Sorts the given column.
 *  @param {array} column - The given column that needs to be sorted.
 *  @param {function} sortFunc - The function that places the row within the column.
 *  @returns {array} - Returns sorted column.
 */
const sortColumn = (column, sortFunc) => {
  const items = column.map((el, index) => [el, index]);
  items.sort((a, b) => {
    const sort = sortFunc(a[0], b[0]);
    if (sort !== 0) return sort;
    return a[1] - b[1];
  });
  return items.map((el) => el[0]);
};

/**
 * Functional react component for table.
 * @component
 * @param {array} data - Campaigns with the necessary details.
 * @param {array} users - Users with the necessary details.
 * @returns {JSX.Element} - Rendered component.
 */
const CampaignTable = ({ data, users }) => {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);

  const campaigns = data
    .filter((a) => new Date(a.startDate).getTime() <= new Date(a.endDate).getTime())
    .map((b) => {
      const user = users.find((item) => b.userId === item.id);
      b.userName = user ? user.name : 'Unknown User';
      b.startDate = new Date(b.startDate).getTime();
      b.endDate = new Date(b.endDate).getTime();
      b.status = checkStatus(b.startDate, b.endDate);
      b.budget = budgetRounded(b.Budget);
      return b;
    });

  return (
    <>
      <Table data-test="table">
        <TableHeader
          order={order}
          orderBy={orderBy}
          onRequestSort={(e, property) => {
            setOrder(orderBy === property && order === 'desc' ? 'asc' : 'desc');
            setOrderBy(property);
          }}
          rowCount={campaigns.length}
        />
        <TableBody className="table">
          {sortColumn(campaigns, getSorting(order, orderBy))
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row) => (
              <TableRow
                data-test="row"
                hover
                tabIndex={-1}
                key={row.id}
              >
                <TableCell className="name" align="left">{row.name}</TableCell>
                <TableCell className="userName" align="left">{row.userName}</TableCell>
                <TableCell align="left">{moment(row.startDate).format('DD/MM/YYYY')}</TableCell>
                <TableCell align="left">{moment(row.endDate).format('DD/MM/YYYY')}</TableCell>
                <TableCell align="left">
                  <span className={`dot ${row.status ? 'active' : 'inactive'}`} />
                  {row.status ? 'Active' : 'Inactive'}
                </TableCell>
                <TableCell align="right">
                  {`${row.budget} USD`}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <Pagination
        campaigns={campaigns}
        page={page}
        rowsPerPage={rowsPerPage}
        setPage={setPage}
        setRowsPerPage={setRowsPerPage}
      />
    </>
  );
};

CampaignTable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default CampaignTable;
