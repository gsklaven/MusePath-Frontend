import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { calculateRoute } from '../api/routes';
import { searchExhibits } from '../api/exhibits';
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
  const [startPoint, setStartPoint] = useState('Current Location');
  const [stops, setStops] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [showAddStops, setShowAddStops] = useState(false);

  const handleSearch = async (searchTerm) => {
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
              <div className="destination-display">
                {destination?.name || 'No destination selected'}
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
            <Button variant="success" onClick={handleNavigate}>
              🧭 Navigate
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default CreateRoutePage;
