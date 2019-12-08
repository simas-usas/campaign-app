import types from '../actions/actionTypes';

/**
 * @function usersReducer
 * @param {array} state - State before reducer.
 * @param {object} action - Action sent to reducer.
 * @returns {object} - New state (list of users).
 */
export default (state = [], action) => {
  switch (action.type) {
    case types.GET_USERS:
      return action.payload;
    default:
      return state;
  }
};
