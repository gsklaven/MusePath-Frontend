// API Constants
export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://api.server.test/v1';

// Default walking speed (km/h)
export const DEFAULT_WALKING_SPEED = 5;

// Map constants
export const DEFAULT_MAP_ID = 1;
export const DEFAULT_ZOOM = 1;
export const DEFAULT_ROTATION = 0;

// Exhibit categories
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

// Historical periods for preferences
export const HISTORICAL_PERIODS = [
  'Ancient Civilizations',
  'Medieval Period',
  'Renaissance',
  'Modern Era',
  'Contemporary',
];

// Artists/Civilizations for preferences
export const ARTISTS_CIVILIZATIONS = [
  'Ancient Greece',
  'Ancient Rome',
  'Ancient Egypt',
  'Renaissance Masters',
  'Impressionists',
  'Modern Artists',
];

// Offline storage keys
export const STORAGE_KEYS = {
  USER: 'user',
  OFFLINE_MAPS: 'offline_maps',
  OFFLINE_EXHIBITS: 'offline_exhibits',
  PENDING_SYNC: 'pending_sync',
};

// Route status
export const ROUTE_STATUS = {
  PLANNING: 'planning',
  ACTIVE: 'active',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
};

// Exhibit status
export const EXHIBIT_STATUS = {
  OPEN: 'open',
  CLOSED: 'closed',
  UNDER_MAINTENANCE: 'under_maintenance',
};

// Crowd levels
export const CROWD_LEVELS = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
};

// Notification types
export const NOTIFICATION_TYPES = {
  INFO: 'info',
  WARNING: 'warning',
  ERROR: 'error',
  SUCCESS: 'success',
};
