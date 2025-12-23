/**
 * Route API Endpoints
 * Handles navigation route creation, updates, and management.
 * @module utils/routeEndpoints
 */
import { GET, POST, PUT, DELETE } from './endpointBuilders';

const CATEGORY = 'Routes';

const SAMPLE_ROUTE_CREATE = {
  user_id: 1, 
  destination_id: 2, 
  startLat: 40.7610, 
  startLng: -73.9780
};

const SAMPLE_ROUTE_UPDATE = { addStops: [3, 4], removeStops: [] };

/**
 * Endpoints for route calculation and management.
 */
export const ROUTE_ENDPOINTS = [
  // Calculate optimal route between exhibits
  POST('routes-create', CATEGORY, 'Calculate Route', '/routes', 
    'Υπολογισμός διαδρομής', SAMPLE_ROUTE_CREATE, 'user'),
  
  // Get full route details with waypoints
  GET('routes-get', CATEGORY, 'Get Route Details', '/routes/1', 
    'Λεπτομέρειες διαδρομής', 'user', 'routes-create'),
  
  // Add or remove stops from existing route
  PUT('routes-update', CATEGORY, 'Update Route Stops', '/routes/1', 
    'Ενημέρωση στάσεων διαδρομής', 
    SAMPLE_ROUTE_UPDATE, 'user', 'routes-create'),
  
  // Recalculate route based on current conditions
  POST('routes-recalculate', CATEGORY, 'Recalculate Route', '/routes/1', 
    'Επαναυπολογισμός διαδρομής', null, 'user', 'routes-create'),
  
  // Delete route from user history
  DELETE('routes-delete', CATEGORY, 'Delete Route', '/routes/1', 
    'Διαγραφή διαδρομής', 'user', 'routes-create'),
];