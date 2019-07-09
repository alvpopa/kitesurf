import { DEFAULT_USER_AUTH } from './constants';

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
}
