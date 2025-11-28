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
    // Get ratings from localStorage
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
      
      // Update localStorage
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
