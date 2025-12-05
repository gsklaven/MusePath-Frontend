import apiClient from './client';

// Basic validators
const isValidId = (id) => {
  if (id === undefined || id === null) return false;
  // allow numeric strings or numbers
  const n = Number(id);
  return !isNaN(n) && Number.isFinite(n) && Number.isInteger(n) && n > 0;
};

const sanitizeSearchTerm = (term) => {
  if (term == null) return '';
  const s = String(term).trim();
  // limit length to avoid abusive long inputs
  return s.length > 200 ? s.slice(0, 200) : s;
};

// Get exhibit by ID
export const getExhibitById = async (exhibitId, mode = 'online') => {
  if (!isValidId(exhibitId)) {
    throw new TypeError('Invalid exhibitId');
  }

  console.log('🔍 API Call: GET /exhibits/%s?mode=%s', String(exhibitId), String(mode));
  const response = await apiClient.get(`/exhibits/${exhibitId}`, {
    params: { mode },
  });
  console.log('✅ Response: GET /exhibits/%s', String(exhibitId), response.data);
  return response.data;
};

// Search exhibits
export const searchExhibits = async (searchTerm, category = null, mode = 'online') => {
  const term = sanitizeSearchTerm(searchTerm);
  console.log('🔍 API Call: GET /exhibits/search?exhibit_term=%s&mode=%s', String(term), String(mode));
  const response = await apiClient.get('/exhibits/search', {
    params: {
      exhibit_term: term,
      category,
      mode,
    },
  });
  console.log('✅ Response: GET /exhibits/search', response.data);
  return response.data;
};

// Get audio guide for exhibit
export const getExhibitAudio = async (exhibitId, mode = 'online') => {
  if (!isValidId(exhibitId)) {
    throw new TypeError('Invalid exhibitId');
  }

  console.log('🎵 API Call: GET /exhibits/%s/audio (mode: %s)', String(exhibitId), String(mode));
  const response = await apiClient.get(`/exhibits/${exhibitId}/audio`, {
    params: { mode },
    responseType: 'blob',
  });
  console.log('✅ Response: GET /exhibits/%s/audio - Audio blob received', String(exhibitId));
  return response.data;
};

// Rate an exhibit
export const rateExhibit = async (exhibitId, rating) => {
  if (!isValidId(exhibitId)) throw new TypeError('Invalid exhibitId');
  const r = Number(rating);
  if (!Number.isFinite(r) || r < 0 || r > 5) throw new TypeError('Invalid rating');

  const response = await apiClient.post(`/exhibits/${exhibitId}/ratings`, {
    rating: r,
  });
  return response.data;
};

// Download exhibit for offline use
export const downloadExhibit = async (exhibitId) => {
  if (!isValidId(exhibitId)) throw new TypeError('Invalid exhibitId');

  const response = await apiClient.get(`/downloads/exhibits/${exhibitId}`, {
    responseType: 'blob',
  });
  return response.data;
};
