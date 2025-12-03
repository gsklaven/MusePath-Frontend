import apiClient from './client';

// Add exhibit to favourites
export const addToFavourites = async (userId, exhibitId) => {
  // Basic validation
  if (!userId || !exhibitId) throw new TypeError('userId and exhibitId are required');
  const uid = Number(userId);
  const eid = Number(exhibitId);
  if (isNaN(uid) || !Number.isFinite(uid) || !Number.isInteger(uid) || uid <= 0) throw new TypeError('Invalid userId');
  if (isNaN(eid) || !Number.isFinite(eid) || !Number.isInteger(eid) || eid <= 0) throw new TypeError('Invalid exhibitId');

  console.log('🔍 API Call: POST /users/%s/favourites (exhibitId=%s)', String(uid), String(eid));
  const response = await apiClient.post(`/users/${uid}/favourites`, {
    exhibit_id: eid,
  });
  console.log('✅ Response: POST /users/%s/favourites', String(uid), response.data);
  return response.data;
};

// Remove exhibit from favourites
export const removeFromFavourites = async (userId, exhibitId) => {
  const uid = Number(userId);
  const eid = Number(exhibitId);
  if (isNaN(uid) || !Number.isFinite(uid) || !Number.isInteger(uid) || uid <= 0) throw new TypeError('Invalid userId');
  if (isNaN(eid) || !Number.isFinite(eid) || !Number.isInteger(eid) || eid <= 0) throw new TypeError('Invalid exhibitId');

  const response = await apiClient.delete(`/users/${uid}/favourites/${eid}`);
  return response.data;
};

// Update user preferences
export const updateUserPreferences = async (userId, interests) => {
  const uid = Number(userId);
  if (isNaN(uid) || !Number.isFinite(uid) || !Number.isInteger(uid) || uid <= 0) throw new TypeError('Invalid userId');
  if (!Array.isArray(interests)) throw new TypeError('interests must be an array');

  // sanitize interests array to strings and limit length
  const sanitized = interests.map((i) => String(i).slice(0, 50));

  const response = await apiClient.put(`/users/${uid}/preferences`, {
    interests: sanitized,
  });
  return response.data;
};

// Get user coordinates
export const getUserCoordinates = async (userId) => {
  const uid = Number(userId);
  if (isNaN(uid) || !Number.isFinite(uid) || !Number.isInteger(uid) || uid <= 0) throw new TypeError('Invalid userId');

  console.log('📍 API Call: GET /coordinates/%s', String(uid));
  const response = await apiClient.get(`/coordinates/${uid}`);
  console.log('✅ Response: GET /coordinates/%s', String(uid), response.data);
  // Backend returns { success, data, message, error }
  // We need the actual coordinate data
  return response.data && response.data.data ? response.data.data : response.data;
};

// Update user coordinates
export const updateUserCoordinates = async (userId, lat, lng) => {
  const uid = Number(userId);
  if (isNaN(uid) || !Number.isFinite(uid) || !Number.isInteger(uid) || uid <= 0) throw new TypeError('Invalid userId');

  const latitude = Number(lat);
  const longitude = Number(lng);
  if (isNaN(latitude) || !Number.isFinite(latitude) || latitude < -90 || latitude > 90) throw new TypeError('Invalid latitude');
  if (isNaN(longitude) || !Number.isFinite(longitude) || longitude < -180 || longitude > 180) throw new TypeError('Invalid longitude');

  const response = await apiClient.put(`/coordinates/${uid}`, {
    lat: latitude,
    lng: longitude,
  });
  return response.data;
};
