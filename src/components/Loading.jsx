import React from 'react';
import './Loading.css';

/**
 * Loading spinner component with customizable message.
 */
const Loading = ({ message = 'Loading...' }) => {
  return (
    <div className="loading">
      <div className="spinner"></div>
      <p className="loading-message">{message}</p>
    </div>
  );
};

export default Loading;
