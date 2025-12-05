/**
 * ProfileSetupPage Component - DEPRECATED
 * 
 * Legacy profile setup modal that has been replaced by QuestionnaireIntroPage.
 * This component is kept for backward compatibility and routing fallback purposes.
 * 
 * Historical Context:
 * - Originally used as first-time user onboarding modal after registration
 * - Prompted users to complete preference questionnaire or skip to map
 * - Replaced by more comprehensive QuestionnaireIntroPage with better UX
 * 
 * Current Status:
 * - DEPRECATED: No longer used in active application flow
 * - Maintained for backward compatibility with old links/bookmarks
 * - Can be safely removed in future major version update
 * 
 * Original Functionality:
 * - Modal Dialog: Displayed yes/no prompt for profile completion
 * - Accept Action: Closed modal and navigated to questionnaire
 * - Decline Action: Marked setup as complete and navigated to map
 * - Used Modal component for consistent styling
 * 
 * Migration Path:
 * - New users now see QuestionnaireIntroPage after registration
 * - QuestionnaireIntroPage provides better context and visual design
 * - Includes feature explanations and better call-to-action buttons
 * 
 * Dependencies:
 * - Modal component (shared UI component still in use)
 * - Button component (shared UI component still in use)
 * - AuthContext for user state management
 * - React Router for navigation
 * 
 * Replacement Component:
 * - See: /pages/QuestionnaireIntroPage.jsx for current implementation
 * - Maintains same core functionality with improved UI/UX
 * 
 * Cleanup Recommendation:
 * - Can be removed in next major version (v2.0.0)
 * - Update any direct routes to /profile-setup to redirect to /questionnaire-intro
 * - Remove associated CSS file: ProfileSetupPage.css
 */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Button from '../components/Button';
import Modal from '../components/Modal';
import './ProfileSetupPage.css';

const ProfileSetupPage = () => {
  const [showModal, setShowModal] = useState(true);
  const navigate = useNavigate();
  const { updateUser } = useAuth();

  const handleAccept = () => {
    setShowModal(false);
  };

  const handleDecline = () => {
    updateUser({ hasCompletedSetup: true });
    navigate('/map');
  };

  return (
    <div className="profile-setup-container">
      <Modal 
        isOpen={showModal} 
        onClose={handleDecline}
        title="Complete Your Profile?"
        showCloseButton={false}
      >
        <div className="profile-setup-modal">
          <p className="modal-text">
            Would you like to complete your profile setup? 
            Answer a few questions about your preferences to get personalized 
            museum route recommendations!
          </p>
          
          <div className="modal-actions">
            <Button variant="primary" onClick={handleAccept}>
              Yes, I would love to!
            </Button>
            <Button variant="secondary" onClick={handleDecline}>
              No, thank you
            </Button>
          </div>
        </div>
      </Modal>
      
      {!showModal && (
        <div className="container">
          <h1>Let's personalize your experience</h1>
          <p>You'll be redirected to the questionnaire...</p>
          <Button 
            variant="primary" 
            onClick={() => navigate('/questionnaire')}
          >
            Continue to Questionnaire
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProfileSetupPage;
