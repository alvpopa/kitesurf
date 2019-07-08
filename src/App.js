import React from 'react';
import Login from './containers/Login';
import AuthContextProvider from './contexts/AuthContext';

const App = () => {
  return (
    <AuthContextProvider>
      <Login />
    </AuthContextProvider>
  );
};

export default App;
