/**
 * Exhibit API Endpoints
 * Handles exhibit content, search, details, and ratings.
 * @module utils/exhibitEndpoints
 */
import { GET, POST, DELETE, generateTestExhibit } from './endpointBuilders';

const CATEGORY = 'Exhibits';

const SAMPLE_RATING = { rating: 5 };

/**
 * Exhibit content endpoints.
 * Provides search, details, audio guides, ratings, and admin operations.
 */
export const EXHIBIT_ENDPOINTS = [
  // Search exhibits with full-text query
  GET('exhibits-search', CATEGORY, 'Search Exhibits', 
    '/exhibits/search?exhibit_term=starry&mode=online', 
    'Αναζήτηση εκθεμάτων'),
  
  // Get complete exhibit metadata by ID
  GET('exhibits-get', CATEGORY, 'Get Exhibit by ID', '/exhibits/1', 
    'Λεπτομέρειες συγκεκριμένου εκθέματος'),
  
  // Fetch audio guide narration file
  GET('exhibits-audio', CATEGORY, 'Get Audio Guide', '/exhibits/1/audio', 
    'Audio guide εκθέματος'),
  
  // Submit user rating (1-5 stars)
  POST('exhibits-rate', CATEGORY, 'Rate Exhibit', '/exhibits/1/ratings', 
    'Αξιολόγηση εκθέματος', SAMPLE_RATING, 'user'),
  
  // Download for offline viewing
  GET('exhibits-download', CATEGORY, 'Download Exhibit', 
    '/downloads/exhibits/1', 'Download για offline χρήση'),
  
  // Admin: Create new exhibit entry
  POST('exhibits-create', CATEGORY, 'Create Exhibit (Admin)', '/exhibits', 
    'Δημιουργία νέου εκθέματος (admin only)', generateTestExhibit, 'admin'),
  
  // Admin: Delete exhibit permanently
  DELETE('exhibits-delete', CATEGORY, 'Delete Exhibit (Admin)', 
    '/exhibits/999', 'Διαγραφή εκθέματος (admin only)', 'admin', 'exhibits-create'),
];