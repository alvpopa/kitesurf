import * as React from 'react';

import useAuth from '../utils/hooks/useAuth';
import { DEFAULT_USER_AUTH } from '../utils/constants';

export const authContext = React.createContext({
  auth: DEFAULT_USER_AUTH,
  setAuthStatus: () => {},
  setUnauthStatus: () => {}
});

const { Provider } = authContext;

const AuthProvider = ({ children, client }) => {
  const [auth, setAuthStatus, setUnauthStatus] = useAuth(
    client.getUserFromLocalStorage()
  );

  return (
    <Provider value={{ auth, setAuthStatus, setUnauthStatus }}>
      {children}
    </Provider>
  );
};

export default AuthProvider;
