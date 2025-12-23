import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserCoordinates } from '../api/users';
import { createRoute } from '../api/routes';

// Helper to determine valid user ID
const getValidUserId = (user) => {
  return (user?.id && typeof user.id === 'number' && user.id < 1000000) ? user.id : 1;
};

// Helper to fetch and validate location
const fetchUserLocation = async (userId) => {
  const userCoords = await getUserCoordinates(userId);
  
  if (!userCoords || (!userCoords.latitude && !userCoords.lat) || (!userCoords.longitude && !userCoords.lng)) {
    throw new Error('Could not get your current location');
  }

  return {
    lat: userCoords.latitude || userCoords.lat,
    lng: userCoords.longitude || userCoords.lng
  };
};

// Helper to create fallback route object
const createFallbackRoute = (exhibit) => ({
  route_id: 999,
  instructions: ['Head north', 'Turn right'],
  distance: 1200,
  estimatedTime: 900,
  arrivalTime: '12:00',
  destination: { name: exhibit?.name || exhibit?.title || 'Exhibit' },
});

/**
 * Custom hook for creating navigation routes to an exhibit.
 * Handles user location retrieval and route API calls.
 *
 * @param {Object} user - Current user object.
 * @param {Object} exhibit - Target exhibit object.
 * @param {function} onClose - Callback to close parent UI (e.g., bottom sheet) on success.
 * @returns {Object} Route creation state and handlers.
 */
export const useExhibitRoute = (user, exhibit, onClose) => {
  const navigate = useNavigate();
  const [isCreatingRoute, setIsCreatingRoute] = useState(false);
  const [routeError, setRouteError] = useState(null);

  // Initiates the route creation process
  // 1. Gets user location -> 2. Calls createRoute API -> 3. Navigates to NavigationPage
  const handleCreateRoute = async () => {
    const exhibitId = exhibit?.exhibit_id || exhibit?.exhibitId;
    if (!exhibitId) return;

    try {
      setIsCreatingRoute(true);
      setRouteError(null);
      
      const userId = getValidUserId(user);
      // Step 1: Get current user location
      const { lat, lng } = await fetchUserLocation(userId);
      
      const routeData = {
        user_id: userId,
        destination_id: exhibitId,
        startLat: lat,
        startLng: lng,
      };

      // Step 2: Create route via API
      const newRoute = await createRoute(routeData);
      onClose();
      navigate('/navigation', { state: { route: newRoute } });
    } catch (err) {
      console.error('❌ Error creating route:', err);
      // Fallback route for demo/offline purposes
      const fallbackRoute = createFallbackRoute(exhibit);
      setRouteError(err.message || 'Backend unavailable, using fallback route.');
      onClose();
      navigate('/navigation', { state: { route: fallbackRoute } });
    } finally {
      setIsCreatingRoute(false);
    }
  };

  return { isCreatingRoute, routeError, handleCreateRoute, setRouteError };
};