import React, { useState } from 'react';
import { useRoutes, navigate } from 'hookrouter';

import { Login, NotFound, Signup } from './containers';
import AuthContextProvider from './contexts/AuthContext';
import ApiService from './utils/ApiService';
import { Header, Link, RootContainer } from './components';

const client = new ApiService();

const App = () => {
  const [isLoggedIn, setLoggedIn] = useState(client.isLoggedIn());

  const routes = {
    '/': () => (
      <RootContainer>
        <h1>Homepage</h1>
      </RootContainer>
    ),
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
      <RootContainer>
        <Header>
          <Link href="/">Homepage</Link>
          {!isLoggedIn && (
            <>
              <Link href="/login">Login</Link>
              <Link href="/signup">Signup</Link>
            </>
          )}
          {isLoggedIn && <Link href="/dashboard">Dashboard</Link>}
        </Header>
        {routeResult || <NotFound />}
      </RootContainer>
    </AuthContextProvider>
  );
};

export default App;
