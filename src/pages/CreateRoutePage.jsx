/**
 * CreateRoutePage Component
 * Custom route builder allowing users to create personalized museum paths.
 */
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { calculateRoute, searchExhibits, getDestinations, getDestinationById } from '../api';
import { Header, Button, Card, RouteDestinationSelector, RouteStopList, RouteStopSearch } from '../components';
import './CreateRoutePage.css';

const CreateRoutePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  // Get initial values from navigation state
  const initialDestination = location.state?.destination;
  const userLocation = location.state?.location || { lat: 0, lng: 0 };
  
  const [destination, setDestination] = useState(initialDestination);
  const [destinations, setDestinations] = useState([]);
  const [showDestinations, setShowDestinations] = useState(!initialDestination);
  const [startPoint, setStartPoint] = useState('Current Location');
  const [stops, setStops] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [showAddStops, setShowAddStops] = useState(false);
  const [loadingDestinations, setLoadingDestinations] = useState(false);

  useEffect(() => {
    if (!initialDestination) {
      loadDestinations();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Fetch available destinations from API
  const loadDestinations = async () => {
    try {
      setLoadingDestinations(true);
      console.log('🎯 Loading destinations...');
      
      const data = await getDestinations();
      const destinationsArray = data && data.data ? data.data : data;
      
      setDestinations(destinationsArray || []);
      setLoadingDestinations(false);
    } catch (err) {
      console.error('Error loading destinations:', err);
      setLoadingDestinations(false);
    }
  };

  // Handle destination selection and fetch details
  const handleSelectDestination = async (dest) => {
    try {
      console.log('🎯 Selected destination:', dest.destination_id);
      
      // Get full destination details
      const data = await getDestinationById(dest.destination_id, null, true, false);
      const destData = data && data.data ? data.data : data;
      
      setDestination(destData);
      // Hide selector after selection
      setShowDestinations(false);
    } catch (err) {
      console.error('Error loading destination details:', err);
      setDestination(dest);
      setShowDestinations(false);
    }
  };

  // Search for exhibits to add as stops
  const handleSearch = async (searchTerm) => {
    console.log('🔎 handleSearch called with:', searchTerm);
    
    if (!searchTerm.trim()) {
      setSearchResults([]);
      return;
    }
    
    try {
      const results = await searchExhibits(searchTerm);
      setSearchResults(results);
    } catch (err) {
      console.error('Search error:', err);
    }
  };

  // Add a stop to the route
  const handleAddStop = (stop) => {
    setStops([...stops, stop]);
    setSearchResults([]);
  };

  // Remove a stop from the route
  const handleRemoveStop = (index) => {
    setStops(stops.filter((_, i) => i !== index));
  };

  // Calculate route and navigate to navigation page
  const handleNavigate = async () => {
    try {
      const route = await calculateRoute(
        user.id,
        destination.destination_id,
        userLocation.lat,
        userLocation.lng
      );
      
      navigate('/navigation', { 
        state: { 
          route,
          destination,
          stops 
        } 
      });
    } catch (err) {
      alert('Failed to calculate route. Please try again.');
      console.error(err);
    }
  };

  const handleCancel = () => {
    navigate('/map');
  };

  return (
    <div>
      <Header />
      <div className="container create-route-container">
        <Card>
          <div className="route-header">
            <h1>Create Route</h1>
            <button className="close-btn" onClick={handleCancel}>
              ✕
            </button>
          </div>

          {showDestinations ? (
            <RouteDestinationSelector 
              destinations={destinations}
              loading={loadingDestinations}
              onSelect={handleSelectDestination}
            />
          ) : (
            <>
              <div className="route-details">
                <div className="route-item">
                  <label>Starting Point</label>
                  <input
                    type="text"
                    value={startPoint}
                    onChange={(e) => setStartPoint(e.target.value)}
                    placeholder="Current Location"
                  />
                </div>

                <div className="route-item">
                  <label>Destination</label>
                  <div className="destination-display" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span>{destination?.name || 'No destination selected'}</span>
                    <Button
                      variant="secondary"
                      onClick={() => setShowDestinations(true)}
                      style={{ padding: '6px 12px', fontSize: '0.9rem' }}
                    >
                      Change
                    </Button>
                  </div>
                </div>

                <RouteStopList stops={stops} onRemove={handleRemoveStop} />

                <RouteStopSearch 
                  show={showAddStops}
                  onToggle={() => setShowAddStops(!showAddStops)}
                  onSearch={handleSearch}
                  searchResults={searchResults}
                  onAdd={handleAddStop}
                />
              </div>

              <div className="route-actions">
                <Button variant="danger" onClick={handleCancel}>
                  ✕ Discard
                </Button>
                <Button 
                  variant="success" 
                  onClick={handleNavigate}
                  disabled={!destination}
                >
                  🧭 Navigate
                </Button>
              </div>
            </>
          )}
        </Card>
      </div>
    </div>
  );
};

export default CreateRoutePage;
