
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

export const fetchFlights = async (): Promise<Flight[]> => {
  const response = await fetch(API_URLS.FLIGHTS);
  if (!response.ok) {
    throw new Error('Network response was not ok for flights');
  }
  const data = await response.json();
  // The API returns a large array, we only take the first 500 for performance.
  // We also filter out flights without coordinate data.
  return (data.states || [])
    .filter((f: Flight) => f[5] != null && f[6] != null)
    .slice(0, 500);
};

// --- SIMULATED DATA ---
// In a real-world application, these would be API calls.

const getRandomOffset = (range: number = 0.05) => (Math.random() - 0.5) * range;

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
