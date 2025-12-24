import React from 'react';
import Card from './Card';

/**
 * RouteDestinationSelector Component
 * Displays a list of available destinations for route creation.
 *
 * @param {Object} props
 * @param {Array} props.destinations - List of destination objects.
 * @param {boolean} props.loading - Loading state flag.
 * @param {function} props.onSelect - Handler when a destination is selected.
 */
const RouteDestinationSelector = ({ destinations, loading, onSelect }) => {
  return (
    <div className="destinations-section">
      <h2>Select Destination</h2>
      {loading ? (
        <div style={{ textAlign: 'center', padding: 20, color: '#666' }}>Loading destinations...</div>
      ) : destinations.length === 0 ? (
        <div style={{ textAlign: 'center', padding: 20, color: '#999' }}>No destinations available</div>
      ) : (
        <div className="destinations-list" style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 16 }}>
          {/* Render card for each available destination */}
          {destinations.map((dest) => (
            <Card
              key={dest.destination_id}
              className="destination-card"
              onClick={() => onSelect(dest)}
              style={{
                cursor: 'pointer',
                padding: 16,
                border: '2px solid #e3ecd6',
                transition: 'all 0.2s',
              }}
            >
              <div style={{ fontWeight: 600, fontSize: '1.1rem', marginBottom: 4 }}>
                {dest.name || `Destination ${dest.destination_id}`}
              </div>
              {dest.type && (
                <div style={{ fontSize: '0.9rem', color: '#666' }}>
                  Type: {dest.type}
                </div>
              )}
              {dest.coordinates && (
                <div style={{ fontSize: '0.85rem', color: '#999', marginTop: 4 }}>
                  📍 Lat: {dest.coordinates.lat?.toFixed(4)}, Lng: {dest.coordinates.lng?.toFixed(4)}
                </div>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default RouteDestinationSelector;