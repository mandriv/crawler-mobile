import { RootNavigator } from '../config/router';

const initialState = RootNavigator.router.getStateForAction(RootNavigator.router.getActionForPathAndParams('Splash'));

export default (state = initialState, action) => {
  const nextState = RootNavigator.router.getStateForAction(action, state);

  /*
  // add a global variable to keep track of the drawer status (used with the drawer button)
  if (action.routeName === "DrawerOpen") {
    window.drawerOpen = true;
  } else {
    window.drawerOpen = false;
  }
  */

  // Simply return the original `state` if `nextState` is null or undefined.
  return nextState || state;
};
