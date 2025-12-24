import React from 'react';

/**
 * MapMarkers Component
 * Renders a list of exhibit markers on the map.
 */
const MapMarkers = ({ exhibits, onMarkerClick }) => {
  return (
    <>
      {exhibits.map((exhibit) => (
        <img
          key={exhibit.exhibitId}
          src={process.env.PUBLIC_URL + exhibit.icon}
          alt={exhibit.name}
          className="map-marker-monument"
          style={{
            left: exhibit.mapPosition.left,
            top: exhibit.mapPosition.top,
            position: 'absolute',
            zIndex: 2,
            width: 40,
            height: 40,
            cursor: 'pointer',
          }}
          tabIndex={0}
          onClick={() => onMarkerClick(exhibit)}
        />
      ))}
    </>
  );
};

export default MapMarkers;