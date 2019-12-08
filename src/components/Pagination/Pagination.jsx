import React from 'react';
import PropTypes from 'prop-types';
import { TablePagination } from '@material-ui/core';

import './_pagination.scss';

/**
 * Functional react component for table pagination.
 * @component
 * @param {array} campaigns - Array of campaigns.
 * @param {number} page - Current page.
 * @param {number} rowsPerPage - Amount of rows shown per page.
 * @param {function} setPage - Sets the current page.
 * @param {function} setRowsPerPage - Set the current number of rows page.
 * @returns {JSX.Element} - Rendered component.
 */
const Pagination = ({ campaigns, page, rowsPerPage, setPage, setRowsPerPage }) => (
  <TablePagination
    data-test="pagination"
    className="pagination"
    rowsPerPageOptions={[25, 50]}
    component="div"
    count={campaigns.length}
    rowsPerPage={rowsPerPage}
    page={page}
    onChangePage={(e, newPage) => setPage(newPage)}
    onChangeRowsPerPage={(e) => {
      setRowsPerPage(parseInt(e.target.value, 10));
      setPage(0);
    }}
  />
);

Pagination.propTypes = {
  campaigns: PropTypes.arrayOf(PropTypes.object).isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
  setRowsPerPage: PropTypes.func.isRequired,
};

export default Pagination;
