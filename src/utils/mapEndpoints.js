/**
 * Map API Endpoints
 * Handles floor plans, interactive maps, and offline downloads.
 * @module utils/mapEndpoints
 */
import { GET, POST, DELETE } from './endpointBuilders';

const CATEGORY = 'Maps';

const SAMPLE_MAP_UPLOAD = { mapData: 'base64_encoded_map_data', format: 'image/png' };

/**
 * Map management endpoints.
 * Admin operations for uploading and managing map versions.
 */
export const MAP_ENDPOINTS = [
  // Admin: Upload new map image (PNG/JPEG format)
  POST('maps-upload', CATEGORY, 'Upload Map', '/maps', 'Upload χάρτη', 
    SAMPLE_MAP_UPLOAD, 'admin'),
  
  // Get map image with coordinate metadata
  GET('maps-get', CATEGORY, 'Get Map by ID', '/maps/1', 'Λήψη χάρτη'),
  
  // Download map for offline navigation
  GET('maps-download', CATEGORY, 'Download Map', '/downloads/maps/1', 
    'Download χάρτη'),
  
  // Admin: Remove outdated map version
  DELETE('maps-delete', CATEGORY, 'Delete Map (Admin)', '/maps/999', 
    'Διαγραφή χάρτη (admin only)', 'admin', 'maps-upload'),
];