import apiClient from './client';

// Add exhibit to favourites
export const addToFavourites = async (userId, exhibitId) => {
  console.log(`🔍 API Call: POST /users/${userId}/favourites (exhibitId=${exhibitId})`);
  const response = await apiClient.post(`/users/${userId}/favourites`, {
    exhibit_id: exhibitId,
  });
  console.log(`✅ Response: POST /users/${userId}/favourites`, response.data);
  return response.data;
};

// Remove exhibit from favourites
export const removeFromFavourites = async (userId, exhibitId) => {
  const response = await apiClient.delete(`/users/${userId}/favourites/${exhibitId}`);
  return response.data;
};

// Update user preferences
export const updateUserPreferences = async (userId, interests) => {
  const response = await apiClient.put(`/users/${userId}/preferences`, {
    interests,
  });
  return response.data;
};

// Get user coordinates
export const getUserCoordinates = async (userId) => {
  console.log(`📍 API Call: GET /coordinates/${userId}`);
  const response = await apiClient.get(`/coordinates/${userId}`);
  console.log(`✅ Response: GET /coordinates/${userId}`, response.data);
  // Backend returns { success, data, message, error }
  // We need the actual coordinate data
  return response.data.data || response.data;
};

// Update user coordinates
export const updateUserCoordinates = async (userId, lat, lng) => {
  const response = await apiClient.put(`/coordinates/${userId}`, {
    lat,
    lng,
  });
  return response.data;
};
