import { NavigationActions } from 'react-navigation';

// resets stack
const resetAction = route => NavigationActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({ routeName: route })],
});

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
      dispatch(resetAction('Login'));
    }
  };
}

export function initializeApp() {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(resetAction('Login'));
    }, 1000);
  };
}
