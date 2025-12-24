/**
 * Destination API Endpoints
 * Manages navigable points including exhibits, amenities, and exits.
 * @module utils/destinationEndpoints
 */
import { GET, POST, DELETE, generateTestDestination } from './endpointBuilders';

const CATEGORY = 'Destinations';

/**
 * Destination endpoints.
 * Used by route calculation for pathfinding nodes.
 */
export const DESTINATION_ENDPOINTS = [
  // List all destination points with optional filters
  GET('destinations-list', CATEGORY, 'List Destinations', '/destinations', 
    'Λίστα όλων των προορισμών'),
  
  // Admin: Bulk upload destinations from CSV
  POST('destinations-upload', CATEGORY, 'Upload Destinations', 
    '/destinations', 'Upload προορισμών', generateTestDestination, 'admin'),
  
  // Get destination details with photos
  GET('destinations-get', CATEGORY, 'Get Destination Info', 
    '/destinations/1', 'Πληροφορίες προορισμού'),
  
  // Admin: Remove destination from system
  DELETE('destinations-delete', CATEGORY, 'Delete Destination (Admin)', 
    '/destinations/999', 'Διαγραφή προορισμού (admin only)', 'admin', 'destinations-upload'),
];