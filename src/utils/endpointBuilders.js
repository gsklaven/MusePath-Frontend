/**
 * Endpoint Builder Utilities
 * Helper functions and data generators for defining API endpoints.
 */

// ============================================================================
// Core Endpoint Builder
// ============================================================================

/**
 * Creates an endpoint metadata object
 * 
 * @param {string} id - Unique identifier for the endpoint
 * @param {string} category - Endpoint category (e.g., 'Authentication', 'Exhibits')
 * @param {string} name - Human-readable endpoint name
 * @param {string} method - HTTP method (GET, POST, PUT, DELETE)
 * @param {string} path - API endpoint path
 * @param {string} description - Greek description of endpoint purpose
 * @param {Object|Function|null} sampleData - Sample request data or data generator function
 * @param {string|null} requiresAuth - Authentication level required ('user', 'admin', or null)
 * @param {string|null} createFirst - ID of endpoint that must be called first (for dependencies)
 * @returns {Object} Endpoint metadata object
 */
export const createEndpoint = (
  id,
  category,
  name,
  method,
  path,
  description,
  sampleData = null,
  requiresAuth = null,
  createFirst = null
) => ({
  id,
  category,
  name,
  method,
  path,
  description,
  sampleData,
  requiresAuth,
  createFirst,
});

// ============================================================================
// HTTP Method Helpers
// ============================================================================

/**
 * Creates a GET endpoint definition
 */
export const GET = (id, category, name, path, description, requiresAuth = null, createFirst = null) =>
  createEndpoint(id, category, name, 'GET', path, description, null, requiresAuth, createFirst);

/**
 * Creates a POST endpoint definition
 */
export const POST = (id, category, name, path, description, sampleData, requiresAuth = null, createFirst = null) =>
  createEndpoint(id, category, name, 'POST', path, description, sampleData, requiresAuth, createFirst);

/**
 * Creates a PUT endpoint definition
 */
export const PUT = (id, category, name, path, description, sampleData, requiresAuth = null, createFirst = null) =>
  createEndpoint(id, category, name, 'PUT', path, description, sampleData, requiresAuth, createFirst);

/**
 * Creates a DELETE endpoint definition
 */
export const DELETE = (id, category, name, path, description, requiresAuth = null, createFirst = null) =>
  createEndpoint(id, category, name, 'DELETE', path, description, null, requiresAuth, createFirst);

// ============================================================================
// Test Data Generators
// ============================================================================

/**
 * Generates unique test user credentials
 * @returns {Object} Object with username, email, and password
 */
export const generateTestUser = () => {
  const timestamp = Date.now();
  const randomId = Math.random().toString(36).substring(2, 7);
  
  return {
    username: `test_user_${timestamp}_${randomId}`,
    email: `test_${timestamp}_${randomId}@example.com`,
    password: 'Test123!@#',
  };
};

/**
 * Creates sample exhibit data for testing
 * @returns {Object} Sample exhibit object
 */
export const generateTestExhibit = () => ({
  title: 'Test Exhibit',
  name: 'Test Museum Piece',
  artist: 'Test Artist',
  year: 2024,
  category: ['paintings', 'modern art'],
  description: 'A test exhibit for API testing',
  historicalInfo: 'Created for testing purposes',
  location: 'Test Gallery',
  features: ['wheelchair_accessible', 'audio_guide'],
  status: 'open',
  crowdLevel: 'low',
});

/**
 * Creates sample destination data for testing
 * @returns {Object} Sample destination upload payload
 */
export const generateTestDestination = () => ({
  map_id: 1,
  destinations: [
    {
      name: 'Test Destination',
      type: 'exhibit',
      coordinates: { lat: 40.7610, lng: -73.9780 },
    },
  ],
});