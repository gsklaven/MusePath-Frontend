/**
 * Application Constants
 *
 * Centralized configuration values used throughout the MusePath application.
 * Organized by functional domain for better maintainability and discoverability.
 *
 * Usage Guidelines:
 * - Import only needed constants: import { DEFAULT_ZOOM, EXHIBIT_STATUS } from './constants'
 * - Never modify constants at runtime - treat as immutable
 * - Add new constants to appropriate section with JSDoc comments
 *
 * @module utils/constants
 * @description Provides immutable configuration and enumeration values for the MusePath frontend.
 */

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

/**
 * Default map identifier
 * @type {number}
 */
export const DEFAULT_MAP_ID = 1;

/**
 * Default map zoom level
 * @type {number}
 */
export const DEFAULT_ZOOM = 1;

/**
 * Default map rotation angle
 * @type {number} Rotation in degrees
 */
export const DEFAULT_ROTATION = 0;

// ==========================================
// Exhibit Categories
// ==========================================

/**
 * Available exhibit categories for filtering and classification
 * @type {string[]}
 */
export const EXHIBIT_CATEGORIES = [
  'Art',
  'History',
  'Science',
  'Culture',
  'Modern Art',
  'Ancient Greece',
  'Sculpture',
  'Painting',
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
  'Ancient Civilizations',
  'Medieval Period',
  'Renaissance',
  'Modern Era',
  'Contemporary',
];

/**
 * Artists and civilizations for preference selection
 * Used in multi-select questionnaire step
 * @type {string[]}
 */
export const ARTISTS_CIVILIZATIONS = [
  'Ancient Greece',
  'Ancient Rome',
  'Ancient Egypt',
  'Renaissance Masters',
  'Impressionists',
  'Modern Artists',
];

// ==========================================
// Local Storage Keys
// ==========================================

/**
 * LocalStorage key identifiers
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
 * Minimum password length for security
 * @type {number}
 */
export const MIN_PASSWORD_LENGTH = 6;

/**
 * Minimum rating value (1-5 stars)
 * @type {number}
 */
export const MIN_RATING = 1;

/**
 * Maximum rating value (1-5 stars)
 * @type {number}
 */
export const MAX_RATING = 5;

// ==========================================
// Timing Constants
// ==========================================

/**
 * Delay between sequential API requests (milliseconds)
 * Prevents overwhelming the backend
 * @type {number}
 */
export const API_REQUEST_DELAY = 1000;

/**
 * Location update interval for navigation (milliseconds)
 * @type {number}
 */
export const LOCATION_UPDATE_INTERVAL = 5000;

