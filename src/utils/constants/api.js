/**
 * API Configuration Constants
 * 
 * Contains base URLs and API-related configuration values.
 * 
 * @module utils/constants/api
 */

/**
 * Base URL for all API requests.
 * Falls back to test server if environment variable not set.
 * 
 * @constant {string}
 */
export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://api.server.test/v1';
