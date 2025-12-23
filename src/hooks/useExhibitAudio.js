import { useState, useRef } from 'react';
import { getExhibitAudio } from '../api/exhibits';

/**
 * Custom hook for managing exhibit audio guide playback.
 * Handles fetching audio blobs, playing/pausing, and error states.
 *
 * @param {number|string} exhibitId - The ID of the exhibit to play audio for.
 * @returns {Object} Audio state and control functions.
 */
export const useExhibitAudio = (exhibitId) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioError, setAudioError] = useState(null);
  const audioRef = useRef(null);

  /**
   * Toggles audio playback.
   * If playing, pauses.
   * If stopped, fetches audio (if needed) and plays.
   */
  const handlePlayAudio = async () => {
    if (!exhibitId) return;

    try {
      // Toggle audio playback
      if (isPlayingAudio && audioRef.current) {
        audioRef.current.pause();
        setIsPlayingAudio(false);
      } else {
        // Start playback
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

  // Cleanup is handled by the consumer or we can add useEffect here if we want strict self-containment,
  // but usually audio ref cleanup on unmount is good practice in the component or hook.
  return { isPlayingAudio, audioError, handlePlayAudio, audioRef, setIsPlayingAudio, setAudioError };
};