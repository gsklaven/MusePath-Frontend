import React from 'react';

/**
 * MapRouteButton Component
 * Floating button to trigger personalized route generation.
 */
const MapRouteButton = ({ onClick }) => {
  return (
    <button
      className="generate-route-btn"
      style={{
        position: 'absolute',
        left: '50%',
        bottom: 96,
        transform: 'translateX(-50%)',
        background: 'rgba(255,255,255,0.75)',
        color: '#222',
        border: 'none',
        borderRadius: 20,
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        fontSize: '1.08rem',
        fontWeight: 600,
        padding: '14px 22px 14px 16px',
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        zIndex: 10,
        cursor: 'pointer',
        fontFamily: 'Montserrat, sans-serif',
        transition: 'transform 0.18s cubic-bezier(.4,1.3,.6,1)',
      }}
      onClick={onClick}
      onMouseEnter={e => e.currentTarget.style.transform = 'translateX(-50%) scale(1.07)'}
      onMouseLeave={e => e.currentTarget.style.transform = 'translateX(-50%)'}
    >
      <img
        src={process.env.PUBLIC_URL + '/assets/icons/sparkle.png'}
        alt="Sparkle"
        style={{ marginRight: 6, width: 32, height: 32, verticalAlign: 'middle', opacity: 1 }}
      />
      <span style={{marginLeft: 0, opacity: 1}}>Generate Personalized Route</span>
    </button>
  );
};

export default MapRouteButton;