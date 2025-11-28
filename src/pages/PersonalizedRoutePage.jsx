import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getPersonalizedRoute } from '../api/routes';
import Button from '../components/Button';
import Card from '../components/Card';
import './PersonalizedRoutePage.css';

const PersonalizedRoutePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [route, setRoute] = useState(location.state?.route);
  const [loading, setLoading] = useState(!location.state?.route);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!route) {
      loadPersonalizedRoute();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadPersonalizedRoute = async () => {
    try {
      setLoading(true);
      console.log('🎯 Loading personalized route for user:', user?.id || 1);
      
      const data = await getPersonalizedRoute(user?.id || 1);
      const routeData = data && data.data ? data.data : data;
      
      setRoute(routeData);
      setLoading(false);
    } catch (err) {
      console.error('Error loading personalized route:', err);
      setError('Failed to load personalized route. Please complete your preferences first.');
      setLoading(false);
    }
  };

  const handleStartNavigation = () => {
    navigate('/navigation', { 
      state: { 
        route,
        destination: { name: 'Personalized Tour' }
      } 
    });
  };

  if (loading) {
    return (
      <div style={{ background: '#2C3343', minHeight: '100vh', width: '100%' }}>
        <div className="container personalized-route-container">
          <Card>
            <div style={{ textAlign: 'center', padding: '40px 20px' }}>
              <div style={{ fontSize: '1.2rem', color: '#BBD689' }}>Loading your personalized route...</div>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: '#2C3343', minHeight: '100vh', width: '100%' }}>
      <div className="container personalized-route-container">
        <Card>
          <h1 style={{ color: '#BBD689', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, textAlign: 'center', marginBottom: 32 }}>
            <img src={process.env.PUBLIC_URL + '/assets/icons/route.png'} alt="Route" style={{ width: 32, height: 32, verticalAlign: 'middle' }} />
            <span style={{ fontWeight: 700, fontSize: '2.1rem', letterSpacing: 0.5 }}>Your Personalized Route</span>
          </h1>
          {error ? (
            <div className="no-route">
              <p style={{ color: '#BBD689', marginBottom: 20 }}>{error}</p>
              <Button variant="primary" onClick={() => navigate('/questionnaire')}>
                Complete Your Preferences
              </Button>
            </div>
          ) : route ? (
            <>
              <div className="route-overview">
                <div className="overview-item">
                  <span className="label">Estimated Duration:</span>
                  <span className="value" style={{ color: '#222' }}>{route.estimated_duration || 'N/A'}</span>
                </div>
                <div className="overview-item">
                  <span className="label">Number of Exhibits:</span>
                  <span className="value" style={{ color: '#222' }}>{route.exhibits?.length || 0}</span>
                </div>
                {route.total_distance && (
                  <div className="overview-item">
                    <span className="label">Total Distance:</span>
                    <span className="value">{route.total_distance}m</span>
                  </div>
                )}
              </div>

              <div className="route-exhibits">
                <h2 style={{ color: '#2C3343', display: 'flex', alignItems: 'center', gap: 10 }}>
                  <img src={process.env.PUBLIC_URL + '/assets/icons/museum.png'} alt="Exhibits" style={{ width: 24, height: 24, verticalAlign: 'middle' }} />
                  Exhibits on This Route
                </h2>
                <div className="exhibits-list">
                  {route.exhibits && route.exhibits.map((exhibitId, index) => (
                    <Card key={exhibitId} className="exhibit-item">
                      <div className="exhibit-number">{index + 1}</div>
                      <div className="exhibit-info">
                        <span className="exhibit-name">Exhibit #{exhibitId}</span>
                        <button 
                          className="view-details-btn"
                          onClick={() => navigate(`/map`)}
                          style={{
                            background: '#BBD689',
                            color: '#2C3343',
                            border: 'none',
                            borderRadius: 8,
                            padding: '6px 12px',
                            cursor: 'pointer',
                            fontWeight: 600,
                            display: 'flex',
                            alignItems: 'center',
                            gap: 6
                          }}
                        >
                          <img src={process.env.PUBLIC_URL + '/assets/icons/plus_thin.png'} alt="Details" style={{ width: 14, height: 14, verticalAlign: 'middle' }} />
                          View Details
                        </button>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              <div className="route-actions">
                <Button variant="secondary" onClick={() => navigate('/map')}>
                  <img src={process.env.PUBLIC_URL + '/assets/icons/back.png'} alt="Back" style={{ width: 18, height: 18, verticalAlign: 'middle', marginRight: 6 }} />
                  Back to Map
                </Button>
                <Button
                  variant="success"
                  onClick={handleStartNavigation}
                  style={{
                    background: '#BBD689',
                    color: '#2C3343',
                    border: 'none',
                    borderRadius: 8,
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    justifyContent: 'center',
                    textAlign: 'center',
                  }}
                >
                  <img src={process.env.PUBLIC_URL + '/assets/icons/distance.png'} alt="Start Navigation" style={{ width: 20, height: 20, verticalAlign: 'middle', marginRight: 6 }} />
                  Start Navigation
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
