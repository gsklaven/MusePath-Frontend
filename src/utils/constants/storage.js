/**
 * LocalStorage Key Constants
 * 
 * Keys for persisting data in browser's localStorage.
 * Centralized to prevent typos and enable easy refactoring.
 * 
 * @module utils/constants/storage
 */

/**
 * LocalStorage keys for client-side data persistence.
 * 
 * @constant {Object}
 * @property {string} USER - User profile and authentication token
 * @property {string} OFFLINE_MAPS - Cached map images for offline use
 * @property {string} OFFLINE_EXHIBITS - Cached exhibit data for offline mode
 * @property {string} PENDING_SYNC - Queue of changes awaiting server sync
 */
export const STORAGE_KEYS = {
  USER: 'user',
  OFFLINE_MAPS: 'offline_maps',
  OFFLINE_EXHIBITS: 'offline_exhibits',
  PENDING_SYNC: 'pending_sync',
};
