import { useState, useMemo, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { addToFavourites, removeFromFavourites, getUserCoordinates } from '../api/users';
import { getExhibitAudio, rateExhibit } from '../api/exhibits';
import { createRoute } from '../api/routes';

function splitTextIntoPages(text, maxLen = 400) {
  if (!text) return [];
  if (text.length <= maxLen) return [text];
  const result = [];
  let start = 0;
  while (start < text.length) {
    let end = start + maxLen;
    if (end < text.length) {
      let spaceIdx = text.lastIndexOf(' ', end);
      if (spaceIdx > start) end = spaceIdx;
    }
    result.push(text.slice(start, end).trim());
    start = end;
  }
  return result;
}

export const useExhibitLogic = (exhibit, onClose) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [isFavourite, setIsFavourite] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioError, setAudioError] = useState(null);
  const [isCreatingRoute, setIsCreatingRoute] = useState(false);
  const [routeError, setRouteError] = useState(null);
  const [userRating, setUserRating] = useState(null);
  const [isSubmittingRating, setIsSubmittingRating] = useState(false);
  const audioRef = useRef(null);

  useMemo(() => {
    if (exhibit) {
      // Check local storage for favorite status
      try {
        const storedFavourites = JSON.parse(localStorage.getItem('favourites') || '[]');
        const isInFavourites = storedFavourites.some(fav => fav.exhibit_id === exhibit.exhibit_id);
        setIsFavourite(isInFavourites);
      } catch (err) {
        setIsFavourite(false);
      }
    }
  }, [exhibit]);

  const handleToggleFavourite = async (e) => {
    e.stopPropagation();
    const exhibitId = exhibit?.exhibit_id || exhibit?.exhibitId;
    if (!exhibitId) return;

    // Helper to update local storage favorites
    const setLocalFavourite = (nextState) => {
      try {
        const stored = JSON.parse(localStorage.getItem('favourites') || '[]');
        const exists = stored.some(fav => fav.exhibit_id === exhibitId);
        if (nextState && !exists) {
          const newFavourite = {
            exhibit_id: exhibitId,
            title: exhibit.title || exhibit.name,
            subtitle: exhibit.subtitle,
          };
          localStorage.setItem('favourites', JSON.stringify([...stored, newFavourite]));
        }
        if (!nextState && exists) {
          const updated = stored.filter(fav => fav.exhibit_id !== exhibitId);
          localStorage.setItem('favourites', JSON.stringify(updated));
        }
      } catch (err) {
        console.error('Error updating local favourites fallback:', err);
      }
    };

    try {
      // Toggle favorite status via API
      if (isFavourite) {
        await removeFromFavourites(user?.id || 1, exhibitId);
        setLocalFavourite(false);
        setIsFavourite(false);
      } else {
        await addToFavourites(user?.id || 1, exhibitId);
        setLocalFavourite(true);
        setIsFavourite(true);
      }
    } catch (err) {
      console.error('Error toggling favourite:', err);
      setLocalFavourite(!isFavourite);
      setIsFavourite(!isFavourite);
    }
  };

  const handlePlayAudio = async () => {
    const exhibitId = exhibit?.exhibit_id || exhibit?.exhibitId;
    if (!exhibitId) return;

    try {
      // Toggle audio playback
      if (isPlayingAudio && audioRef.current) {
        audioRef.current.pause();
        setIsPlayingAudio(false);
      } else {
        setAudioError(null);
        const audioBlob = await getExhibitAudio(exhibitId, 'online');
        const audioUrl = URL.createObjectURL(audioBlob);
        
        // Initialize or update audio element
        if (!audioRef.current) {
          audioRef.current = new Audio(audioUrl);
          audioRef.current.onended = () => setIsPlayingAudio(false);
        } else {
          audioRef.current.src = audioUrl;
        }
        
        await audioRef.current.play();
        setIsPlayingAudio(true);
      }
    } catch (err) {
      console.error('❌ Error playing audio:', err);
      setAudioError('Failed to load audio guide');
      setIsPlayingAudio(false);
    }
  };

  const handleRateExhibit = async (rating) => {
    if (!user) return;
    const exhibitId = exhibit?.exhibitId || exhibit?.exhibit_id || exhibit?.id;
    if (!exhibitId) return;
    
    try {
      setIsSubmittingRating(true);
      // Submit rating to API
      await rateExhibit(exhibitId, rating);
      setUserRating(rating);
      
      try {
        // Update local storage ratings
        const storedRatings = JSON.parse(localStorage.getItem('ratings') || '[]');
        const existingIndex = storedRatings.findIndex(r => r.exhibit_id === exhibitId);
        const ratingData = {
          exhibit_id: exhibitId,
          rating: rating,
          title: exhibit.name || exhibit.title,
          created_at: new Date().toISOString()
        };
        if (existingIndex >= 0) {
          storedRatings[existingIndex] = ratingData;
        } else {
          storedRatings.push(ratingData);
        }
        localStorage.setItem('ratings', JSON.stringify(storedRatings));
      } catch (localErr) {
        console.error('❌ Error saving rating to localStorage:', localErr);
      }
    } catch (err) {
      console.error('❌ Error rating exhibit:', err);
    } finally {
      setIsSubmittingRating(false);
    }
  };

  useEffect(() => {
    // Cleanup audio on unmount
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    // Reset state when exhibit changes
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlayingAudio(false);
    }
    setAudioError(null);
    setRouteError(null);
  }, [exhibit]);

  const handleCreateRoute = async () => {
    const exhibitId = exhibit?.exhibit_id || exhibit?.exhibitId;
    if (!exhibitId) return;

    try {
      setIsCreatingRoute(true);
      setRouteError(null);
      const userId = (user?.id && typeof user.id === 'number' && user.id < 1000000) ? user.id : 1;
      // Get current user location
      const userCoords = await getUserCoordinates(userId);

      if (!userCoords || (!userCoords.latitude && !userCoords.lat) || (!userCoords.longitude && !userCoords.lng)) {
        throw new Error('Could not get your current location');
      }

      const lat = userCoords.latitude || userCoords.lat;
      const lng = userCoords.longitude || userCoords.lng;
      
      const routeData = {
        user_id: userId,
        destination_id: exhibitId,
        startLat: lat,
        startLng: lng,
      };

      // Create route via API
      const newRoute = await createRoute(routeData);
      onClose();
      navigate('/navigation', { state: { route: newRoute } });
    } catch (err) {
      console.error('❌ Error creating route:', err);
      // Fallback route for demo/offline purposes
      const fallbackRoute = {
        route_id: 999,
        instructions: ['Head north', 'Turn right'],
        distance: 1200,
        estimatedTime: 900,
        arrivalTime: '12:00',
        destination: { name: exhibit?.name || exhibit?.title || 'Exhibit' },
      };
      setRouteError(err.message || 'Backend unavailable, using fallback route.');
      onClose();
      navigate('/navigation', { state: { route: fallbackRoute } });
    } finally {
      setIsCreatingRoute(false);
    }
  };

  const subtitle = useMemo(() => {
    if (!exhibit) return '';
    let parts = [];
    if (exhibit.category && exhibit.category.length > 0) parts.push(exhibit.category.join(', '));
    // Combine categories into subtitle string
    return parts.join(' | ');
  }, [exhibit]);

  const features = useMemo(() => {
    if (!exhibit) return [];
    let arr = [];
    if (exhibit.features && Array.isArray(exhibit.features)) arr = arr.concat(exhibit.features);
    if (exhibit.wheelchairAccessible) arr.push('Wheelchair Accessible');
    if (exhibit.brailleSupport) arr.push('Braille Support');
    if (exhibit.audioGuideUrl || exhibit.audioGuide) arr.push('Audio Guide');
    // Filter out duplicate audio guide entry
    return arr.filter(f => f !== 'Audio Guide Available');
  }, [exhibit]);

  const pages = useMemo(() => {
    if (!exhibit) return [];
    let arr = [];
    if (exhibit.description) arr = arr.concat(splitTextIntoPages(exhibit.description));
    if (exhibit.historicalInfo) arr = arr.concat(splitTextIntoPages(exhibit.historicalInfo));
    if (exhibit.extraDescription) arr = arr.concat(splitTextIntoPages(exhibit.extraDescription));
    // Return array of text pages
    return arr;
  }, [exhibit]);

  return {
    user,
    page,
    setPage,
    isFavourite,
    handleToggleFavourite,
    isPlayingAudio,
    handlePlayAudio,
    audioError,
    isCreatingRoute,
    handleCreateRoute,
    routeError,
    userRating,
    handleRateExhibit,
    isSubmittingRating,
    subtitle,
    features,
    pages
  };
};