export const RECEIVE_TOKEN = 'RECEIVE_TOKEN';
export const CLEAR_TOKEN = 'CLEAR_TOKEN';

export function receiveToken(token) {
  return {
    type: RECEIVE_TOKEN,
    token,
  };
}

export function clearToken() {
  return {
    type: CLEAR_TOKEN,
  };
}
