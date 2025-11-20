import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Header from '../components/Header';
import Card from '../components/Card';
import Button from '../components/Button';
import './SettingsPage.css';

const SettingsPage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState(null);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div>
      <Header />
      <div className="container settings-container">
        <h1>Settings</h1>
        
        <Card className="settings-card" onClick={() => navigate('/favourites')}>
          <div className="settings-item">
            <span className="settings-icon">❤️</span>
            <div className="settings-content">
              <h3>My Favourites</h3>
              <p>View your saved exhibits</p>
            </div>
            <span className="settings-arrow">›</span>
          </div>
        </Card>
        
        <Card className="settings-card" onClick={() => navigate('/ratings')}>
          <div className="settings-item">
            <span className="settings-icon">⭐</span>
            <div className="settings-content">
              <h3>My Ratings</h3>
              <p>Review your exhibit ratings</p>
            </div>
            <span className="settings-arrow">›</span>
          </div>
        </Card>
        
        <Card className="settings-card" onClick={() => navigate('/questionnaire')}>
          <div className="settings-item">
            <span className="settings-icon">🎨</span>
            <div className="settings-content">
              <h3>Change My Preferences</h3>
              <p>Update your interests and preferences</p>
            </div>
            <span className="settings-arrow">›</span>
          </div>
        </Card>
        
        <Card className="settings-card" onClick={() => setActiveSection('language')}>
          <div className="settings-item">
            <span className="settings-icon">🌐</span>
            <div className="settings-content">
              <h3>Language</h3>
              <p>English (Default)</p>
            </div>
            <span className="settings-arrow">›</span>
          </div>
        </Card>
        
        <Card className="settings-card" onClick={() => navigate('/offline-content')}>
          <div className="settings-item">
            <span className="settings-icon">📥</span>
            <div className="settings-content">
              <h3>Download for Offline Use</h3>
              <p>Save content for offline access</p>
            </div>
            <span className="settings-arrow">›</span>
          </div>
        </Card>
        
        <Card className="settings-card" onClick={() => navigate('/manage-offline')}>
          <div className="settings-item">
            <span className="settings-icon">💾</span>
            <div className="settings-content">
              <h3>Manage Offline Content</h3>
              <p>View and delete downloaded content</p>
            </div>
            <span className="settings-arrow">›</span>
          </div>
        </Card>
        
        <div className="settings-actions">
          <Button variant="danger" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
