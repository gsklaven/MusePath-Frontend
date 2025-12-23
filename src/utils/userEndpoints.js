/**
 * User API Endpoints
 * Handles authentication, routes, user preferences, and coordinates
 */
import { GET, POST, PUT, DELETE, generateTestUser } from './endpointBuilders';

// Categories
const C = {
  AUTH: 'Authentication',
  ROUTES: 'Routes',
  USERS: 'Users',
  COORDS: 'Coordinates',
};

// ==========================================
// Authentication Endpoints
// ==========================================

export const AUTH_ENDPOINTS = [
  POST('auth-register', C.AUTH, 'Register User', '/auth/register', 
    'Δημιουργία νέου λογαριασμού', generateTestUser),
  POST('auth-login', C.AUTH, 'Login', '/auth/login', 
    'Σύνδεση χρήστη', { username: 'john_smith', password: 'Password123!' }),
  POST('auth-logout', C.AUTH, 'Logout', '/auth/logout', 
    'Αποσύνδεση χρήστη', null, 'user'),
];

// ==========================================
// Route Management Endpoints
// ==========================================

export const ROUTE_ENDPOINTS = [
  POST('routes-create', C.ROUTES, 'Calculate Route', '/routes', 
    'Υπολογισμός διαδρομής', {
      user_id: 1, destination_id: 2, startLat: 40.7610, startLng: -73.9780
    }, 'user'),
  GET('routes-get', C.ROUTES, 'Get Route Details', '/routes/1', 
    'Λεπτομέρειες διαδρομής', 'user', 'routes-create'),
  PUT('routes-update', C.ROUTES, 'Update Route Stops', '/routes/1', 
    'Ενημέρωση στάσεων διαδρομής', { addStops: [3, 4], removeStops: [] }, 
    'user', 'routes-create'),
  POST('routes-recalculate', C.ROUTES, 'Recalculate Route', '/routes/1', 
    'Επαναυπολογισμός διαδρομής', null, 'user', 'routes-create'),
  DELETE('routes-delete', C.ROUTES, 'Delete Route', '/routes/1', 
    'Διαγραφή διαδρομής', 'user', 'routes-create'),
];

// ==========================================
// User Preferences & Favorites
// ==========================================

export const USER_ENDPOINTS = [
  PUT('users-preferences', C.USERS, 'Update Preferences', '/users/1/preferences', 
    'Ενημέρωση προτιμήσεων χρήστη', 
    { interests: ['modern art', 'sculpture', 'impressionism'] }, 'user'),
  POST('users-favourites-add', C.USERS, 'Add to Favourites', '/users/1/favourites', 
    'Προσθήκη στα αγαπημένα', { exhibit_id: 2 }, 'user'),
  DELETE('users-favourites-remove', C.USERS, 'Remove from Favourites', 
    '/users/1/favourites/2', 'Αφαίρεση από αγαπημένα', 'user'),
  GET('users-personalized-route', C.USERS, 'Get Personalized Route', 
    '/users/1/routes', 'Εξατομικευμένη διαδρομή', 'user'),
];

// ==========================================
// Location Tracking
// ==========================================

export const COORDINATE_ENDPOINTS = [
  GET('coordinates-get', C.COORDS, 'Get User Coordinates', '/coordinates/1', 
    'Τοποθεσία χρήστη', 'user'),
  PUT('coordinates-update', C.COORDS, 'Update Coordinates', '/coordinates/1', 
    'Ενημέρωση τοποθεσίας', { lat: 40.7612, lng: -73.9778 }, 'user'),
];