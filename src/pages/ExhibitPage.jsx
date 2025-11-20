import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useOnlineStatus } from '../hooks/useOnlineStatus';
import { getExhibitById, rateExhibit, getExhibitAudio } from '../api/exhibits';
import { addToFavourites, removeFromFavourites } from '../api/users';
import { formatRating } from '../utils/formatters';
import { queueOfflineOperation } from '../utils/helpers';
import Header from '../components/Header';
import Button from '../components/Button';
import Card from '../components/Card';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import './ExhibitPage.css';

const ExhibitPage = () => {
  const { exhibitId } = useParams();
  const { user } = useAuth();
  const isOnline = useOnlineStatus();
  const navigate = useNavigate();
  
  const [exhibit, setExhibit] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userRating, setUserRating] = useState(0);
  const [isFavourite, setIsFavourite] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    loadExhibit();
  }, [exhibitId]);

  const loadExhibit = async () => {
    try {
      setLoading(true);
      const mode = isOnline ? 'online' : 'offline';
      const data = await getExhibitById(exhibitId, mode);
      setExhibit(data);
      setError(null);
    } catch (err) {
      setError('Failed to load exhibit information');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleRate = async (rating) => {
    try {
      if (isOnline) {
        await rateExhibit(exhibitId, rating);
      } else {
        queueOfflineOperation({
          operation_type: 'rating',
          exhibit_id: parseInt(exhibitId),
          rating,
        });
      }
      setUserRating(rating);
    } catch (err) {
      alert('Failed to submit rating. Please try again.');
    }
  };

  const handleToggleFavourite = async () => {
    try {
      if (isFavourite) {
        if (isOnline) {
          await removeFromFavourites(user.id, exhibitId);
        } else {
          queueOfflineOperation({
            operation_type: 'remove_favorite',
            exhibit_id: parseInt(exhibitId),
          });
        }
        setIsFavourite(false);
      } else {
        if (isOnline) {
          await addToFavourites(user.id, exhibitId);
        } else {
          queueOfflineOperation({
            operation_type: 'add_favorite',
            exhibit_id: parseInt(exhibitId),
          });
        }
        setIsFavourite(true);
      }
    } catch (err) {
      alert('Failed to update favourites. Please try again.');
    }
  };

  const handlePlayAudio = async () => {
    try {
      const mode = isOnline ? 'online' : 'offline';
      const audioBlob = await getExhibitAudio(exhibitId, mode);
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      audio.play();
    } catch (err) {
      if (!isOnline) {
        alert('Audio guide is not available in offline mode.');
      } else {
        alert('Failed to load audio guide.');
      }
    }
  };

  const handleCreateRoute = () => {
    navigate('/create-route', { 
      state: { 
        destination: { 
          destination_id: exhibitId, 
          name: exhibit.title,
          type: 'exhibit'
        } 
      } 
    });
  };

  if (loading) {
    return (
      <div>
        <Header />
        <Loading message="Loading exhibit information..." />
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Header />
        <ErrorMessage message={error} onRetry={loadExhibit} />
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className="container exhibit-container">
        <Card className="exhibit-card">
          <div className="exhibit-header">
            <h1>{exhibit.title}</h1>
            <button 
              className={`favourite-btn ${isFavourite ? 'active' : ''}`}
              onClick={handleToggleFavourite}
            >
              {isFavourite ? '❤️' : '🤍'}
            </button>
          </div>

          <div className="exhibit-info">
            <div className="info-item">
              <span className="info-label">Rating:</span>
              <span className="info-value">⭐ {formatRating(exhibit.rating || 0)}/5</span>
            </div>
            <div className="info-item">
              <span className="info-label">Location:</span>
              <span className="info-value">{exhibit.location || 'N/A'}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Status:</span>
              <span className={`status-badge status-${exhibit.status}`}>
                {exhibit.status || 'open'}
              </span>
            </div>
          </div>

          {exhibit.features && exhibit.features.length > 0 && (
            <div className="exhibit-features">
              <h3>Features</h3>
              <div className="features-list">
                {exhibit.features.map((feature, index) => (
                  <span key={index} className="feature-tag">
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="exhibit-actions">
            <Button variant="primary" onClick={handleCreateRoute}>
              🧭 Route
            </Button>
            <Button variant="secondary" onClick={handlePlayAudio}>
              🔊 Audio Guide
            </Button>
            <Button variant="secondary" onClick={() => setShowDetails(true)}>
              ℹ️ More Details
            </Button>
          </div>

          <div className="rating-section">
            <h3>Rate this exhibit</h3>
            <div className="star-rating">
              {[1, 2, 3, 4, 5].map(star => (
                <button
                  key={star}
                  className={`star ${userRating >= star ? 'active' : ''}`}
                  onClick={() => handleRate(star)}
                >
                  ★
                </button>
              ))}
            </div>
            {userRating > 0 && (
              <p className="rating-text">You rated this exhibit {userRating}/5</p>
            )}
          </div>

          {showDetails && (
            <div className="exhibit-details">
              <h3>Detailed Information</h3>
              <p>{exhibit.description || 'No detailed description available.'}</p>
              <Button variant="secondary" onClick={() => setShowDetails(false)}>
                Hide Details
              </Button>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default ExhibitPage;
