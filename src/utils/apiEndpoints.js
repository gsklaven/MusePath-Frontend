/**
 * API Endpoints Configuration
 * 
 * Centralized definition of all backend API endpoints for testing.
 * Provides a structured, maintainable way to define and access API endpoints
 * with metadata for automated testing and documentation.
 * 
 * @module apiEndpoints
 */

// ============================================================================
// Core Endpoint Builder
// ============================================================================

/**
 * Creates an endpoint metadata object
 * 
 * @param {string} id - Unique identifier for the endpoint
 * @param {string} category - Endpoint category (e.g., 'Authentication', 'Exhibits')
 * @param {string} name - Human-readable endpoint name
 * @param {string} method - HTTP method (GET, POST, PUT, DELETE)
 * @param {string} path - API endpoint path
 * @param {string} description - Greek description of endpoint purpose
 * @param {Object|Function|null} sampleData - Sample request data or data generator function
 * @param {string|null} requiresAuth - Authentication level required ('user', 'admin', or null)
 * @param {string|null} createFirst - ID of endpoint that must be called first (for dependencies)
 * @returns {Object} Endpoint metadata object
 */
const createEndpoint = (
  id,
  category,
  name,
  method,
  path,
  description,
  sampleData = null,
  requiresAuth = null,
  createFirst = null
) => ({
  id,
  category,
  name,
  method,
  path,
  description,
  sampleData,
  requiresAuth,
  createFirst,
});

// ============================================================================
// HTTP Method Helpers
// ============================================================================

/**
 * Creates a GET endpoint definition
 * @param {string} id - Endpoint identifier
 * @param {string} category - Endpoint category
 * @param {string} name - Endpoint name
 * @param {string} path - API path
 * @param {string} description - Greek description
 * @param {string|null} requiresAuth - Auth level required
 * @param {string|null} createFirst - Dependency endpoint ID
 */
const GET = (id, category, name, path, description, requiresAuth = null, createFirst = null) =>
  createEndpoint(id, category, name, 'GET', path, description, null, requiresAuth, createFirst);

/**
 * Creates a POST endpoint definition
 * @param {string} id - Endpoint identifier
 * @param {string} category - Endpoint category
 * @param {string} name - Endpoint name
 * @param {string} path - API path
 * @param {string} description - Greek description
 * @param {Object|Function} sampleData - Sample request body or generator
 * @param {string|null} requiresAuth - Auth level required
 * @param {string|null} createFirst - Dependency endpoint ID
 */
const POST = (id, category, name, path, description, sampleData, requiresAuth = null, createFirst = null) =>
  createEndpoint(id, category, name, 'POST', path, description, sampleData, requiresAuth, createFirst);

/**
 * Creates a PUT endpoint definition
 * @param {string} id - Endpoint identifier
 * @param {string} category - Endpoint category
 * @param {string} name - Endpoint name
 * @param {string} path - API path
 * @param {string} description - Greek description
 * @param {Object|Function} sampleData - Sample request body or generator
 * @param {string|null} requiresAuth - Auth level required
 * @param {string|null} createFirst - Dependency endpoint ID
 */
const PUT = (id, category, name, path, description, sampleData, requiresAuth = null, createFirst = null) =>
  createEndpoint(id, category, name, 'PUT', path, description, sampleData, requiresAuth, createFirst);

/**
 * Creates a DELETE endpoint definition
 * @param {string} id - Endpoint identifier
 * @param {string} category - Endpoint category
 * @param {string} name - Endpoint name
 * @param {string} path - API path
 * @param {string} description - Greek description
 * @param {string|null} requiresAuth - Auth level required
 * @param {string|null} createFirst - Dependency endpoint ID
 */
const DELETE = (id, category, name, path, description, requiresAuth = null, createFirst = null) =>
  createEndpoint(id, category, name, 'DELETE', path, description, null, requiresAuth, createFirst);

// ============================================================================
// Test Data Generators
// ============================================================================

/**
 * Generates unique test user credentials
 * @returns {Object} Object with username, email, and password
 */
const generateTestUser = () => {
  const timestamp = Date.now();
  const randomId = Math.random().toString(36).substr(2, 5);
  
  return {
    username: `test_user_${timestamp}_${randomId}`,
    email: `test_${timestamp}_${randomId}@example.com`,
    password: 'Test123!@#',
  };
};

/**
 * Creates sample exhibit data for testing
 * @returns {Object} Sample exhibit object
 */
const generateTestExhibit = () => ({
  title: 'Test Exhibit',
  name: 'Test Museum Piece',
  artist: 'Test Artist',
  year: 2024,
  category: ['paintings', 'modern art'],
  description: 'A test exhibit for API testing',
  historicalInfo: 'Created for testing purposes',
  location: 'Test Gallery',
  features: ['wheelchair_accessible', 'audio_guide'],
  status: 'open',
  crowdLevel: 'low',
});

/**
 * Creates sample destination data for testing
 * @returns {Object} Sample destination upload payload
 */
const generateTestDestination = () => ({
  map_id: 1,
  destinations: [
    {
      name: 'Test Destination',
      type: 'exhibit',
      coordinates: { lat: 40.7610, lng: -73.9780 },
    },
  ],
});

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

// ============================================================================
// Utility Functions
// ============================================================================

/**
 * Finds an endpoint by its ID
 * @param {string} id - Endpoint ID to search for
 * @returns {Object|undefined} Endpoint object or undefined if not found
 */
export const findEndpointById = (id) => {
  return ALL_ENDPOINTS.find(endpoint => endpoint.id === id);
};

/**
 * Gets all endpoints in a specific category
 * @param {string} category - Category name to filter by
 * @returns {Array<Object>} Array of endpoints in the category
 */
export const getEndpointsByCategory = (category) => {
  return ALL_ENDPOINTS.filter(endpoint => endpoint.category === category);
};

/**
 * Gets all endpoints that require specific authentication level
 * @param {string} authLevel - Auth level ('user', 'admin', or null for public)
 * @returns {Array<Object>} Array of endpoints requiring that auth level
 */
export const getEndpointsByAuth = (authLevel) => {
  return ALL_ENDPOINTS.filter(endpoint => endpoint.requiresAuth === authLevel);
};