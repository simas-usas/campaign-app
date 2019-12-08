import React from 'react';
import PropTypes from 'prop-types';
import { TableCell, TableHead, TableRow, TableSortLabel } from '@material-ui/core';
import { KeyboardArrowDown } from '@material-ui/icons';

import './_tableHeader.scss';

const headCells = [
  { id: 'name', align: 'left', label: 'Name' },
  { id: 'userName', align: 'left', label: 'User Name' },
  { id: 'startDate', align: 'left', label: 'Start Date' },
  { id: 'endDate', align: 'left', label: 'End Date' },
  { id: 'status', align: 'left', label: 'Status' },
  { id: 'Budget', align: 'right', label: 'Budget' },
];

/**
 * Functional react component for table header.
 * @component
 * @param {object} props - React props.
 * @returns {JSX.Element} - Rendered component (or null if `success` prop is false).
 */
const TableHeader = (props) => {
  const { order, orderBy, onRequestSort } = props;

  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead data-test="table-header" className="table-header">
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.align}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={order}
              onClick={createSortHandler(headCell.id)}
              IconComponent={KeyboardArrowDown}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span
                  className="hidden"
                >
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

TableHeader.propTypes = {
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  onRequestSort: PropTypes.func.isRequired,
};

export default TableHeader;
