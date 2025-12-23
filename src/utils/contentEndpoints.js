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

/**
 * Exhibit management endpoints
 */
export const EXHIBIT_ENDPOINTS = [
  GET(
    'exhibits-search',
    CAT_EXHIBITS,
    'Search Exhibits',
    '/exhibits/search?exhibit_term=starry&mode=online',
    'Αναζήτηση εκθεμάτων'
  ),
  GET(
    'exhibits-get',
    CAT_EXHIBITS,
    'Get Exhibit by ID',
    '/exhibits/1',
    'Λεπτομέρειες συγκεκριμένου εκθέματος'
  ),
  GET(
    'exhibits-audio',
    CAT_EXHIBITS,
    'Get Audio Guide',
    '/exhibits/1/audio',
    'Audio guide εκθέματος'
  ),
  POST(
    'exhibits-rate',
    CAT_EXHIBITS,
    'Rate Exhibit',
    '/exhibits/1/ratings',
    'Αξιολόγηση εκθέματος',
    { rating: 5 },
    'user'
  ),
  GET(
    'exhibits-download',
    CAT_EXHIBITS,
    'Download Exhibit',
    '/downloads/exhibits/1',
    'Download για offline χρήση'
  ),
  POST(
    'exhibits-create',
    CAT_EXHIBITS,
    'Create Exhibit (Admin)',
    '/exhibits',
    'Δημιουργία νέου εκθέματος (admin only)',
    generateTestExhibit,
    'admin'
  ),
  DELETE(
    'exhibits-delete',
    CAT_EXHIBITS,
    'Delete Exhibit (Admin)',
    '/exhibits/999',
    'Διαγραφή εκθέματος (admin only)',
    'admin',
    'exhibits-create'
  ),
];

/**
 * Map management endpoints
 */
export const MAP_ENDPOINTS = [
  POST(
    'maps-upload',
    CAT_MAPS,
    'Upload Map',
    '/maps',
    'Upload χάρτη',
    { mapData: 'base64_encoded_map_data', format: 'image/png' },
    'admin'
  ),
  GET(
    'maps-get',
    CAT_MAPS,
    'Get Map by ID',
    '/maps/1',
    'Λήψη χάρτη'
  ),
  GET(
    'maps-download',
    CAT_MAPS,
    'Download Map',
    '/downloads/maps/1',
    'Download χάρτη'
  ),
  DELETE(
    'maps-delete',
    CAT_MAPS,
    'Delete Map (Admin)',
    '/maps/999',
    'Διαγραφή χάρτη (admin only)',
    'admin',
    'maps-upload'
  ),
];

/**
 * Destination management endpoints
 */
export const DESTINATION_ENDPOINTS = [
  GET(
    'destinations-list',
    CAT_DESTINATIONS,
    'List Destinations',
    '/destinations',
    'Λίστα όλων των προορισμών'
  ),
  POST(
    'destinations-upload',
    CAT_DESTINATIONS,
    'Upload Destinations',
    '/destinations',
    'Upload προορισμών',
    generateTestDestination,
    'admin'
  ),
  GET(
    'destinations-get',
    CAT_DESTINATIONS,
    'Get Destination Info',
    '/destinations/1',
    'Πληροφορίες προορισμού'
  ),
  DELETE(
    'destinations-delete',
    CAT_DESTINATIONS,
    'Delete Destination (Admin)',
    '/destinations/999',
    'Διαγραφή προορισμού (admin only)',
    'admin',
    'destinations-upload'
  ),
];