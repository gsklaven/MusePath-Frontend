import React from 'react';

const fabStyle = {
  background: 'none',
  border: 'none',
  padding: 0,
  margin: 0,
  width: 40,
  height: 36,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  borderRadius: 12,
  outline: 'none',
};

const imgStyle = { width: 28, height: 28 };

export default function MapFabButton({ icon, alt, ariaLabel, onClick }) {
  return (
    <button
      className="map-fab-btn"
      style={fabStyle}
      aria-label={ariaLabel}
      onClick={onClick}
    >
      <img src={process.env.PUBLIC_URL + icon} alt={alt} style={imgStyle} />
    </button>
  );
}
