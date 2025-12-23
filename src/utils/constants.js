/**
 * Application Constants
 * @module utils/constants
 */

// API Configuration
export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://api.server.test/v1';

// Map Configuration
export const MAP_DEFAULTS = { ID: 1, ZOOM: 1, ROTATION: 0 };

// Exhibit Categories
export const EXHIBIT_CATEGORIES = [
  'Art', 'History', 'Science', 'Culture',
  'Modern Art', 'Ancient Greece', 'Sculpture', 'Painting',
];

// User Preference Options
export const HISTORICAL_PERIODS = [
  'Ancient Civilizations', 'Medieval Period', 'Renaissance',
  'Modern Era', 'Contemporary',
];

export const ARTISTS_CIVILIZATIONS = [
  'Ancient Greece', 'Ancient Rome', 'Ancient Egypt',
  'Renaissance Masters', 'Impressionists', 'Modern Artists',
];

// Storage Keys
export const STORAGE_KEYS = {
  USER: 'user',
  OFFLINE_MAPS: 'offline_maps',
  OFFLINE_EXHIBITS: 'offline_exhibits',
  PENDING_SYNC: 'pending_sync',
};

// Status Values
export const ROUTE_STATUS = {
  PLANNING: 'planning',
  ACTIVE: 'active',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
};

export const EXHIBIT_STATUS = {
  OPEN: 'open',
  CLOSED: 'closed',
  UNDER_MAINTENANCE: 'under_maintenance',
};

export const CROWD_LEVELS = { LOW: 'low', MEDIUM: 'medium', HIGH: 'high' };

export const NOTIFICATION_TYPES = {
  INFO: 'info',
  WARNING: 'warning',
  ERROR: 'error',
  SUCCESS: 'success',
};

// Validation & Timing
export const VALIDATION = { MIN_PASSWORD_LENGTH: 6, MIN_RATING: 1, MAX_RATING: 5 };
export const TIMING = { API_REQUEST_DELAY: 1000, LOCATION_UPDATE_INTERVAL: 5000 };