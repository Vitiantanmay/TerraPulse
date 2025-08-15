
import React, { useEffect, useRef } from 'react';
import { useMap } from 'react-leaflet';
import type L from 'leaflet';
import TerminatorClass from 'leaflet-terminator';

const Terminator: React.FC = () => {
  const map = useMap();
  const terminatorRef = useRef<L.Layer | null>(null);

  useEffect(() => {
    // The default export from esm.sh/leaflet-terminator is the Terminator class definition.
    // We can instantiate it directly instead of using the L.terminator() factory function,
    // which seems to fail to attach to the L object due to module loading issues.
    const initialTerminator = new (TerminatorClass as any)();
    initialTerminator.addTo(map);
    terminatorRef.current = initialTerminator;

    const interval = setInterval(() => {
      // Remove the previous terminator layer if it exists
      if (terminatorRef.current && map.hasLayer(terminatorRef.current)) {
        map.removeLayer(terminatorRef.current);
      }
      
      // Create a new, updated terminator layer
      const newTerminator = new (TerminatorClass as any)();
      newTerminator.addTo(map);

      // Store reference to the new layer for the next cleanup
      terminatorRef.current = newTerminator;
    }, 1000 * 60); // Update every minute

    return () => {
      // Cleanup on component unmount: remove the layer and clear the interval.
      if (terminatorRef.current && map.hasLayer(terminatorRef.current)) {
        map.removeLayer(terminatorRef.current);
      }
      clearInterval(interval);
    };
  }, [map]);

  return null;
};

export default Terminator;
