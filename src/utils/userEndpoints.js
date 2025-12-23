/**
 * User API Endpoints
 * 
 * Definitions for endpoints related to user accounts, authentication, and personal data.
 */
import {
  GET,
  POST,
  PUT,
  DELETE,
  generateTestUser
} from './endpointBuilders';

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