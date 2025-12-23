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
  // Search for exhibits with query parameters
  GET(
    'exhibits-search',
    'Exhibits',
    'Search Exhibits',
    '/exhibits/search?exhibit_term=starry&mode=online',
    'Αναζήτηση εκθεμάτων'
  ),
  // Retrieve detailed information for a specific exhibit
  GET(
    'exhibits-get',
    'Exhibits',
    'Get Exhibit by ID',
    '/exhibits/1',
    'Λεπτομέρειες συγκεκριμένου εκθέματος'
  ),
  // Fetch the audio guide file for an exhibit
  GET(
    'exhibits-audio',
    'Exhibits',
    'Get Audio Guide',
    '/exhibits/1/audio',
    'Audio guide εκθέματος'
  ),
  // Submit a user rating for an exhibit
  POST(
    'exhibits-rate',
    'Exhibits',
    'Rate Exhibit',
    '/exhibits/1/ratings',
    'Αξιολόγηση εκθέματος',
    { rating: 5 },
    'user'
  ),
  // Download exhibit content for offline access
  GET(
    'exhibits-download',
    'Exhibits',
    'Download Exhibit',
    '/downloads/exhibits/1',
    'Download για offline χρήση'
  ),
  // Admin endpoint to create a new exhibit
  POST(
    'exhibits-create',
    'Exhibits',
    'Create Exhibit (Admin)',
    '/exhibits',
    'Δημιουργία νέου εκθέματος (admin only)',
    generateTestExhibit,
    'admin'
  ),
  // Admin endpoint to delete an exhibit
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
  // Admin endpoint to upload a new map image
  POST(
    'maps-upload',
    'Maps',
    'Upload Map',
    '/maps',
    'Upload χάρτη',
    { mapData: 'base64_encoded_map_data', format: 'image/png' },
    'admin'
  ),
McCabe Cyclomatic Complexity
1.47
1 file exceeds recommended value (4)

Affects 0.97% of source code.


Try to reduce the complexity of your methods. Maybe consider splitting complex methods into multiple simpler ones.  // Retrieve map metadata and image
  GET(
    'maps-get',
    'Maps',
    'Get Map by ID',
    '/maps/1',
    'Λήψη χάρτη'
  ),
  // Download map for offline usage
  GET(
    'maps-download',
    'Maps',
    'Download Map',
    '/downloads/maps/1',
    'Download χάρτη'
  ),
  // Admin endpoint to delete a map
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
  // List all available destinations
  GET(
    'destinations-list',
    'Destinations',
    'List Destinations',
    '/destinations',
    'Λίστα όλων των προορισμών'
  ),
  // Admin endpoint to bulk upload destinations
  POST(
    'destinations-upload',
    'Destinations',
    'Upload Destinations',
    '/destinations',
    'Upload προορισμών',
    generateTestDestination,
    'admin'
  ),
  // Get details for a specific destination
  GET(
    'destinations-get',
    'Destinations',
    'Get Destination Info',
    '/destinations/1',
    'Πληροφορίες προορισμού'
  ),
  // Admin endpoint to delete a destination
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