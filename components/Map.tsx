import React from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import L from 'leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import type { EarthquakeFeature, IssData, Flight, Ship, Wildlife, LayerToggles, EventData } from '../types';
import Terminator from './Terminator';
import { createGlowIcon } from './CustomIcon';

interface MapProps {
  earthquakes: EarthquakeFeature[];
  issPosition: IssData | null;
  flights: Flight[];
  ships: Ship[];
  wildlife: Wildlife[];
  toggles: LayerToggles;
  onEventSelect: (event: EventData) => void;
}

const Map: React.FC<MapProps> = ({ earthquakes, issPosition, flights, ships, wildlife, toggles, onEventSelect }) => {
  const mapCenter: [number, number] = [20, 0];
  const worldBounds: L.LatLngBoundsExpression = [
    [-90, -180], // Southwest
    [90, 180],   // Northeast
  ];

  return (
    <MapContainer 
      center={mapCenter} 
      zoom={3} 
      style={{ height: '100%', width: '100%', background: '#111827' }} 
      minZoom={2}
      maxBounds={worldBounds}
      maxBoundsViscosity={1.0}
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
      />
      {toggles.dayNightOverlay && <Terminator />}

      {/* Earthquakes */}
      {toggles.earthquakes && earthquakes.map(eq => {
        const magnitude = eq.properties.mag;
        const size = Math.max(10, magnitude * 5);
        const color = magnitude > 5 ? '#f87171' : magnitude > 3 ? '#fb923c' : '#facc15';
        
        return (
          <Marker 
            key={eq.id} 
            position={[eq.geometry.coordinates[1], eq.geometry.coordinates[0]]} 
            icon={createGlowIcon(color, size)}
            eventHandlers={{
                click: () => onEventSelect({
                    type: 'Earthquake',
                    title: eq.properties.title,
                    coords: { lat: eq.geometry.coordinates[1], lng: eq.geometry.coordinates[0]},
                    details: {
                        Magnitude: `${magnitude} ${eq.properties.magType}`,
                        Location: eq.properties.place,
                        Time: new Date(eq.properties.time).toLocaleString(),
                        Tsunami: eq.properties.tsunami === 1 ? 'Yes' : 'No',
                    }
                })
            }}
          />
        );
      })}

      {/* ISS Position */}
      {toggles.iss && issPosition && (
        <Marker
          position={[issPosition.latitude, issPosition.longitude]}
          icon={createGlowIcon('#67e8f9', 30, '🛰️')}
           eventHandlers={{
                click: () => onEventSelect({
                    type: 'ISS',
                    title: 'International Space Station',
                    coords: { lat: issPosition.latitude, lng: issPosition.longitude},
                    details: {
                        Latitude: issPosition.latitude.toFixed(4),
                        Longitude: issPosition.longitude.toFixed(4),
                        Altitude: `${issPosition.altitude.toFixed(2)} km`,
                        Velocity: `${issPosition.velocity.toFixed(2)} km/h`,
                    }
                })
            }}
        />
      )}

      {/* Flights */}
      {toggles.flights && (
        <MarkerClusterGroup chunkedLoading>
          {flights.map(flight => (
            flight[5] && flight[6] && (
              <Marker
                key={flight[0]}
                position={[flight[6], flight[5]]}
                icon={L.divIcon({
                  html: `<div style="transform: rotate(${flight[10] ?? 0}deg);">✈️</div>`,
                  className: 'text-xl text-yellow-300 opacity-80',
                  iconSize: [24, 24],
                  iconAnchor: [12, 12],
                })}
                 eventHandlers={{
                    click: () => onEventSelect({
                        type: 'Flight',
                        title: `Flight ${flight[1]?.trim() || 'N/A'}`,
                        coords: { lat: flight[6]!, lng: flight[5]!},
                        details: {
                            Callsign: flight[1]?.trim() || 'N/A',
                            Origin: flight[2],
                            Altitude: `${(flight[7] ?? 0).toFixed(0)} m`,
                            Velocity: `${((flight[9] ?? 0) * 3.6).toFixed(0)} km/h`,
                            'On Ground': flight[8] ? 'Yes' : 'No',
                        }
                    })
                }}
              />
            )
          ))}
        </MarkerClusterGroup>
      )}
      
      {/* Ships (Simulated) */}
      {toggles.ships && ships.map(ship => (
        <Marker 
          key={ship.id} 
          position={[ship.lat, ship.lng]} 
          icon={createGlowIcon('#60a5fa', 12, '🚢')}
           eventHandlers={{
                click: () => onEventSelect({
                    type: 'Ship',
                    title: ship.name,
                    coords: { lat: ship.lat, lng: ship.lng},
                    details: {
                        Type: ship.type,
                        Speed: `${ship.speed} knots`,
                        Course: `${ship.course.toFixed(0)}°`,
                    }
                })
            }}
        />
      ))}

      {/* Wildlife (Simulated) */}
      {toggles.wildlife && wildlife.map(animal => (
        <Marker 
          key={animal.id} 
          position={[animal.lat, animal.lng]} 
          icon={createGlowIcon('#4ade80', 10, '🐾')}
           eventHandlers={{
                click: () => onEventSelect({
                    type: 'Wildlife',
                    title: animal.species,
                    coords: { lat: animal.lat, lng: animal.lng},
                    details: {
                        Species: animal.species,
                        'Last Update': new Date(animal.timestamp).toLocaleTimeString(),
                    }
                })
            }}
        />
      ))}
    </MapContainer>
  );
};

export default Map;