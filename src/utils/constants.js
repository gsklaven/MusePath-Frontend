/**
 * Application Constants
 * Central configuration for the museum navigation app
 * @module utils/constants
 */

// API endpoint base URL from environment or default test server
export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://api.server.test/v1';

// Default map configuration: initial map ID, zoom level, and rotation angle
export const MAP_DEFAULTS = { ID: 1, ZOOM: 1, ROTATION: 0 };

// Categories available for exhibit classification and filtering
export const EXHIBIT_CATEGORIES = [
  'Art', 'History', 'Science', 'Culture',
  'Modern Art', 'Ancient Greece', 'Sculpture', 'Painting',
];

// Historical period options for user preference questionnaire
export const HISTORICAL_PERIODS = [
  'Ancient Civilizations', 'Medieval Period', 'Renaissance',
  'Modern Era', 'Contemporary',
];

// Artist and civilization options for preference selection
export const ARTISTS_CIVILIZATIONS = [
  'Ancient Greece', 'Ancient Rome', 'Ancient Egypt',
  'Renaissance Masters', 'Impressionists', 'Modern Artists',
];

// LocalStorage keys for persisting user data and offline content
export const STORAGE_KEYS = {
  USER: 'user',                      // User profile and auth token
  OFFLINE_MAPS: 'offline_maps',      // Cached map images
  OFFLINE_EXHIBITS: 'offline_exhibits', // Cached exhibit data
  PENDING_SYNC: 'pending_sync',      // Queue for sync when online
};

// Route lifecycle states from planning through completion
export const ROUTE_STATUS = {
  PLANNING: 'planning',    // Being created, not started
  ACTIVE: 'active',        // Currently navigating
  COMPLETED: 'completed',  // Successfully finished
  CANCELLED: 'cancelled',  // Abandoned by user
};

// Exhibit availability states determining visitor access
export const EXHIBIT_STATUS = {
  OPEN: 'open',                          // Available for viewing
  CLOSED: 'closed',                      // Not accessible
  UNDER_MAINTENANCE: 'under_maintenance', // Temporarily unavailable
};

// Crowd density levels for visitor flow management
export const CROWD_LEVELS = { 
  LOW: 'low',       // Minimal wait times
  MEDIUM: 'medium', // Moderate crowds
  HIGH: 'high',     // Heavy congestion
};

// Notification types for UI feedback messages
export const NOTIFICATION_TYPES = {
  INFO: 'info',        // Informational
  WARNING: 'warning',  // Caution needed
  ERROR: 'error',      // Failure state
  SUCCESS: 'success',  // Successful operation
};

// Input validation rules and constraints
export const VALIDATION = { 
  MIN_PASSWORD_LENGTH: 6,  // Minimum chars for security
  MIN_RATING: 1,           // Lowest star rating
  MAX_RATING: 5,           // Highest star rating
};

// Timing intervals in milliseconds for polling and delays
export const TIMING = { 
  API_REQUEST_DELAY: 1000,         // Search input debounce
  LOCATION_UPDATE_INTERVAL: 5000,  // GPS polling rate
};