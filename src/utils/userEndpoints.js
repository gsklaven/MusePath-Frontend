/**
 * User API Endpoints
 * 
 * This module defines all user-related API endpoints including:
 * - Authentication (register, login, logout)
 * - Route management (create, update, navigate)
 * - User preferences and favorites
 * - Location tracking
 * 
 * Each endpoint is constructed using builder functions that handle
 * HTTP method, authentication requirements, and test data generation.
 * 
 * @module api/userEndpoints
 */

import { GET, POST, PUT, DELETE, generateTestUser } from './endpointBuilders';

/**
 * Category names for endpoint organization.
 * Shortened to reduce repetition while maintaining clarity.
 * A: Authentication operations
 * R: Route planning and navigation
 * U: User profile and preferences
 * L: Location/coordinate tracking
 */
const C = { 
  A: 'Authentication', 
  R: 'Routes', 
  U: 'Users', 
  L: 'Coordinates' 
};

// ==========================================
// Authentication Endpoints
// ==========================================

/**
 * Authentication-related endpoints.
 * Handles user account creation, login sessions, and logout.
 * Register endpoint generates test users automatically.
 * Login requires username and password credentials.
 * Logout invalidates the current session token.
 * @type {Array}
 */
export const AUTH_ENDPOINTS = [
  // Creates new user account with email verification
  POST('auth-register', C.A, 'Register User', '/auth/register', 
    'Δημιουργία νέου λογαριασμού', generateTestUser),
  
  // Authenticates user and returns session token
  POST('auth-login', C.A, 'Login', '/auth/login', 'Σύνδεση χρήστη', 
    { username: 'john_smith', password: 'Password123!' }),
  
  // Ends current session and invalidates token
  POST('auth-logout', C.A, 'Logout', '/auth/logout', 'Αποσύνδεση χρήστη', null, 'user'),
];

// ==========================================
// Route Management Endpoints
// ==========================================

/**
 * Route planning and navigation endpoints.
 * Supports creating custom routes, viewing details, modifying stops,
 * recalculating paths, and deleting routes.
 * All operations require user authentication.
 * Routes are optimized based on current crowd levels and exhibit status.
 * @type {Array}
 */
export const ROUTE_ENDPOINTS = [
  // Calculates optimal path between exhibits using A* algorithm
  POST('routes-create', C.R, 'Calculate Route', '/routes', 'Υπολογισμός διαδρομής', 
    { user_id: 1, destination_id: 2, startLat: 40.7610, startLng: -73.9780 }, 'user'),
  
  // Retrieves full route details including waypoints and estimated time
  GET('routes-get', C.R, 'Get Route Details', '/routes/1', 
    'Λεπτομέρειες διαδρομής', 'user', 'routes-create'),
  
  // Adds or removes stops while maintaining optimal path
  PUT('routes-update', C.R, 'Update Route Stops', '/routes/1', 
    'Ενημέρωση στάσεων διαδρομής', { addStops: [3, 4], removeStops: [] }, 'user', 'routes-create'),
  
  // Recalculates route based on current conditions (crowds, closures)
  POST('routes-recalculate', C.R, 'Recalculate Route', '/routes/1', 
    'Επαναυπολογισμός διαδρομής', null, 'user', 'routes-create'),
  
  // Permanently removes route from user's history
  DELETE('routes-delete', C.R, 'Delete Route', '/routes/1', 
    'Διαγραφή διαδρομής', 'user', 'routes-create'),
];

// ==========================================
// User Profile & Preferences
// ==========================================

/**
 * User profile management endpoints.
 * Handles preferences, favorites list, and personalized recommendations.
 * Preferences affect route suggestions and exhibit filtering.
 * Favorites enable quick access to preferred exhibits.
 * Personalized routes use ML to match user interests.
 * @type {Array}
 */
export const USER_ENDPOINTS = [
  // Updates user interests for better recommendations
  PUT('users-preferences', C.U, 'Update Preferences', '/users/1/preferences', 
    'Ενημέρωση προτιμήσεων χρήστη', 
    { interests: ['modern art', 'sculpture', 'impressionism'] }, 'user'),
  
  // Adds exhibit to user's favorites collection
  POST('users-favourites-add', C.U, 'Add to Favourites', '/users/1/favourites', 
    'Προσθήκη στα αγαπημένα', { exhibit_id: 2 }, 'user'),
  
  // Removes exhibit from favorites list
  DELETE('users-favourites-remove', C.U, 'Remove from Favourites', '/users/1/favourites/2', 
    'Αφαίρεση από αγαπημένα', 'user'),
  
  // Generates AI-powered route based on user history and preferences
  GET('users-personalized-route', C.U, 'Get Personalized Route', '/users/1/routes', 
    'Εξατομικευμένη διαδρομή', 'user'),
];

// ==========================================
// Location Tracking
// ==========================================

/**
 * Coordinate tracking endpoints.
 * Monitors user location for navigation assistance and analytics.
 * Updates every 5 seconds during active navigation.
 * Used for providing turn-by-turn directions.
 * Location data is anonymized for privacy.
 * @type {Array}
 */
export const COORDINATE_ENDPOINTS = [
  // Retrieves user's current GPS coordinates
  GET('coordinates-get', C.L, 'Get User Coordinates', '/coordinates/1', 
    'Τοποθεσία χρήστη', 'user'),
  
  // Updates location during navigation for real-time guidance
  PUT('coordinates-update', C.L, 'Update Coordinates', '/coordinates/1', 
    'Ενημέρωση τοποθεσίας', { lat: 40.7612, lng: -73.9778 }, 'user'),
];