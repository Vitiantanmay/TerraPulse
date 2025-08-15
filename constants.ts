
import type { LayerToggles } from './types';

export const REFRESH_INTERVAL = 30000; // 30 seconds

export const API_URLS = {
  EARTHQUAKES: 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson',
  ISS_POSITION: 'https://api.wheretheiss.at/v1/satellites/25544',
};

export const INITIAL_LAYER_TOGGLES: LayerToggles = {
  earthquakes: true,
  iss: true,
  flights: true, // Keep enabled by default to show simulated data
  ships: true,
  wildlife: true,
  dayNightOverlay: true,
};