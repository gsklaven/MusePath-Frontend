import apiClient from './client';

// Get exhibit by ID
export const getExhibitById = async (exhibitId, mode = 'online') => {
  console.log(`🔍 API Call: GET /exhibits/${exhibitId}?mode=${mode}`);
  const response = await apiClient.get(`/exhibits/${exhibitId}`, {
    params: { mode },
  });
  console.log(`✅ Response: GET /exhibits/${exhibitId}`, response.data);
  return response.data;
};

// Search exhibits
export const searchExhibits = async (searchTerm, category = null, mode = 'online') => {
  console.log(`🔍 API Call: GET /exhibits/search?exhibit_term=${searchTerm}&mode=${mode}`);
  const response = await apiClient.get('/exhibits/search', {
    params: {
      exhibit_term: searchTerm,
      category,
      mode,
    },
  });
  console.log(`✅ Response: GET /exhibits/search`, response.data);
  return response.data;
};

// Get audio guide for exhibit
export const getExhibitAudio = async (exhibitId, mode = 'online') => {
  console.log(`🎵 API Call: GET /exhibits/${exhibitId}/audio (mode: ${mode})`);
  const response = await apiClient.get(`/exhibits/${exhibitId}/audio`, {
    params: { mode },
    responseType: 'blob',
  });
  console.log(`✅ Response: GET /exhibits/${exhibitId}/audio - Audio blob received`);
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
