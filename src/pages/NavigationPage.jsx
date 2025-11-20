import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getRouteDetails, deleteRoute } from '../api/routes';
import { formatDuration, formatDistance } from '../utils/formatters';
import Header from '../components/Header';
import Button from '../components/Button';
import Card from '../components/Card';
import './NavigationPage.css';

const NavigationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const routeData = location.state?.route;
  const destination = location.state?.destination;
  const stops = location.state?.stops || [];
  
  const [routeDetails, setRouteDetails] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (routeData?.route_id) {
      loadRouteDetails();
    }
  }, [routeData]);

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
    <div>
      <Header />
      <div className="navigation-container">
        <div className="navigation-header">
          <h1>Navigating to {destination?.name}</h1>
          <Button variant="danger" onClick={handleCancelNavigation}>
            ✕ Cancel Navigation
          </Button>
        </div>

        <Card className="navigation-map">
          <div className="map-view-nav">
            <p>🗺️ Navigation Map View</p>
            <div className="navigation-info">
              {routeDetails && (
                <>
                  <div className="nav-info-item">
                    <span className="label">Distance:</span>
                    <span className="value">{formatDistance(routeDetails.distance)}</span>
                  </div>
                  <div className="nav-info-item">
                    <span className="label">ETA:</span>
                    <span className="value">{formatDuration(routeDetails.estimatedTime)}</span>
                  </div>
                  <div className="nav-info-item">
                    <span className="label">Arrival:</span>
                    <span className="value">{routeDetails.arrivalTime || 'N/A'}</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </Card>

        <Card className="directions-card">
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
                <Button 
                  variant="secondary" 
                  onClick={handlePrevStep}
                  disabled={currentStep === 0}
                >
                  ← Previous
                </Button>
                <Button 
                  variant="primary" 
                  onClick={handleNextStep}
                  disabled={currentStep === routeDetails.instructions.length - 1}
                >
                  Next →
                </Button>
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
        </Card>
      </div>
    </div>
  );
};

export default NavigationPage;
