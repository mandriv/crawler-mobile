import { resetAction } from '../config/router';
import { authenticate, logout } from '../actions/authentication';
import { receiveUser } from '../actions/user';

// this is called when the redux-persist rehydration (restoring the store) process completes
export function rehydrationCompleted() {
  return (dispatch) => {
    dispatch(triggerInitialize());
  };
}

export function triggerInitialize() {
  return (dispatch) => {
    try {
      dispatch(initializeApp());
    } catch (e) {
      console.log(e);
      dispatch(resetAction('Login'));
    }
  };
}

export function initializeApp() {
  return async (dispatch, getState) => {
    const { token } = getState();
    if (token) {
      try {
        const user = await authenticate(token);
        dispatch(receiveUser(user));
        dispatch(resetAction('Main'));
        return;
      } catch (error) {
        dispatch(logout());
        dispatch(resetAction('Login'));
        return;
      }
    }
    dispatch(resetAction('Login'));
  };
}
