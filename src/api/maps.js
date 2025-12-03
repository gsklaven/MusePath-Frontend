import apiClient from './client';

// Get map by ID
// Basic validators
const isValidId = (id) => {
  if (id === undefined || id === null) return false;
  const n = Number(id);
  return Number.isInteger(n) && n > 0;
};

export const getMapById = async (mapId, zoom = null, rotation = null, mode = 'online') => {
  if (!isValidId(mapId)) throw new TypeError('Invalid mapId');

  // validate zoom and rotation if present
  if (zoom != null && !Number.isFinite(Number(zoom))) throw new TypeError('Invalid zoom');
  if (rotation != null && !Number.isFinite(Number(rotation))) throw new TypeError('Invalid rotation');

  console.log('🔍 API Call: GET /maps/%s?mode=%s', String(mapId), String(mode));
  const response = await apiClient.get(`/maps/${mapId}`, {
    params: { zoom, rotation, mode },
  });
  console.log('✅ Response: GET /maps/%s', String(mapId), response.data);
  return response.data;
};

// Download map for offline use
export const downloadMap = async (mapId) => {
  if (!isValidId(mapId)) throw new TypeError('Invalid mapId');

  const response = await apiClient.get(`/downloads/maps/${mapId}`, {
    responseType: 'blob',
  });
  return response.data;
};

// Get all destinations
export const getDestinations = async (mapId = null) => {
  if (mapId != null && !isValidId(mapId)) throw new TypeError('Invalid mapId');
  const response = await apiClient.get('/destinations', {
    params: { map_id: mapId },
  });
  return response.data;
};

// Get destination details
export const getDestinationById = async (
  destinationId,
  currentTime = null,
  includeStatus = true,
  includeAlternatives = false
) => {
  if (!isValidId(destinationId)) throw new TypeError('Invalid destinationId');
  // currentTime can be a timestamp/string; no strict validation here
  const response = await apiClient.get(`/destinations/${destinationId}`, {
    params: {
      currentTime,
      includeStatus,
      includeAlternatives,
    },
  });
  return response.data;
};
