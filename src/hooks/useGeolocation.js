import { useState, useEffect } from 'react';

/**
 * Hook for tracking user's real-time geolocation using browser's GPS.
 * Returns {location, error, loading} with continuous position updates.
 */
export const useGeolocation = () => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check browser support
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      setLoading(false);
      return;
    }

    // Watch position for continuous updates
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          accuracy: position.coords.accuracy,
        });
        setError(null);
        setLoading(false);
      },
      (error) => {
        setError(error.message);
        setLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
    );

    // Cleanup on unmount
    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  return { location, error, loading };
};
