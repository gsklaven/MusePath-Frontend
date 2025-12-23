import React from 'react';

/**
 * RouteStopList Component
 * Displays the list of selected intermediate stops.
 *
 * @param {Object} props
 * @param {Array} props.stops - Array of selected stop objects.
 * @param {function} props.onRemove - Handler to remove a stop by index.
 */
const RouteStopList = ({ stops, onRemove }) => {
  if (!stops || stops.length === 0) return null;

  return (
    <div className="route-item">
      <label>Stops ({stops.length})</label>
      <div className="stops-list">
        {/* Render each stop with a remove button */}
        {stops.map((stop, index) => (
          <div key={index} className="stop-item">
            <span>{stop.title}</span>
            <button onClick={() => onRemove(index)}>✕</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RouteStopList;