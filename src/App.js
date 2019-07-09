import React, { useState } from 'react';
import { useRoutes, A, navigate } from 'hookrouter';

import Login from './containers/Login';
import Signup from './containers/Signup';
import AuthContextProvider from './contexts/AuthContext';
import ApiService from './utils/ApiService';

const client = new ApiService();

const App = () => {
  const [isLoggedIn, setLoggedIn] = useState(client.isLoggedIn());

  const routes = {
    '/login': () => {
      return isLoggedIn ? (
        navigate('/dashboard')
      ) : (
        <Login setLoggedIn={setLoggedIn} />
      );
    },
    '/signup': () => {
      return isLoggedIn ? (
        navigate('/dashboard')
      ) : (
        <Signup setLoggedIn={setLoggedIn} />
      );
    },
    '/dashboard': () => {
      return !isLoggedIn ? navigate('/') : <h1>Dashboard</h1>;
    }
  };

  const routeResult = useRoutes(routes);

  return (
    <AuthContextProvider client={client}>
      {!isLoggedIn && <A href="/login">Login</A>}
      <br />
      {!isLoggedIn && <A href="/signup">Signup</A>}
      <br />
      {isLoggedIn && <A href="/dashboard">Dashboard</A>}
      {routeResult}
    </AuthContextProvider>
  );
};

export default App;
