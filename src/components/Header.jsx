import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useOnlineStatus } from '../hooks/useOnlineStatus';
import './Header.css';

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
          <img src="/logo.png" alt="MusePath Logo" className="logo-icon" />
          <span className="logo-text">MusePath</span>
        </Link>
        
        <div className="header-right">
          {!isOnline && (
            <span className="offline-indicator">📴 Offline Mode</span>
          )}
          
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
