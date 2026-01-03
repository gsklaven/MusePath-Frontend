/**
 * Status and State Constants
 * 
 * Enumeration values for routes, exhibits, crowds, and notifications.
 * 
 * @module utils/constants/status
 */

/**
 * Route lifecycle states.
 * Tracks navigation progress from planning to completion.
 * 
 * @constant {Object}
 * @property {string} PLANNING - Route being created, not yet started
 * @property {string} ACTIVE - Currently navigating this route
 * @property {string} COMPLETED - Route successfully finished
 * @property {string} CANCELLED - Route abandoned by user
 */
export const ROUTE_STATUS = {
  PLANNING: 'planning',
  ACTIVE: 'active',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
};

/**
 * Exhibit availability states.
 * Determines whether visitors can access an exhibit.
 * 
 * @constant {Object}
 * @property {string} OPEN - Exhibit available for viewing
 * @property {string} CLOSED - Exhibit not accessible
 * @property {string} UNDER_MAINTENANCE - Exhibit temporarily unavailable
 */
export const EXHIBIT_STATUS = {
  OPEN: 'open',
  CLOSED: 'closed',
  UNDER_MAINTENANCE: 'under_maintenance',
};

/**
 * Crowd density levels.
 * Indicates expected wait times and congestion.
 * 
 * @constant {Object}
 * @property {string} LOW - Minimal crowds, short wait times
 * @property {string} MEDIUM - Moderate crowds, average wait
 * @property {string} HIGH - Heavy congestion, long wait times
 */
export const CROWD_LEVELS = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
};

/**
 * Notification message types.
 * Used for UI feedback and alert styling.
 * 
 * @constant {Object}
 * @property {string} INFO - Informational message
 * @property {string} WARNING - Caution or attention needed
 * @property {string} ERROR - Failure or error state
 * @property {string} SUCCESS - Successful operation confirmation
 */
export const NOTIFICATION_TYPES = {
  INFO: 'info',
  WARNING: 'warning',
  ERROR: 'error',
  SUCCESS: 'success',
};
