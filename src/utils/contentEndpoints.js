/**
 * Content API Endpoints
 * Handles exhibits, maps, and destinations for museum navigation
 * @module api/contentEndpoints
 */
import { GET, POST, DELETE, generateTestExhibit, generateTestDestination } from './endpointBuilders';

// Category labels for endpoint organization
const CAT = { 
  EXH: 'Exhibits',      // Exhibit content and ratings
  MAP: 'Maps',          // Floor plans and navigation
  DEST: 'Destinations', // Points of interest
};

/**
 * Exhibit content endpoints
 * Provides search, details, audio guides, ratings, and admin operations
 * Regular users can view and rate, admins can create and delete
 */
export const EXHIBIT_ENDPOINTS = [
  // Search exhibits with full-text query
  GET('exhibits-search', CAT.EXH, 'Search Exhibits', 
    '/exhibits/search?exhibit_term=starry&mode=online', 
    'Αναζήτηση εκθεμάτων'),
  
  // Get complete exhibit metadata by ID
  GET('exhibits-get', CAT.EXH, 'Get Exhibit by ID', '/exhibits/1', 
    'Λεπτομέρειες συγκεκριμένου εκθέματος'),
  
  // Fetch audio guide narration file
  GET('exhibits-audio', CAT.EXH, 'Get Audio Guide', '/exhibits/1/audio', 
    'Audio guide εκθέματος'),
  
  // Submit user rating (1-5 stars)
  POST('exhibits-rate', CAT.EXH, 'Rate Exhibit', '/exhibits/1/ratings', 
    'Αξιολόγηση εκθέματος', { rating: 5 }, 'user'),
  
  // Download for offline viewing
  GET('exhibits-download', CAT.EXH, 'Download Exhibit', 
    '/downloads/exhibits/1', 'Download για offline χρήση'),
  
  // Admin: Create new exhibit entry
  POST('exhibits-create', CAT.EXH, 'Create Exhibit (Admin)', '/exhibits', 
    'Δημιουργία νέου εκθέματος (admin only)', 
    generateTestExhibit, 'admin'),
  
  // Admin: Delete exhibit permanently
  DELETE('exhibits-delete', CAT.EXH, 'Delete Exhibit (Admin)', 
    '/exhibits/999', 'Διαγραφή εκθέματος (admin only)', 
    'admin', 'exhibits-create'),
];

/**
 * Map management endpoints
 * Handles floor plans, interactive maps, and offline downloads
 * Admin operations for uploading and managing map versions
 */
export const MAP_ENDPOINTS = [
  // Admin: Upload new map image (PNG/JPEG format)
  POST('maps-upload', CAT.MAP, 'Upload Map', '/maps', 'Upload χάρτη', 
    { mapData: 'base64_encoded_map_data', format: 'image/png' }, 'admin'),
  
  // Get map image with coordinate metadata
  GET('maps-get', CAT.MAP, 'Get Map by ID', '/maps/1', 'Λήψη χάρτη'),
  
  // Download map for offline navigation
  GET('maps-download', CAT.MAP, 'Download Map', '/downloads/maps/1', 
    'Download χάρτη'),
  
  // Admin: Remove outdated map version
  DELETE('maps-delete', CAT.MAP, 'Delete Map (Admin)', '/maps/999', 
    'Διαγραφή χάρτη (admin only)', 'admin', 'maps-upload'),
];

/**
 * Destination endpoints
 * Manages navigable points including exhibits, amenities, and exits
 * Used by route calculation for pathfinding nodes
 */
export const DESTINATION_ENDPOINTS = [
  // List all destination points with optional filters
  GET('destinations-list', CAT.DEST, 'List Destinations', '/destinations', 
    'Λίστα όλων των προορισμών'),
  
  // Admin: Bulk upload destinations from CSV
  POST('destinations-upload', CAT.DEST, 'Upload Destinations', 
    '/destinations', 'Upload προορισμών', 
    generateTestDestination, 'admin'),
  
  // Get destination details with photos
  GET('destinations-get', CAT.DEST, 'Get Destination Info', 
    '/destinations/1', 'Πληροφορίες προορισμού'),
  
  // Admin: Remove destination from system
  DELETE('destinations-delete', CAT.DEST, 'Delete Destination (Admin)', 
    '/destinations/999', 'Διαγραφή προορισμού (admin only)', 
    'admin', 'destinations-upload'),
];