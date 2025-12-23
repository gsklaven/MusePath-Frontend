/**
 * Content API Endpoints
 * 
 * This module defines all content-related API endpoints including:
 * - Exhibits (search, details, audio guides, ratings)
 * - Maps (upload, download, display)
 * - Destinations (points of interest, navigation targets)
 * 
 * Content endpoints are primarily read-only for regular users,
 * with create/update/delete operations restricted to admin accounts.
 * All content supports offline caching for museum areas with poor connectivity.
 * 
 * @module api/contentEndpoints
 */

import { GET, POST, DELETE, generateTestExhibit, generateTestDestination } from './endpointBuilders';

/**
 * Category names for endpoint organization.
 * Shortened for brevity while maintaining clarity.
 * E: Exhibit content and metadata
 * M: Map images and navigation overlays
 * D: Destination points and waypoints
 */
const C = { 
  E: 'Exhibits', 
  M: 'Maps', 
  D: 'Destinations' 
};

// ==========================================
// Exhibit Management
// ==========================================

/**
 * Exhibit content endpoints.
 * Provides access to exhibit information, multimedia content, and user ratings.
 * Search supports full-text queries across titles, descriptions, and artists.
 * Audio guides are streamed or downloadable for offline access.
 * Ratings are aggregated to show popularity and quality metrics.
 * Admin operations enable content management and curation.
 * @type {Array}
 */
export const EXHIBIT_ENDPOINTS = [
  // Searches exhibits using full-text search with optional filters
  GET('exhibits-search', C.E, 'Search Exhibits', 
    '/exhibits/search?exhibit_term=starry&mode=online', 'Αναζήτηση εκθεμάτων'),
  
  // Retrieves complete exhibit metadata including description and location
  GET('exhibits-get', C.E, 'Get Exhibit by ID', '/exhibits/1', 
    'Λεπτομέρειες συγκεκριμένου εκθέματος'),
  
  // Fetches audio guide narration (MP3 format, 2-5 minutes)
  GET('exhibits-audio', C.E, 'Get Audio Guide', '/exhibits/1/audio', 'Audio guide εκθέματος'),
  
  // Submits user rating (1-5 stars) for exhibit quality
  POST('exhibits-rate', C.E, 'Rate Exhibit', '/exhibits/1/ratings', 
    'Αξιολόγηση εκθέματος', { rating: 5 }, 'user'),
  
  // Downloads exhibit data for offline viewing in app
  GET('exhibits-download', C.E, 'Download Exhibit', '/downloads/exhibits/1', 
    'Download για offline χρήση'),
  
  // Admin: Creates new exhibit entry with full metadata
  POST('exhibits-create', C.E, 'Create Exhibit (Admin)', '/exhibits', 
    'Δημιουργία νέου εκθέματος (admin only)', generateTestExhibit, 'admin'),
  
  // Admin: Permanently deletes exhibit and associated content
  DELETE('exhibits-delete', C.E, 'Delete Exhibit (Admin)', '/exhibits/999', 
    'Διαγραφή εκθέματος (admin only)', 'admin', 'exhibits-create'),
];

// ==========================================
// Map Management
// ==========================================

/**
 * Map image and overlay endpoints.
 * Manages floor plans, interactive maps, and navigation overlays.
 * Maps are served as high-resolution images with metadata for pinch-zoom.
 * Supports multiple floors and building sections.
 * Download endpoint enables offline navigation in poor signal areas.
 * Admin operations handle map uploads and version management.
 * @type {Array}
 */
export const MAP_ENDPOINTS = [
  // Admin: Uploads new map image (PNG/JPEG, max 10MB)
  POST('maps-upload', C.M, 'Upload Map', '/maps', 'Upload χάρτη', 
    { mapData: 'base64_encoded_map_data', format: 'image/png' }, 'admin'),
  
  // Retrieves map image and coordinate system metadata
  GET('maps-get', C.M, 'Get Map by ID', '/maps/1', 'Λήψη χάρτη'),
  
  // Downloads map for offline use (includes POI markers)
  GET('maps-download', C.M, 'Download Map', '/downloads/maps/1', 'Download χάρτη'),
  
  // Admin: Removes outdated or incorrect map versions
  DELETE('maps-delete', C.M, 'Delete Map (Admin)', '/maps/999', 
    'Διαγραφή χάρτη (admin only)', 'admin', 'maps-upload'),
];

// ==========================================
// Destination Management
// ==========================================

/**
 * Destination and waypoint endpoints.
 * Destinations are navigable points including exhibits, amenities, and exits.
 * List endpoint returns all destinations with filtering options.
 * Individual destination info includes coordinates, photos, and descriptions.
 * Bulk upload supports CSV import for museum staff.
 * Navigation system uses destinations as route calculation nodes.
 * @type {Array}
 */
export const DESTINATION_ENDPOINTS = [
  // Returns all destination points with optional category filter
  GET('destinations-list', C.D, 'List Destinations', '/destinations', 
    'Λίστα όλων των προορισμών'),
  
  // Admin: Bulk uploads destinations from structured data
  POST('destinations-upload', C.D, 'Upload Destinations', '/destinations', 
    'Upload προορισμών', generateTestDestination, 'admin'),
  
  // Retrieves destination details including photos and amenities
  GET('destinations-get', C.D, 'Get Destination Info', '/destinations/1', 
    'Πληροφορίες προορισμού'),
  
  // Admin: Removes destination from navigation system
  DELETE('destinations-delete', C.D, 'Delete Destination (Admin)', '/destinations/999', 
    'Διαγραφή προορισμού (admin only)', 'admin', 'destinations-upload'),
];