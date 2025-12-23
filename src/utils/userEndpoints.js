/**
 * User API Endpoints
 * Handles authentication, routes, preferences, and location tracking
 * @module api/userEndpoints
 */
import { GET, POST, PUT, DELETE, generateTestUser } from './endpointBuilders';

// Category labels for endpoint grouping
const CAT = { 
  AUTH: 'Authentication',  // User login and registration
  ROUTE: 'Routes',         // Navigation and path planning
  USER: 'Users',           // Preferences and favorites
  LOC: 'Coordinates',      // GPS location tracking
};

/**
 * Authentication endpoints for user account management
 * Includes registration, login session, and logout operations
 */
export const AUTH_ENDPOINTS = [
  // Register new user account with generated test data
  POST('auth-register', CAT.AUTH, 'Register User', '/auth/register', 
    'Δημιουργία νέου λογαριασμού', generateTestUser),
  
  // Login with username and password to get session token
  POST('auth-login', CAT.AUTH, 'Login', '/auth/login', 'Σύνδεση χρήστη', 
    { username: 'john_smith', password: 'Password123!' }),
  
  // Logout and invalidate current session
  POST('auth-logout', CAT.AUTH, 'Logout', '/auth/logout', 
    'Αποσύνδεση χρήστη', null, 'user'),
];

/**
 * Route management endpoints for navigation
 * Supports creating, viewing, updating, and deleting navigation routes
 * All operations require user authentication
 */
export const ROUTE_ENDPOINTS = [
  // Calculate optimal route between exhibits
  POST('routes-create', CAT.ROUTE, 'Calculate Route', '/routes', 
    'Υπολογισμός διαδρομής', {
      user_id: 1, destination_id: 2, startLat: 40.7610, startLng: -73.9780
    }, 'user'),
  
  // Get full route details with waypoints
  GET('routes-get', CAT.ROUTE, 'Get Route Details', '/routes/1', 
    'Λεπτομέρειες διαδρομής', 'user', 'routes-create'),
  
  // Add or remove stops from existing route
  PUT('routes-update', CAT.ROUTE, 'Update Route Stops', '/routes/1', 
    'Ενημέρωση στάσεων διαδρομής', 
    { addStops: [3, 4], removeStops: [] }, 'user', 'routes-create'),
  
  // Recalculate route based on current conditions
  POST('routes-recalculate', CAT.ROUTE, 'Recalculate Route', '/routes/1', 
    'Επαναυπολογισμός διαδρομής', null, 'user', 'routes-create'),
  
  // Delete route from user history
  DELETE('routes-delete', CAT.ROUTE, 'Delete Route', '/routes/1', 
    'Διαγραφή διαδρομής', 'user', 'routes-create'),
];

/**
 * User profile endpoints for preferences and favorites
 * Manages user interests, favorite exhibits, and personalized recommendations
 */
export const USER_ENDPOINTS = [
  // Update user interest preferences for recommendations
  PUT('users-preferences', CAT.USER, 'Update Preferences', 
    '/users/1/preferences', 'Ενημέρωση προτιμήσεων χρήστη', 
    { interests: ['modern art', 'sculpture', 'impressionism'] }, 'user'),
  
  // Add exhibit to favorites list
  POST('users-favourites-add', CAT.USER, 'Add to Favourites', 
    '/users/1/favourites', 'Προσθήκη στα αγαπημένα', 
    { exhibit_id: 2 }, 'user'),
  
  // Remove exhibit from favorites
  DELETE('users-favourites-remove', CAT.USER, 'Remove from Favourites', 
    '/users/1/favourites/2', 'Αφαίρεση από αγαπημένα', 'user'),
  
  // Get AI-generated personalized route
  GET('users-personalized-route', CAT.USER, 'Get Personalized Route', 
    '/users/1/routes', 'Εξατομικευμένη διαδρομή', 'user'),
];

/**
 * Location tracking endpoints for navigation assistance
 * Monitors user position for turn-by-turn directions
 */
export const COORDINATE_ENDPOINTS = [
  // Get current user GPS coordinates
  GET('coordinates-get', CAT.LOC, 'Get User Coordinates', 
    '/coordinates/1', 'Τοποθεσία χρήστη', 'user'),
  
  // Update location during navigation
  PUT('coordinates-update', CAT.LOC, 'Update Coordinates', 
    '/coordinates/1', 'Ενημέρωση τοποθεσίας', 
    { lat: 40.7612, lng: -73.9778 }, 'user'),
];