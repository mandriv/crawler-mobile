import {
  RECEIVE_USER,
  CLEAR_USER,
} from '../actions/user';

const initialState = null;

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_USER:
      return action.user;
    case CLEAR_USER:
      return initialState;
    default:
      return state;
  }
}
