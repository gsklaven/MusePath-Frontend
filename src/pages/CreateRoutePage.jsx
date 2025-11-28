import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { calculateRoute } from '../api/routes';
import { searchExhibits } from '../api/exhibits';
import { getDestinations, getDestinationById } from '../api/maps';
import Header from '../components/Header';
import Button from '../components/Button';
import Card from '../components/Card';
import SearchBar from '../components/SearchBar';
import './CreateRoutePage.css';

const CreateRoutePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  
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

  const handleSelectDestination = async (dest) => {
    try {
      console.log('🎯 Selected destination:', dest.destination_id);
      
      // Get full destination details
      const data = await getDestinationById(dest.destination_id, null, true, false);
      const destData = data && data.data ? data.data : data;
      
      setDestination(destData);
      setShowDestinations(false);
    } catch (err) {
      console.error('Error loading destination details:', err);
      setDestination(dest);
      setShowDestinations(false);
    }
  };

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

  const handleAddStop = (stop) => {
    setStops([...stops, stop]);
    setSearchResults([]);
  };

  const handleRemoveStop = (index) => {
    setStops(stops.filter((_, i) => i !== index));
  };

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
            <div className="destinations-section">
              <h2>Select Destination</h2>
              {loadingDestinations ? (
                <div style={{ textAlign: 'center', padding: 20, color: '#666' }}>Loading destinations...</div>
              ) : destinations.length === 0 ? (
                <div style={{ textAlign: 'center', padding: 20, color: '#999' }}>No destinations available</div>
              ) : (
                <div className="destinations-list" style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 16 }}>
                  {destinations.map((dest) => (
                    <Card
                      key={dest.destination_id}
                      className="destination-card"
                      onClick={() => handleSelectDestination(dest)}
                      style={{
                        cursor: 'pointer',
                        padding: 16,
                        border: '2px solid #e3ecd6',
                        transition: 'all 0.2s',
                      }}
                    >
                      <div style={{ fontWeight: 600, fontSize: '1.1rem', marginBottom: 4 }}>
                        {dest.name || `Destination ${dest.destination_id}`}
                      </div>
                      {dest.type && (
                        <div style={{ fontSize: '0.9rem', color: '#666' }}>
                          Type: {dest.type}
                        </div>
                      )}
                      {dest.coordinates && (
                        <div style={{ fontSize: '0.85rem', color: '#999', marginTop: 4 }}>
                          📍 Lat: {dest.coordinates.lat?.toFixed(4)}, Lng: {dest.coordinates.lng?.toFixed(4)}
                        </div>
                      )}
                    </Card>
                  ))}
                </div>
              )}
            </div>
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

                {stops.length > 0 && (
                  <div className="route-item">
                    <label>Stops ({stops.length})</label>
                    <div className="stops-list">
                      {stops.map((stop, index) => (
                        <div key={index} className="stop-item">
                          <span>{stop.title}</span>
                          <button onClick={() => handleRemoveStop(index)}>✕</button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <Button 
                  variant="secondary" 
                  onClick={() => setShowAddStops(!showAddStops)}
                  className="add-stops-btn"
                >
                  {showAddStops ? '- Cancel Adding Stops' : '+ Add Stops'}
                </Button>

                {showAddStops && (
                  <div className="add-stops-section">
                    <SearchBar 
                      onSearch={handleSearch}
                      placeholder="Search for exhibits to add..."
                    />
                    
                    {searchResults.length > 0 && (
                      <div className="search-results">
                        {searchResults.map(result => (
                          <Card 
                            key={result.exhibit_id}
                            className="result-card"
                            onClick={() => handleAddStop(result)}
                          >
                            <span>{result.title}</span>
                            <span className="add-icon">+</span>
                          </Card>
                        ))}
                      </div>
                    )}
                  </div>
                )}
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
