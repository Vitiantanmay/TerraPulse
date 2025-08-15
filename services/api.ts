
import { API_URLS } from '../constants';
import type { EarthquakeData, IssData, Flight, Ship, Wildlife } from '../types';

export const fetchEarthquakes = async (): Promise<EarthquakeData> => {
  const response = await fetch(API_URLS.EARTHQUAKES);
  if (!response.ok) {
    throw new Error('Network response was not ok for earthquakes');
  }
  return response.json();
};

export const fetchIssPosition = async (): Promise<IssData> => {
  const response = await fetch(API_URLS.ISS_POSITION);
  if (!response.ok) {
    throw new Error('Network response was not ok for ISS position');
  }
  return response.json();
};

// --- SIMULATED DATA ---
// In a real-world application, these would be API calls.

const getRandomOffset = (range: number = 0.05) => (Math.random() - 0.5) * range;

export const fetchSimulatedFlights = async (oldFlights: Flight[] = []): Promise<Flight[]> => {
  if (oldFlights.length > 0) {
    return oldFlights.map(flight => {
      const newFlight: Flight = [...flight];
      const lat = newFlight[6] || 0;
      const lon = newFlight[5] || 0;

      newFlight[6] = Math.max(-85, Math.min(85, lat + getRandomOffset(0.5)));
      const newLon = lon + getRandomOffset(0.5);
      newFlight[5] = newLon > 180 ? newLon - 360 : newLon < -180 ? newLon + 360 : newLon;
      
      newFlight[10] = (newFlight[10] || 0) + getRandomOffset(15);
      newFlight[4] = Date.now() / 1000;
      return newFlight;
    });
  }

  // Initial data generation
  const hubs = [
    { lat: 40.64, lon: -73.77, country: 'USA', prefix: 'UAL', icao: 'a' },
    { lat: 51.47, lon: -0.45, country: 'UK', prefix: 'BAW', icao: '4' },
    { lat: 35.55, lon: 139.78, country: 'Japan', prefix: 'JAL', icao: '8' },
    { lat: -22.8, lon: -43.2, country: 'Brazil', prefix: 'GOL', icao: 'e' },
    { lat: -33.9, lon: 151.1, country: 'Australia', prefix: 'QFA', icao: '7' }
  ];
  const initialFlights: Flight[] = [];
  hubs.forEach(hub => {
    for (let i = 0; i < 40; i++) {
      const now = Date.now() / 1000;
      const altitude = 8000 + Math.random() * 4000;
      initialFlights.push([
        hub.icao + Math.random().toString(16).substring(2, 7),
        hub.prefix + (Math.floor(Math.random() * 900) + 100),
        hub.country,
        now, now,
        hub.lon + getRandomOffset(20), hub.lat + getRandomOffset(20),
        altitude, false, 200 + Math.random() * 100,
        Math.random() * 360, getRandomOffset(5), null,
        altitude + (Math.random() * 200),
        String(Math.floor(1000 + Math.random() * 8000)),
        false, 0, 1,
      ]);
    }
  });
  return Promise.resolve(initialFlights);
};

// Simulate ship movement. If oldShips array is passed, it moves them slightly.
export const fetchSimulatedShips = async (oldShips: Ship[] = []): Promise<Ship[]> => {
  if (oldShips.length > 0) {
    return oldShips.map(ship => ({
      ...ship,
      lat: ship.lat + getRandomOffset(0.01),
      lng: ship.lng + getRandomOffset(0.01),
      course: (ship.course + getRandomOffset(10)) % 360,
    }));
  }

  // Initial data
  return [
    { id: 'SHIP001', name: 'Evergreen', lat: 34.05, lng: -118.25, course: 180, speed: 15, type: 'Cargo' },
    { id: 'SHIP002', name: 'Oceanic Voyager', lat: 5.55, lng: 0, course: 90, speed: 20, type: 'Tanker' },
    { id: 'SHIP003', name: 'Arctic Princess', lat: 60.17, lng: 24.94, course: 270, speed: 12, type: 'Passenger' },
    { id: 'SHIP004', name: 'Sea Serpent', lat: 35.68, lng: 139.69, course: 45, speed: 18, type: 'Fishing' },
  ];
};


// Simulate wildlife movement
export const fetchSimulatedWildlife = async (oldWildlife: Wildlife[] = []): Promise<Wildlife[]> => {
    if (oldWildlife.length > 0) {
        return oldWildlife.map(animal => ({
            ...animal,
            lat: animal.lat + getRandomOffset(0.02),
            lng: animal.lng + getRandomOffset(0.02),
            timestamp: Date.now(),
        }));
    }

    // Initial data
    return [
        { id: 'WL001', species: 'African Elephant', lat: -2.15, lng: 34.8, timestamp: Date.now() },
        { id: 'WL002', species: 'Grizzly Bear', lat: 51.18, lng: -115.57, timestamp: Date.now() },
        { id: 'WL003', species: 'Bengal Tiger', lat: 24.4, lng: 88.2, timestamp: Date.now() },
        { id: 'WL004', species: 'Blue Whale', lat: -33.8, lng: 151.2, timestamp: Date.now() },
    ];
}