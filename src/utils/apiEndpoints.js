/**
 * API Endpoints Configuration
 * 
 * Centralized definition of all backend API endpoints for testing.
 * Each endpoint includes metadata for automated testing and documentation.
 * 
 * Endpoint Structure:
 * - id: Unique identifier for the endpoint
 * - category: Logical grouping (Health, Exhibits, Maps, Routes, Users, etc.)
 * - name: Human-readable endpoint name
 * - method: HTTP method (GET, POST, PUT, DELETE)
 * - path: API path relative to base URL
 * - description: Brief explanation of endpoint purpose
 * - sampleData: Example request body for POST/PUT methods (null for GET/DELETE)
 */

/**
 * Health check endpoints
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
    requiresAuth: null,
  },
];

/**
 * Authentication endpoints
 */
export const AUTH_ENDPOINTS = [
  {
    id: 'auth-register',
    category: 'Authentication',
    name: 'Register User',
    method: 'POST',
    path: '/auth/register',
    description: 'Δημιουργία νέου λογαριασμού',
    sampleData: () => ({
      username: 'test_user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5),
      email: 'test_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5) + '@example.com',
      password: 'Test123!@#',
    }),
    requiresAuth: null,
  },
  {
    id: 'auth-login',
    category: 'Authentication',
    name: 'Login',
    method: 'POST',
    path: '/auth/login',
    description: 'Σύνδεση χρήστη',
    sampleData: {
      username: 'john_smith',
      password: 'Password123!',
    },
    requiresAuth: null,
  },
  {
    id: 'auth-logout',
    category: 'Authentication',
    name: 'Logout',
    method: 'POST',
    path: '/auth/logout',
    description: 'Αποσύνδεση χρήστη',
    sampleData: null,
    requiresAuth: 'user',
  },
];

/**
 * Exhibit-related endpoints
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
    requiresAuth: null,
  },
  {
    id: 'exhibits-get',
    category: 'Exhibits',
    name: 'Get Exhibit by ID',
    method: 'GET',
    path: '/exhibits/1',
    description: 'Λεπτομέρειες συγκεκριμένου εκθέματος',
    sampleData: null,
    requiresAuth: null,
  },
  {
    id: 'exhibits-audio',
    category: 'Exhibits',
    name: 'Get Audio Guide',
    method: 'GET',
    path: '/exhibits/1/audio',
    description: 'Audio guide εκθέματος',
    sampleData: null,
    requiresAuth: null,
  },
  {
    id: 'exhibits-rate',
    category: 'Exhibits',
    name: 'Rate Exhibit',
    method: 'POST',
    path: '/exhibits/1/ratings',
    description: 'Αξιολόγηση εκθέματος',
    sampleData: { rating: 5 },
    requiresAuth: 'user',
  },
  {
    id: 'exhibits-download',
    category: 'Exhibits',
    name: 'Download Exhibit',
    method: 'GET',
    path: '/downloads/exhibits/1',
    description: 'Download για offline χρήση',
    sampleData: null,
    requiresAuth: null,
  },
  {
    id: 'exhibits-create',
    category: 'Exhibits',
    name: 'Create Exhibit (Admin)',
    method: 'POST',
    path: '/exhibits',
    description: 'Δημιουργία νέου εκθέματος (admin only)',
    sampleData: {
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
    },
    requiresAuth: 'admin',
  },
  {
    id: 'exhibits-delete',
    category: 'Exhibits',
    name: 'Delete Exhibit (Admin)',
    method: 'DELETE',
    path: '/exhibits/999',
    description: 'Διαγραφή εκθέματος (admin only)',
    sampleData: null,
    requiresAuth: 'admin',
    createFirst: 'exhibits-create',
  },
];

/**
 * Route calculation and management endpoints
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
    requiresAuth: 'user',
  },
  {
    id: 'routes-get',
    category: 'Routes',
    name: 'Get Route Details',
    method: 'GET',
    path: '/routes/1',
    description: 'Λεπτομέρειες διαδρομής',
    sampleData: null,
    requiresAuth: 'user',
    createFirst: 'routes-create',
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
    requiresAuth: 'user',
    createFirst: 'routes-create',
  },
  {
    id: 'routes-recalculate',
    category: 'Routes',
    name: 'Recalculate Route',
    method: 'POST',
    path: '/routes/1',
    description: 'Επαναυπολογισμός διαδρομής',
    sampleData: null,
    requiresAuth: 'user',
    createFirst: 'routes-create',
  },
  {
    id: 'routes-delete',
    category: 'Routes',
    name: 'Delete Route',
    method: 'DELETE',
    path: '/routes/1',
    description: 'Διαγραφή διαδρομής',
    sampleData: null,
    requiresAuth: 'user',
    createFirst: 'routes-create',
  },
];

/**
 * User preferences and favorites endpoints
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
    requiresAuth: 'user',
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
    requiresAuth: 'user',
  },
  {
    id: 'users-favourites-remove',
    category: 'Users',
    name: 'Remove from Favourites',
    method: 'DELETE',
    path: '/users/1/favourites/2',
    description: 'Αφαίρεση από αγαπημένα',
    sampleData: null,
    requiresAuth: 'user',
  },
  {
    id: 'users-personalized-route',
    category: 'Users',
    name: 'Get Personalized Route',
    method: 'GET',
    path: '/users/1/routes',
    description: 'Εξατομικευμένη διαδρομή',
    sampleData: null,
    requiresAuth: 'user',
  },
];

/**
 * Map management endpoints
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
    requiresAuth: 'admin',
  },
  {
    id: 'maps-get',
    category: 'Maps',
    name: 'Get Map by ID',
    method: 'GET',
    path: '/maps/1',
    description: 'Λήψη χάρτη',
    sampleData: null,
    requiresAuth: null,
  },
  {
    id: 'maps-download',
    category: 'Maps',
    name: 'Download Map',
    method: 'GET',
    path: '/downloads/maps/1',
    description: 'Download χάρτη',
    sampleData: null,
    requiresAuth: null,
  },
  {
    id: 'maps-delete',
    category: 'Maps',
    name: 'Delete Map (Admin)',
    method: 'DELETE',
    path: '/maps/999',
    description: 'Διαγραφή χάρτη (admin only)',
    sampleData: null,
    requiresAuth: 'admin',
    createFirst: 'maps-upload',
  },
];

/**
 * Destination management endpoints
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
    requiresAuth: null,
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
    requiresAuth: 'admin',
  },
  {
    id: 'destinations-get',
    category: 'Destinations',
    name: 'Get Destination Info',
    method: 'GET',
    path: '/destinations/1',
    description: 'Πληροφορίες προορισμού',
    sampleData: null,
    requiresAuth: null,
  },
  {
    id: 'destinations-delete',
    category: 'Destinations',
    name: 'Delete Destination (Admin)',
    method: 'DELETE',
    path: '/destinations/999',
    description: 'Διαγραφή προορισμού (admin only)',
    sampleData: null,
    requiresAuth: 'admin',
    createFirst: 'destinations-upload',
  },
];

/**
 * Coordinate tracking endpoints
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
    requiresAuth: 'user',
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
    requiresAuth: 'user',
  },
];

/**
 * Notification and sync endpoints
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
    requiresAuth: 'user',
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
    requiresAuth: 'user',
  },
];

/**
 * All endpoints combined for testing
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