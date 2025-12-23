/**
 * Application Constants
 * @module utils/constants
 */

// ==========================================
// API Configuration
// ==========================================

export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://api.server.test/v1';

// ==========================================
// Map Configuration
// ==========================================

/**
 * Default map settings
 * @type {Object.<string, number>}
 */
export const MAP_DEFAULTS = {
  ID: 1,
  ZOOM: 1,
  ROTATION: 0,
};

export const DEFAULT_MAP_ID = MAP_DEFAULTS.ID;
export const DEFAULT_ZOOM = MAP_DEFAULTS.ZOOM;
export const DEFAULT_ROTATION = MAP_DEFAULTS.ROTATION;

// ==========================================
// Exhibit Categories
// ==========================================

/**
 * Available exhibit categories for filtering and classification
 * @type {string[]}
 */
export const EXHIBIT_CATEGORIES = [
  'Art', 'History', 'Science', 'Culture',
  'Modern Art', 'Ancient Greece', 'Sculpture', 'Painting',
];

// ==========================================
// User Preference Options
// ==========================================

/**
 * Historical periods available in questionnaire
 * Used for personalizing exhibit recommendations
 * @type {string[]}
 */
export const HISTORICAL_PERIODS = [
  'Ancient Civilizations', 'Medieval Period', 'Renaissance',
  'Modern Era', 'Contemporary',
];

/**
 * Artists and civilizations for preference selection
 * Used in multi-select questionnaire step
 * @type {string[]}
 */
export const ARTISTS_CIVILIZATIONS = [
  'Ancient Greece', 'Ancient Rome', 'Ancient Egypt',
  'Renaissance Masters', 'Impressionists', 'Modern Artists',
];

// ==========================================
// Local Storage Keys
// ==========================================

/**
 * Keys used for localStorage persistence
 * Centralized to prevent typos and enable easy refactoring
 * @type {Object.<string, string>}
 */
export const STORAGE_KEYS = {
  /** User authentication and profile data */
  USER: 'user',
  /** Downloaded maps for offline use */
  OFFLINE_MAPS: 'offline_maps',
  /** Downloaded exhibits for offline use */
  OFFLINE_EXHIBITS: 'offline_exhibits',
  /** Pending synchronization queue */
  PENDING_SYNC: 'pending_sync',
};

// ==========================================
// Route Status Values
// ==========================================

/**
 * Possible states for route lifecycle
 * @type {Object.<string, string>}
 */
export const ROUTE_STATUS = {
  /** Route being planned, not yet active */
  PLANNING: 'planning',
  /** Currently navigating this route */
  ACTIVE: 'active',
  /** Route finished successfully */
  COMPLETED: 'completed',
  /** Route cancelled by user */
  CANCELLED: 'cancelled',
};

// ==========================================
// Exhibit Status Values
// ==========================================

/**
 * Exhibit availability states
 * Determines if exhibit can be visited
 * @type {Object.<string, string>}
 */
export const EXHIBIT_STATUS = {
  /** Exhibit open and available */
  OPEN: 'open',
  /** Exhibit closed to visitors */
  CLOSED: 'closed',
  /** Exhibit temporarily unavailable */
  UNDER_MAINTENANCE: 'under_maintenance',
};

// ==========================================
// Crowd Level Indicators
// ==========================================

/**
 * Crowd density levels for exhibits and areas
 * Used for visitor flow management
 * @type {Object.<string, string>}
 */
export const CROWD_LEVELS = {
  /** Few visitors, minimal wait times */
  LOW: 'low',
  /** Moderate visitors, some wait times */
  MEDIUM: 'medium',
  /** Many visitors, expect delays */
  HIGH: 'high',
};

// ==========================================
// Notification Types
// ==========================================

/**
 * Notification message types for UI feedback
 * Determines styling and icon
 * @type {Object.<string, string>}
 */
export const NOTIFICATION_TYPES = {
  /** Informational message */
  INFO: 'info',
  /** Warning or caution */
  WARNING: 'warning',
  /** Error or failure */
  ERROR: 'error',
  /** Success confirmation */
  SUCCESS: 'success',
};

// ==========================================
// Validation Constants
// ==========================================

/**
 * Validation limits
 * @type {Object.<string, number>}
 */
export const VALIDATION = {
  MIN_PASSWORD_LENGTH: 6,
  MIN_RATING: 1,
  MAX_RATING: 5,
};

export const MIN_PASSWORD_LENGTH = VALIDATION.MIN_PASSWORD_LENGTH;
export const MIN_RATING = VALIDATION.MIN_RATING;
export const MAX_RATING = VALIDATION.MAX_RATING;

// ==========================================
// Timing Constants
// ==========================================

/**
 * Timing intervals in milliseconds
 * @type {Object.<string, number>}
 */
export const TIMING = {
  API_REQUEST_DELAY: 1000,
  LOCATION_UPDATE_INTERVAL: 5000,
};

export const API_REQUEST_DELAY = TIMING.API_REQUEST_DELAY;
export const LOCATION_UPDATE_INTERVAL = TIMING.LOCATION_UPDATE_INTERVAL;