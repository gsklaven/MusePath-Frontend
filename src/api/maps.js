import apiClient from './client';

// Get map by ID
export const getMapById = async (mapId, zoom = null, rotation = null, mode = 'online') => {
  console.log(`🔍 API Call: GET /maps/${mapId}?mode=${mode}`);
  const response = await apiClient.get(`/maps/${mapId}`, {
    params: { zoom, rotation, mode },
  });
  console.log(`✅ Response: GET /maps/${mapId}`, response.data);
  return response.data;
};

// Download map for offline use
export const downloadMap = async (mapId) => {
  const response = await apiClient.get(`/downloads/maps/${mapId}`, {
    responseType: 'blob',
  });
  return response.data;
};

// Get all destinations
export const getDestinations = async (mapId = null) => {
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
  const response = await apiClient.get(`/destinations/${destinationId}`, {
    params: {
      currentTime,
      includeStatus,
      includeAlternatives,
    },
  });
  return response.data;
};
