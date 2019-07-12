import React, { useContext, useEffect, useRef, useState } from 'react';
//import ReactDOM from 'react-dom';

import L from 'leaflet';
import { apiRequest } from '../utils/helpers';
import { authContext } from '../contexts/AuthContext';
import { redIcon, yellowIcon } from '../utils/constants';
import { FormError } from '../components/';
import { Popup } from './';

const { REACT_APP_GET_ALL_SPOTS } = process.env;

const Map = () => {
  const mapRef = useRef(null);
  const [spots, setSpots] = useState([]);
  const [apiError, setApiError] = useState('');
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [currentMarker, setCurrentMarker] = useState({});

  const {
    auth: { token }
  } = useContext(authContext);

  useEffect(() => {
    const timer = setTimeout(() => {
      setApiError('');
    }, 5000);
    return () => clearTimeout(timer);
  }, [apiError]);

  useEffect(() => {
    const addSpotOnMap = e => {
      const { lat: latitude, lng: longitude } = e.latlng;
      L.marker(e.latlng)
        .setIcon(redIcon)
        .addTo(layerRef.current)
        .on('click', event => {
          event.originalEvent.preventDefault();
          setCurrentMarker({ latitude, longitude });
          setIsPopupOpen(isPopupOpen => !isPopupOpen);
        });
    };

    mapRef.current = L.map('map', {
      center: [25, 25],
      zoom: 2,
      worldCopyJump: true,
      layers: [
        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
          attribution:
            '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        })
      ]
    }).on('click', addSpotOnMap);
  }, []);

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

  const layerRef = useRef(null);
  useEffect(() => {
    layerRef.current = L.layerGroup().addTo(mapRef.current);
  }, []);

  useEffect(() => {
    spots.forEach(spot => {
      const { isFavorite, latitude, longitude, name } = spot;
      const latLng = { lat: latitude, lng: longitude };

      L.marker(latLng, { title: name })
        .setIcon(isFavorite ? yellowIcon : redIcon)
        .addTo(layerRef.current)
        .on('click', event => {
          event.originalEvent.preventDefault();
          setCurrentMarker(spot);
          setIsPopupOpen(isPopupOpen => !isPopupOpen);
        });
    });
  }, [spots, isPopupOpen]);

  return (
    <>
      <div id="map" />
      {apiError && <FormError>{apiError}</FormError>}
      {isPopupOpen && (
        <Popup
          marker={currentMarker}
          setSpots={setSpots}
          setApiError={setApiError}
          setIsPopupOpen={setIsPopupOpen}
          layer={layerRef.current}
        />
      )}
    </>
  );
};

export default Map;
