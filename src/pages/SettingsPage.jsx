import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './SettingsPage.css';

/**
 * Settings page with user profile and navigation to:
 * - My Favourites/Ratings (Content)
 * - Language/Preferences/Offline content (Preferences)
 * - Logout (Account)
 */
const SettingsPage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="settings-outer-container">
      <div className="settings-profile">
        <div className="settings-avatar-circle">
          {/* User avatar with fallback */}
          <img src={process.env.PUBLIC_URL + '/assets/icons/avatar.png'} alt="User avatar" className="settings-avatar-img" onError={e => {e.target.onerror=null; e.target.src=process.env.PUBLIC_URL + '/assets/icons/profile-placeholder.png';}} />
        </div>
        <div className="settings-username">{user?.name || 'User'}</div>
      </div>

      {/* Content section */}
      <div className="settings-section">
        <div className="settings-section-header">Content</div>
        <div className="settings-list">
          <div className="settings-list-item" onClick={() => navigate('/favourites')}>
            <span className="settings-list-icon"><img src={process.env.PUBLIC_URL + '/assets/icons/heart_filled.png'} alt="Favourites" style={{ width: 24, height: 24 }} /></span>
            <span>My Favourites</span>
            <img src={process.env.PUBLIC_URL + '/assets/icons/right-arrow.png'} alt="Go" className="settings-list-arrow" />
          </div>
          <div className="settings-list-item" onClick={() => navigate('/ratings')}>
            <span className="settings-list-icon"><img src={process.env.PUBLIC_URL + '/assets/icons/star5.png'} alt="Ratings" style={{ width: 24, height: 24 }} /></span>
            <span>My Ratings</span>
            <img src={process.env.PUBLIC_URL + '/assets/icons/right-arrow.png'} alt="Go" className="settings-list-arrow" />
          </div>
        </div>
      </div>

      <div className="settings-section">
        <div className="settings-section-header">Preferences</div>
        <div className="settings-list">
          <div className="settings-list-item" onClick={() => navigate('/language')}>
            <span className="settings-list-icon"><img src={process.env.PUBLIC_URL + '/assets/icons/translate.png'} alt="Language" style={{ width: 24, height: 24 }} /></span>
            <span>Language</span>
            <img src={process.env.PUBLIC_URL + '/assets/icons/right-arrow.png'} alt="Go" className="settings-list-arrow" />
          </div>
          <div className="settings-list-item" onClick={() => navigate('/questionnaire')}>
            <span className="settings-list-icon"><img src={process.env.PUBLIC_URL + '/assets/icons/pencil.png'} alt="Preferences" style={{ width: 24, height: 24 }} /></span>
            <span>Change my Preferences</span>
            <img src={process.env.PUBLIC_URL + '/assets/icons/right-arrow.png'} alt="Go" className="settings-list-arrow" />
          </div>
          <div className="settings-list-item" onClick={() => navigate('/offline-content')}>
            <span className="settings-list-icon"><img src={process.env.PUBLIC_URL + '/assets/icons/download.png'} alt="Download" style={{ width: 24, height: 24 }} /></span>
            <span>Download for Offline Use</span>
            <img src={process.env.PUBLIC_URL + '/assets/icons/right-arrow.png'} alt="Go" className="settings-list-arrow" />
          </div>
          <div className="settings-list-item" onClick={() => navigate('/manage-offline')}>
            <span className="settings-list-icon"><img src={process.env.PUBLIC_URL + '/assets/icons/no-wifi.png'} alt="Manage Offline" style={{ width: 24, height: 24 }} /></span>
            <span>Manage Offline Content</span>
            <img src={process.env.PUBLIC_URL + '/assets/icons/right-arrow.png'} alt="Go" className="settings-list-arrow" />
          </div>
        </div>
      </div>

      <div className="settings-section">
        <div className="settings-section-header">Account</div>
        <div className="settings-list">
          <div className="settings-list-item" onClick={handleLogout} style={{ color: '#D32F2F' }}>
            <span className="settings-list-icon"><img src={process.env.PUBLIC_URL + '/assets/icons/logout.png'} alt="Logout" style={{ width: 24, height: 24 }} /></span>
            <span>Logout</span>
            <img src={process.env.PUBLIC_URL + '/assets/icons/right-arrow.png'} alt="Go" className="settings-list-arrow" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
