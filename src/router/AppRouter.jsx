import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ProtectedRoute from './ProtectedRoute';

// Welcome Page
import WelcomePage from '../pages/WelcomePage';
// Auth Pages
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
// Main Pages
import MapPage from '../pages/MapPage';
// Profile & Settings
// import ProfileSetupPage from '../pages/ProfileSetupPage';
import QuestionnairePage from '../pages/QuestionnairePage';
import QuestionnaireIntroPage from '../pages/QuestionnaireIntroPage';
import SettingsPage from '../pages/SettingsPage';
import FavouritesPage from '../pages/FavouritesPage';
import RatingsPage from '../pages/RatingsPage';
// Routes & Navigation
import CreateRoutePage from '../pages/CreateRoutePage';
import NavigationPage from '../pages/NavigationPage';
import PersonalizedRoutePage from '../pages/PersonalizedRoutePage';
// Offline
import OfflineContentPage from '../pages/OfflineContentPage';
import ManageOfflinePage from '../pages/ManageOfflinePage';
// API Test
import ApiTestPage from '../pages/ApiTestPage';

const AppRouter = () => {
  const { user } = useAuth();

  return (
    <Routes>
      {/* Public Routes */}
      <Route 
        path="/login" 
        element={user ? <Navigate to="/map" replace /> : <LoginPage />} 
      />

      <Route 
        path="/register" 
        element={user ? <Navigate to="/map" replace /> : <RegisterPage />} 
      />

      {/* Questionnaire Intro Public Route */}
      <Route
        path="/questionnaire-intro"
        element={<QuestionnaireIntroPage />}
      />

      {/* Protected Routes */}
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

      {/* API Test Page - Public για testing */}
      <Route
        path="/api-test"
        element={<ApiTestPage />}
      />

      {/* Default Route */}
      <Route 
        path="/" 
        element={user ? <Navigate to="/map" replace /> : <WelcomePage />} 
      />
    </Routes>
  );
};

export default AppRouter;
