import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// Application entry point - renders React app to DOM
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
