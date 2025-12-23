import {
  GET,
  POST,
  PUT,
  DELETE,
  generateTestUser,
  generateTestExhibit,
  generateTestDestination
} from './endpointBuilders';

// ============================================================================
// Endpoint Definitions by Category
// ============================================================================

/**
 * Health check endpoints for API status monitoring
 */
export const HEALTH_ENDPOINTS = [
  GET(
    'health',
    'Health Check',
    'Health Status',
    '/health',
    'Έλεγχος λειτουργίας API'
  ),
];

/**
 * Authentication endpoints for user registration, login, and logout
 */
export const AUTH_ENDPOINTS = [
  POST(
    'auth-register',
    'Authentication',
    'Register User',
    '/auth/register',
    'Δημιουργία νέου λογαριασμού',
    generateTestUser
  ),
  POST(
    'auth-login',
    'Authentication',
    'Login',
    '/auth/login',
    'Σύνδεση χρήστη',
    { username: 'john_smith', password: 'Password123!' }
  ),
  POST(
    'auth-logout',
    'Authentication',
    'Logout',
    '/auth/logout',
    'Αποσύνδεση χρήστη',
    null,
    'user'
  ),
];

/**
 * Exhibit endpoints for searching, viewing, rating, and managing exhibits
 */
export const EXHIBIT_ENDPOINTS = [
  GET(
    'exhibits-search',
    'Exhibits',
    'Search Exhibits',
    '/exhibits/search?exhibit_term=starry&mode=online',
    'Αναζήτηση εκθεμάτων'
  ),
  GET(
    'exhibits-get',
    'Exhibits',
    'Get Exhibit by ID',
    '/exhibits/1',
    'Λεπτομέρειες συγκεκριμένου εκθέματος'
  ),
  GET(
    'exhibits-audio',
    'Exhibits',
    'Get Audio Guide',
    '/exhibits/1/audio',
    'Audio guide εκθέματος'
  ),
  POST(
    'exhibits-rate',
    'Exhibits',
    'Rate Exhibit',
    '/exhibits/1/ratings',
    'Αξιολόγηση εκθέματος',
    { rating: 5 },
    'user'
  ),
  GET(
    'exhibits-download',
    'Exhibits',
    'Download Exhibit',
    '/downloads/exhibits/1',
    'Download για offline χρήση'
  ),
  POST(
    'exhibits-create',
    'Exhibits',
    'Create Exhibit (Admin)',
    '/exhibits',
    'Δημιουργία νέου εκθέματος (admin only)',
    generateTestExhibit,
    'admin'
  ),
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
 * Route endpoints for creating and managing navigation routes
 */
export const ROUTE_ENDPOINTS = [
  POST(
    'routes-create',
    'Routes',
    'Calculate Route',
    '/routes',
    'Υπολογισμός διαδρομής',
    {
      user_id: 1,
      destination_id: 2,
      startLat: 40.7610,
      startLng: -73.9780,
    },
    'user'
  ),
  GET(
    'routes-get',
    'Routes',
    'Get Route Details',
    '/routes/1',
    'Λεπτομέρειες διαδρομής',
    'user',
    'routes-create'
  ),
  PUT(
    'routes-update',
    'Routes',
    'Update Route Stops',
    '/routes/1',
    'Ενημέρωση στάσεων διαδρομής',
    { addStops: [3, 4], removeStops: [] },
    'user',
    'routes-create'
  ),
  POST(
    'routes-recalculate',
    'Routes',
    'Recalculate Route',
    '/routes/1',
    'Επαναυπολογισμός διαδρομής',
    null,
    'user',
    'routes-create'
  ),
  DELETE(
    'routes-delete',
    'Routes',
    'Delete Route',
    '/routes/1',
    'Διαγραφή διαδρομής',
    'user',
    'routes-create'
  ),
];

/**
 * User endpoints for managing preferences and favorites
 */
export const USER_ENDPOINTS = [
  PUT(
    'users-preferences',
    'Users',
    'Update Preferences',
    '/users/1/preferences',
    'Ενημέρωση προτιμήσεων χρήστη',
    { interests: ['modern art', 'sculpture', 'impressionism'] },
    'user'
  ),
  POST(
    'users-favourites-add',
    'Users',
    'Add to Favourites',
    '/users/1/favourites',
    'Προσθήκη στα αγαπημένα',
    { exhibit_id: 2 },
    'user'
  ),
  DELETE(
    'users-favourites-remove',
    'Users',
    'Remove from Favourites',
    '/users/1/favourites/2',
    'Αφαίρεση από αγαπημένα',
    'user'
  ),
  GET(
    'users-personalized-route',
    'Users',
    'Get Personalized Route',
    '/users/1/routes',
    'Εξατομικευμένη διαδρομή',
    'user'
  ),
];

/**
 * Map endpoints for uploading and managing museum maps
 */
export const MAP_ENDPOINTS = [
  POST(
    'maps-upload',
    'Maps',
    'Upload Map',
    '/maps',
    'Upload χάρτη',
    { mapData: 'base64_encoded_map_data', format: 'image/png' },
    'admin'
  ),
  GET(
    'maps-get',
    'Maps',
    'Get Map by ID',
    '/maps/1',
    'Λήψη χάρτη'
  ),
  GET(
    'maps-download',
    'Maps',
    'Download Map',
    '/downloads/maps/1',
    'Download χάρτη'
  ),
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
  GET(
    'destinations-list',
    'Destinations',
    'List Destinations',
    '/destinations',
    'Λίστα όλων των προορισμών'
  ),
  POST(
    'destinations-upload',
    'Destinations',
    'Upload Destinations',
    '/destinations',
    'Upload προορισμών',
    generateTestDestination,
    'admin'
  ),
  GET(
    'destinations-get',
    'Destinations',
    'Get Destination Info',
    '/destinations/1',
    'Πληροφορίες προορισμού'
  ),
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

/**
 * Coordinate endpoints for tracking user location
 */
export const COORDINATE_ENDPOINTS = [
  GET(
    'coordinates-get',
    'Coordinates',
    'Get User Coordinates',
    '/coordinates/1',
    'Τοποθεσία χρήστη',
    'user'
  ),
  PUT(
    'coordinates-update',
    'Coordinates',
    'Update Coordinates',
    '/coordinates/1',
    'Ενημέρωση τοποθεσίας',
    { lat: 40.7612, lng: -73.9778 },
    'user'
  ),
];

/**
 * System endpoints for notifications and data synchronization
 */
export const SYSTEM_ENDPOINTS = [
  POST(
    'notifications-send',
    'Notifications',
    'Send Notification',
    '/notifications',
    'Αποστολή ειδοποίησης (Uses route_id 2 - backup route for testing)',
    {
      user_id: 1,
      route_id: 2,
      currentLat: 40.7610,
      currentLng: -73.9780,
    },
    'user'
  ),
  POST(
    'sync-data',
    'Sync',
    'Sync Offline Data',
    '/sync',
    'Συγχρονισμός offline δεδομένων',
    [
      {
        type: 'rating',
        exhibit_id: 1,
        rating: 5,
        timestamp: new Date().toISOString(),
      },
    ],
    'user'
  ),
];

/**
 * All endpoints combined for comprehensive iteration
 * @type {Array<Object>}
 */
export const ALL_ENDPOINTS = [
  ...HEALTH_ENDPOINTS,
  ...AUTH_ENDPOINTS,
  ...EXHIBIT_ENDPOINTS,
  ...ROUTE_ENDPOINTS,
  ...USER_ENDPOINTS,
  ...MAP_ENDPOINTS,
  ...DESTINATION_ENDPOINTS,
  ...COORDINATE_ENDPOINTS,
  ...SYSTEM_ENDPOINTS,
];