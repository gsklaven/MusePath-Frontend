import apiClient from './client';

// Add exhibit to favourites
export const addToFavourites = async (userId, exhibitId) => {
  const response = await apiClient.post(`/users/${userId}/favourites`, {
    exhibit_id: exhibitId,
  });
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
  const response = await apiClient.get(`/coordinates/${userId}`);
  return response.data;
};

// Update user coordinates
export const updateUserCoordinates = async (userId, lat, lng) => {
  const response = await apiClient.put(`/coordinates/${userId}`, {
    lat,
    lng,
  });
  return response.data;
};
