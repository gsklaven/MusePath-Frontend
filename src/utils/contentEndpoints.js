/**
 * Content API Endpoints
 * 
 * Definitions for endpoints related to museum content: Exhibits, Maps, and Destinations.
 */
import {
  GET,
  POST,
  DELETE,
  generateTestExhibit,
  generateTestDestination
} from './endpointBuilders';

// Category constants to reduce vocabulary size
const CAT_EXHIBITS = 'Exhibits';
const CAT_MAPS = 'Maps';
const CAT_DESTINATIONS = 'Destinations';

// Exhibits
const exhibitsSearch = GET(
  'exhibits-search',
  CAT_EXHIBITS,
  'Search Exhibits',
  '/exhibits/search?exhibit_term=starry&mode=online',
  'Αναζήτηση εκθεμάτων'
);

const exhibitsGet = GET(
  'exhibits-get',
  CAT_EXHIBITS,
  'Get Exhibit by ID',
  '/exhibits/1',
  'Λεπτομέρειες συγκεκριμένου εκθέματος'
);

const exhibitsAudio = GET(
  'exhibits-audio',
  CAT_EXHIBITS,
  'Get Audio Guide',
  '/exhibits/1/audio',
  'Audio guide εκθέματος'
);

const exhibitsRate = POST(
  'exhibits-rate',
  CAT_EXHIBITS,
  'Rate Exhibit',
  '/exhibits/1/ratings',
  'Αξιολόγηση εκθέματος',
  { rating: 5 },
  'user'
);

const exhibitsDownload = GET(
  'exhibits-download',
  CAT_EXHIBITS,
  'Download Exhibit',
  '/downloads/exhibits/1',
  'Download για offline χρήση'
);

const exhibitsCreate = POST(
  'exhibits-create',
  CAT_EXHIBITS,
  'Create Exhibit (Admin)',
  '/exhibits',
  'Δημιουργία νέου εκθέματος (admin only)',
  generateTestExhibit,
  'admin'
);

const exhibitsDelete = DELETE(
  'exhibits-delete',
  CAT_EXHIBITS,
  'Delete Exhibit (Admin)',
  '/exhibits/999',
  'Διαγραφή εκθέματος (admin only)',
  'admin',
  'exhibits-create'
);

/**
 * Exhibit management endpoints
 */
export const EXHIBIT_ENDPOINTS = [
  exhibitsSearch,
  exhibitsGet,
  exhibitsAudio,
  exhibitsRate,
  exhibitsDownload,
  exhibitsCreate,
  exhibitsDelete,
];

// Maps
const mapsUpload = POST(
  'maps-upload',
  CAT_MAPS,
  'Upload Map',
  '/maps',
  'Upload χάρτη',
  { mapData: 'base64_encoded_map_data', format: 'image/png' },
  'admin'
);

const mapsGet = GET(
  'maps-get',
  CAT_MAPS,
  'Get Map by ID',
  '/maps/1',
  'Λήψη χάρτη'
);

const mapsDownload = GET(
  'maps-download',
  CAT_MAPS,
  'Download Map',
  '/downloads/maps/1',
  'Download χάρτη'
);

const mapsDelete = DELETE(
  'maps-delete',
  CAT_MAPS,
  'Delete Map (Admin)',
  '/maps/999',
  'Διαγραφή χάρτη (admin only)',
  'admin',
  'maps-upload'
);

/**
 * Map management endpoints
 */
export const MAP_ENDPOINTS = [
  mapsUpload,
  mapsGet,
  mapsDownload,
  mapsDelete,
];

// Destinations
const destinationsList = GET(
  'destinations-list',
  CAT_DESTINATIONS,
  'List Destinations',
  '/destinations',
  'Λίστα όλων των προορισμών'
);

const destinationsUpload = POST(
  'destinations-upload',
  CAT_DESTINATIONS,
  'Upload Destinations',
  '/destinations',
  'Upload προορισμών',
  generateTestDestination,
  'admin'
);

const destinationsGet = GET(
  'destinations-get',
  CAT_DESTINATIONS,
  'Get Destination Info',
  '/destinations/1',
  'Πληροφορίες προορισμού'
);

const destinationsDelete = DELETE(
  'destinations-delete',
  CAT_DESTINATIONS,
  'Delete Destination (Admin)',
  '/destinations/999',
  'Διαγραφή προορισμού (admin only)',
  'admin',
  'destinations-upload'
);

/**
 * Destination management endpoints
 */
export const DESTINATION_ENDPOINTS = [
  destinationsList,
  destinationsUpload,
  destinationsGet,
  destinationsDelete,
];