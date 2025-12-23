/**
 * API Endpoints Configuration
 * 
 * Centralized definition of all backend API endpoints for testing.
 * Provides a structured, maintainable way to define and access API endpoints
 * with metadata for automated testing and documentation.
 * 
 * @module apiEndpoints
 */

import { ALL_ENDPOINTS } from './endpointDefinitions';

export * from './endpointDefinitions';

// ============================================================================
// Utility Functions
// ============================================================================

/**
 * Finds an endpoint by its ID
 * @param {string} id - Endpoint ID to search for
 * @returns {Object|undefined} Endpoint object or undefined if not found
 */
export const findEndpointById = (id) => {
  return ALL_ENDPOINTS.find(endpoint => endpoint.id === id);
};

/**
 * Gets all endpoints in a specific category
 * @param {string} category - Category name to filter by
 * @returns {Array<Object>} Array of endpoints in the category
 */
export const getEndpointsByCategory = (category) => {
  return ALL_ENDPOINTS.filter(endpoint => endpoint.category === category);
};

/**
 * Gets all endpoints that require specific authentication level
 * @param {string} authLevel - Auth level ('user', 'admin', or null for public)
 * @returns {Array<Object>} Array of endpoints requiring that auth level
 */
export const getEndpointsByAuth = (authLevel) => {
  return ALL_ENDPOINTS.filter(endpoint => endpoint.requiresAuth === authLevel);
};