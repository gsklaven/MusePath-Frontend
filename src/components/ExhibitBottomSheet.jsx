import React, { useState, useMemo, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { addToFavourites, removeFromFavourites, getUserCoordinates } from '../api/users';
import { getExhibitAudio } from '../api/exhibits';
import { createRoute } from '../api/routes';
import './ExhibitBottomSheet.css';

const featureIcons = {
  'Wheelchair Accessible': '/assets/icons/wheelchair.png',
  'Braille Support': '/assets/icons/braille.png',
  'Audio Guide': '/assets/icons/audio.png',
};

const heartOutline = '/assets/icons/heart_outlined.png';
const heartFilled = '/assets/icons/heart_filled.png';

const statusColors = {
  open: '#BBD689',
  closed: '#F08080',
  under_maintenance: '#FFD580',
};

const ExhibitBottomSheet = ({ open, onClose, exhibit }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [isFavourite, setIsFavourite] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioError, setAudioError] = useState(null);
  const [isCreatingRoute, setIsCreatingRoute] = useState(false);
  const [routeError, setRouteError] = useState(null);
  const audioRef = useRef(null);

  useMemo(() => {
    if (exhibit) {
      // Check if exhibit is in localStorage favourites
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

    try {
      if (isFavourite) {
        // Remove from favourites
        await removeFromFavourites(user?.id || 1, exhibitId);
        
        // Update localStorage
        const storedFavourites = JSON.parse(localStorage.getItem('favourites') || '[]');
        const updatedFavourites = storedFavourites.filter(fav => fav.exhibit_id !== exhibitId);
        localStorage.setItem('favourites', JSON.stringify(updatedFavourites));
        
        setIsFavourite(false);
      } else {
        // Add to favourites
        await addToFavourites(user?.id || 1, exhibitId);
        
        // Update localStorage
        const storedFavourites = JSON.parse(localStorage.getItem('favourites') || '[]');
        const newFavourite = {
          exhibit_id: exhibitId,
          title: exhibit.title || exhibit.name,
          subtitle: exhibit.subtitle,
        };
        storedFavourites.push(newFavourite);
        localStorage.setItem('favourites', JSON.stringify(storedFavourites));
        
        setIsFavourite(true);
      }
    } catch (err) {
      console.error('Error toggling favourite:', err);
    }
  };

  // Audio Guide Handler
  const handlePlayAudio = async () => {
    const exhibitId = exhibit?.exhibit_id || exhibit?.exhibitId;
    if (!exhibitId) return;

    try {
      if (isPlayingAudio && audioRef.current) {
        // Pause audio
        audioRef.current.pause();
        setIsPlayingAudio(false);
      } else {
        // Load and play audio
        setAudioError(null);
        console.log('🎵 API Call: GET /exhibits/%s/audio', String(exhibitId));
        
        const audioBlob = await getExhibitAudio(exhibitId, 'online');
        const audioUrl = URL.createObjectURL(audioBlob);
        
        // Create or update audio element
        if (!audioRef.current) {
          audioRef.current = new Audio(audioUrl);
          audioRef.current.onended = () => setIsPlayingAudio(false);
        } else {
          audioRef.current.src = audioUrl;
        }
        
        await audioRef.current.play();
        setIsPlayingAudio(true);
        console.log('✅ Audio playing for exhibit %s', String(exhibitId));
      }
    } catch (err) {
      console.error('❌ Error playing audio:', err);
      setAudioError('Failed to load audio guide');
      setIsPlayingAudio(false);
    }
  };

  // Cleanup audio on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // Reset audio when exhibit changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlayingAudio(false);
    }
    setAudioError(null);
    setRouteError(null);
  }, [exhibit]);

  // Create Route with User Location
  const handleCreateRoute = async () => {
    const exhibitId = exhibit?.exhibit_id || exhibit?.exhibitId;
    if (!exhibitId) return;

    try {
      setIsCreatingRoute(true);
      setRouteError(null);

      // Use user ID 1 as default for mock data
      const userId = (user?.id && typeof user.id === 'number' && user.id < 1000000) ? user.id : 1;

      // Step 1: Get user's current location
      console.log('📍 Getting user location for route creation (userId: %s)...', String(userId));
      const userCoords = await getUserCoordinates(userId);

      if (!userCoords || (!userCoords.latitude && !userCoords.lat) || (!userCoords.longitude && !userCoords.lng)) {
        throw new Error('Could not get your current location');
      }

      // Handle both latitude/longitude and lat/lng formats
      const lat = userCoords.latitude || userCoords.lat;
      const lng = userCoords.longitude || userCoords.lng;
      
      console.log('✅ User location: %s, %s', String(lat), String(lng));

      // Step 2: Create route from user location to exhibit
      console.log('🗺️ Creating route to exhibit %s...', String(exhibitId));
      const routeData = {
        user_id: userId,
        destination_id: exhibitId,
        startLat: lat,
        startLng: lng,
      };

      const newRoute = await createRoute(routeData);
      console.log(`✅ Route created successfully:`, newRoute);

      // Step 3: Navigate to NavigationPage with the new route
      onClose(); // Close the bottom sheet
      navigate('/navigation', { state: { route: newRoute } });
    } catch (err) {
      console.error('❌ Error creating route:', err);
      setRouteError(err.message || 'Failed to create route. Please try again.');
    } finally {
      setIsCreatingRoute(false);
    }
  };

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

  const subtitle = useMemo(() => {
    if (!exhibit) return '';
    let parts = [];
    if (exhibit.category && exhibit.category.length > 0) parts.push(exhibit.category.join(', '));
    if (exhibit.historicalInfo) parts.push(exhibit.historicalInfo);
    return parts.join(' | ');
  }, [exhibit]);

  const features = useMemo(() => {
    if (!exhibit) return [];
    let arr = [];
    if (exhibit.features && Array.isArray(exhibit.features)) arr = arr.concat(exhibit.features);
    if (exhibit.wheelchairAccessible) arr.push('Wheelchair Accessible');
    if (exhibit.brailleSupport) arr.push('Braille Support');
    if (exhibit.audioGuideUrl || exhibit.audioGuide) arr.push('Audio Guide');
    // Remove 'Audio Guide Available' to avoid duplicate button
    return arr.filter(f => f !== 'Audio Guide Available');
  }, [exhibit]);

  const pages = useMemo(() => {
    if (!exhibit) return [];
    let arr = [];
    if (exhibit.description) arr = arr.concat(splitTextIntoPages(exhibit.description));
    if (exhibit.extraDescription) arr = arr.concat(splitTextIntoPages(exhibit.extraDescription));
    return arr;
  }, [exhibit]);

  if (!open || !exhibit) return null;

  return (
    <div className="exhibit-bottomsheet-backdrop" onClick={() => { setPage(0); onClose(); }}>
      <div
        className="exhibit-bottomsheet"
        onClick={e => e.stopPropagation()}
        style={{ minHeight: 420 }}
      >
        <div className="exhibit-bottomsheet-header" style={{ position: 'relative', paddingTop: 0, paddingBottom: 2 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8, marginBottom: 0, marginTop: 0 }}>
            {/* Title and star rating in a column, location below title */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', flex: 1, minWidth: 0, overflow: 'hidden', gap: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0, marginBottom: 0 }}>
                <h2 style={{ margin: 0, fontWeight: 700, fontSize: '1.35rem', textAlign: 'left', lineHeight: 1.18, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 220 }}>
                  {exhibit.name || exhibit.title}
                </h2>
                {typeof exhibit.rating === 'number' && (
                  <span style={{ display: 'flex', alignItems: 'center', gap: 6, marginLeft: 6 }}>
                    <img
                      src={process.env.PUBLIC_URL + `/assets/icons/star${Math.round(exhibit.rating)}.png`}
                      alt={`Rating: ${exhibit.rating.toFixed(1)}`}
                      style={{ width: 48, height: 48, marginRight: 4 }}
                    />
                    <span style={{ fontWeight: 700, fontSize: '1.32rem', marginLeft: 4 }}>{exhibit.rating.toFixed(1)}</span>
                    <span style={{ color: '#888', fontSize: '1.12rem', marginLeft: 2 }}>/ 5</span>
                  </span>
                )}
              </div>
              {exhibit.location && (
                <div className="exhibit-bottomsheet-location" style={{fontSize: '1rem', color: '#888', marginTop: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 320}}>{exhibit.location}</div>
              )}
            </div>
            {/* Open indicator and heart icon at top right */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 2 }}>
              {exhibit.status && (
                <span style={{
                  background: statusColors[exhibit.status] || '#eee',
                  color: '#222',
                  borderRadius: 12,
                  padding: '3px 12px',
                  fontSize: '0.98rem',
                  fontWeight: 700,
                  letterSpacing: 0.5,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                  minWidth: 0,
                  whiteSpace: 'nowrap',
                  maxWidth: 80,
                  textOverflow: 'ellipsis',
                  overflow: 'hidden',
                  display: 'inline-block',
                }}>
                  {exhibit.status.charAt(0).toUpperCase() + exhibit.status.slice(1).replace('_', ' ')}
                </span>
              )}
              <img
                src={process.env.PUBLIC_URL + (isFavourite ? heartFilled : heartOutline)}
                alt={isFavourite ? 'Remove from favourites' : 'Add to favourites'}
                style={{ width: 32, height: 32, cursor: 'pointer', zIndex: 20, marginLeft: 0 }}
                onClick={handleToggleFavourite}
                tabIndex={0}
              />
            </div>
          </div>
          {subtitle && (
            <div className="exhibit-bottomsheet-subtitle" style={{fontSize: '1rem', color: '#555', marginTop: 2}}>{subtitle}</div>
          )}
          {/* Audio Error Message */}
          {audioError && (
            <div style={{
              background: '#FFE6E6',
              color: '#D32F2F',
              padding: '10px 16px',
              borderRadius: 8,
              marginTop: 12,
              fontSize: '0.95rem',
              fontWeight: 600,
            }}>
              ❌ {audioError}
            </div>
          )}
          {/* Route Error Message */}
          {routeError && (
            <div style={{
              background: '#FFE6E6',
              color: '#D32F2F',
              padding: '10px 16px',
              borderRadius: 8,
              marginTop: 12,
              fontSize: '0.95rem',
              fontWeight: 600,
            }}>
              ❌ {routeError}
            </div>
          )}
          {/* Bottom action buttons (mockup style) */}
          <div style={{
            position: 'fixed',
            left: '50%',
            bottom: 24,
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: 16,
            zIndex: 1200,
            width: '100%',
            maxWidth: 720,
            justifyContent: 'center',
            padding: '0 24px',
            pointerEvents: 'none', // allow clicks only on buttons
          }}>
            <button
              onClick={handleCreateRoute}
              disabled={isCreatingRoute}
              style={{
                background: isCreatingRoute ? '#ccc' : '#BBD689',
                color: '#2C3343',
                border: 'none',
                borderRadius: 16,
                padding: '12px 32px',
                fontWeight: 700,
                fontSize: '1.08rem',
                cursor: isCreatingRoute ? 'not-allowed' : 'pointer',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                fontFamily: 'Montserrat, sans-serif',
                letterSpacing: 0.2,
                minWidth: 120,
                pointerEvents: 'auto',
                opacity: isCreatingRoute ? 0.6 : 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 10,
              }}
            >
              {isCreatingRoute ? (
                <>
                  <img
                    src={process.env.PUBLIC_URL + '/assets/icons/route.png'}
                    alt="Creating route"
                    style={{ width: 22, height: 22, verticalAlign: 'middle', filter: 'brightness(0) saturate(100%) invert(18%) sepia(12%) saturate(1162%) hue-rotate(181deg) brightness(97%) contrast(92%)' }}
                  />
                  <span style={{ color: '#2C3343', fontWeight: 700, fontSize: '1.08rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Creating...</span>
                </>
              ) : (
                <>
                  <img
                    src={process.env.PUBLIC_URL + '/assets/icons/route.png'}
                    alt="Navigate icon"
                    style={{ width: 22, height: 22, verticalAlign: 'middle', filter: 'brightness(0) saturate(100%) invert(18%) sepia(12%) saturate(1162%) hue-rotate(181deg) brightness(97%) contrast(92%)' }}
                  />
                  <span style={{ color: '#2C3343', fontWeight: 700, fontSize: '1.08rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Navigate</span>
                </>
              )}
            </button>
            <button
              style={{
                background: '#BBD689',
                color: '#2C3343',
                border: 'none',
                borderRadius: 16,
                padding: '12px 32px',
                fontWeight: 700,
                fontSize: '1.08rem',
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                fontFamily: 'Montserrat, sans-serif',
                letterSpacing: 0.2,
                minWidth: 120,
                pointerEvents: 'auto',
                opacity: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 10,
              }}
              // TODO: Add onClick handler for More Details
            >
              More Details
            </button>
          </div>
        </div>
        {/* Features */}
        {features.length > 0 && (
          <div className="exhibit-bottomsheet-features" style={{ display: 'flex', flexWrap: 'wrap', gap: 22, rowGap: 12, marginTop: 18, marginBottom: 18, alignItems: 'flex-start', justifyContent: 'flex-start' }}>
            {features.map((feature, idx) => {
              if (feature === 'Audio Guide') {
                return (
                  <button
                    key={idx}
                    onClick={handlePlayAudio}
                    style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: 10, 
                      fontSize: '1.12rem', 
                      color: '#444', 
                      background: isPlayingAudio ? '#BBD689' : '#f5f7f2', 
                      borderRadius: 14, 
                      padding: '8px 22px', 
                      fontWeight: 600, 
                      whiteSpace: 'nowrap',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'background 0.3s ease',
                      fontFamily: 'Montserrat, sans-serif',
                    }}
                  >
                    {featureIcons[feature] && (
                      <img
                        src={process.env.PUBLIC_URL + featureIcons[feature]}
                        alt={feature}
                        style={{ width: 20, height: 20, objectFit: 'contain' }}
                      />
                    )}
                    {isPlayingAudio ? '⏸ Pause Audio' : 'Audio Guide Available'}
                  </button>
                );
              } else if (featureIcons[feature]) {
                return (
                  <span key={idx} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: '1.12rem', color: '#444', background: '#f5f7f2', borderRadius: 14, padding: '8px 22px', fontWeight: 600, whiteSpace: 'nowrap' }}>
                    <img src={process.env.PUBLIC_URL + featureIcons[feature]} alt={feature} style={{ width: 24, height: 24, marginRight: 6 }} />
                    {feature}
                  </span>
                );
              } else {
                return (
                  <span key={idx} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: '1.12rem', color: '#444', background: '#f5f7f2', borderRadius: 14, padding: '8px 22px', fontWeight: 600, whiteSpace: 'nowrap' }}>
                    {feature}
                  </span>
                );
              }
            })}
          </div>
        )}
        {/* Description - moved lower */}
        <div className="exhibit-bottomsheet-description" style={{marginTop: 32, textAlign: 'justify', fontSize: '1.05rem', color: '#222'}}>{pages[page]}</div>
        {pages.length > 1 && (
          <div className="exhibit-bottomsheet-indicator" style={{marginTop: 12, textAlign: 'center'}}>
            {pages.map((_, idx) => (
              <span
                key={idx}
                className={"dot" + (page === idx ? " active" : "")}
                onClick={() => setPage(idx)}
                style={{ cursor: 'pointer', display: 'inline-block', width: 10, height: 10, borderRadius: '50%', background: page === idx ? '#b2c48c' : '#e3ecd6', margin: '0 4px' }}
              ></span>
            ))}
          </div>
        )}
        {/* Status indicator at bottom center, longer pill */}
        {false && exhibit.status && (
          <div style={{ position: 'absolute', left: '50%', bottom: 18, transform: 'translateX(-50%)', zIndex: 10 }}>
            <span style={{ background: statusColors[exhibit.status] || '#eee', color: '#222', borderRadius: 16, padding: '6px 48px', fontSize: '1.12rem', fontWeight: 700, letterSpacing: 1, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
              {exhibit.status.charAt(0).toUpperCase() + exhibit.status.slice(1).replace('_', ' ')}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExhibitBottomSheet;
