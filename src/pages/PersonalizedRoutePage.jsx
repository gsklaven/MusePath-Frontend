import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { formatDuration } from '../utils/formatters';
import Header from '../components/Header';
import Button from '../components/Button';
import Card from '../components/Card';
import './PersonalizedRoutePage.css';

const PersonalizedRoutePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const route = location.state?.route;

  const handleStartNavigation = () => {
    navigate('/navigation', { 
      state: { 
        route,
        destination: { name: 'Personalized Tour' }
      } 
    });
  };

  return (
    <div>
      <Header />
      <div className="container personalized-route-container">
        <Card>
          <h1>🎯 Your Personalized Route</h1>
          
          {route ? (
            <>
              <div className="route-overview">
                <div className="overview-item">
                  <span className="label">Estimated Duration:</span>
                  <span className="value">{route.estimated_duration}</span>
                </div>
                <div className="overview-item">
                  <span className="label">Number of Exhibits:</span>
                  <span className="value">{route.exhibits?.length || 0}</span>
                </div>
              </div>

              <div className="route-exhibits">
                <h2>Exhibits on This Route</h2>
                <div className="exhibits-list">
                  {route.exhibits && route.exhibits.map((exhibitId, index) => (
                    <Card key={exhibitId} className="exhibit-item">
                      <div className="exhibit-number">{index + 1}</div>
                      <div className="exhibit-info">
                        <span className="exhibit-name">Exhibit #{exhibitId}</span>
                        <button 
                          className="view-details-btn"
                          onClick={() => navigate(`/exhibit/${exhibitId}`)}
                        >
                          View Details →
                        </button>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              <div className="route-actions">
                <Button variant="secondary" onClick={() => navigate('/map')}>
                  ← Back to Map
                </Button>
                <Button variant="success" onClick={handleStartNavigation}>
                  🧭 Start Navigation
                </Button>
              </div>
            </>
          ) : (
            <div className="no-route">
              <p>No personalized route available.</p>
              <Button variant="primary" onClick={() => navigate('/questionnaire')}>
                Complete Your Preferences
              </Button>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default PersonalizedRoutePage;
