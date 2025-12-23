/**
 * @file ApiTestPage.jsx
 * @description A development and testing interface for all backend API endpoints.
 * This page provides a UI to trigger and inspect API calls, view their results,
 * and test different authentication scenarios. It's a crucial tool for backend and frontend integration testing.
 */
import React from 'react';
import { ALL_ENDPOINTS } from '../utils/apiEndpoints';
import { ApiTestEndpointCard, ApiTestStats } from '../components';
import { useApiTester } from '../hooks/useApiTester';
import './ApiTestPage.css';

/**
 * Renders the API test page, a dashboard for manually testing all backend endpoints.
 * @returns {JSX.Element} The ApiTestPage component.
 */
const ApiTestPage = () => {
  const {
    results,
    loading,
    connectionStatus,
    authStatus,
    testEndpoint,
    testAllEndpoints,
    checkConnection
  } = useApiTester();

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3000/v1';

  /**
   * Groups endpoints by their 'category' property for organized rendering in the UI.
   * @returns {object} An object where keys are categories and values are arrays of endpoints.
   */
  const getGroupedEndpoints = () => {
    return ALL_ENDPOINTS.reduce((acc, endpoint) => {
      if (!acc[endpoint.category]) {
        acc[endpoint.category] = [];
      }
      acc[endpoint.category].push(endpoint);
      return acc;
    }, {});
  };

  const groupedEndpoints = getGroupedEndpoints();

  return (
    <div className="api-test-page">
      <header className="api-test-header">
        <h1>🧪 MusePath API Test Dashboard</h1>
        <p>A tool to test all backend endpoints with a single click.</p>
        
        <div className="header-actions">
          <div className="connection-status">
            <button onClick={checkConnection} className="btn btn-secondary">
              🔌 Check Connection
            </button>
            {connectionStatus && (
              <div className={`status-badge ${connectionStatus.connected ? 'connected' : 'disconnected'}`}>
                {connectionStatus.connected ? '✓ Connected' : '✗ Disconnected'}
              </div>
            )}
          </div>

          <div className="auth-status">
            {authStatus.loggedIn ? (
              <div className="status-badge connected">
                🔐 Logged in as {authStatus.as}
              </div>
            ) : (
              <div className="status-badge disconnected">
                🔓 Not logged in
              </div>
            )}
          </div>

          <button onClick={testAllEndpoints} className="btn btn-primary">
            ▶️ Test All Endpoints
          </button>

          <div className="api-url">
            <strong>API URL:</strong> {API_BASE_URL}
          </div>
        </div>
      </header>

      {/* Main content area with statistics and endpoint cards */}
      <div className="api-test-content">
        <ApiTestStats 
          total={ALL_ENDPOINTS.length}
          tested={Object.keys(results).length}
          successful={Object.values(results).filter((r) => r.success).length}
          failed={Object.values(results).filter((r) => !r.success).length}
        />

        {/* Render endpoints grouped by category */}
        {Object.entries(groupedEndpoints).map(([category, categoryEndpoints]) => (
          <div key={category} className="endpoint-category">
            <h2 className="category-title">📂 {category}</h2>
            
            <div className="endpoints-grid">
              {categoryEndpoints.map((endpoint) => (
                <ApiTestEndpointCard
                  key={endpoint.id}
                  endpoint={endpoint}
                  loading={loading[endpoint.id]}
                  result={results[endpoint.id]}
                  onTest={testEndpoint}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      <footer className="api-test-footer">
        <p>
          💡 <strong>Tip:</strong> Make sure the backend is running at{' '}
          <code>{API_BASE_URL}</code>
        </p>
        <p>
          📚 For more information, see the <code>README.md</code>
        </p>
      </footer>
    </div>
  );
};

export default ApiTestPage;