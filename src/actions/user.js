export const RECEIVE_USER = 'RECEIVE_USER';
export const CLEAR_USER = 'CLEAR_USER';

export function receiveUser(user) {
  return {
    type: RECEIVE_USER,
    user,
  };
}

export function clearUser() {
  return {
    type: CLEAR_USER,
  };
}
