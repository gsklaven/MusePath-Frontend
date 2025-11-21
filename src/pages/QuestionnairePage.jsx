import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { updateUserPreferences } from '../api/users';
import { HISTORICAL_PERIODS, ARTISTS_CIVILIZATIONS } from '../utils/constants';
import Button from '../components/Button';
import Card from '../components/Card';
import './QuestionnairePage.css';

const QuestionnairePage = () => {
  const [step, setStep] = useState(1);
  const [preferences, setPreferences] = useState({
    historicalPeriods: [],
    artistsCivilizations: [],
    interests: [],
  });
  const [customInterest, setCustomInterest] = useState('');
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();

  const handleToggleSelection = (category, value) => {
    setPreferences(prev => ({
      ...prev,
      [category]: prev[category].includes(value)
        ? prev[category].filter(item => item !== value)
        : [...prev[category], value]
    }));
  };

  const handleAddCustomInterest = () => {
    if (customInterest.trim()) {
      setPreferences(prev => ({
        ...prev,
        interests: [...prev.interests, customInterest.trim()]
      }));
      setCustomInterest('');
    }
  };

  const handleSubmit = async () => {
    try {
      const allInterests = [
        ...preferences.historicalPeriods,
        ...preferences.artistsCivilizations,
        ...preferences.interests,
      ];
      
      await updateUserPreferences(user.id, allInterests);
      updateUser({ 
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
          <div className="questionnaire-header">
            <img src="/logo.png" alt="MusePath Logo" className="questionnaire-logo" />
            <h1>Personalize Your Experience</h1>
          </div>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>
          
          {step === 1 && (
            <div className="question-section">
              <h2>What historical periods interest you?</h2>
              <div className="options-grid">
                {HISTORICAL_PERIODS.map(period => (
                  <button
                    key={period}
                    className={`option-button ${
                      preferences.historicalPeriods.includes(period) ? 'selected' : ''
                    }`}
                    onClick={() => handleToggleSelection('historicalPeriods', period)}
                  >
                    {period}
                  </button>
                ))}
              </div>
              <Button 
                variant="primary" 
                onClick={() => setStep(2)}
                disabled={preferences.historicalPeriods.length === 0}
              >
                Next
              </Button>
            </div>
          )}
          
          {step === 2 && (
            <div className="question-section">
              <h2>Which artists or civilizations fascinate you?</h2>
              <div className="options-grid">
                {ARTISTS_CIVILIZATIONS.map(item => (
                  <button
                    key={item}
                    className={`option-button ${
                      preferences.artistsCivilizations.includes(item) ? 'selected' : ''
                    }`}
                    onClick={() => handleToggleSelection('artistsCivilizations', item)}
                  >
                    {item}
                  </button>
                ))}
              </div>
              <div className="button-group">
                <Button variant="secondary" onClick={() => setStep(1)}>
                  Back
                </Button>
                <Button 
                  variant="primary" 
                  onClick={() => setStep(3)}
                  disabled={preferences.artistsCivilizations.length === 0}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
          
          {step === 3 && (
            <div className="question-section">
              <h2>Any other interests? (Optional)</h2>
              <div className="custom-interest">
                <input
                  type="text"
                  value={customInterest}
                  onChange={(e) => setCustomInterest(e.target.value)}
                  placeholder="e.g., Modern Sculpture, Photography"
                  onKeyPress={(e) => e.key === 'Enter' && handleAddCustomInterest()}
                />
                <Button variant="secondary" onClick={handleAddCustomInterest}>
                  Add
                </Button>
              </div>
              
              {preferences.interests.length > 0 && (
                <div className="selected-interests">
                  {preferences.interests.map((interest, index) => (
                    <span key={index} className="interest-tag">
                      {interest}
                      <button
                        onClick={() => setPreferences(prev => ({
                          ...prev,
                          interests: prev.interests.filter((_, i) => i !== index)
                        }))}
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}
              
              <div className="button-group">
                <Button variant="secondary" onClick={() => setStep(2)}>
                  Back
                </Button>
                <Button variant="success" onClick={handleSubmit}>
                  Complete Setup
                </Button>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default QuestionnairePage;
