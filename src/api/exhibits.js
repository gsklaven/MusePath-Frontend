import apiClient from './client';

// Get exhibit by ID
export const getExhibitById = async (exhibitId, mode = 'online') => {
  const response = await apiClient.get(`/exhibits/${exhibitId}`, {
    params: { mode },
  });
  return response.data;
};

// Search exhibits
export const searchExhibits = async (searchTerm, category = null, mode = 'online') => {
  const response = await apiClient.get('/exhibits/search', {
    params: {
      exhibit_term: searchTerm,
      category,
      mode,
    },
  });
  return response.data;
};

// Get audio guide for exhibit
export const getExhibitAudio = async (exhibitId, mode = 'online') => {
  const response = await apiClient.get(`/exhibits/${exhibitId}/audio`, {
    params: { mode },
    responseType: 'blob',
  });
  return response.data;
};

// Rate an exhibit
export const rateExhibit = async (exhibitId, rating) => {
  const response = await apiClient.post(`/exhibits/${exhibitId}/ratings`, {
    rating,
  });
  return response.data;
};

// Download exhibit for offline use
export const downloadExhibit = async (exhibitId) => {
  const response = await apiClient.get(`/downloads/exhibits/${exhibitId}`, {
    responseType: 'blob',
  });
  return response.data;
};
