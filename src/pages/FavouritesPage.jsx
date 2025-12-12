/**
 * FavouritesPage Component
 * 
 * Displays and manages user's favorite museum exhibits collection.
 * Provides a centralized view of all exhibits marked as favorites with ability to remove items.
 * 
 * Data Flow:
 * - Favorites are stored in both localStorage (for offline access) and backend database
 * - On mount, loads favorites from localStorage for instant display
 * - Remove operations sync with backend API then update localStorage
 * - Each favorite includes exhibit_id, title, and subtitle for display
 * 
 * Features:
 * - List View: Displays all favorited exhibits with museum icon and title
 * - Remove Functionality: Red button to remove exhibits from favorites
 * - Empty State: Instructional message when no favorites exist
 * - Loading State: Shows loading indicator while fetching data
 * - Persistent Storage: Uses localStorage for offline availability
 * - API Sync: Syncs remove operations with backend via removeFromFavourites API
 * 
 * User Actions:
 * - View all favorite exhibits in a clean list format
 * - Remove individual favorites with one-click action
 * - Receives guidance on how to add more favorites
 * 
 * State Management:
 * - favourites: Array of favorite exhibit objects from localStorage
 * - loading: Boolean flag for loading state during data fetch
 * - Updates in real-time after remove operations
 * 
 * Integration Points:
 * - Works with ExhibitBottomSheet heart icon for adding favorites
 * - Data structure matches backend API format for consistency
 * - Syncs with user context for authentication
 */
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
    // Load favourites from localStorage
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
      
      // Update localStorage after successful API call
      const updatedFavourites = favourites.filter(fav => fav.exhibit_id !== exhibitId);
      localStorage.setItem('favourites', JSON.stringify(updatedFavourites));
      setFavourites(updatedFavourites);
    } catch (err) {
      console.error('Error removing favourite:', err);
      // Optimistic local removal to keep UI consistent even if backend fails
      const updatedFavourites = favourites.filter(fav => fav.exhibit_id !== exhibitId);
      localStorage.setItem('favourites', JSON.stringify(updatedFavourites));
      setFavourites(updatedFavourites);
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