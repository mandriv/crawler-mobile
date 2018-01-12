// this is called when the redux-persist rehydration (restoring the store) process completes
export function rehydrationCompleted() {
  return (dispatch, getState) => {
    console.log('initialized!');
  };
}
