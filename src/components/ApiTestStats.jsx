import React from 'react';

/**
 * ApiTestStats Component
 * Displays summary statistics for API tests.
 */
const ApiTestStats = ({ total, tested, successful, failed }) => {
  return (
    <div className="stats-bar">
      {/* Total endpoints count */}
      <div className="stat">
        <span className="stat-label">Total Endpoints:</span>
        <span className="stat-value">{total}</span>
      </div>
      <div className="stat">
        <span className="stat-label">Tested:</span>
        <span className="stat-value">{tested}</span>
      </div>
      <div className="stat">
        <span className="stat-label">Successful:</span>
        <span className="stat-value success">{successful}</span>
      </div>
      <div className="stat">
        <span className="stat-label">Failed:</span>
        <span className="stat-value error">{failed}</span>
      </div>
    </div>
  );
};

export default ApiTestStats;