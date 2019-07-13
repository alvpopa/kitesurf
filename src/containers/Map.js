import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';

import { redIcon, yellowIcon } from '../utils/constants';
import { FilterTooltip } from '../components/';
import { Filter, Popup } from './';

const Map = ({ client, spots, setSpots, setApiError }) => {
  const mapRef = useRef(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [currentMarker, setCurrentMarker] = useState({});
  const [filterValues, setFilterValues] = useState({
    country: '',
    windProbability: 0
  });

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
      <FilterTooltip
        onClick={() => setIsFilterOpen(isFilterOpen => !isFilterOpen)}
        className="fas fa-filter"
      />
      {isFilterOpen && (
        <Filter
          filterValues={filterValues}
          setFilterValues={setFilterValues}
          setSpots={setSpots}
          setApiError={setApiError}
          layer={layerRef.current}
          client={client}
        />
      )}
      <div id="map" />
      {isPopupOpen && (
        <Popup
          marker={currentMarker}
          setSpots={setSpots}
          setApiError={setApiError}
          setIsPopupOpen={setIsPopupOpen}
          layer={layerRef.current}
          client={client}
        />
      )}
    </>
  );
};

export default Map;
