
export interface EarthquakeFeature {
  type: string;
  properties: {
    mag: number;
    place: string;
    time: number;
    updated: number;
    tz: null | number;
    url: string;
    detail: string;
    felt: null | number;
    cdi: null | number;
    mmi: null | number;
    alert: null | string;
    status: string;
    tsunami: number;
    sig: number;
    net: string;
    code: string;
    ids: string;
    sources: string;
    types: string;
    nst: null | number;
    dmin: null | number;
    rms: number;
    gap: null | number;
    magType: string;
    type: string;
    title: string;
  };
  geometry: {
    type: string;
    coordinates: [number, number, number];
  };
  id: string;
}

export interface EarthquakeData {
  features: EarthquakeFeature[];
}

export interface IssData {
  name: string;
  id: number;
  latitude: number;
  longitude: number;
  altitude: number;
  velocity: number;
  visibility: string;
  footprint: number;
  timestamp: number;
  daynum: number;
  solar_lat: number;
  solar_lon: number;
  units: string;
}

export type Flight = [
  string, // icao24
  string | null, // callsign
  string, // origin_country
  number | null, // time_position
  number | null, // last_contact
  number | null, // longitude
  number | null, // latitude
  number | null, // baro_altitude
  boolean, // on_ground
  number | null, // velocity
  number | null, // true_track
  number | null, // vertical_rate
  number[] | null, // sensors
  number | null, // geo_altitude
  string | null, // squawk
  boolean, // spi
  number, // position_source
  number // category
];

export interface Ship {
  id: string;
  name: string;
  lat: number;
  lng: number;
  course: number;
  speed: number;
  type: 'Cargo' | 'Tanker' | 'Passenger' | 'Fishing';
}

export interface Wildlife {
    id: string;
    species: string;
    lat: number;
    lng: number;
    timestamp: number;
}

export type EventDataType = 'Earthquake' | 'ISS' | 'Flight' | 'Ship' | 'Wildlife';

export interface EventData {
    type: EventDataType;
    title: string;
    details: Record<string, string | number | null>;
    coords: { lat: number; lng: number };
}

export interface LayerToggles {
  earthquakes: boolean;
  iss: boolean;
  flights: boolean;
  ships: boolean;
  wildlife: boolean;
  dayNightOverlay: boolean;
}
