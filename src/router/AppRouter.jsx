/**
 * @file AppRouter.jsx
 * @description This file defines the routing structure for the application.
 * It uses React Router to handle navigation between different pages.
 * The router includes public routes, protected routes, and a default route.
 * Protected routes are wrapped in a `ProtectedRoute` component to ensure
 * that only authenticated users can access them.
 */
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ProtectedRoute from './ProtectedRoute';
import {
  WelcomePage,
  LoginPage,
  RegisterPage,
  MapPage,
  QuestionnairePage,
  QuestionnaireIntroPage,
  SettingsPage,
  FavouritesPage,
  RatingsPage,
  CreateRoutePage,
  NavigationPage,
  PersonalizedRoutePage,
  OfflineContentPage,
  ManageOfflinePage,
  ApiTestPage
} from '../pages';

/**
 * Defines the main routing configuration for the application.
 *
 * It separates routes into public and protected sections.
 * Public routes like login, register, and welcome are accessible to everyone.
 * Protected routes require user authentication and are wrapped in the `ProtectedRoute` component.
 * If a user is logged in, accessing public auth routes will redirect them to the map.
 * The default route redirects to the map for authenticated users or the welcome page for guests.
 *
 * @returns {JSX.Element} The router component containing all application routes.
 */
const AppRouter = () => {
  const { user } = useAuth();

  return (
    <Routes>
      {/* Public auth routes: Redirect to map if user is already logged in. */}
      <Route 
        path="/login" 
        element={user ? <Navigate to="/map" replace /> : <LoginPage />} 
      />

      <Route 
        path="/register" 
        element={user ? <Navigate to="/map" replace /> : <RegisterPage />} 
      />

      {/* Public questionnaire intro route */}
      <Route
        path="/questionnaire-intro"
        element={<QuestionnaireIntroPage />}
      />

      {/* --- Protected Routes --- */}
      {/* These routes are only accessible to authenticated users. */}
      <Route
        path="/map"
        element={
          <ProtectedRoute>
            <MapPage />
          </ProtectedRoute>
        }
      />
        {/* Removed ExhibitPage route */}

      <Route
        path="/questionnaire"
        element={
          <ProtectedRoute>
            <QuestionnairePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <SettingsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/favourites"
        element={
          <ProtectedRoute>
            <FavouritesPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/ratings"
        element={
          <ProtectedRoute>
            <RatingsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/create-route"
        element={
          <ProtectedRoute>
            <CreateRoutePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/navigation"
        element={
          <ProtectedRoute>
            <NavigationPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/personalized-route"
        element={
          <ProtectedRoute>
            <PersonalizedRoutePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/offline-content"
        element={
          <ProtectedRoute>
            <OfflineContentPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/manage-offline"
        element={
          <ProtectedRoute>
            <ManageOfflinePage />
          </ProtectedRoute>
        }
      />

      {/* API Test Page - Public for testing purposes */}
      <Route
        path="/api-test"
        element={<ApiTestPage />}
      />

      {/* Default route: Redirects to map if logged in, otherwise to welcome page. */}
      <Route 
        path="/" 
        element={user ? <Navigate to="/map" replace /> : <WelcomePage />} 
      />
    </Routes>
  );
};

export default AppRouter;
