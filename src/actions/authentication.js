import { API_HOST } from 'react-native-dotenv';

import { receiveUser, clearUser } from './user';
import { receiveToken, clearToken } from './token';

export const login = (email, password) => {
  if (!email || !password) {
    throw new Error('Params are mising!');
  }
  return async (dispatch) => {
    const config = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    };
    const response = await fetch(`${API_HOST}/login`, config);
    if (response.ok) {
      const { token, user } = await response.json();
      dispatch(receiveUser(user));
      dispatch(receiveToken(token));
      return new Promise(resolve => resolve());
    }
    const { error } = await response.json();
    return new Promise((resolve, reject) => reject(error));
  };
};

export const logout = () => {
  return (dispatch) => {
    dispatch(clearUser());
    dispatch(clearToken());
  };
};

export const authenticate = async (token) => {
  if (!token) {
    throw new Error('Token is mising!');
  }
  const config = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await fetch(`${API_HOST}/auth`, config);
  if (response.ok) {
    const user = await response.json();
    return new Promise(resolve => resolve(user));
  }
  const { error } = await response.json();
  return new Promise((resolve, reject) => reject(error));
};

export const register = async (registerBody) => {
  if (!registerBody) {
    throw new Error('Body is mising!');
  }
  const config = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(registerBody),
  };
  const response = await fetch(`${API_HOST}/users`, config);
  console.log(response);
  if (response.ok) {
    const user = await response.json();
    return new Promise(resolve => resolve(user));
  }
  const { error } = await response.json();
  return new Promise((resolve, reject) => reject(error));
};
