import React, { useContext, useEffect, useRef, useState } from 'react';

import L from 'leaflet';
import { apiRequest } from '../utils/helpers';
import { authContext } from '../contexts/AuthContext';
import { redIcon, yellowIcon } from '../utils/constants';

const { REACT_APP_GET_SOME_SPOTS } = process.env;

const Map = () => {
  const mapRef = useRef(null);
  const [spots, setSpots] = useState([]);
  const {
    auth: { token }
  } = useContext(authContext);

  useEffect(() => {
    mapRef.current = L.map('map', {
      center: [25, 25],
      zoom: 2,
      layers: [
        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
          attribution:
            '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        })
      ]
    });
  }, []);

  useEffect(() => {
    const getSpotsFromApi = async () => {
      const { result } = await apiRequest(
        REACT_APP_GET_SOME_SPOTS,
        'POST',
        { skip: 0 },
        token
      );
      result && setSpots(result);
    };
    getSpotsFromApi();
  });

  //get current map reference
  const layerRef = useRef(null);
  useEffect(() => {
    layerRef.current = L.layerGroup().addTo(mapRef.current);
  }, []);

  useEffect(() => {
    spots.forEach(spot => {
      const { country, isFavorite, latitude, longitude, name } = spot;
      const latLng = { lat: latitude, lng: longitude };
      const popup = L.popup()
        .setLatLng(latLng)
        .setContent(`<p>Hello world!<br />${country}</p>`);

      L.marker(latLng, { title: name })
        .setIcon(isFavorite ? yellowIcon : redIcon)
        .bindPopup(popup)
        .addTo(layerRef.current);
    });
  }, [spots]);

  return <div id="map" />;
};

export default Map;
