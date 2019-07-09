import React, { useState } from 'react';
import Login from './containers/Login';
import Signup from './containers/Signup';
import AuthContextProvider from './contexts/AuthContext';
import ApiService from './utils/ApiService';

const client = new ApiService();

const App = () => {
  const [isLoggedIn, setLoggedIn] = useState(client.isLoggedIn());
  return (
    <AuthContextProvider client={client}>
      {!isLoggedIn && <Login setLoggedIn={setLoggedIn} />}
      {!isLoggedIn && <Signup setLoggedIn={setLoggedIn} />}
    </AuthContextProvider>
  );
};

export default App;
