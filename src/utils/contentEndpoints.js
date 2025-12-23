/**
 * Content API Endpoints
 * Definitions for endpoints related to museum content: Exhibits, Maps, and Destinations.
 */
import {
  GET,
  POST,
  DELETE,
  generateTestExhibit,
  generateTestDestination
} from './endpointBuilders';

/**
 * Exhibit endpoints for searching, viewing, rating, and managing exhibits
 */
export const EXHIBIT_ENDPOINTS = [
  GET(
    'exhibits-search',
    'Exhibits',
    'Search Exhibits',
    '/exhibits/search?exhibit_term=starry&mode=online',
    'Αναζήτηση εκθεμάτων'
  ),
  GET(
    'exhibits-get',
    'Exhibits',
    'Get Exhibit by ID',
    '/exhibits/1',
    'Λεπτομέρειες συγκεκριμένου εκθέματος'
  ),
  GET(
    'exhibits-audio',
    'Exhibits',
    'Get Audio Guide',
    '/exhibits/1/audio',
    'Audio guide εκθέματος'
  ),
  POST(
    'exhibits-rate',
    'Exhibits',
    'Rate Exhibit',
    '/exhibits/1/ratings',
    'Αξιολόγηση εκθέματος',
    { rating: 5 },
    'user'
  ),
  GET(
    'exhibits-download',
    'Exhibits',
    'Download Exhibit',
    '/downloads/exhibits/1',
    'Download για offline χρήση'
  ),
  POST(
    'exhibits-create',
    'Exhibits',
    'Create Exhibit (Admin)',
    '/exhibits',
    'Δημιουργία νέου εκθέματος (admin only)',
    generateTestExhibit,
    'admin'
  ),
  DELETE(
    'exhibits-delete',
    'Exhibits',
    'Delete Exhibit (Admin)',
    '/exhibits/999',
    'Διαγραφή εκθέματος (admin only)',
    'admin',
    'exhibits-create'
  ),
];

/**
 * Map endpoints for uploading and managing museum maps
 */
export const MAP_ENDPOINTS = [
  POST(
    'maps-upload',
    'Maps',
    'Upload Map',
    '/maps',
    'Upload χάρτη',
    { mapData: 'base64_encoded_map_data', format: 'image/png' },
    'admin'
  ),
  GET(
    'maps-get',
    'Maps',
    'Get Map by ID',
    '/maps/1',
    'Λήψη χάρτη'
  ),
  GET(
    'maps-download',
    'Maps',
    'Download Map',
    '/downloads/maps/1',
    'Download χάρτη'
  ),
  DELETE(
    'maps-delete',
    'Maps',
    'Delete Map (Admin)',
    '/maps/999',
    'Διαγραφή χάρτη (admin only)',
    'admin',
    'maps-upload'
  ),
];

/**
 * Destination endpoints for managing points of interest
 */
export const DESTINATION_ENDPOINTS = [
  GET(
    'destinations-list',
    'Destinations',
    'List Destinations',
    '/destinations',
    'Λίστα όλων των προορισμών'
  ),
  POST(
    'destinations-upload',
    'Destinations',
    'Upload Destinations',
    '/destinations',
    'Upload προορισμών',
    generateTestDestination,
    'admin'
  ),
  GET(
    'destinations-get',
    'Destinations',
    'Get Destination Info',
    '/destinations/1',
    'Πληροφορίες προορισμού'
  ),
  DELETE(
    'destinations-delete',
    'Destinations',
    'Delete Destination (Admin)',
    '/destinations/999',
    'Διαγραφή προορισμού (admin only)',
    'admin',
    'destinations-upload'
  ),
];