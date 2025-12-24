/**
 * NavigationPage Component
 * Real-time turn-by-turn navigation interface for museum route following.
 */
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getRouteDetails, deleteRoute, getUserCoordinates, updateUserCoordinates } from '../api';
import { Button, Card, NavigationRouteOverview, NavigationMap, NavigationDirections } from '../components';
import './NavigationPage.css';

/**
 * Renders the navigation page, providing turn-by-turn directions for a selected route.
 * It displays the route overview, map, and step-by-step instructions.
 *
 * @returns {JSX.Element} The NavigationPage component.
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

  // Effect to load initial route and user location data.
  useEffect(() => {
    // Load route details if available
    if (routeData?.route_id) {
      loadRouteDetails();
    }
    loadUserLocation();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [routeData]);

  /**
   * Effect to track user location at a set interval when location tracking is enabled.
   * This will call the `trackUserLocation` function every 5 seconds.
   */
  useEffect(() => {
    let interval;
    // Start tracking interval if enabled
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

  /**
   * Fetches the user's current coordinates from the API and updates the state.
   */
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

  /**
   * Simulates tracking the user's location by generating new coordinates
   * and updating them on the backend.
   */
  const trackUserLocation = async () => {
    // Simulate location update (in real app, would use navigator.geolocation)
    try {
      // Add small random variation to simulate movement
      const newLat = (userLocation?.lat || 40.7610) + (Math.random() - 0.5) * 0.001;
      const newLng = (userLocation?.lng || -73.9780) + (Math.random() - 0.5) * 0.001;
      
      console.log('📍 Updating user location:', { lat: newLat, lng: newLng });
      
      await updateUserCoordinates(user?.id || 1, newLat, newLng);
      setUserLocation({ lat: newLat, lng: newLng });
    } catch (err) {
      console.error('Error updating location:', err);
    }
  };

  /**
   * Fetches the detailed information for the current route from the API.
   */
  const loadRouteDetails = async () => {
    try {
      const details = await getRouteDetails(routeData.route_id);
      setRouteDetails(details);
    } catch (err) {
      console.error('Failed to load route details:', err);
    }
  };

  /**
   * Handles the cancellation of the navigation.
   * It deletes the route from the backend and navigates back to the map page.
   */
  const handleCancelNavigation = async () => {
    try {
      await deleteRoute(routeData.route_id);
      navigate('/map');
    } catch (err) {
      console.error('Failed to cancel navigation:', err);
      navigate('/map');
    }
  };

  /**
   * Advances to the next step in the navigation instructions.
   */
  const handleNextStep = () => {
    if (routeDetails && currentStep < routeDetails.instructions.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  /**
   * Goes back to the previous step in the navigation instructions.
   */
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
          
          <NavigationRouteOverview routeDetails={routeDetails} />

          <NavigationMap 
            userLocation={userLocation}
            locationTracking={locationTracking}
            onToggleTracking={() => setLocationTracking(!locationTracking)}
          />

          <NavigationDirections 
            routeDetails={routeDetails}
            currentStep={currentStep}
            onNext={handleNextStep}
            onPrev={handlePrevStep}
            onSetStep={setCurrentStep}
            stops={stops}
          />

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
