import React, { useState, useCallback } from 'react';
import { BrowserRouter, useNavigate } from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContext';
import AppRouter from './router/AppRouter';
import UnauthorizedModal from './components/UnauthorizedModal';
import { register401ModalHandler } from './api/client';

/**
 * Main App component - wraps application with routing and authentication context.
 */


/**
 * Main App component - wraps application with routing and authentication context.
 */

function App() {
  const [show401, setShow401] = useState(false);

  // Register global 401 handler once
  React.useEffect(() => {
    register401ModalHandler(() => setShow401(true));
  }, []);

  const handleClose401 = useCallback(() => {
    setShow401(false);
    window.location.href = '/login';
  }, []);

  return (
    <BrowserRouter>
      <AuthContextProvider>
        <AppRouter />
        <UnauthorizedModal isOpen={show401} onClose={handleClose401} />

      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;