import apiClient from './client';

// Create/Calculate route
export const createRoute = async (routeData) => {
  console.log(`🔍 API Call: POST /routes`, routeData);
  const response = await apiClient.post('/routes', routeData);
  console.log(`✅ Response: POST /routes`, response.data);
  return response.data;
};

// Calculate route (legacy - kept for compatibility)
export const calculateRoute = async (userId, destinationId, startLat, startLng) => {
  console.log(`🔍 API Call: POST /routes (userId=${userId}, destId=${destinationId})`);
  const response = await apiClient.post('/routes', {
    user_id: userId,
    destination_id: destinationId,
    startLat,
    startLng,
  });
  console.log(`✅ Response: POST /routes`, response.data);
  return response.data;
};

// Get route details
export const getRouteDetails = async (routeId, walkingSpeed = null) => {
  const response = await apiClient.get(`/routes/${routeId}`, {
    params: { walkingSpeed },
  });
  return response.data;
};

// Update route stops
export const updateRouteStops = async (routeId, addStops = [], removeStops = []) => {
  const response = await apiClient.put(`/routes/${routeId}`, {
    addStops,
    removeStops,
  });
  return response.data;
};

// Recalculate route
export const recalculateRoute = async (routeId) => {
  const response = await apiClient.post(`/routes/${routeId}`);
  return response.data;
};

// Delete route (cancel navigation)
export const deleteRoute = async (routeId) => {
  const response = await apiClient.delete(`/routes/${routeId}`);
  return response.data;
};

// Get personalized route
export const getPersonalizedRoute = async (userId) => {
  const response = await apiClient.get(`/users/${userId}/routes`);
  return response.data;
};
