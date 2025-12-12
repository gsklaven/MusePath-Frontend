/**
 * MusePath Application Entry Point
 * 
 * This is the main entry file for the React application.
 * It initializes the React root and renders the App component.
 */

// React core library for building UI components
import React from 'react';
// ReactDOM for rendering React components to the DOM
import ReactDOM from 'react-dom/client';
// Global styles for the application
import './index.css';
// Main App component that contains the entire application
import App from './App';

// Create React root attached to the 'root' DOM element
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the application wrapped in StrictMode for development checks
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);