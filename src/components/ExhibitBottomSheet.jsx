
import React, { useState, useMemo } from 'react';
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
  const [page, setPage] = useState(0);
  const [isFavourite, setIsFavourite] = useState(false);

  useMemo(() => {
    if (exhibit && Array.isArray(exhibit.favouredBy)) {
      setIsFavourite(exhibit.favouredBy.length > 0);
    }
  }, [exhibit]);

  const handleToggleFavourite = (e) => {
    e.stopPropagation();
    setIsFavourite((prev) => !prev);
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
    return arr;
  }, [exhibit]);

  const pages = useMemo(() => {
    if (!exhibit) return [];
    let arr = [];
    if (exhibit.description) arr = arr.concat(splitTextIntoPages(exhibit.description));
    if (exhibit.extraDescription) arr = arr.concat(splitTextIntoPages(exhibit.extraDescription));
    return arr;
  }, [exhibit]);

  if (!open || !exhibit) return null;

  const handleAudio = (e) => {
    e.stopPropagation();
    const url = exhibit.audioGuideUrl || exhibit.audioGuide;
    if (url) {
      const audio = new window.Audio(process.env.PUBLIC_URL + url);
      audio.play();
    }
  };

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
          {/* Bottom action buttons (mockup style) */}
          <div style={{
            position: 'fixed',
            left: '50%',
            bottom: 24,
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: 2,
            zIndex: 1200,
            width: '100%',
            maxWidth: 720,
            justifyContent: 'center',
            padding: '0 24px',
            pointerEvents: 'none', // allow clicks only on buttons
          }}>
            <button
              style={{
                background: '#BBD689',
                color: '#222',
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
              }}
              // TODO: Add onClick handler for Route
            >
              Route
            </button>
            <button
              style={{
                background: '#fff',
                color: '#222',
                border: '2px solid #BBD689',
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
                  <span key={idx} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: '1.12rem', color: '#444', background: '#f5f7f2', borderRadius: 14, padding: '8px 22px', fontWeight: 600, whiteSpace: 'nowrap' }}>
                    <img src={process.env.PUBLIC_URL + featureIcons['Audio Guide']} alt="Audio Guide Available" style={{ width: 24, height: 24, marginRight: 6 }} />
                    Audio Guide Available
                  </span>
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
