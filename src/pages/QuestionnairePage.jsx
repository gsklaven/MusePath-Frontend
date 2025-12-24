/**
 * QuestionnairePage Component
 * Multi-step questionnaire collecting user preferences for personalized museum routes.
 */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { updateUserPreferences } from '../api/users';
import { Card, QuestionnaireStep1, QuestionnaireStep2, QuestionnaireStep3 } from '../components';
import './QuestionnairePage.css';

const initialPreferences = {
  historicalPeriod: '',
  artistsCivilizations: [],
  interests: [],
};

const QuestionnairePage = () => {
  const [step, setStep] = useState(1);
  const [preferences, setPreferences] = useState(initialPreferences);
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();

  // Reset state on mount
  useEffect(() => {
    setStep(1);
    setPreferences(initialPreferences);
  }, []);


  // Radio selection for single-choice questions
  const handleRadioSelection = (category, value) => {
    // Update state with selected value for category
    setPreferences(prev => ({
      ...prev,
      [category]: value
    }));
  };
  
  // Toggle selection for multi-choice questions
  const handleToggleSelection = (category, value) => {
    setPreferences(prev => ({
      ...prev,
      // Add or remove item from array based on existence
      [category]: prev[category].includes(value)
        ? prev[category].filter(item => item !== value)
        : [...prev[category], value]
    }));
  };

  const handleAddInterest = (interest) => {
    // Add custom interest to the list
    setPreferences(prev => ({
      ...prev,
      interests: [...prev.interests, interest]
    }));
  };

  const handleRemoveInterest = (index) => {
    // Remove custom interest by index
    setPreferences(prev => ({
      ...prev,
      interests: prev.interests.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async () => {
    try {
      // Combine all preferences into a single array
      const allInterests = [
        preferences.historicalPeriod,
        ...preferences.artistsCivilizations,
        ...preferences.interests,
      ].filter(Boolean); // Remove empty/undefined values
      
      const userId = user.userId || user.id;
      if (!userId) {
        throw new Error('User ID not found');
      }
      
      // Save preferences to backend and update context
      await updateUserPreferences(userId, allInterests);
      updateUser({ 
        ...user,
        hasCompletedSetup: true,
        preferences: allInterests 
      });
      navigate('/map');
    } catch (error) {
      console.error('Error saving preferences:', error);
      alert('Failed to save preferences. Please try again.');
    }
  };

  return (
    <div className="questionnaire-container">
      <div className="container">
        <Card>
          <h1>Personalize Your Experience</h1>

          {/* Progress bar: update denominator if you add more steps */}
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${(step / 3) * 100}%` }}
            ></div>
          </div>

          {/* Step 1: Historical Period Selection */}
          {step === 1 && (
            <QuestionnaireStep1
              selectedPeriod={preferences.historicalPeriod}
              onSelect={(val) => handleRadioSelection('historicalPeriod', val)}
              onNext={() => setStep(2)}
            />
          )}
          
          {/* Step 2: Artists & Civilizations Selection */}
          {step === 2 && (
            <QuestionnaireStep2
              selectedItems={preferences.artistsCivilizations}
              onToggle={(val) => handleToggleSelection('artistsCivilizations', val)}
              onBack={() => setStep(1)}
              onNext={() => setStep(3)}
            />
          )}
          
          {/* Step 3: Custom Interests Input */}
          {step === 3 && (
            <QuestionnaireStep3
              interests={preferences.interests}
              onAddInterest={handleAddInterest}
              onRemoveInterest={handleRemoveInterest}
              onBack={() => setStep(2)}
              onSubmit={handleSubmit}
            />
          )}
        </Card>
      </div>
    </div>
  );
};

export default QuestionnairePage;
