/**
 * DEPRECATED: Profile setup functionality moved to QuestionnaireIntroPage.
 * This component is kept for backward compatibility but is no longer used.
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
