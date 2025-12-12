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

const endpoint = (id, category, name, method, path, description, sampleData = null) => ({
  id, category, name, method, path, description, sampleData
});

const get = (id, category, name, path, description) => 
  endpoint(id, category, name, 'GET', path, description);

const post = (id, category, name, path, description, sampleData) => 
  endpoint(id, category, name, 'POST', path, description, sampleData);

const put = (id, category, name, path, description, sampleData) => 
  endpoint(id, category, name, 'PUT', path, description, sampleData);

const del = (id, category, name, path, description) => 
  endpoint(id, category, name, 'DELETE', path, description);

export const HEALTH_ENDPOINTS = [
  get('health', 'Health Check', 'Health Status', '/health', 'Έλεγχος λειτουργίας API'),
];

export const EXHIBIT_ENDPOINTS = [
  get('exhibits-search', 'Exhibits', 'Search Exhibits', '/exhibits/search?exhibit_term=starry&mode=online', 'Αναζήτηση εκθεμάτων'),
  get('exhibits-get', 'Exhibits', 'Get Exhibit by ID', '/exhibits/1', 'Λεπτομέρειες συγκεκριμένου εκθέματος'),
  get('exhibits-audio', 'Exhibits', 'Get Audio Guide', '/exhibits/1/audio', 'Audio guide εκθέματος'),
  post('exhibits-rate', 'Exhibits', 'Rate Exhibit', '/exhibits/1/ratings', 'Αξιολόγηση εκθέματος', { rating: 5 }),
  get('exhibits-download', 'Exhibits', 'Download Exhibit', '/downloads/exhibits/1', 'Download για offline χρήση'),
];

export const ROUTE_ENDPOINTS = [
  post('routes-create', 'Routes', 'Calculate Route', '/routes', 'Υπολογισμός διαδρομής', {
    user_id: 1,
    destination_id: 2,
    startLat: 40.7610,
    startLng: -73.9780,
  }),
  get('routes-get', 'Routes', 'Get Route Details', '/routes/1', 'Λεπτομέρειες διαδρομής'),
  put('routes-update', 'Routes', 'Update Route Stops', '/routes/1', 'Ενημέρωση στάσεων διαδρομής', {
    addStops: [3, 4],
    removeStops: [],
  }),
  post('routes-recalculate', 'Routes', 'Recalculate Route', '/routes/1', 'Επαναυπολογισμός διαδρομής', null),
  del('routes-delete', 'Routes', 'Delete Route', '/routes/1', 'Διαγραφή διαδρομής'),
];

export const USER_ENDPOINTS = [
  put('users-preferences', 'Users', 'Update Preferences', '/users/1/preferences', 'Ενημέρωση προτιμήσεων χρήστη', {
    interests: ['modern art', 'sculpture', 'impressionism'],
  }),
  post('users-favourites-add', 'Users', 'Add to Favourites', '/users/1/favourites', 'Προσθήκη στα αγαπημένα', {
    exhibit_id: 2,
  }),
  del('users-favourites-remove', 'Users', 'Remove from Favourites', '/users/1/favourites/2', 'Αφαίρεση από αγαπημένα'),
  get('users-personalized-route', 'Users', 'Get Personalized Route', '/users/1/routes', 'Εξατομικευμένη διαδρομή'),
];

export const MAP_ENDPOINTS = [
  post('maps-upload', 'Maps', 'Upload Map', '/maps', 'Upload χάρτη', {
    mapData: 'base64_encoded_map_data',
    format: 'image/png',
  }),
  get('maps-get', 'Maps', 'Get Map by ID', '/maps/1', 'Λήψη χάρτη'),
  get('maps-download', 'Maps', 'Download Map', '/downloads/maps/1', 'Download χάρτη'),
];

export const DESTINATION_ENDPOINTS = [
  get('destinations-list', 'Destinations', 'List Destinations', '/destinations', 'Λίστα όλων των προορισμών'),
  post('destinations-upload', 'Destinations', 'Upload Destinations', '/destinations', 'Upload προορισμών', {
    map_id: 1,
    destinations: [
      {
        name: 'Test Destination',
        type: 'exhibit',
        coordinates: { lat: 40.7610, lng: -73.9780 },
      },
    ],
  }),
  get('destinations-get', 'Destinations', 'Get Destination Info', '/destinations/1', 'Πληροφορίες προορισμού'),
];

export const COORDINATE_ENDPOINTS = [
  get('coordinates-get', 'Coordinates', 'Get User Coordinates', '/coordinates/1', 'Τοποθεσία χρήστη'),
  put('coordinates-update', 'Coordinates', 'Update Coordinates', '/coordinates/1', 'Ενημέρωση τοποθεσίας', {
    lat: 40.7612,
    lng: -73.9778,
  }),
];

export const SYSTEM_ENDPOINTS = [
  post('notifications-send', 'Notifications', 'Send Notification', '/notifications', 'Αποστολή ειδοποίησης (Uses route_id 2 - backup route for testing)', {
    user_id: 1,
    route_id: 2,
    currentLat: 40.7610,
    currentLng: -73.9780,
  }),
  post('sync-data', 'Sync', 'Sync Offline Data', '/sync', 'Συγχρονισμός offline δεδομένων', [
    {
      type: 'rating',
      exhibit_id: 1,
      rating: 5,
      timestamp: new Date().toISOString(),
    },
  ]),
];

/**
 * All endpoints combined for testing
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