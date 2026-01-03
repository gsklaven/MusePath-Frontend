/**
 * Timing and Interval Constants
 * 
 * Time-based values in milliseconds for polling, delays, and debouncing.
 * 
 * @module utils/constants/timing
 */

/**
 * Timing intervals in milliseconds.
 * Controls delays and update frequencies.
 * 
 * @constant {Object}
 * @property {number} API_REQUEST_DELAY - Search input debounce delay (1000ms = 1s)
 * @property {number} LOCATION_UPDATE_INTERVAL - GPS position polling rate (5000ms = 5s)
 */
export const TIMING = {
  API_REQUEST_DELAY: 1000,
  LOCATION_UPDATE_INTERVAL: 5000,
};
