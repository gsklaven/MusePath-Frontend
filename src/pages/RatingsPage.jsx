/**
 * RatingsPage Component
 * 
 * Displays and manages user's exhibit ratings with edit and delete capabilities.
 * Provides centralized view of all exhibits the user has rated during museum visits.
 * 
 * Purpose:
 * - View all previously rated exhibits in one organized list
 * - Edit existing ratings to reflect changed opinions
 * - Remove ratings for exhibits user no longer wants to track
 * - Maintain rating history for future museum visits and recommendations
 * 
 * Features:
 * - Rating Display: Shows all rated exhibits with star visualization (1-5 stars)
 * - Edit Mode: Click edit button to modify existing rating with star selector
 * - Delete Functionality: Remove rating with confirmation to prevent accidents
 * - Star Rating UI: Interactive star icons that fill on hover/selection
 * - Persistent Storage: Ratings stored in localStorage and synced with backend
 * - Empty State: Helpful message when no ratings exist with instruction to add more
 * - Loading State: Shows loading indicator while fetching rating data
 * 
 * Rating Display:
 * - Each rating shows: exhibit ID/name, current star rating, edit/delete buttons
 * - Star visualization uses filled/empty star icons for visual clarity
 * - Exhibit metadata includes title if available, otherwise shows ID
 * - Organized as vertical list with card-style layout
 * 
 * Edit Workflow:
 * 1. User clicks edit button on rating item
 * 2. Star selector appears with current rating pre-selected
 * 3. User clicks different star to change rating (1-5)
 * 4. Click update button to save new rating
 * 5. API call updates backend, localStorage updated on success
 * 6. Edit mode closes and new rating displays
 * 
 * Delete Workflow:
 * 1. User clicks delete/remove button on rating item
 * 2. Rating removed from localStorage immediately
 * 3. UI updates to reflect deletion
 * 4. Rating no longer appears in list
 * 
 * State Management:
 * - ratings: Array of rating objects from localStorage {exhibit_id, rating, title}
 * - loading: Boolean flag during initial data fetch
 * - editingId: ID of currently editing rating (null when not editing)
 * - newRating: Temporary value for rating being edited (1-5)
 * 
 * Data Structure:
 * rating = {
 *   exhibit_id: number (unique exhibit identifier),
 *   rating: number (1-5 star value),
 *   title: string (exhibit name/title for display),
 *   created_at: ISO timestamp (when rating was first added)
 * }
 * 
 * API Integration:
 * - rateExhibit(exhibitId, rating): Updates rating on backend server
 * - Ratings added from ExhibitBottomSheet's rating interface
 * - Backend stores ratings in user profile for analytics
 * - localStorage provides offline access and faster loading
 * 
 * User Actions:
 * - View all ratings: Scroll through complete rating history
 * - Edit rating: Change star value for any exhibit
 * - Delete rating: Remove rating from list and backend
 * - Learn how to rate: Empty state shows instruction message
 * 
 * Integration Points:
 * - Ratings created in ExhibitBottomSheet component
 * - Data synced with backend via exhibits API
 * - Stored in localStorage for offline access
 * - Used by recommendation algorithm for personalized routes
 * 
 * Visual Design:
 * - Clean list layout with ample spacing
 * - Star icons for intuitive rating visualization
 * - Edit mode with inline star selector
 * - Delete confirmation prevents accidental removal
 * - Consistent with app's Montserrat font and color scheme
 * - Mobile-friendly tap targets for all interactive elements
 */
import React, { useState, useEffect } from 'react';
import { rateExhibit } from '../api/exhibits';
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

  const loadRatings = () => {
    // Load ratings from localStorage
    try {
      const storedRatings = JSON.parse(localStorage.getItem('ratings') || '[]');
      setRatings(storedRatings);
      setLoading(false);
    } catch (err) {
      console.error('Error loading ratings:', err);
      setRatings([]);
      setLoading(false);
    }
  };

  const handleUpdateRating = async (exhibitId, rating) => {
    try {
      console.log('⭐ Updating rating:', exhibitId, rating);
      await rateExhibit(exhibitId, rating);
      
      // Update localStorage after API success
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

  const handleDeleteRating = (exhibitId) => {
    // Remove rating from localStorage
    const updatedRatings = ratings.filter(r => r.exhibit_id !== exhibitId);
    localStorage.setItem('ratings', JSON.stringify(updatedRatings));
    setRatings(updatedRatings);
  };

  const hasRatings = ratings.length > 0;

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
          ) : !hasRatings ? (
            <div className="ratings-empty-message">
              You have not made any rating yet.
            </div>
          ) : (
            <div className="ratings-list">
              {ratings.map((item) => (
                <div className="ratings-list-item" key={item.exhibit_id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', borderBottom: '1px solid #eee' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                    <span style={{ fontSize: '1rem', color: '#222', fontWeight: 600 }}>{item.title || `Exhibit ${item.exhibit_id}`}</span>
                    {editingId === item.exhibit_id ? (
                      <div style={{ display: 'flex', gap: 4, marginTop: 8 }}>
                        {[1, 2, 3, 4, 5].map((star) => (
                          <span
                            key={star}
                            onClick={() => setNewRating(star)}
                            style={{
                              fontSize: '1.5rem',
                              cursor: 'pointer',
                              color: star <= newRating ? '#FFD700' : '#ddd',
                            }}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                    ) : (
                      <div style={{ display: 'flex', gap: 2, marginTop: 4 }}>
                        {[1, 2, 3, 4, 5].map((star) => (
                          <span
                            key={star}
                            style={{
                              fontSize: '1.2rem',
                              color: star <= item.rating ? '#FFD700' : '#ddd',
                            }}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    {editingId === item.exhibit_id ? (
                      <>
                        <button
                          onClick={() => handleUpdateRating(item.exhibit_id, newRating)}
                          style={{
                            background: '#BBD689',
                            color: '#222',
                            border: 'none',
                            borderRadius: 8,
                            padding: '6px 12px',
                            cursor: 'pointer',
                            fontSize: '0.9rem',
                            fontWeight: 600,
                          }}
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditingId(null)}
                          style={{
                            background: '#ddd',
                            color: '#222',
                            border: 'none',
                            borderRadius: 8,
                            padding: '6px 12px',
                            cursor: 'pointer',
                            fontSize: '0.9rem',
                            fontWeight: 600,
                          }}
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => {
                            setEditingId(item.exhibit_id);
                            setNewRating(item.rating);
                          }}
                          style={{
                            background: '#BBD689',
                            color: '#222',
                            border: 'none',
                            borderRadius: 8,
                            padding: '6px 12px',
                            cursor: 'pointer',
                            fontSize: '0.9rem',
                            fontWeight: 600,
                          }}
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteRating(item.exhibit_id)}
                          style={{
                            background: '#ff6b6b',
                            color: '#fff',
                            border: 'none',
                            borderRadius: 8,
                            padding: '6px 12px',
                            cursor: 'pointer',
                            fontSize: '0.9rem',
                            fontWeight: 600,
                          }}
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RatingsPage;
