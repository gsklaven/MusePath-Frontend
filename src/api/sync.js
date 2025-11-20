import apiClient from './client';

// Synchronize offline data
export const syncOfflineData = async (operations) => {
  const response = await apiClient.post('/sync', operations);
  return response.data;
};

// Send notification
export const sendNotification = async (userId, routeId, currentLat, currentLng) => {
  const response = await apiClient.post('/notifications', {
    user_id: userId,
    route_id: routeId,
    currentLat,
    currentLng,
  });
  return response.data;
};
