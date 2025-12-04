import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useOnlineStatus } from '../hooks/useOnlineStatus';
import './Header.css';

/**
 * Application header with logo, offline indicator, and user actions.
 * Shows settings link and logout button when user is authenticated.
 */
const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const isOnline = useOnlineStatus();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/map" className="logo">
          MusePath
        </Link>
        
        <div className="header-right">
          {/* Show offline indicator when no internet */}
          {!isOnline && (
            <span className="offline-indicator">📴 Offline Mode</span>
          )}
          
          {/* Show user actions when authenticated */}
          {user && (
            <>
              <Link to="/settings" className="header-link">
                ⚙️ Settings
              </Link>
              <button onClick={handleLogout} className="btn btn-secondary btn-sm">
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
