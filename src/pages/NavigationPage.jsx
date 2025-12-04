import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getRouteDetails, deleteRoute } from '../api/routes';
import { getUserCoordinates, updateUserCoordinates } from '../api/users';
import { formatDuration, formatDistance } from '../utils/formatters';
import Button from '../components/Button';
import Card from '../components/Card';
import './NavigationPage.css';

/**
 * Navigation page showing route steps and real-time location tracking.
 * Displays turn-by-turn directions with live user position updates.
 */
const NavigationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  // Get route data from navigation state
  const routeData = location.state?.route;
  const destination = location.state?.destination;
  const stops = location.state?.stops || [];
  
  const [routeDetails, setRouteDetails] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [userLocation, setUserLocation] = useState(null);
  const [locationTracking, setLocationTracking] = useState(false);

  useEffect(() => {
    // Load route details if available
    if (routeData?.route_id) {
      loadRouteDetails();
    }
    loadUserLocation();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [routeData]);

  // Track location every 5 seconds when tracking is enabled
  useEffect(() => {
    let interval;
    if (locationTracking) {
      interval = setInterval(() => {
        trackUserLocation();
      }, 5000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locationTracking]);

  const loadUserLocation = async () => {
    try {
      console.log('📍 Loading user location...');
      const data = await getUserCoordinates(user?.id || 1);
      const coords = data && data.data ? data.data : data;
      
      setUserLocation(coords);
    } catch (err) {
      console.error('Error loading user location:', err);
    }
  };

  const trackUserLocation = async () => {
    // Simulate location update (in real app, would use navigator.geolocation)
    try {
      const newLat = (userLocation?.lat || 40.7610) + (Math.random() - 0.5) * 0.001;
      const newLng = (userLocation?.lng || -73.9780) + (Math.random() - 0.5) * 0.001;
      
      console.log('📍 Updating user location:', { lat: newLat, lng: newLng });
      
      await updateUserCoordinates(user?.id || 1, newLat, newLng);
      setUserLocation({ lat: newLat, lng: newLng });
    } catch (err) {
      console.error('Error updating location:', err);
    }
  };

  const loadRouteDetails = async () => {
    try {
      const details = await getRouteDetails(routeData.route_id);
      setRouteDetails(details);
    } catch (err) {
      console.error('Failed to load route details:', err);
    }
  };

  const handleCancelNavigation = async () => {
    try {
      await deleteRoute(routeData.route_id);
      navigate('/map');
    } catch (err) {
      console.error('Failed to cancel navigation:', err);
      navigate('/map');
    }
  };

  const handleNextStep = () => {
    if (routeDetails && currentStep < routeDetails.instructions.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div style={{ background: '#2C3343', minHeight: '100vh', width: '100%' }}>
      <div className="container personalized-route-container">
        <Card>
          <h1 style={{ color: '#BBD689', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, textAlign: 'center', marginBottom: 32 }}>
            <span style={{ fontWeight: 700, fontSize: '2.1rem', letterSpacing: 0.5 }}>
              {destination?.name ? `Navigating to ${destination.name}` : (routeDetails?.monumentName ? `Navigating to ${routeDetails.monumentName}` : 'Navigation')}
            </span>
          </h1>
          <div className="route-overview">
            {routeDetails && (
              <div style={{ display: 'flex', flexDirection: 'row', gap: 12, justifyContent: 'center', width: '100%' }}>
                <div className="overview-item" style={{ background: '#f7faf4', padding: '10px 12px', borderRadius: 10, display: 'flex', flexDirection: 'column', gap: 4, boxShadow: '0 1px 4px rgba(0,0,0,0.03)', minWidth: 110, maxWidth: 140, alignItems: 'flex-start' }}>
                  <span className="label" style={{ fontSize: 13, color: 'var(--text-secondary)', fontWeight: 600, letterSpacing: 0.1 }}>Distance:</span>
                  <span className="value" style={{ color: '#222', fontSize: '1.2rem', fontWeight: 700 }}>{formatDistance(routeDetails.distance)}</span>
                </div>
                <div className="overview-item" style={{ background: '#f7faf4', padding: '10px 12px', borderRadius: 10, display: 'flex', flexDirection: 'column', gap: 4, boxShadow: '0 1px 4px rgba(0,0,0,0.03)', minWidth: 110, maxWidth: 140, alignItems: 'flex-start' }}>
                  <span className="label" style={{ fontSize: 13, color: 'var(--text-secondary)', fontWeight: 600, letterSpacing: 0.1 }}>ETA:</span>
                  <span className="value" style={{ color: '#222', fontSize: '1.2rem', fontWeight: 700 }}>{formatDuration(routeDetails.estimatedTime)}</span>
                </div>
                <div className="overview-item" style={{ background: '#f7faf4', padding: '10px 12px', borderRadius: 10, display: 'flex', flexDirection: 'column', gap: 4, boxShadow: '0 1px 4px rgba(0,0,0,0.03)', minWidth: 110, maxWidth: 140, alignItems: 'flex-start' }}>
                  <span className="label" style={{ fontSize: 13, color: 'var(--text-secondary)', fontWeight: 600, letterSpacing: 0.1 }}>Arrival:</span>
                  <span className="value" style={{ color: '#222', fontSize: '1.2rem', fontWeight: 700 }}>{routeDetails.arrivalTime || 'N/A'}</span>
                </div>
              </div>
            )}
          </div>

          <div className="navigation-map" style={{ margin: '32px 0 0 0', background: '#f8fafb', borderRadius: 16, boxShadow: '0 2px 12px rgba(44,51,67,0.07)' }}>
            <div className="map-view-nav" style={{ padding: '32px 24px 0 24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 0, marginTop: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <img src={process.env.PUBLIC_URL + '/assets/icons/compass.png'} alt="Map" style={{ width: 22, height: 22, verticalAlign: 'middle' }} />
                  <h2 style={{ color: '#2C3343', fontWeight: 700, fontSize: 22, margin: 0, textAlign: 'center' }}>Map Navigation</h2>
                </div>
                <Button
                  variant="secondary"
                  onClick={() => setLocationTracking(!locationTracking)}
                  style={{ fontWeight: 700 }}
                >
                  {locationTracking ? 'Stop Tracking' : 'Start Tracking'}
                </Button>
              </div>
              {userLocation && (
                <div className="muse-location-box" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 200 }}>
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

          <div className="directions-card" style={{ margin: '32px 0 0 0', background: '#f8fafb', borderRadius: 16, boxShadow: '0 2px 12px rgba(44,51,67,0.07)' }}>
            <h2>Directions</h2>
            {routeDetails?.instructions && routeDetails.instructions.length > 0 ? (
              <>
                <div className="current-instruction">
                  <div className="step-number">
                    Step {currentStep + 1} of {routeDetails.instructions.length}
                  </div>
                  <p className="instruction-text">
                    {routeDetails.instructions[currentStep]}
                  </p>
                </div>
                <div className="step-controls">
                  <button 
                    className="muse-step-btn"
                    onClick={handlePrevStep}
                    disabled={currentStep === 0}
                    style={{ display: 'flex', alignItems: 'center' }}
                  >
                    <img src={process.env.PUBLIC_URL + '/assets/icons/back.png'} alt="Previous" style={{ width: 16, height: 16, marginRight: 6 }} />
                    Previous
                  </button>
                  <button 
                    className="muse-step-btn"
                    onClick={handleNextStep}
                    disabled={currentStep === routeDetails.instructions.length - 1}
                    style={{ display: 'flex', alignItems: 'center' }}
                  >
                    Next
                    <img src={process.env.PUBLIC_URL + '/assets/icons/right-arrow.png'} alt="Next" style={{ width: 16, height: 16, marginLeft: 6 }} />
                  </button>
                </div>
                <div className="all-steps">
                  <h3>All Steps</h3>
                  <ol className="steps-list">
                    {routeDetails.instructions.map((instruction, index) => (
                      <li 
                        key={index} 
                        className={currentStep === index ? 'active' : ''}
                        onClick={() => setCurrentStep(index)}
                      >
                        {instruction}
                      </li>
                    ))}
                  </ol>
                </div>
              </>
            ) : (
              <p>Calculating directions...</p>
            )}
            {stops.length > 0 && (
              <div className="route-stops">
                <h3>Stops on this route</h3>
                <ul>
                  {stops.map((stop, index) => (
                    <li key={index}>{stop.title}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="route-actions" style={{ marginTop: 32, display: 'flex', justifyContent: 'space-between', gap: 16 }}>
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
              <Button variant="danger" onClick={handleCancelNavigation} style={{ display: 'flex', alignItems: 'center', fontWeight: 700 }}>
                <img src={process.env.PUBLIC_URL + '/assets/icons/cancel_white.png'} alt="Cancel" style={{ width: 18, height: 18, marginRight: 8, verticalAlign: 'middle' }} />
                Cancel Navigation
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default NavigationPage;
