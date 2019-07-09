import React, { useState } from 'react';
import { useRoutes, A, navigate } from 'hookrouter';

import { Login, Signup } from './containers';
import AuthContextProvider from './contexts/AuthContext';
import ApiService from './utils/ApiService';
import Container from './components/Container';

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
      <Container>
        {!isLoggedIn && (
          <A href="/login" style={{ width: '30px' }}>
            Login
          </A>
        )}
        <br />
        {!isLoggedIn && (
          <A href="/signup" style={{ width: '30px' }}>
            Signup
          </A>
        )}
        <br />
        {routeResult}
      </Container>
    </AuthContextProvider>
  );
};

export default App;
