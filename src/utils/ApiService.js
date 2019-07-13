import { DEFAULT_USER_AUTH } from './constants';
import { apiRequest } from '../utils/helpers';

const {
  REACT_APP_LOG_IN,
  REACT_APP_SIGN_UP,
  REACT_APP_GET_ALL_SPOTS,
  REACT_APP_ADD_SPOT,
  REACT_APP_ADD_FAVORITE_SPOT,
  REACT_APP_REMOVE_FAVORITE_SPOT,
  REACT_APP_REMOVE_SPOT
} = process.env;

export default class ApiService {
  token = null;

  constructor() {
    this.token = this.getUserFromLocalStorage().token;
  }

  getUserFromLocalStorage = () => {
    const user = window.localStorage.getItem('UserAuth');
    return user ? JSON.parse(user) : DEFAULT_USER_AUTH;
  };

  isLoggedIn = () => {
    return !!this.token;
  };

  logIn = async bodyParams => {
    return await apiRequest(REACT_APP_LOG_IN, 'POST', bodyParams);
  };

  signUp = async bodyParams => {
    return await apiRequest(REACT_APP_SIGN_UP, 'POST', bodyParams);
  };

  getSpots = async ({ country = '', windProbability = 0 } = {}) => {
    const bodyParams = { country, windProbability };
    return await apiRequest(
      REACT_APP_GET_ALL_SPOTS,
      'POST',
      bodyParams,
      this.token
    );
  };

  toggleFavorite = async (event, bodyParams) => {
    const apiMethod = event.currentTarget.className.includes('fas')
      ? REACT_APP_REMOVE_FAVORITE_SPOT
      : REACT_APP_ADD_FAVORITE_SPOT;

    return await apiRequest(apiMethod, 'POST', bodyParams, this.token);
  };

  deleteSpot = async bodyParams =>
    await apiRequest(REACT_APP_REMOVE_SPOT, 'POST', bodyParams, this.token);

  addSpot = async bodyParams =>
    await apiRequest(REACT_APP_ADD_SPOT, 'POST', bodyParams, this.token);
}
