import React, { useState, useEffect, useContext } from 'react';

import { Map, Grid } from './';
import { apiRequest } from '../utils/helpers';
import { authContext } from '../contexts/AuthContext';

import { FormError } from '../components/';

const { REACT_APP_GET_ALL_SPOTS } = process.env;

const Dashboard = () => {
  const [spots, setSpots] = useState([]);
  const [apiError, setApiError] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setApiError('');
    }, 5000);
    return () => clearTimeout(timer);
  }, [apiError]);

  const {
    auth: { token }
  } = useContext(authContext);

  useEffect(() => {
    const getSpotsFromApi = async () => {
      const { error, result } = await apiRequest(
        REACT_APP_GET_ALL_SPOTS,
        'POST',
        '',
        token
      );

      error ? setApiError(error.message) : setSpots(result);
    };
    getSpotsFromApi();
  }, [token]);

  return (
    <>
      <Map spots={spots} setSpots={setSpots} setApiError={setApiError} />
      {apiError && <FormError>{apiError}</FormError>}
      <Grid spots={spots} />
    </>
  );
};

export default Dashboard;
