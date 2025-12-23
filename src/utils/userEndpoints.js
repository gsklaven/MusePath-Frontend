/**
 * User Profile API Endpoints
 * Handles user preferences, favorites, and personalized data.
 * @module api/userEndpoints
 */
import { GET, POST, PUT, DELETE } from './endpointBuilders';

const CATEGORY = 'Users';

const SAMPLE_PREFERENCES = { interests: ['modern art', 'sculpture', 'impressionism'] };
const SAMPLE_FAVORITE = { exhibit_id: 2 };

/**
 * User profile endpoints for preferences and favorites
 * Manages user interests, favorite exhibits, and personalized recommendations
 */
export const USER_ENDPOINTS = [
  // Update user interest preferences for recommendations
  PUT('users-preferences', CATEGORY, 'Update Preferences', 
    '/users/1/preferences', 'Ενημέρωση προτιμήσεων χρήστη', 
    SAMPLE_PREFERENCES, 'user'),
  
  // Add exhibit to favorites list
  POST('users-favourites-add', CATEGORY, 'Add to Favourites', 
    '/users/1/favourites', 'Προσθήκη στα αγαπημένα', 
    SAMPLE_FAVORITE, 'user'),
  
  // Remove exhibit from favorites
  DELETE('users-favourites-remove', CATEGORY, 'Remove from Favourites', 
    '/users/1/favourites/2', 'Αφαίρεση από αγαπημένα', 'user'),
  
  // Get AI-generated personalized route
  GET('users-personalized-route', CATEGORY, 'Get Personalized Route', 
    '/users/1/routes', 'Εξατομικευμένη διαδρομή', 'user'),
];