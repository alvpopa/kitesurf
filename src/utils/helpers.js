import { DEFAULT_USER_AUTH } from './constants';

export const apiRequest = async (
  url,
  method = 'POST',
  bodyParams = {},
  token = ''
) => {
  const headers = token
    ? { 'Content-Type': 'application/json', token: token }
    : { 'Content-Type': 'application/json' };

  const response = await fetch(url, {
    method,
    headers,
    body: bodyParams ? JSON.stringify(bodyParams) : undefined
  });

  return await response.json();
};

export const getUserFromLocalStorage = () => {
  const user = window.localStorage.getItem('UserAuth');
  return user ? JSON.parse(user) : DEFAULT_USER_AUTH;
};
