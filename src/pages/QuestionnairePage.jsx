import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { updateUserPreferences } from '../api/users';
import { HISTORICAL_PERIODS, ARTISTS_CIVILIZATIONS } from '../utils/constants';
import Card from '../components/Card';
// ...existing code...
import './QuestionnairePage.css';

/**
 * Multi-step questionnaire for collecting user preferences.
 * Steps: Historical period → Artists/Civilizations → Custom interests.
 * Results saved to backend and used for personalized routes.
 */

const initialPreferences = {
  historicalPeriod: '',
  artistsCivilizations: [],
  interests: [],
};

const QuestionnairePage = () => {
  const [step, setStep] = useState(1);
  const [preferences, setPreferences] = useState(initialPreferences);
  const [customInterest, setCustomInterest] = useState('');
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();

  // Reset state on mount
  useEffect(() => {
    setStep(1);
    setPreferences(initialPreferences);
    setCustomInterest('');
  }, []);


  // Radio selection for single-choice questions
  const handleRadioSelection = (category, value) => {
    setPreferences(prev => ({
      ...prev,
      [category]: value
    }));
  };
  
  // Toggle selection for multi-choice questions
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
      {/* Debug removed */}
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
          

          {step === 1 && (
            <div className="questionnaire-step1">
              <h1 className="questionnaire-big-question">Which historical time periods fascinate you the most?</h1>
              <div className="questionnaire-radio-list">
                {HISTORICAL_PERIODS.map(period => (
                  <label key={period} className={`questionnaire-radio-option${preferences.historicalPeriod === period ? ' selected' : ''}`}>
                    <input
                      type="radio"
                      name="historicalPeriod"
                      value={period}
                      checked={preferences.historicalPeriod === period}
                      onChange={() => handleRadioSelection('historicalPeriod', period)}
                    />
                    <span className="custom-radio"></span>
                    <span className="option-label">{period}</span>
                  </label>
                ))}
              </div>
              <div className="questionnaire-step1-next" style={step === 2 ? {border: '2px solid red', background: '#ffe'} : {}}>
                <button
                  className="questionnaire-next-btn"
                  onClick={() => setStep(2)}
                  disabled={!preferences.historicalPeriod}
                  style={{ fontWeight: preferences.historicalPeriod ? 600 : 400, opacity: preferences.historicalPeriod ? 1 : 0.5 }}
                >
                  Next
                </button>
              </div>
            </div>
          )}
          
          {step === 2 && (
            <div className="questionnaire-step2">
              <h1 className="questionnaire-big-question">Which artists or civilizations fascinate you?</h1>
              <div className="questionnaire-checkbox-list">
                {ARTISTS_CIVILIZATIONS.map(item => (
                  <label key={item} className={`questionnaire-checkbox-option${preferences.artistsCivilizations.includes(item) ? ' selected' : ''}`}>
                    <input
                      type="checkbox"
                      name="artistsCivilizations"
                      value={item}
                      checked={preferences.artistsCivilizations.includes(item)}
                      onChange={() => handleToggleSelection('artistsCivilizations', item)}
                    />
                    <span className="custom-checkbox"></span>
                    <span className="option-label">{item}</span>
                  </label>
                ))}
              </div>
              <div className="questionnaire-step1-next">
                <button
                  className="questionnaire-next-btn"
                  onClick={() => setStep(1)}
                  style={{marginRight: 12, fontWeight: 600}}
                >
                  Back
                </button>
                <button
                  className="questionnaire-next-btn"
                  onClick={() => setStep(3)}
                  disabled={preferences.artistsCivilizations.length === 0}
                  style={{ fontWeight: preferences.artistsCivilizations.length > 0 ? 600 : 400, opacity: preferences.artistsCivilizations.length > 0 ? 1 : 0.5 }}
                >
                  Next
                </button>
              </div>
            </div>
          )}
          
          {step === 3 && (
            <div className="questionnaire-step3">
              <h1 className="questionnaire-big-question">Any other interests? <span style={{fontWeight:400}}>(Optional)</span></h1>
              <div className="custom-interest">
                <input
                  type="text"
                  value={customInterest}
                  onChange={(e) => setCustomInterest(e.target.value)}
                  placeholder="e.g., Modern Sculpture, Photography"
                  onKeyPress={(e) => e.key === 'Enter' && handleAddCustomInterest()}
                />
                <button
                  className="questionnaire-next-btn"
                  style={{ minWidth: 80, fontWeight: customInterest.trim() ? 600 : 400, opacity: customInterest.trim() ? 1 : 0.5 }}
                  onClick={handleAddCustomInterest}
                  disabled={!customInterest.trim()}
                >
                  Add
                </button>
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
              <div className="questionnaire-step1-next">
                <button
                  className="questionnaire-next-btn"
                  onClick={() => setStep(2)}
                  style={{marginRight: 12, fontWeight: 600}}
                >
                  Back
                </button>
                <button
                  className="questionnaire-next-btn"
                  style={{background: '#b5cda3', fontWeight: 600}}
                  onClick={handleSubmit}
                >
                  Complete Setup
                </button>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default QuestionnairePage;
