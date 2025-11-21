import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useGeolocation } from '../hooks/useGeolocation';
import { useOnlineStatus } from '../hooks/useOnlineStatus';
import { searchExhibits } from '../api/exhibits';
import { getDestinations } from '../api/maps';
import { getPersonalizedRoute } from '../api/routes';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import Button from '../components/Button';
import Card from '../components/Card';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import Modal from '../components/Modal';
import './MapPage.css';

const MapPage = () => {
  const { user } = useAuth();
  const { location, error: gpsError } = useGeolocation();
  const isOnline = useOnlineStatus();
  const navigate = useNavigate();
  
  const [destinations, setDestinations] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [showGPSError, setShowGPSError] = useState(false);

  useEffect(() => {
    loadDestinations();
  }, []);

  useEffect(() => {
    if (gpsError) {
      setShowGPSError(true);
    }
  }, [gpsError]);

  const loadDestinations = async () => {
    try {
      setLoading(true);
      const response = await getDestinations(); // Άλλαξα το όνομα σε response για σαφήνεια
      
      // --- Η ΔΙΟΡΘΩΣΗ ΕΙΝΑΙ ΕΔΩ ---
      // Ελέγχουμε αν η απάντηση έχει τη μορφή { data: [...] }
      if (response && Array.isArray(response.data)) {
          setDestinations(response.data);
      } 
      // Ελέγχουμε μήπως είναι σκέτος πίνακας [...] (περίπτωση Α)
      else if (Array.isArray(response)) {
          setDestinations(response);
      } 
      // Αν δεν είναι τίποτα από τα δύο, βάζουμε κενή λίστα για ασφάλεια
      else {
          console.error("Unexpected data format:", response);
          setDestinations([]);
      }
      // -----------------------------

      setError(null);
    } catch (err) {
      setError('Failed to load destinations');
      console.error(err);
      setDestinations([]); // Ασφάλεια σε περίπτωση λάθους
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (searchTerm) => {
    if (!searchTerm.trim()) {
      setSearchResults([]);
      return;
    }

    try {
      const mode = isOnline ? 'online' : 'offline';
      const results = await searchExhibits(searchTerm, null, mode);
      setSearchResults(results);
    } catch (err) {
      console.error('Search error:', err);
      setSearchResults([]);
    }
  };

  const handleGeneratePersonalizedRoute = async () => {
    if (!user.preferences || user.preferences.length === 0) {
      alert('Please complete your profile setup first to generate personalized routes.');
      navigate('/questionnaire');
      return;
    }

    try {
      const route = await getPersonalizedRoute(user.id);
      navigate('/personalized-route', { state: { route } });
    } catch (err) {
      alert('Failed to generate personalized route. Please complete your preferences.');
      navigate('/questionnaire');
    }
  };

  const handleDestinationClick = (destination) => {
    setSelectedDestination(destination);
  };

  const handleNavigateToDestination = () => {
    if (!location) {
      alert('Waiting for GPS signal...');
      return;
    }
    navigate('/create-route', { state: { destination: selectedDestination, location } });
  };

  if (loading) {
    return (
      <div>
        <Header />
        <Loading message="Loading museum map..." />
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className="map-container">
        <div className="map-controls">
          <SearchBar 
            onSearch={handleSearch}
            placeholder="Search for exhibits, exits, restrooms..."
          />
          
          <Button 
            variant="success" 
            onClick={handleGeneratePersonalizedRoute}
            className="personalized-route-btn"
          >
            🎯 Generate Personalized Route
          </Button>
        </div>

        <div className="map-content">
          <div className="map-view">
            <div className="map-placeholder">
              <p>🗺️ Museum Map View</p>
              {location && (
                <div className="user-location">
                  📍 Your Location: {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
                </div>
              )}
              <p className="map-instruction">
                Select a destination below or search for exhibits
              </p>
            </div>
          </div>

          <div className="destinations-panel">
            <h2>Destinations</h2>
            
            {searchResults.length > 0 ? (
              <div className="search-results">
                <h3>Search Results</h3>
                {searchResults.map(exhibit => (
                  <Card 
                    key={exhibit.exhibit_id} 
                    className="destination-card"
                    onClick={() => navigate(`/exhibit/${exhibit.exhibit_id}`)}
                  >
                    <h4>{exhibit.title}</h4>
                  </Card>
                ))}
              </div>
            ) : (
              <>
                {error ? (
                  <ErrorMessage message={error} onRetry={loadDestinations} />
                ) : (
                  <div className="destinations-list">
                    {destinations.slice(0, 10).map(dest => (
                      <Card 
                        key={dest.destination_id} 
                        className="destination-card"
                        onClick={() => handleDestinationClick(dest)}
                      >
                        <div className="destination-info">
                          <h4>{dest.name}</h4>
                          <span className="destination-type">{dest.type}</span>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      <Modal
        isOpen={!!selectedDestination}
        onClose={() => setSelectedDestination(null)}
        title={selectedDestination?.name || 'Destination'}
      >
        {selectedDestination && (
          <div className="destination-details">
            <p><strong>Type:</strong> {selectedDestination.type}</p>
            <div className="modal-actions">
              <Button variant="primary" onClick={handleNavigateToDestination}>
                🧭 Route
              </Button>
              {selectedDestination.type === 'exhibit' && (
                <Button 
                  variant="secondary" 
                  onClick={() => navigate(`/exhibit/${selectedDestination.destination_id}`)}
                >
                  ℹ️ More Info
                </Button>
              )}
            </div>
          </div>
        )}
      </Modal>

      <Modal
        isOpen={showGPSError}
        onClose={() => setShowGPSError(false)}
        title="GPS Signal Lost"
      >
        <div className="gps-error-content">
          <p className="error-icon">📡</p>
          <p>{gpsError}</p>
          <p>Navigation will resume when the signal is restored.</p>
          <Button variant="primary" onClick={() => setShowGPSError(false)}>
            OK
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default MapPage;
