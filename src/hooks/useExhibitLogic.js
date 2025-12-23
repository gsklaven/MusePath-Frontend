import { useState, useMemo, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { addToFavourites, removeFromFavourites } from '../api/users';
import { rateExhibit } from '../api/exhibits';
import { splitTextIntoPages } from '../utils/helpers';
import { useExhibitAudio } from './useExhibitAudio';
import { useExhibitRoute } from './useExhibitRoute';

/**
 * Custom hook to manage the business logic for the Exhibit Bottom Sheet.
 * Orchestrates audio, routing, favorites, and ratings.
 *
 * @param {Object} exhibit - The exhibit data object.
 * @param {function} onClose - Callback to close the bottom sheet.
 * @returns {Object} State and handlers for the UI.
 */
export const useExhibitLogic = (exhibit, onClose) => {
  const { user } = useAuth();
  const [page, setPage] = useState(0);
  const [isFavourite, setIsFavourite] = useState(false);
  const [userRating, setUserRating] = useState(null);
  const [isSubmittingRating, setIsSubmittingRating] = useState(false);

  // Extract ID safely from potentially different property names
  const exhibitId = exhibit?.exhibit_id || exhibit?.exhibitId;
  
  // Composition of smaller hooks for specific features
  const { isPlayingAudio, audioError, handlePlayAudio, audioRef, setIsPlayingAudio, setAudioError } = useExhibitAudio(exhibitId);
  const { isCreatingRoute, routeError, handleCreateRoute, setRouteError } = useExhibitRoute(user, exhibit, onClose);

  // Check if exhibit is already favorited on mount or exhibit change
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

  // Toggle favorite status in both backend and local storage
  const handleToggleFavourite = async (e) => {
    e.stopPropagation();
    if (!exhibitId) return;

    // Helper to update local storage favorites (optimistic UI update)
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

  // Handle user rating submission
  const handleRateExhibit = async (rating) => {
    if (!user) return;
    if (!exhibitId) return;
    
    try {
      setIsSubmittingRating(true);
      // Submit rating to API
      await rateExhibit(exhibitId, rating);
      setUserRating(rating);
      
      try {
        // Update local storage ratings to reflect change immediately in UI
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

  // Cleanup audio resources when component unmounts
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [audioRef]);

  // Reset state when switching between exhibits
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlayingAudio(false);
    }
    setAudioError(null);
    setRouteError(null);
  }, [exhibit, audioRef, setIsPlayingAudio, setAudioError, setRouteError]);

  // Format subtitle from categories
  const subtitle = useMemo(() => {
    if (!exhibit) return '';
    let parts = [];
    if (exhibit.category && exhibit.category.length > 0) parts.push(exhibit.category.join(', '));
    // Combine categories into subtitle string
    return parts.join(' | ');
  }, [exhibit]);

  // Aggregate features list for display
  const features = useMemo(() => {
    if (!exhibit) return [];
    let arr = [];
    if (exhibit.features && Array.isArray(exhibit.features)) arr = arr.concat(exhibit.features);
    // Add derived features based on boolean flags
    if (exhibit.wheelchairAccessible) arr.push('Wheelchair Accessible');
    if (exhibit.brailleSupport) arr.push('Braille Support');
    if (exhibit.audioGuideUrl || exhibit.audioGuide) arr.push('Audio Guide');
    // Filter out duplicate audio guide entry
    return arr.filter(f => f !== 'Audio Guide Available');
  }, [exhibit]);

  // Split long description text into multiple pages for readability
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