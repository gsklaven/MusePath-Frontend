import React from 'react';
import Button from './Button';

/**
 * NavigationMap Component
 * Renders the map view for navigation and location tracking controls.
 *
 * @param {Object} props
 * @param {Object} props.userLocation - Current user coordinates {lat, lng}.
 * @param {boolean} props.locationTracking - Whether live tracking is active.
 * @param {function} props.onToggleTracking - Handler to toggle tracking state.
 */
const NavigationMap = ({ userLocation, locationTracking, onToggleTracking }) => {
  return (
    <div className="navigation-map" style={{ margin: '32px 0 0 0', background: '#f8fafb', borderRadius: 16, boxShadow: '0 2px 12px rgba(44,51,67,0.07)' }}>
      <div className="map-view-nav" style={{ padding: '32px 24px 0 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 0, marginTop: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <img src={process.env.PUBLIC_URL + '/assets/icons/compass.png'} alt="Map" style={{ width: 22, height: 22, verticalAlign: 'middle' }} />
            <h2 style={{ color: '#2C3343', fontWeight: 700, fontSize: 22, margin: 0, textAlign: 'center' }}>Map Navigation</h2>
          </div>
          <Button
            variant="secondary"
            onClick={onToggleTracking}
            style={{ fontWeight: 700 }}
          >
            {locationTracking ? 'Stop Tracking' : 'Start Tracking'}
          </Button>
        </div>
        {userLocation && (
          <div className="muse-location-box" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 200 }}>
            {/* Display user location with live update indicator */}
            <div className="muse-location-label" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
              <img src={process.env.PUBLIC_URL + '/assets/icons/pin.png'} alt="Location" style={{ width: 18, height: 18, verticalAlign: 'middle' }} />
              <span style={{ fontWeight: 600, color: '#2C3343' }}>{locationTracking ? 'Live Location (updating every 5s)' : 'Current Location'}</span>
            </div>
            <div className="muse-location-coords" style={{ textAlign: 'center' }}>
              Lat: {userLocation.lat?.toFixed(6)}, Lng: {userLocation.lng?.toFixed(6)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavigationMap;