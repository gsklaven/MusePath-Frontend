import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContext';
import AppRouter from './router/AppRouter';

/**
 * Main App component - wraps application with routing and authentication context.
 */

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <AppRouter />
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;