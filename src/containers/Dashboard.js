import React, { useState, useEffect } from 'react';

import { Map, Grid } from './';
import { FormError } from '../components/';
import ApiService from '../utils/ApiService';

const client = new ApiService();

const Dashboard = () => {
  const [spots, setSpots] = useState([]);
  const [apiError, setApiError] = useState('');

  useEffect(() => {
    const getSpotsFromApi = async () => {
      const { error, result } = await client.getSpots();
      error ? setApiError(error.message) : setSpots(result);
    };
    getSpotsFromApi();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setApiError('');
    }, 5000);
    return () => clearTimeout(timer);
  }, [apiError]);

  return (
    <>
      <Map
        client={client}
        spots={spots}
        setApiError={setApiError}
        setSpots={setSpots}
      />
      {apiError && <FormError>{apiError}</FormError>}
      <Grid spots={spots} />
    </>
  );
};

export default Dashboard;
