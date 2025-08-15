
import React, { useState, useEffect, useCallback } from 'react';
import Map from './components/Map';
import ControlPanel from './components/ControlPanel';
import DetailsSidebar from './components/DetailsSidebar';
import Loader from './components/Loader';
import { useInterval } from './hooks/useInterval';
import { fetchEarthquakes, fetchIssPosition, fetchSimulatedFlights, fetchSimulatedShips, fetchSimulatedWildlife } from './services/api';
import type { EarthquakeFeature, IssData, Flight, Ship, Wildlife, EventData, LayerToggles } from './types';
import { REFRESH_INTERVAL, INITIAL_LAYER_TOGGLES } from './constants';

const App: React.FC = () => {
  const [earthquakes, setEarthquakes] = useState<EarthquakeFeature[]>([]);
  const [issPosition, setIssPosition] = useState<IssData | null>(null);
  const [flights, setFlights] = useState<Flight[]>([]);
  const [ships, setShips] = useState<Ship[]>([]);
  const [wildlife, setWildlife] = useState<Wildlife[]>([]);

  const [loading, setLoading] = useState<Record<string, boolean>>({
    earthquakes: true,
    iss: true,
    flights: true,
    ships: true,
    wildlife: true,
  });
  
  const [layerToggles, setLayerToggles] = useState<LayerToggles>(INITIAL_LAYER_TOGGLES);
  const [selectedEvent, setSelectedEvent] = useState<EventData | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(prev => ({ ...prev, earthquakes: true }));
      const eqData = await fetchEarthquakes();
      setEarthquakes(eqData.features);
    } catch (error) {
      console.error("Failed to fetch earthquake data:", error);
    } finally {
      setLoading(prev => ({ ...prev, earthquakes: false }));
    }

    try {
      setLoading(prev => ({ ...prev, iss: true }));
      const issData = await fetchIssPosition();
      setIssPosition(issData);
    } catch (error) {
      console.error("Failed to fetch ISS data:", error);
    } finally {
      setLoading(prev => ({ ...prev, iss: false }));
    }
    
    // Simulated data
    setLoading(prev => ({ ...prev, flights: true }));
    const flightsData = await fetchSimulatedFlights(flights);
    setFlights(flightsData);
    setLoading(prev => ({ ...prev, flights: false }));

    setLoading(prev => ({ ...prev, ships: true }));
    const shipsData = await fetchSimulatedShips(ships);
    setShips(shipsData);
    setLoading(prev => ({ ...prev, ships: false }));

    setLoading(prev => ({ ...prev, wildlife: true }));
    const wildlifeData = await fetchSimulatedWildlife(wildlife);
    setWildlife(wildlifeData);
    setLoading(prev => ({ ...prev, wildlife: false }));

  }, [flights, ships, wildlife]);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useInterval(fetchData, REFRESH_INTERVAL);

  const handleToggle = (layer: keyof LayerToggles) => {
    setLayerToggles(prev => ({ ...prev, [layer]: !prev[layer] }));
  };
  
  const handleEventSelect = (event: EventData | null) => {
    setSelectedEvent(event);
  };

  const isAnythingLoading = Object.values(loading).some(Boolean);
  
  return (
    <div className="relative w-screen h-screen overflow-hidden bg-gray-900 text-gray-200">
      <header className="absolute top-0 left-1/2 -translate-x-1/2 z-[1000] p-4 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-cyan-300" style={{ textShadow: '0 0 8px #0891b2, 0 0 12px #0891b2' }}>
          TerraPulse
        </h1>
        <p className="text-sm text-gray-400">Real-Time Global Event Tracker</p>
        <p className="text-sm text-gray-400">By Tanmay Galav</p>
      </header>

      <ControlPanel toggles={layerToggles} onToggle={handleToggle} />
      
      <Map
        earthquakes={earthquakes}
        issPosition={issPosition}
        flights={flights}
        ships={ships}
        wildlife={wildlife}
        toggles={layerToggles}
        onEventSelect={handleEventSelect}
      />
      
      <DetailsSidebar event={selectedEvent} onClose={() => handleEventSelect(null)} />
      
      {isAnythingLoading && <Loader />}

      <footer className="absolute bottom-2 right-4 z-[1000] text-xs text-gray-500">
        Data auto-refreshes every {REFRESH_INTERVAL / 1000} seconds.
      </footer>
    </div>
  );
};

export default App;