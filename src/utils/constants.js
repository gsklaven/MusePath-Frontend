/**
 * Application Constants
 *
 * Centralized configuration values and enumerations for the MusePath application.
 * These values are immutable and organized by domain.
 *
 * @module utils/constants
 */

// Helper to enforce immutability
const freeze = Object.freeze;

// ==========================================
// API Configuration
// ==========================================

/**
 * Base URL for backend API endpoints
 * Falls back to localhost if environment variable not set
 * @type {string}
 */
export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://api.server.test/v1';

// ==========================================
// Navigation & Movement
// ==========================================

/**
 * Default walking speed for route calculations
 * @type {number} Speed in kilometers per hour
 */
export const DEFAULT_WALKING_SPEED = 5;

// ==========================================
// Map Configuration
// ==========================================

// Map default values
const MAP_ID = 1;
const MAP_ZOOM = 1;
const MAP_ROTATION = 0;

/**
 * Default map settings object
 * @type {Object.<string, number>}
 */
export const MAP_DEFAULTS = freeze({
  ID: MAP_ID,
  ZOOM: MAP_ZOOM,
  ROTATION: MAP_ROTATION,
});

// Export individual constants for legacy support/convenience
export const DEFAULT_MAP_ID = MAP_ID;
export const DEFAULT_ZOOM = MAP_ZOOM;
export const DEFAULT_ROTATION = MAP_ROTATION;

// ==========================================
// Exhibit Categories
// ==========================================

/**
 * Available exhibit categories for filtering and classification
 * @type {string[]}
 */
export const EXHIBIT_CATEGORIES = freeze([
  'Art',
  'History',
  'Science',
  'Culture',
  'Modern Art',
  'Ancient Greece',
  'Sculpture',
  'Painting',
]);

// ==========================================
// User Preference Options
// ==========================================

/**
 * Historical periods available in questionnaire
 * Used for personalizing exhibit recommendations
 * @type {string[]}
 */
export const HISTORICAL_PERIODS = freeze([
  'Ancient Civilizations',
  'Medieval Period',
  'Renaissance',
  'Modern Era',
  'Contemporary',
]);

/**
 * Artists and civilizations for preference selection
 * Used in multi-select questionnaire step
 * @type {string[]}
 */
export const ARTISTS_CIVILIZATIONS = freeze([
  'Ancient Greece',
  'Ancient Rome',
  'Ancient Egypt',
  'Renaissance Masters',
  'Impressionists',
  'Modern Artists',
]);

// ==========================================
// Local Storage Keys
// ==========================================

/**
 * LocalStorage key identifiers
 * Centralized to prevent typos and enable easy refactoring
 * @type {Object.<string, string>}
 */
export const STORAGE_KEYS = freeze({
  /** User authentication and profile data */
  USER: 'user',
  /** Downloaded maps for offline use */
  OFFLINE_MAPS: 'offline_maps',
  /** Downloaded exhibits for offline use */
  OFFLINE_EXHIBITS: 'offline_exhibits',
  /** Pending synchronization queue */
  PENDING_SYNC: 'pending_sync',
});

// ==========================================
// Route Status Values
// ==========================================

/**
 * Possible states for route lifecycle
 * @type {Object.<string, string>}
 */
export const ROUTE_STATUS = freeze({
  /** Route being planned, not yet active */
  PLANNING: 'planning',
  /** Currently navigating this route */
  ACTIVE: 'active',
  /** Route finished successfully */
  COMPLETED: 'completed',
  /** Route cancelled by user */
  CANCELLED: 'cancelled',
});

// ==========================================
// Exhibit Status Values
// ==========================================

/**
 * Exhibit availability states
 * Determines if exhibit can be visited
 * @type {Object.<string, string>}
 */
export const EXHIBIT_STATUS = freeze({
  /** Exhibit open and available */
  OPEN: 'open',
  /** Exhibit closed to visitors */
  CLOSED: 'closed',
  /** Exhibit temporarily unavailable */
  UNDER_MAINTENANCE: 'under_maintenance',
});

// ==========================================
// Crowd Level Indicators
// ==========================================

/**
 * Crowd density levels for exhibits and areas
 * Used for visitor flow management
 * @type {Object.<string, string>}
 */
export const CROWD_LEVELS = freeze({
  /** Few visitors, minimal wait times */
  LOW: 'low',
  /** Moderate visitors, some wait times */
  MEDIUM: 'medium',
  /** Many visitors, expect delays */
  HIGH: 'high',
});

// ==========================================
// Notification Types
// ==========================================

/**
 * Notification message types for UI feedback
 * Determines styling and icon
 * @type {Object.<string, string>}
 */
export const NOTIFICATION_TYPES = freeze({
  /** Informational message */
  INFO: 'info',
  /** Warning or caution */
  WARNING: 'warning',
  /** Error or failure */
  ERROR: 'error',
  /** Success confirmation */
  SUCCESS: 'success',
});

// ==========================================
// Validation Constants
// ==========================================

// Validation limits
const PASS_MIN_LEN = 6;
const RATING_MIN = 1;
const RATING_MAX = 5;

/**
 * Validation limits object
 * @type {Object.<string, number>}
 */
export const VALIDATION = freeze({
  MIN_PASSWORD_LENGTH: PASS_MIN_LEN,
  MIN_RATING: RATING_MIN,
  MAX_RATING: RATING_MAX,
});

// Export individual validation constants
export const MIN_PASSWORD_LENGTH = PASS_MIN_LEN;
export const MIN_RATING = RATING_MIN;
export const MAX_RATING = RATING_MAX;

// ==========================================
// Timing Constants
// ==========================================

// Timing intervals (ms)
const DELAY_API = 1000;
const INTERVAL_LOC = 5000;

/**
 * Timing intervals object
 * @type {Object.<string, number>}
 */
export const TIMING = freeze({
  API_REQUEST_DELAY: DELAY_API,
  LOCATION_UPDATE_INTERVAL: INTERVAL_LOC,
});

// Export individual timing constants
export const API_REQUEST_DELAY = DELAY_API;
export const LOCATION_UPDATE_INTERVAL = INTERVAL_LOC;
