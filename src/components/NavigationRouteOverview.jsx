import React from 'react';
import { formatDuration, formatDistance } from '../utils/formatters';

/**
 * NavigationRouteOverview Component
 * Displays key metrics for the active route: Distance, ETA, and Arrival Time.
 *
 * @param {Object} props
 * @param {Object} props.routeDetails - Object containing distance, estimatedTime, etc.
 */
const NavigationRouteOverview = ({ routeDetails }) => {
  if (!routeDetails) return null;

  return (
    <div className="route-overview">
      <div style={{ display: 'flex', flexDirection: 'row', gap: 12, justifyContent: 'center', width: '100%' }}>
        {/* Distance Card */}
        <div className="overview-item" style={{ background: '#f7faf4', padding: '10px 12px', borderRadius: 10, display: 'flex', flexDirection: 'column', gap: 4, boxShadow: '0 1px 4px rgba(0,0,0,0.03)', minWidth: 110, maxWidth: 140, alignItems: 'flex-start' }}>
          <span className="label" style={{ fontSize: 13, color: 'var(--text-secondary)', fontWeight: 600, letterSpacing: 0.1 }}>Distance:</span>
          <span className="value" style={{ color: '#222', fontSize: '1.2rem', fontWeight: 700 }}>{formatDistance(routeDetails.distance)}</span>
        </div>
        {/* ETA Card */}
        <div className="overview-item" style={{ background: '#f7faf4', padding: '10px 12px', borderRadius: 10, display: 'flex', flexDirection: 'column', gap: 4, boxShadow: '0 1px 4px rgba(0,0,0,0.03)', minWidth: 110, maxWidth: 140, alignItems: 'flex-start' }}>
          <span className="label" style={{ fontSize: 13, color: 'var(--text-secondary)', fontWeight: 600, letterSpacing: 0.1 }}>ETA:</span>
          <span className="value" style={{ color: '#222', fontSize: '1.2rem', fontWeight: 700 }}>{formatDuration(routeDetails.estimatedTime)}</span>
        </div>
        {/* Arrival Time Card */}
        <div className="overview-item" style={{ background: '#f7faf4', padding: '10px 12px', borderRadius: 10, display: 'flex', flexDirection: 'column', gap: 4, boxShadow: '0 1px 4px rgba(0,0,0,0.03)', minWidth: 110, maxWidth: 140, alignItems: 'flex-start' }}>
          <span className="label" style={{ fontSize: 13, color: 'var(--text-secondary)', fontWeight: 600, letterSpacing: 0.1 }}>Arrival:</span>
          <span className="value" style={{ color: '#222', fontSize: '1.2rem', fontWeight: 700 }}>{routeDetails.arrivalTime || 'N/A'}</span>
        </div>
      </div>
    </div>
  );
};

export default NavigationRouteOverview;