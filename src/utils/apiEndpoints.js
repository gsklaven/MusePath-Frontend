/**
 * API Endpoints Configuration
 *
 * Centralized definition of all backend API endpoints for testing.
 * Organized into domain-specific groups for improved maintainability.
 *
 * Endpoint Structure:
 * - id: Unique identifier for the endpoint
 * - category: Logical grouping (Health, Exhibits, Maps, Routes, Users, etc.)
 * - name: Human-readable endpoint name
 * - method: HTTP method (GET, POST, PUT, DELETE)
 * - path: API path relative to base URL
 * - description: Brief explanation of endpoint purpose
 * - sampleData: Example request body for POST/PUT methods (null for GET/DELETE)
 *
 * @module utils/apiEndpoints
 */

// ============================================================================
// Endpoint Factory Helpers
// ============================================================================

/**
 * Creates a GET endpoint definition.
 * @param {string} id - Unique identifier
 * @param {string} category - Logical grouping
 * @param {string} name - Human-readable name
 * @param {string} path - API path
 * @param {string} description - Endpoint purpose
 * @returns {Object} Endpoint definition
 */
const createGetEndpoint = (id, category, name, path, description) => ({
  id,
  category,
  name,
  method: 'GET',
  path,
  description,
  sampleData: null,
});

/**
 * Creates a POST endpoint definition.
 * @param {string} id - Unique identifier
 * @param {string} category - Logical grouping
 * @param {string} name - Human-readable name
 * @param {string} path - API path
 * @param {string} description - Endpoint purpose
 * @param {Object|null} sampleData - Example request body
 * @returns {Object} Endpoint definition
 */
const createPostEndpoint = (id, category, name, path, description, sampleData) => ({
  id,
  category,
  name,
  method: 'POST',
  path,
  description,
  sampleData,
});

/**
 * Creates a PUT endpoint definition.
 * @param {string} id - Unique identifier
 * @param {string} category - Logical grouping
 * @param {string} name - Human-readable name
 * @param {string} path - API path
 * @param {string} description - Endpoint purpose
 * @param {Object|null} sampleData - Example request body
 * @returns {Object} Endpoint definition
 */
const createPutEndpoint = (id, category, name, path, description, sampleData) => ({
  id,
  category,
  name,
  method: 'PUT',
  path,
  description,
  sampleData,
});

/**
 * Creates a DELETE endpoint definition.
 * @param {string} id - Unique identifier
 * @param {string} category - Logical grouping
 * @param {string} name - Human-readable name
 * @param {string} path - API path
 * @param {string} description - Endpoint purpose
 * @returns {Object} Endpoint definition
 */
const createDeleteEndpoint = (id, category, name, path, description) => ({
  id,
  category,
  name,
  method: 'DELETE',
  path,
  description,
  sampleData: null,
});

// ============================================================================
// Health Endpoints
// ============================================================================

/**
 * Health check endpoints for monitoring API status.
 * @type {Object[]}
 */
export const HEALTH_ENDPOINTS = [
  {
    id: 'health',
    category: 'Health Check',
    name: 'Health Status',
    method: 'GET',
    path: '/health',
    description: 'Έλεγχος λειτουργίας API',
    sampleData: null,
  },
];

// ============================================================================
// Exhibit Endpoints
// ============================================================================

/**
 * Exhibit-related endpoints for search, details, audio, ratings, and downloads.
 * @type {Object[]}
 */
export const EXHIBIT_ENDPOINTS = [
  {
    id: 'exhibits-search',
    category: 'Exhibits',
    name: 'Search Exhibits',
    method: 'GET',
    path: '/exhibits/search?exhibit_term=starry&mode=online',
    description: 'Αναζήτηση εκθεμάτων',
    sampleData: null,
  },
  {
    id: 'exhibits-get',
    category: 'Exhibits',
    name: 'Get Exhibit by ID',
    method: 'GET',
    path: '/exhibits/1',
    description: 'Λεπτομέρειες συγκεκριμένου εκθέματος',
    sampleData: null,
  },
  {
    id: 'exhibits-audio',
    category: 'Exhibits',
    name: 'Get Audio Guide',
    method: 'GET',
    path: '/exhibits/1/audio',
    description: 'Audio guide εκθέματος',
    sampleData: null,
  },
  {
    id: 'exhibits-rate',
    category: 'Exhibits',
    name: 'Rate Exhibit',
    method: 'POST',
    path: '/exhibits/1/ratings',
    description: 'Αξιολόγηση εκθέματος',
    sampleData: { rating: 5 },
  },
  {
    id: 'exhibits-download',
    category: 'Exhibits',
    name: 'Download Exhibit',
    method: 'GET',
    path: '/downloads/exhibits/1',
    description: 'Download για offline χρήση',
    sampleData: null,
  },
];

// ============================================================================
// Route Endpoints
// ============================================================================

/**
 * Route calculation and management endpoints.
 * Includes create, read, update, recalculate, and delete operations.
 * @type {Object[]}
 */
export const ROUTE_ENDPOINTS = [
  {
    id: 'routes-create',
    category: 'Routes',
    name: 'Calculate Route',
    method: 'POST',
    path: '/routes',
    description: 'Υπολογισμός διαδρομής',
    sampleData: {
      user_id: 1,
      destination_id: 2,
      startLat: 40.7610,
      startLng: -73.9780,
    },
  },
  {
    id: 'routes-get',
    category: 'Routes',
    name: 'Get Route Details',
    method: 'GET',
    path: '/routes/1',
    description: 'Λεπτομέρειες διαδρομής',
    sampleData: null,
  },
  {
    id: 'routes-update',
    category: 'Routes',
    name: 'Update Route Stops',
    method: 'PUT',
    path: '/routes/1',
    description: 'Ενημέρωση στάσεων διαδρομής',
    sampleData: {
      addStops: [3, 4],
      removeStops: [],
    },
  },
  {
    id: 'routes-recalculate',
    category: 'Routes',
    name: 'Recalculate Route',
    method: 'POST',
    path: '/routes/1',
    description: 'Επαναυπολογισμός διαδρομής',
    sampleData: null,
  },
  {
    id: 'routes-delete',
    category: 'Routes',
    name: 'Delete Route',
    method: 'DELETE',
    path: '/routes/1',
    description: 'Διαγραφή διαδρομής',
    sampleData: null,
  },
];

// ============================================================================
// User Endpoints
// ============================================================================

/**
 * User preferences and favorites management endpoints.
 * @type {Object[]}
 */
export const USER_ENDPOINTS = [
  {
    id: 'users-preferences',
    category: 'Users',
    name: 'Update Preferences',
    method: 'PUT',
    path: '/users/1/preferences',
    description: 'Ενημέρωση προτιμήσεων χρήστη',
    sampleData: {
      interests: ['modern art', 'sculpture', 'impressionism'],
    },
  },
  {
    id: 'users-favourites-add',
    category: 'Users',
    name: 'Add to Favourites',
    method: 'POST',
    path: '/users/1/favourites',
    description: 'Προσθήκη στα αγαπημένα',
    sampleData: {
      exhibit_id: 2,
    },
  },
  {
    id: 'users-favourites-remove',
    category: 'Users',
    name: 'Remove from Favourites',
    method: 'DELETE',
    path: '/users/1/favourites/2',
    description: 'Αφαίρεση από αγαπημένα',
    sampleData: null,
  },
  {
    id: 'users-personalized-route',
    category: 'Users',
    name: 'Get Personalized Route',
    method: 'GET',
    path: '/users/1/routes',
    description: 'Εξατομικευμένη διαδρομή',
    sampleData: null,
  },
];

// ============================================================================
// Map Endpoints
// ============================================================================

/**
 * Map management endpoints including upload, retrieval, and download.
 * @type {Object[]}
 */
export const MAP_ENDPOINTS = [
  {
    id: 'maps-upload',
    category: 'Maps',
    name: 'Upload Map',
    method: 'POST',
    path: '/maps',
    description: 'Upload χάρτη',
    sampleData: {
      mapData: 'base64_encoded_map_data',
      format: 'image/png',
    },
  },
  {
    id: 'maps-get',
    category: 'Maps',
    name: 'Get Map by ID',
    method: 'GET',
    path: '/maps/1',
    description: 'Λήψη χάρτη',
    sampleData: null,
  },
  {
    id: 'maps-download',
    category: 'Maps',
    name: 'Download Map',
    method: 'GET',
    path: '/downloads/maps/1',
    description: 'Download χάρτη',
    sampleData: null,
  },
];

// ============================================================================
// Destination Endpoints
// ============================================================================

/**
 * Destination management endpoints for listing, uploading, and details.
 * @type {Object[]}
 */
export const DESTINATION_ENDPOINTS = [
  {
    id: 'destinations-list',
    category: 'Destinations',
    name: 'List Destinations',
    method: 'GET',
    path: '/destinations',
    description: 'Λίστα όλων των προορισμών',
    sampleData: null,
  },
  {
    id: 'destinations-upload',
    category: 'Destinations',
    name: 'Upload Destinations',
    method: 'POST',
    path: '/destinations',
    description: 'Upload προορισμών',
    sampleData: {
      map_id: 1,
      destinations: [
        {
          name: 'Test Destination',
          type: 'exhibit',
          coordinates: { lat: 40.7610, lng: -73.9780 },
        },
      ],
    },
  },
  {
    id: 'destinations-get',
    category: 'Destinations',
    name: 'Get Destination Info',
    method: 'GET',
    path: '/destinations/1',
    description: 'Πληροφορίες προορισμού',
    sampleData: null,
  },
];

// ============================================================================
// Coordinate Endpoints
// ============================================================================

/**
 * Coordinate tracking endpoints for user location management.
 * @type {Object[]}
 */
export const COORDINATE_ENDPOINTS = [
  {
    id: 'coordinates-get',
    category: 'Coordinates',
    name: 'Get User Coordinates',
    method: 'GET',
    path: '/coordinates/1',
    description: 'Τοποθεσία χρήστη',
    sampleData: null,
  },
  {
    id: 'coordinates-update',
    category: 'Coordinates',
    name: 'Update Coordinates',
    method: 'PUT',
    path: '/coordinates/1',
    description: 'Ενημέρωση τοποθεσίας',
    sampleData: {
      lat: 40.7612,
      lng: -73.9778,
    },
  },
];

// ============================================================================
// System Endpoints
// ============================================================================

/**
 * Notification and sync endpoints for background operations.
 * @type {Object[]}
 */
export const SYSTEM_ENDPOINTS = [
  {
    id: 'notifications-send',
    category: 'Notifications',
    name: 'Send Notification',
    method: 'POST',
    path: '/notifications',
    description: 'Αποστολή ειδοποίησης (Uses route_id 2 - backup route for testing)',
    sampleData: {
      user_id: 1,
      route_id: 2,
      currentLat: 40.7610,
      currentLng: -73.9780,
    },
  },
  {
    id: 'sync-data',
    category: 'Sync',
    name: 'Sync Offline Data',
    method: 'POST',
    path: '/sync',
    description: 'Συγχρονισμός offline δεδομένων',
    sampleData: [
      {
        type: 'rating',
        exhibit_id: 1,
        rating: 5,
        timestamp: new Date().toISOString(),
      },
    ],
  },
];

// ============================================================================
// Aggregated Endpoint Collection
// ============================================================================

/**
 * All endpoints combined for comprehensive API testing.
 * Use domain-specific arrays (e.g., EXHIBIT_ENDPOINTS) for targeted tests.
 * @type {Object[]}
 */
export const ALL_ENDPOINTS = [
  ...HEALTH_ENDPOINTS,
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
 * Retrieves endpoints filtered by category.
 * @param {string} category - Category name to filter by
 * @returns {Object[]} Matching endpoints
 */
export const getEndpointsByCategory = (category) =>
  ALL_ENDPOINTS.filter((ep) => ep.category === category);

/**
 * Retrieves endpoints filtered by HTTP method.
 * @param {string} method - HTTP method (GET, POST, PUT, DELETE)
 * @returns {Object[]} Matching endpoints
 */
export const getEndpointsByMethod = (method) =>
  ALL_ENDPOINTS.filter((ep) => ep.method === method.toUpperCase());
