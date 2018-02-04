import {
  RECEIVE_TOKEN,
  CLEAR_TOKEN,
} from '../actions/token';

const initialState = '';

export default function tokenReducer(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_TOKEN:
      return action.token;
    case CLEAR_TOKEN:
      return initialState;
    default:
      return state;
  }
}
