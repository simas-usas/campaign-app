import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';

import Table from './components/Table/Table';
import data from './static/data';
import { getUsers } from './actions/usersActions';

import './App.scss';

/**
 * Main React class component.
 * @component
 * @returns {JSX.Element} - Rendered component.
 */
class App extends Component {
  componentDidMount() {
    this.props.getUsers();
  }

  render() {
    return (
      <div className="App">
        {
          this.props.users.length
            ? <Table data-test="campaigns-component" data={data} users={this.props.users} />
            : <CircularProgress className="spinner" data-test="spinner" />
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { users } = state;
  return { users };
};

App.propTypes = {
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
  getUsers: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { getUsers })(App);
