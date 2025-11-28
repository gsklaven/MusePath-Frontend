import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { removeFromFavourites } from '../api/users';
import './FavouritesPage.css';

const FavouritesPage = () => {
  const { user } = useAuth();
  const [favourites, setFavourites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFavourites();
  }, []);

  const loadFavourites = () => {
    // Get favourites from localStorage
    try {
      const storedFavourites = JSON.parse(localStorage.getItem('favourites') || '[]');
      setFavourites(storedFavourites);
      setLoading(false);
    } catch (err) {
      console.error('Error loading favourites:', err);
      setFavourites([]);
      setLoading(false);
    }
  };

  const handleRemoveFavourite = async (exhibitId) => {
    try {
      console.log('🗑️ Removing from favourites:', exhibitId);
      await removeFromFavourites(user?.id || 1, exhibitId);
      
      // Update localStorage
      const updatedFavourites = favourites.filter(fav => fav.exhibit_id !== exhibitId);
      localStorage.setItem('favourites', JSON.stringify(updatedFavourites));
      setFavourites(updatedFavourites);
    } catch (err) {
      console.error('Error removing favourite:', err);
    }
  };

  const hasFavourites = favourites.length > 0;

  return (
    <div className="settings-outer-container" style={{ fontFamily: 'Montserrat, sans-serif', background: '#fff', minHeight: '100vh' }}>
      <div className="settings-profile">
        <div className="settings-avatar-circle" style={{ background: '#e3ecd6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img src={process.env.PUBLIC_URL + '/assets/icons/heart_filled.png'} alt="Favourites" style={{ width: 48, height: 48 }} />
        </div>
        <div className="settings-username" style={{ color: '#222', fontWeight: 600 }}>My Favourites</div>
      </div>
      <div className="settings-section" style={{ maxWidth: 400, width: '100%' }}>
        <div className="settings-section-header" style={{ background: '#e3ecd6', color: '#444', fontWeight: 500 }}>Favourites</div>
        <div className="settings-list" style={{ background: '#fff', borderRadius: '0 0 12px 12px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
          <div className="settings-list-instruction" style={{ padding: 18, borderBottom: 'none', fontSize: 16, color: '#888', textAlign: 'left' }}>
            Add exhibits to favourites by clicking the heart icon on exhibit pages.
          </div>
          {loading ? (
            <div className="favourites-empty-message">Loading...</div>
          ) : !hasFavourites ? (
            <div className="favourites-empty-message">
              You have not added any favourite yet.
            </div>
          ) : (
            <div className="favourites-list">
              {favourites.map((item) => (
                <div className="favourites-list-item" key={item.exhibit_id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', borderBottom: '1px solid #eee' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <img src={process.env.PUBLIC_URL + '/assets/icons/museum.png'} alt="Museum" style={{ width: 24, height: 24 }} />
                    <span style={{ fontSize: '1rem', color: '#222' }}>{item.title || `Exhibit ${item.exhibit_id}`}</span>
                  </div>
                  <button
                    onClick={() => handleRemoveFavourite(item.exhibit_id)}
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
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FavouritesPage;
