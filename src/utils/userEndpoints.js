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

// Category constants to reduce vocabulary size
const CAT_AUTH = 'Authentication';
const CAT_ROUTES = 'Routes';
const CAT_USERS = 'Users';
const CAT_COORDS = 'Coordinates';

// Authentication
const authRegister = POST(
  'auth-register',
  CAT_AUTH,
  'Register User',
  '/auth/register',
  'Δημιουργία νέου λογαριασμού',
  generateTestUser
);

const authLogin = POST(
  'auth-login',
  CAT_AUTH,
  'Login',
  '/auth/login',
  'Σύνδεση χρήστη',
  { username: 'john_smith', password: 'Password123!' }
);

const authLogout = POST(
  'auth-logout',
  CAT_AUTH,
  'Logout',
  '/auth/logout',
  'Αποσύνδεση χρήστη',
  null,
  'user'
);

/**
 * Authentication endpoints for user registration, login, and logout
 */
export const AUTH_ENDPOINTS = [
  authRegister,
  authLogin,
  authLogout,
  POST(
    'auth-register',
    CAT_AUTH,
    'Register User',
    '/auth/register',
    'Δημιουργία νέου λογαριασμού',
    generateTestUser
  ),
  POST(
    'auth-login',
    CAT_AUTH,
    'Login',
    '/auth/login',
    'Σύνδεση χρήστη',
    { username: 'john_smith', password: 'Password123!' }
  ),
  POST(
    'auth-logout',
    CAT_AUTH,
    'Logout',
    '/auth/logout',
    'Αποσύνδεση χρήστη',
    null,
    'user'
  ),
];

// Routes
const routesCreate = POST(
  'routes-create',
  CAT_ROUTES,
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
);

const routesGet = GET(
  'routes-get',
  CAT_ROUTES,
  'Get Route Details',
  '/routes/1',
  'Λεπτομέρειες διαδρομής',
  'user',
  'routes-create'
);

const routesUpdate = PUT(
  'routes-update',
  CAT_ROUTES,
  'Update Route Stops',
  '/routes/1',
  'Ενημέρωση στάσεων διαδρομής',
  { addStops: [3, 4], removeStops: [] },
  'user',
  'routes-create'
);

const routesRecalculate = POST(
  'routes-recalculate',
  CAT_ROUTES,
  'Recalculate Route',
  '/routes/1',
  'Επαναυπολογισμός διαδρομής',
  null,
  'user',
  'routes-create'
);

const routesDelete = DELETE(
  'routes-delete',
  CAT_ROUTES,
  'Delete Route',
  '/routes/1',
  'Διαγραφή διαδρομής',
  'user',
  'routes-create'
);

/**
 * Route endpoints for creating and managing navigation routes
 */
export const ROUTE_ENDPOINTS = [
  routesCreate,
  routesGet,
  routesUpdate,
  routesRecalculate,
  routesDelete,
  POST(
    'routes-create',
    CAT_ROUTES,
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
    CAT_ROUTES,
    'Get Route Details',
    '/routes/1',
    'Λεπτομέρειες διαδρομής',
    'user',
    'routes-create'
  ),
  PUT(
    'routes-update',
    CAT_ROUTES,
    'Update Route Stops',
    '/routes/1',
    'Ενημέρωση στάσεων διαδρομής',
    { addStops: [3, 4], removeStops: [] },
    'user',
    'routes-create'
  ),
  POST(
    'routes-recalculate',
    CAT_ROUTES,
    'Recalculate Route',
    '/routes/1',
    'Επαναυπολογισμός διαδρομής',
    null,
    'user',
    'routes-create'
  ),
  DELETE(
    'routes-delete',
    CAT_ROUTES,
    'Delete Route',
    '/routes/1',
    'Διαγραφή διαδρομής',
    'user',
    'routes-create'
  ),
];

// Users
const usersPreferences = PUT(
  'users-preferences',
  CAT_USERS,
  'Update Preferences',
  '/users/1/preferences',
  'Ενημέρωση προτιμήσεων χρήστη',
  { interests: ['modern art', 'sculpture', 'impressionism'] },
  'user'
);

const usersFavouritesAdd = POST(
  'users-favourites-add',
  CAT_USERS,
  'Add to Favourites',
  '/users/1/favourites',
  'Προσθήκη στα αγαπημένα',
  { exhibit_id: 2 },
  'user'
);

const usersFavouritesRemove = DELETE(
  'users-favourites-remove',
  CAT_USERS,
  'Remove from Favourites',
  '/users/1/favourites/2',
  'Αφαίρεση από αγαπημένα',
  'user'
);

const usersPersonalizedRoute = GET(
  'users-personalized-route',
  CAT_USERS,
  'Get Personalized Route',
  '/users/1/routes',
  'Εξατομικευμένη διαδρομή',
  'user'
);

/**
 * User endpoints for managing preferences and favorites
 */
export const USER_ENDPOINTS = [
  usersPreferences,
  usersFavouritesAdd,
  usersFavouritesRemove,
  usersPersonalizedRoute,
  PUT(
    'users-preferences',
    CAT_USERS,
    'Update Preferences',
    '/users/1/preferences',
    'Ενημέρωση προτιμήσεων χρήστη',
    { interests: ['modern art', 'sculpture', 'impressionism'] },
    'user'
  ),
  POST(
    'users-favourites-add',
    CAT_USERS,
    'Add to Favourites',
    '/users/1/favourites',
    'Προσθήκη στα αγαπημένα',
    { exhibit_id: 2 },
    'user'
  ),
  DELETE(
    'users-favourites-remove',
    CAT_USERS,
    'Remove from Favourites',
    '/users/1/favourites/2',
    'Αφαίρεση από αγαπημένα',
    'user'
  ),
  GET(
    'users-personalized-route',
    CAT_USERS,
    'Get Personalized Route',
    '/users/1/routes',
    'Εξατομικευμένη διαδρομή',
    'user'
  ),
];

// Coordinates
const coordinatesGet = GET(
  'coordinates-get',
  CAT_COORDS,
  'Get User Coordinates',
  '/coordinates/1',
  'Τοποθεσία χρήστη',
  'user'
);

const coordinatesUpdate = PUT(
  'coordinates-update',
  CAT_COORDS,
  'Update Coordinates',
  '/coordinates/1',
  'Ενημέρωση τοποθεσίας',
  { lat: 40.7612, lng: -73.9778 },
  'user'
);

/**
 * Coordinate endpoints for tracking user location
 */
export const COORDINATE_ENDPOINTS = [
  coordinatesGet,
  coordinatesUpdate,
  GET(
    'coordinates-get',
    CAT_COORDS,
    'Get User Coordinates',
    '/coordinates/1',
    'Τοποθεσία χρήστη',
    'user'
  ),
  PUT(
    'coordinates-update',
    CAT_COORDS,
    'Update Coordinates',
    '/coordinates/1',
    'Ενημέρωση τοποθεσίας',
    { lat: 40.7612, lng: -73.9778 },
    'user'
  ),
];