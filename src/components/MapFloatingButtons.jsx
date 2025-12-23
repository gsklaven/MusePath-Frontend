import React from 'react';
import MapFabButton from './MapFabButton';

/**
 * MapFloatingButtons Component
 * Container for top-right floating action buttons (Settings, Layers).
 */
const MapFloatingButtons = ({ onSettingsClick, onLayersClick }) => {
  return (
    <div
      style={{
        position: 'absolute',
        top: 20,
        right: 20,
        zIndex: 10,
        background: '#fff',
        borderRadius: 20,
        boxShadow: 'none',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '8px 0',
        width: 44,
        height: 88,
        justifyContent: 'center',
      }}
    >
      <MapFabButton icon="/assets/icons/gear.png" alt="Settings" ariaLabel="Settings" onClick={onSettingsClick} />
      
      {/* Green divider */}
      <div style={{ width: '100%', height: 2, background: '#BBD689', borderRadius: 1, margin: '2px 0' }} />
      
      <MapFabButton icon="/assets/icons/layers-map.png" alt="Map Layers" ariaLabel="Map Layers" onClick={onLayersClick} />
    </div>
  );
};

export default MapFloatingButtons;