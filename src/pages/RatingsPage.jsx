/**
 * RatingsPage Component
 * Displays and manages user's exhibit ratings with edit and delete capabilities.
 */
import React, { useState, useEffect } from 'react';
import { rateExhibit } from '../api/exhibits';
import { RatingItem } from '../components';
import './RatingsPage.css';

const RatingsPage = () => {
  // const { user } = useAuth(); // Not used currently
  const [ratings, setRatings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [newRating, setNewRating] = useState(0);

  useEffect(() => {
    loadRatings();
  }, []);

  // Load user ratings from localStorage
  const loadRatings = () => {
    // Load ratings from localStorage
    try {
      const storedRatings = JSON.parse(localStorage.getItem('ratings') || '[]');
      setRatings(storedRatings);
    } catch (err) {
      console.error('Error loading ratings:', err);
      setRatings([]);
    } finally {
      setLoading(false);
    }
  };

  // Update an existing rating via API and localStorage
  const handleUpdateRating = async (exhibitId, rating) => {
    try {
      console.log('⭐ Updating rating:', exhibitId, rating);
      await rateExhibit(exhibitId, rating);
      
      // Update localStorage after API success
      // Map through ratings to update the specific one
      const updatedRatings = ratings.map(r => 
        r.exhibit_id === exhibitId ? { ...r, rating } : r
      );
      localStorage.setItem('ratings', JSON.stringify(updatedRatings));
      setRatings(updatedRatings);
      setEditingId(null);
    } catch (err) {
      console.error('Error updating rating:', err);
    }
  };

  // Delete a rating
  const handleDeleteRating = (exhibitId) => {
    // Remove rating from localStorage
    const updatedRatings = ratings.filter(r => r.exhibit_id !== exhibitId);
    localStorage.setItem('ratings', JSON.stringify(updatedRatings));
    setRatings(updatedRatings);
  };


  return (
    <div className="settings-outer-container" style={{ fontFamily: 'Montserrat, sans-serif', background: '#fff', minHeight: '100vh' }}>
      <div className="settings-profile">
        <div className="settings-avatar-circle">
          <img src={process.env.PUBLIC_URL + '/assets/icons/thumbs.png'} alt="Ratings" className="settings-avatar-img" style={{ width: 42, height: 42 }}/>
        </div>
        <div className="settings-username" style={{ color: '#222', fontWeight: 600 }}>My Ratings</div>
      </div>
      <div className="settings-section" style={{ maxWidth: 400, width: '100%' }}>
        <div className="settings-section-header" style={{ background: '#e3ecd6', color: '#444', fontWeight: 500 }}>Ratings</div>
        <div className="settings-list" style={{ background: '#fff', borderRadius: '0 0 12px 12px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
          <div className="settings-list-instruction" style={{ padding: 18, borderBottom: 'none', fontSize: 16, color: '#888', textAlign: 'left' }}>
            Rate exhibits by clicking the stars on exhibit pages.
          </div>
          {loading ? (
            <div className="ratings-empty-message">Loading...</div>
          ) : ratings.length === 0 ? (
            <div className="ratings-empty-message">
              You have not made any rating yet.
            </div>
          ) : (
            <div className="ratings-list">
              {ratings.map((item) => (
                <RatingItem
                  key={item.exhibit_id}
                  item={item}
                  isEditing={editingId === item.exhibit_id}
                  newRating={newRating}
                  onEdit={() => {
                    setEditingId(item.exhibit_id);
                    setNewRating(item.rating);
                  }}
                  onCancel={() => setEditingId(null)}
                  onSave={handleUpdateRating}
                  onDelete={handleDeleteRating}
                  onRatingChange={setNewRating}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RatingsPage;
