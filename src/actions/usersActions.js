import axios from 'axios';
import types from './actionTypes';

/**
 * Returns function that initiates an axios request
 *    and dispatches the response as a 'GET_USERS' action
 * @returns {function} - function.
 */
// in case new user actions need to be added
// eslint-disable-next-line import/prefer-default-export
export const getUsers = () => (dispatch) => (
  axios.get('https://jsonplaceholder.typicode.com/users')
    .then((response) => {
      dispatch({
        type: types.GET_USERS,
        payload: response.data,
      });
    })
);
