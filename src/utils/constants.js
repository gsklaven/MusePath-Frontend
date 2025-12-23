/**
 * Application Constants
 * 
 * Central configuration file containing all application-wide constants.
 * This module exports configuration values, validation rules, and enumeration
 * constants used throughout the museum navigation application.
 * 
 * @module utils/constants
 */

// ==========================================
// API Configuration
// ==========================================

/**
 * Base URL for all API requests.
 * Falls back to test server if environment variable is not set.
 * Used by API client to construct endpoint URLs.
 * @type {string}
 */
export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://api.server.test/v1';

// ==========================================
// Map Configuration
// ==========================================

/**
 * Default map display settings.
 * ID: Initial map to load on startup
 * ZOOM: Default zoom level (1 = overview)
 * ROTATION: Initial rotation angle in degrees
 * @type {Object}
 */
export const MAP_DEFAULTS = { 
  ID: 1, 
  ZOOM: 1, 
  ROTATION: 0 
};

// ==========================================
// Content Categories
// ==========================================

/**
 * Available exhibit categories for filtering and classification.
 * Used in search filters and exhibit metadata.
 * Supports both broad categories (Art, History) and specific ones (Impressionists).
 * @type {string[]}
 */
export const EXHIBIT_CATEGORIES = [
  'Art', 'History', 'Science', 'Culture',
  'Modern Art', 'Ancient Greece', 'Sculpture', 'Painting',
];

/**
 * Historical periods for user preference questionnaire.
 * Helps personalize exhibit recommendations based on user interests.
 * Ordered chronologically from ancient to contemporary.
 * @type {string[]}
 */
export const HISTORICAL_PERIODS = [
  'Ancient Civilizations', 'Medieval Period', 'Renaissance',
  'Modern Era', 'Contemporary',
];

/**
 * Artists and civilizations for multi-select preference step.
 * Used during onboarding to understand user interests.
 * Combines both historical civilizations and artistic movements.
 * @type {string[]}
 */
export const ARTISTS_CIVILIZATIONS = [
  'Ancient Greece', 'Ancient Rome', 'Ancient Egypt',
  'Renaissance Masters', 'Impressionists', 'Modern Artists',
];

// ==========================================
// Storage Configuration
// ==========================================

/**
 * LocalStorage keys for data persistence.
 * Centralized to prevent typos and enable easy refactoring.
 * All user data, offline content, and sync queue use these keys.
 * @type {Object}
 */
export const STORAGE_KEYS = {
  /** User authentication token and profile information */
  USER: 'user',
  /** Cached map data for offline navigation */
  OFFLINE_MAPS: 'offline_maps',
  /** Cached exhibit content for offline viewing */
  OFFLINE_EXHIBITS: 'offline_exhibits',
  /** Queue of actions to sync when connection restored */
  PENDING_SYNC: 'pending_sync',
};

// ==========================================
// Status Enumerations
// ==========================================

/**
 * Route lifecycle states.
 * Tracks progression from planning through completion.
 * Used for route history and analytics.
 * @type {Object}
 */
export const ROUTE_STATUS = {
  /** Route being planned, not yet started */
  PLANNING: 'planning',
  /** User currently following this route */
  ACTIVE: 'active',
  /** Route successfully completed */
  COMPLETED: 'completed',
  /** User cancelled before completion */
  CANCELLED: 'cancelled',
};

/**
 * Exhibit availability states.
 * Determines visitor access and display in app.
 * Updated in real-time by museum staff.
 * @type {Object}
 */
export const EXHIBIT_STATUS = {
  /** Available for viewing */
  OPEN: 'open',
  /** Not accessible to visitors */
  CLOSED: 'closed',
  /** Temporarily unavailable for repairs */
  UNDER_MAINTENANCE: 'under_maintenance',
};

/**
 * Crowd density indicators.
 * Helps visitors plan their route to avoid congestion.
 * Updated every 5 minutes based on sensor data.
 * @type {Object}
 */
export const CROWD_LEVELS = { 
  /** Minimal wait times, comfortable viewing */
  LOW: 'low', 
  /** Moderate crowds, some wait times */
  MEDIUM: 'medium', 
  /** Heavy congestion, significant delays */
  HIGH: 'high' 
};

/**
 * UI notification types.
 * Determines icon, color, and styling of toast messages.
 * Used throughout app for user feedback.
 * @type {Object}
 */
export const NOTIFICATION_TYPES = {
  /** General information */
  INFO: 'info',
  /** Caution or attention needed */
  WARNING: 'warning',
  /** Error or failure state */
  ERROR: 'error',
  /** Successful operation */
  SUCCESS: 'success',
};

// ==========================================
// Validation Rules
// ==========================================

/**
 * Input validation constraints.
 * Enforces data quality and security requirements.
 * MIN_PASSWORD_LENGTH: Minimum characters for password security
 * MIN_RATING: Lowest rating value (1 star)
 * MAX_RATING: Highest rating value (5 stars)
 * @type {Object}
 */
export const VALIDATION = { 
  MIN_PASSWORD_LENGTH: 6, 
  MIN_RATING: 1, 
  MAX_RATING: 5 
};

// ==========================================
// Timing Configuration
// ==========================================

/**
 * Timing intervals in milliseconds.
 * Controls polling rates and debounce delays.
 * API_REQUEST_DELAY: Debounce for search inputs
 * LOCATION_UPDATE_INTERVAL: GPS position polling rate
 * @type {Object}
 */
export const TIMING = { 
  API_REQUEST_DELAY: 1000, 
  LOCATION_UPDATE_INTERVAL: 5000 
};