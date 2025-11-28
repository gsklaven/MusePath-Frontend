import React from 'react';
import { useNavigate } from 'react-router-dom';
import './QuestionnaireIntroPage.css';

const QuestionnaireIntroPage = () => {
  const navigate = useNavigate();

  const handleDecline = () => {
    navigate('/map');
  };

  const handleAccept = () => {
    navigate('/questionnaire');
  };

  return (
    <div className="questionnaire-intro-container">
      <div className="questionnaire-intro-logo">
        <img src={process.env.PUBLIC_URL + '/assets/logo.png'} alt="MusePath Logo" className="questionnaire-logo-img" />
      </div>
      <div className="questionnaire-intro-textbox">
        <div className="questionnaire-intro-text">
          Help us personalize your museum experience! 
          Answer a few quick questions to create your profile and discover the best routes tailored to your interests. The more we know about your preferences, the better your journey will be!
        </div>
      </div>
      <div className="questionnaire-intro-actions">
        <button className="intro-btn intro-btn-secondary" onClick={handleDecline}>No, thank you</button>
        <button className="intro-btn intro-btn-primary" onClick={handleAccept}>Yes, i would love to!</button>
      </div>
    </div>
  );
};

export default QuestionnaireIntroPage;
