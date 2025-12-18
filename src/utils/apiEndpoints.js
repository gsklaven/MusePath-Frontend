/**
 * API Endpoints Configuration
 * 
 * Centralized definition of all backend API endpoints for testing.
 * Each endpoint includes metadata for automated testing and documentation.
 */

// Helper: construct endpoint metadata objects used throughout tests
const endpoint = (id, category, name, method, path, description, sampleData = null, requiresAuth = null, createFirst = null) => ({
  id, category, name, method, path, description, sampleData, requiresAuth, createFirst,
});

// Convenience wrappers for common HTTP methods (keeps endpoint definitions concise)
const get = (id, cat, name, path, desc, auth = null, dep = null) => 
  endpoint(id, cat, name, 'GET', path, desc, null, auth, dep);

const post = (id, cat, name, path, desc, data, auth = null, dep = null) => 
  endpoint(id, cat, name, 'POST', path, desc, data, auth, dep);

const put = (id, cat, name, path, desc, data, auth = null, dep = null) => 
  endpoint(id, cat, name, 'PUT', path, desc, data, auth, dep);

const del = (id, cat, name, path, desc, auth = null, dep = null) => 
  endpoint(id, cat, name, 'DELETE', path, desc, null, auth, dep);

// --- Endpoint groups ------------------------------------------------------
// Each exported array groups related endpoints used by the frontend and tests.
export const HEALTH_ENDPOINTS = [
  // Health-check endpoints for basic API liveness and readiness
  get('health', 'Health Check', 'Health Status', '/health', 'Έλεγχος λειτουργίας API'),
];

export const AUTH_ENDPOINTS = [
  // Authentication: register/login/logout helpers used by integration tests
  post('auth-register', 'Authentication', 'Register User', '/auth/register', 'Δημιουργία νέου λογαριασμού', 
    () => ({
      username: 'test_user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5),
      email: 'test_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5) + '@example.com',
      password: 'Test123!@#',
    })),
  // Standard login payload for tests that require an existing account
  post('auth-login', 'Authentication', 'Login', '/auth/login', 'Σύνδεση χρήστη', 
    { username: 'john_smith', password: 'Password123!' }),
  post('auth-logout', 'Authentication', 'Logout', '/auth/logout', 'Αποσύνδεση χρήστη', null, 'user'),
];

export const EXHIBIT_ENDPOINTS = [
  // Exhibit-related endpoints (search, details, audio, ratings, admin ops)
  get('exhibits-search', 'Exhibits', 'Search Exhibits', '/exhibits/search?exhibit_term=starry&mode=online', 'Αναζήτηση εκθεμάτων'),
  get('exhibits-get', 'Exhibits', 'Get Exhibit by ID', '/exhibits/1', 'Λεπτομέρειες συγκεκριμένου εκθέματος'),
  get('exhibits-audio', 'Exhibits', 'Get Audio Guide', '/exhibits/1/audio', 'Audio guide εκθέματος'),
  post('exhibits-rate', 'Exhibits', 'Rate Exhibit', '/exhibits/1/ratings', 'Αξιολόγηση εκθέματος', { rating: 5 }, 'user'),
  get('exhibits-download', 'Exhibits', 'Download Exhibit', '/downloads/exhibits/1', 'Download για offline χρήση'),
  post('exhibits-create', 'Exhibits', 'Create Exhibit (Admin)', '/exhibits', 'Δημιουργία νέου εκθέματος (admin only)', {
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
  }, 'admin'),
  del('exhibits-delete', 'Exhibits', 'Delete Exhibit (Admin)', '/exhibits/999', 'Διαγραφή εκθέματος (admin only)', 'admin', 'exhibits-create'),
];

export const ROUTE_ENDPOINTS = [
  // Route endpoints: create, view, update, recalculate, delete
  post('routes-create', 'Routes', 'Calculate Route', '/routes', 'Υπολογισμός διαδρομής', 
    { user_id: 1, destination_id: 2, startLat: 40.7610, startLng: -73.9780 }, 'user'),
  get('routes-get', 'Routes', 'Get Route Details', '/routes/1', 'Λεπτομέρειες διαδρομής', 'user', 'routes-create'),
  put('routes-update', 'Routes', 'Update Route Stops', '/routes/1', 'Ενημέρωση στάσεων διαδρομής', 
    { addStops: [3, 4], removeStops: [] }, 'user', 'routes-create'),
  post('routes-recalculate', 'Routes', 'Recalculate Route', '/routes/1', 'Επαναυπολογισμός διαδρομής', null, 'user', 'routes-create'),
  del('routes-delete', 'Routes', 'Delete Route', '/routes/1', 'Διαγραφή διαδρομής', 'user', 'routes-create'),
];

export const USER_ENDPOINTS = [
  // User endpoints: preferences, favourites, personalized routes
  put('users-preferences', 'Users', 'Update Preferences', '/users/1/preferences', 'Ενημέρωση προτιμήσεων χρήστη', 
    { interests: ['modern art', 'sculpture', 'impressionism'] }, 'user'),
  post('users-favourites-add', 'Users', 'Add to Favourites', '/users/1/favourites', 'Προσθήκη στα αγαπημένα', 
    { exhibit_id: 2 }, 'user'),
  del('users-favourites-remove', 'Users', 'Remove from Favourites', '/users/1/favourites/2', 'Αφαίρεση από αγαπημένα', 'user'),
  get('users-personalized-route', 'Users', 'Get Personalized Route', '/users/1/routes', 'Εξατομικευμένη διαδρομή', 'user'),
];

export const MAP_ENDPOINTS = [
  // Map management endpoints for upload, retrieval and admin deletion
  post('maps-upload', 'Maps', 'Upload Map', '/maps', 'Upload χάρτη', 
    { mapData: 'base64_encoded_map_data', format: 'image/png' }, 'admin'),
  get('maps-get', 'Maps', 'Get Map by ID', '/maps/1', 'Λήψη χάρτη'),
  get('maps-download', 'Maps', 'Download Map', '/downloads/maps/1', 'Download χάρτη'),
  del('maps-delete', 'Maps', 'Delete Map (Admin)', '/maps/999', 'Διαγραφή χάρτη (admin only)', 'admin', 'maps-upload'),
];

export const DESTINATION_ENDPOINTS = [
  // Destination endpoints for listing, upload and admin deletion
  get('destinations-list', 'Destinations', 'List Destinations', '/destinations', 'Λίστα όλων των προορισμών'),
  post('destinations-upload', 'Destinations', 'Upload Destinations', '/destinations', 'Upload προορισμών', {
    map_id: 1,
    destinations: [{ name: 'Test Destination', type: 'exhibit', coordinates: { lat: 40.7610, lng: -73.9780 } }],
  }, 'admin'),
  get('destinations-get', 'Destinations', 'Get Destination Info', '/destinations/1', 'Πληροφορίες προορισμού'),
  del('destinations-delete', 'Destinations', 'Delete Destination (Admin)', '/destinations/999', 'Διαγραφή προορισμού (admin only)', 'admin', 'destinations-upload'),
];

export const COORDINATE_ENDPOINTS = [
  // Coordinates: read and update user location data
  get('coordinates-get', 'Coordinates', 'Get User Coordinates', '/coordinates/1', 'Τοποθεσία χρήστη', 'user'),
  put('coordinates-update', 'Coordinates', 'Update Coordinates', '/coordinates/1', 'Ενημέρωση τοποθεσίας', 
    { lat: 40.7612, lng: -73.9778 }, 'user'),
];

export const SYSTEM_ENDPOINTS = [
  // System endpoints: notifications and sync operations
  post('notifications-send', 'Notifications', 'Send Notification', '/notifications', 
    'Αποστολή ειδοποίησης (Uses route_id 2 - backup route for testing)', 
    { user_id: 1, route_id: 2, currentLat: 40.7610, currentLng: -73.9780 }, 'user'),
  post('sync-data', 'Sync', 'Sync Offline Data', '/sync', 'Συγχρονισμός offline δεδομένων', 
    [{ type: 'rating', exhibit_id: 1, rating: 5, timestamp: new Date().toISOString() }], 'user'),
];

export const ALL_ENDPOINTS = [
  // Aggregate: flatten all endpoint groups into a single list for iteration
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