import React from 'react';

/**
 * ApiTestEndpointCard Component
 * Renders a single API endpoint card with test controls and results.
 */
const ApiTestEndpointCard = ({ endpoint, loading, result, onTest }) => {
  return (
    <div className="endpoint-card">
      {/* Header section with method badge and run button */}
      <div className="endpoint-header">
        <div className="endpoint-info">
          <span className={`method-badge ${endpoint.method.toLowerCase()}`}>
            {endpoint.method}
          </span>
          <h3>{endpoint.name}</h3>
          {endpoint.requiresAuth && (
            <span className="auth-badge">
              {endpoint.requiresAuth === 'admin' ? '🔒 Admin' : '🔐 User'}
            </span>
          )}
        </div>
        <button
          onClick={() => onTest(endpoint)}
          disabled={loading}
          className="btn btn-test"
        >
          {loading ? '⏳ Testing...' : '▶️ Run'}
        </button>
      </div>

      {/* Endpoint description and path display */}
      <div className="endpoint-details">
        <p className="endpoint-description">{endpoint.description}</p>
        <code className="endpoint-path">{endpoint.path}</code>
      </div>

      {/* Display sample request body if available */}
      {endpoint.sampleData && (
        <details className="sample-data">
          <summary>📝 Sample Request Body</summary>
          <pre>{JSON.stringify(
            typeof endpoint.sampleData === 'function' 
              ? endpoint.sampleData() 
              : endpoint.sampleData, 
            null, 
            2
          )}</pre>
        </details>
      )}

      {/* Display the result of the API test */}
      {result && (
        <div className={`result-box ${result.success ? 'success' : 'error'}`}>
          <div className="result-header">
            <span className="result-status">
              {result.success ? '✓' : '✗'} 
              Status: {result.status}
            </span>
            <span className="result-duration">
              ⏱️ {result.duration}ms
            </span>
          </div>

          {result.error ? (
            <div className="result-error">
              <strong>Error:</strong> {result.error}
            </div>
          ) : (
            <details className="result-data" open={result.success}>
              <summary>📦 Response Data</summary>
              <pre>{JSON.stringify(result.data, null, 2)}</pre>
            </details>
          )}
        </div>
      )}
    </div>
  );
};

export default ApiTestEndpointCard;