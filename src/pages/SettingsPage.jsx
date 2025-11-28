import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './SettingsPage.css';


const SettingsPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="settings-outer-container">
      <div className="settings-profile">
        <div className="settings-avatar-circle">
          {/* If you have a user avatar, use it here. Otherwise, fallback to SVG or placeholder */}
          <img src={process.env.PUBLIC_URL + '/assets/icons/avatar.png'} alt="User avatar" className="settings-avatar-img" onError={e => {e.target.onerror=null; e.target.src=process.env.PUBLIC_URL + '/assets/icons/profile-placeholder.png';}} />
        </div>
        <div className="settings-username">{user?.name || 'User'}</div>
      </div>

      <div className="settings-section">
        <div className="settings-section-header">Content</div>
        <div className="settings-list">
          <div className="settings-list-item" onClick={() => navigate('/favourites')}>
            <img src={process.env.PUBLIC_URL + '/assets/icons/heart.png'} alt="Favourites" className="settings-list-icon" />
            <span>My Favourites</span>
            <img src={process.env.PUBLIC_URL + '/assets/icons/right-arrow.png'} alt="Go" className="settings-list-arrow" />
          </div>
          <div className="settings-list-item" onClick={() => navigate('/ratings')}>
            <img src={process.env.PUBLIC_URL + '/assets/icons/thumbs.png'} alt="Ratings" className="settings-list-icon" />
            <span>My Ratings</span>
            <img src={process.env.PUBLIC_URL + '/assets/icons/right-arrow.png'} alt="Go" className="settings-list-arrow" />
          </div>
        </div>
      </div>

      <div className="settings-section">
        <div className="settings-section-header">Preferences</div>
        <div className="settings-list">
          <div className="settings-list-item" onClick={() => navigate('/language')}>
            <img src={process.env.PUBLIC_URL + '/assets/icons/translate.png'} alt="Language" className="settings-list-icon" />
            <span>Language</span>
            <img src={process.env.PUBLIC_URL + '/assets/icons/right-arrow.png'} alt="Go" className="settings-list-arrow" />
          </div>
          <div className="settings-list-item" onClick={() => navigate('/questionnaire')}>
            <img src={process.env.PUBLIC_URL + '/assets/icons/museum.png'} alt="Preferences" className="settings-list-icon" />
            <span>Change my Preferences</span>
            <img src={process.env.PUBLIC_URL + '/assets/icons/right-arrow.png'} alt="Go" className="settings-list-arrow" />
          </div>
          <div className="settings-list-item" onClick={() => navigate('/offline-content')}>
            <img src={process.env.PUBLIC_URL + '/assets/icons/download.png'} alt="Download" className="settings-list-icon" />
            <span>Download for Offline Use</span>
            <img src={process.env.PUBLIC_URL + '/assets/icons/right-arrow.png'} alt="Go" className="settings-list-arrow" />
          </div>
          <div className="settings-list-item" onClick={() => navigate('/manage-offline')}>
            <img src={process.env.PUBLIC_URL + '/assets/icons/no-wifi.png'} alt="Manage Offline" className="settings-list-icon" />
            <span>Manage Offline Content</span>
            <img src={process.env.PUBLIC_URL + '/assets/icons/right-arrow.png'} alt="Go" className="settings-list-arrow" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
