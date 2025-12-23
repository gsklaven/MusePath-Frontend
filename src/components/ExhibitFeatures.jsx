import React from 'react';

const featureIcons = {
  'Wheelchair Accessible': '/assets/icons/wheelchair.png',
  'Braille Support': '/assets/icons/braille.png',
  'Audio Guide': '/assets/icons/audio.png',
};

const ExhibitFeatures = ({ features, isPlayingAudio, onPlayAudio }) => {
  if (!features || features.length === 0) return null;

  return (
    <div className="exhibit-bottomsheet-features" style={{ display: 'flex', flexWrap: 'wrap', gap: 22, rowGap: 12, marginTop: 18, marginBottom: 18, alignItems: 'flex-start', justifyContent: 'flex-start' }}>
      {features.map((feature, idx) => {
        // Render audio guide button differently
        if (feature === 'Audio Guide') {
          return (
            <button
              key={idx}
              onClick={onPlayAudio}
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
          // Render features with icons
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
  );
};

export default ExhibitFeatures;