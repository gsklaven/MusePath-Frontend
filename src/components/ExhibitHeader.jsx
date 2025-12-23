import React from 'react';

const heartOutline = '/assets/icons/heart_outlined.png';
const heartFilled = '/assets/icons/heart_filled.png';

const statusColors = {
  open: '#BBD689',
  closed: '#F08080',
  under_maintenance: '#FFD580',
};

const ExhibitHeader = ({ 
  exhibit, 
  user, 
  isFavourite, 
  onToggleFavourite, 
  userRating, 
  onRateExhibit, 
  isSubmittingRating,
  subtitle 
}) => {
  return (
    <div className="exhibit-bottomsheet-header" style={{ position: 'relative', paddingTop: 0, paddingBottom: 2 }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8, marginBottom: 0, marginTop: 0 }}>
        {/* Title and rating section */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', flex: 1, minWidth: 0, overflow: 'hidden', gap: 6 }}>
          <h2 style={{ margin: 0, fontWeight: 700, fontSize: '1.35rem', textAlign: 'left', lineHeight: 1.18, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 280 }}>
            {exhibit.name || exhibit.title}
          </h2>
          
          {typeof exhibit.rating === 'number' && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <img
                  src={process.env.PUBLIC_URL + `/assets/icons/star${Math.round(exhibit.rating)}.png`}
                  alt={`Rating: ${exhibit.rating.toFixed(1)}`}
                  style={{ width: 40, height: 40 }}
                />
                <span style={{ fontWeight: 700, fontSize: '1.2rem' }}>{exhibit.rating.toFixed(1)}</span>
                <span style={{ color: '#888', fontSize: '1rem' }}>/ 5</span>
              </span>
              
              {user && (
                <>
                  {/* Interactive star rating for logged-in users */}
                  <span style={{ color: '#888', fontSize: '0.9rem', margin: '0 4px' }}>•</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <img
                        key={star}
                        src={process.env.PUBLIC_URL + `/assets/icons/favourite.png`}
                        alt={`Rate ${star} stars`}
                        onClick={(e) => {
                          e.stopPropagation();
                          onRateExhibit(star);
                        }}
                        style={{ 
                          width: 22, 
                          height: 22, 
                          cursor: isSubmittingRating ? 'wait' : 'pointer',
                          opacity: star <= (userRating || 0) ? 1 : 0.3,
                          transition: 'opacity 0.2s',
                          filter: star <= (userRating || 0) ? 'none' : 'grayscale(100%)',
                          pointerEvents: 'auto'
                        }}
                        title={`Rate ${star} star${star !== 1 ? 's' : ''}`}
                      />
                    ))}
                    {userRating && (
                      <span style={{ fontSize: '0.75rem', color: '#888', marginLeft: 4 }}>
                        Your rating: {userRating}
                      </span>
                    )}
                  </div>
                </>
              )}
            </div>
          )}
          
          {exhibit.location && (
            <div className="exhibit-bottomsheet-location" style={{fontSize: '1rem', color: '#888', marginTop: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 320}}>{exhibit.location}</div>
          )}
        </div>
        {/* Status badge and favorite toggle */}
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
            onClick={onToggleFavourite}
            tabIndex={0}
          />
        </div>
      </div>
      {subtitle && (
        <div className="exhibit-bottomsheet-subtitle" style={{fontSize: '1rem', color: '#555', marginTop: 2}}>{subtitle}</div>
      )}
    </div>
  );
};

export default ExhibitHeader;