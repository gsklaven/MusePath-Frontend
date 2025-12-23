/**
 * Coordinate API Endpoints
 * Handles GPS location tracking and updates.
 * @module utils/coordinateEndpoints
 */
import { GET, PUT } from './endpointBuilders';

const CATEGORY = 'Coordinates';

const SAMPLE_LOCATION = { lat: 40.7612, lng: -73.9778 };

/**
 * Endpoints for location tracking.
 */
export const COORDINATE_ENDPOINTS = [
  // Get current user GPS coordinates
  GET('coordinates-get', CATEGORY, 'Get User Coordinates', 
    '/coordinates/1', 'Τοποθεσία χρήστη', 'user'),
  
  // Update location during navigation
  PUT('coordinates-update', CATEGORY, 'Update Coordinates', 
    '/coordinates/1', 'Ενημέρωση τοποθεσίας', 
    SAMPLE_LOCATION, 'user'),
];