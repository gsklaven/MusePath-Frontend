/**
 * Application Constants
 * @module utils/constants
 */

// API
export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://api.server.test/v1';
export const API_REQUEST_DELAY = 1000;

// Map
export const DEFAULT_MAP_ID = 1;
export const DEFAULT_ZOOM = 1;
export const DEFAULT_ROTATION = 0;

// Navigation
export const DEFAULT_WALKING_SPEED = 5;
export const LOCATION_UPDATE_INTERVAL = 5000;

// Exhibit Categories
export const EXHIBIT_CATEGORIES = [
  'Art', 'History', 'Science', 'Culture',
  'Modern Art', 'Ancient Greece', 'Sculpture', 'Painting',
];

// User Preferences
export const HISTORICAL_PERIODS = [
  'Ancient Civilizations', 'Medieval Period', 'Renaissance',
  'Modern Era', 'Contemporary',
];

export const ARTISTS_CIVILIZATIONS = [
  'Ancient Greece', 'Ancient Rome', 'Ancient Egypt',
  'Renaissance Masters', 'Impressionists', 'Modern Artists',
];

// Storage
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

export const CROWD_LEVELS = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
};

// UI
export const NOTIFICATION_TYPES = {
  INFO: 'info',
  WARNING: 'warning',
  ERROR: 'error',
  SUCCESS: 'success',
};

// Validation
export const MIN_PASSWORD_LENGTH = 6;
export const MIN_RATING = 1;
export const MAX_RATING = 5;