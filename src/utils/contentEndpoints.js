/**
 * Content API Endpoints
 * Handles exhibits, maps, and destinations
 */
import { GET, POST, DELETE, generateTestExhibit, generateTestDestination } from './endpointBuilders';

// Categories
const C = {
  EX: 'Exhibits',
  MAP: 'Maps',
  DEST: 'Destinations',
};

// ==========================================
// Exhibit Management
// ==========================================

export const EXHIBIT_ENDPOINTS = [
  GET('exhibits-search', C.EX, 'Search Exhibits', 
    '/exhibits/search?exhibit_term=starry&mode=online', 'Αναζήτηση εκθεμάτων'),
  GET('exhibits-get', C.EX, 'Get Exhibit by ID', '/exhibits/1', 
    'Λεπτομέρειες συγκεκριμένου εκθέματος'),
  GET('exhibits-audio', C.EX, 'Get Audio Guide', '/exhibits/1/audio', 
    'Audio guide εκθέματος'),
  POST('exhibits-rate', C.EX, 'Rate Exhibit', '/exhibits/1/ratings', 
    'Αξιολόγηση εκθέματος', { rating: 5 }, 'user'),
  GET('exhibits-download', C.EX, 'Download Exhibit', '/downloads/exhibits/1', 
    'Download για offline χρήση'),
  POST('exhibits-create', C.EX, 'Create Exhibit (Admin)', '/exhibits', 
    'Δημιουργία νέου εκθέματος (admin only)', generateTestExhibit, 'admin'),
  DELETE('exhibits-delete', C.EX, 'Delete Exhibit (Admin)', '/exhibits/999', 
    'Διαγραφή εκθέματος (admin only)', 'admin', 'exhibits-create'),
];

// ==========================================
// Map Management
// ==========================================

export const MAP_ENDPOINTS = [
  POST('maps-upload', C.MAP, 'Upload Map', '/maps', 'Upload χάρτη', 
    { mapData: 'base64_encoded_map_data', format: 'image/png' }, 'admin'),
  GET('maps-get', C.MAP, 'Get Map by ID', '/maps/1', 'Λήψη χάρτη'),
  GET('maps-download', C.MAP, 'Download Map', '/downloads/maps/1', 
    'Download χάρτη'),
  DELETE('maps-delete', C.MAP, 'Delete Map (Admin)', '/maps/999', 
    'Διαγραφή χάρτη (admin only)', 'admin', 'maps-upload'),
];

// ==========================================
// Destination Management
// ==========================================

export const DESTINATION_ENDPOINTS = [
  GET('destinations-list', C.DEST, 'List Destinations', '/destinations', 
    'Λίστα όλων των προορισμών'),
  POST('destinations-upload', C.DEST, 'Upload Destinations', '/destinations', 
    'Upload προορισμών', generateTestDestination, 'admin'),
  GET('destinations-get', C.DEST, 'Get Destination Info', '/destinations/1', 
    'Πληροφορίες προορισμού'),
  DELETE('destinations-delete', C.DEST, 'Delete Destination (Admin)', 
    '/destinations/999', 'Διαγραφή προορισμού (admin only)', 'admin', 
    'destinations-upload'),
];