
import type { LayerToggles } from './types';

export const REFRESH_INTERVAL = 30000; // 30 seconds

export const API_URLS = {
  EARTHQUAKES: 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson',
  ISS_POSITION: 'https://api.wheretheiss.at/v1/satellites/25544',
  FLIGHTS: 'https://opensky-network.org/api/states/all',
};

export const INITIAL_LAYER_TOGGLES: LayerToggles = {
  earthquakes: true,
  iss: true,
  flights: false, // Default off due to data volume
  ships: true,
  wildlife: true,
  dayNightOverlay: true,
};
