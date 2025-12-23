/**
 * Content API Endpoints
 */
import { GET, POST, DELETE, generateTestExhibit, generateTestDestination } from './endpointBuilders';

const C = { E: 'Exhibits', M: 'Maps', D: 'Destinations' };

export const EXHIBIT_ENDPOINTS = [
  GET('exhibits-search', C.E, 'Search Exhibits', 
    '/exhibits/search?exhibit_term=starry&mode=online', 'Αναζήτηση εκθεμάτων'),
  GET('exhibits-get', C.E, 'Get Exhibit by ID', '/exhibits/1', 
    'Λεπτομέρειες συγκεκριμένου εκθέματος'),
  GET('exhibits-audio', C.E, 'Get Audio Guide', '/exhibits/1/audio', 'Audio guide εκθέματος'),
  POST('exhibits-rate', C.E, 'Rate Exhibit', '/exhibits/1/ratings', 
    'Αξιολόγηση εκθέματος', { rating: 5 }, 'user'),
  GET('exhibits-download', C.E, 'Download Exhibit', '/downloads/exhibits/1', 
    'Download για offline χρήση'),
  POST('exhibits-create', C.E, 'Create Exhibit (Admin)', '/exhibits', 
    'Δημιουργία νέου εκθέματος (admin only)', generateTestExhibit, 'admin'),
  DELETE('exhibits-delete', C.E, 'Delete Exhibit (Admin)', '/exhibits/999', 
    'Διαγραφή εκθέματος (admin only)', 'admin', 'exhibits-create'),
];

export const MAP_ENDPOINTS = [
  POST('maps-upload', C.M, 'Upload Map', '/maps', 'Upload χάρτη', 
    { mapData: 'base64_encoded_map_data', format: 'image/png' }, 'admin'),
  GET('maps-get', C.M, 'Get Map by ID', '/maps/1', 'Λήψη χάρτη'),
  GET('maps-download', C.M, 'Download Map', '/downloads/maps/1', 'Download χάρτη'),
  DELETE('maps-delete', C.M, 'Delete Map (Admin)', '/maps/999', 
    'Διαγραφή χάρτη (admin only)', 'admin', 'maps-upload'),
];

export const DESTINATION_ENDPOINTS = [
  GET('destinations-list', C.D, 'List Destinations', '/destinations', 
    'Λίστα όλων των προορισμών'),
  POST('destinations-upload', C.D, 'Upload Destinations', '/destinations', 
    'Upload προορισμών', generateTestDestination, 'admin'),
  GET('destinations-get', C.D, 'Get Destination Info', '/destinations/1', 
    'Πληροφορίες προορισμού'),
  DELETE('destinations-delete', C.D, 'Delete Destination (Admin)', '/destinations/999', 
    'Διαγραφή προορισμού (admin only)', 'admin', 'destinations-upload'),
];