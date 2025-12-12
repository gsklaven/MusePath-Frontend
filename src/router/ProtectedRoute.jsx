import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Loading from '../components/Loading';

/**
 * Route wrapper that requires authentication.
 * Redirects to login if user is not authenticated.
 */
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  // Show loading while checking auth status
  if (loading) {
    return <Loading message="Checking authentication..." />;
  }

  // Redirect to login if not authenticated
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
