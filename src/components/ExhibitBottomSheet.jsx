/**
 * ExhibitBottomSheet Component
 * 
 * A multi-page bottom sheet modal that displays comprehensive exhibit information.
 * Implements a three-page layout: Info (basic details), Route (navigation options), 
 * and About (detailed description and features).
 * 
 * Key Features:
 * - Page Navigation: Swipeable pages with dot indicators for Info/Route/About sections
 * - Favorites Management: Toggle favorite status with heart icon, syncs with backend and localStorage
 * - Audio Guide: Plays exhibit audio guides with play/pause controls and error handling
 * - Route Creation: Generates navigation routes from user's current location to the exhibit
 * - Accessibility: Displays wheelchair, braille, and audio guide availability icons
 * - Status Indicators: Visual indicators for open/closed/maintenance status with color coding
 * 
 * State Management:
 * - Tracks current page, favorite status, audio playback state, and route creation
 * - Uses localStorage for favorites persistence and API for backend synchronization
 * - Audio managed via useRef for direct DOM manipulation
 * 
 * Props:
 * @param {boolean} open - Controls visibility of the bottom sheet
 * @param {function} onClose - Callback fired when sheet should close
 * @param {object} exhibit - Exhibit data object containing all display information
 * 
 * Dependencies: useAuth for user context, APIs for favorites/audio/routes, useNavigate for routing
 */
import React from 'react';
import { useExhibitLogic } from '../hooks/useExhibitLogic';
import ExhibitHeader from './ExhibitHeader';
import ExhibitFeatures from './ExhibitFeatures';
import ExhibitActionButtons from './ExhibitActionButtons';
import './ExhibitBottomSheet.css';

const ExhibitBottomSheet = ({ open, onClose, exhibit }) => {
  const {
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
  } = useExhibitLogic(exhibit, onClose);

  if (!open || !exhibit) return null;

  return (
    <div className="exhibit-bottomsheet-backdrop" onClick={() => { setPage(0); onClose(); }}>
      <div
        className="exhibit-bottomsheet"
        onClick={e => e.stopPropagation()}
        style={{ minHeight: 420 }}
      >
        <ExhibitHeader
          exhibit={exhibit}
          user={user}
          isFavourite={isFavourite}
          onToggleFavourite={handleToggleFavourite}
          userRating={userRating}
          onRateExhibit={handleRateExhibit}
          isSubmittingRating={isSubmittingRating}
          subtitle={subtitle}
        />

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

          <ExhibitActionButtons
            isCreatingRoute={isCreatingRoute}
            onCreateRoute={handleCreateRoute}
            pages={pages}
            page={page}
            setPage={setPage}
          />

        <ExhibitFeatures
          features={features}
          isPlayingAudio={isPlayingAudio}
          onPlayAudio={handlePlayAudio}
        />

        {/* Description - moved lower */}
        <div className="exhibit-bottomsheet-description" style={{marginTop: 32, marginBottom: 80, textAlign: 'justify', fontSize: '1.05rem', color: '#222'}}>{pages[page]}</div>
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
      </div>
    </div>
  );
};

export default ExhibitBottomSheet;