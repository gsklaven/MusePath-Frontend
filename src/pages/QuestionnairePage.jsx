/**
 * QuestionnairePage Component
 * 
 * Multi-step questionnaire collecting user preferences for personalized museum routes.
 * Three-step form wizard that saves preferences to backend for AI route generation.
 * 
 * Purpose:
 * - Collect user interests and preferences for personalized exhibit recommendations
 * - Enable AI algorithm to generate custom museum routes matching user tastes
 * - Create user profile for enhanced museum experience personalization
 * - Gather data for improving exhibit recommendations over time
 * 
 * Questionnaire Steps:
 * 
 * Step 1: Historical Periods (Single Choice)
 * - User selects their favorite historical period from predefined options
 * - Options include: Ancient Greece, Roman Empire, Medieval, Renaissance, etc.
 * - Radio button selection (only one period can be chosen)
 * - Determines primary exhibit filtering for route generation
 * 
 * Step 2: Artists & Civilizations (Multiple Choice)
 * - User selects multiple artists or civilizations they're interested in
 * - Options include: Leonardo da Vinci, Michelangelo, Egyptian, Chinese, etc.
 * - Checkbox-style toggle selection (multiple allowed)
 * - Refines exhibit selection beyond historical period
 * 
 * Step 3: Custom Interests (Free Text + List)
 * - User can add custom interests not covered in previous steps
 * - Text input field with "Add" button to create interest tags
 * - Displays list of added interests with remove capability
 * - Allows for unique preferences like "pottery", "military history", "textiles"
 * 
 * Features:
 * - Step Navigation: Next/Previous buttons to move between steps
 * - Progress Tracking: Visual step indicator (1/3, 2/3, 3/3)
 * - Form Validation: Ensures at least one selection per step before proceeding
 * - Interest Management: Add and remove custom interests with tag UI
 * - Back Navigation: Can return to previous steps to modify selections
 * - Final Submit: Saves all preferences to backend and marks onboarding complete
 * 
 * State Management:
 * - step: Current questionnaire step (1, 2, or 3)
 * - preferences: Object storing all user selections across steps
 * - customInterest: Temporary input field value for adding new interests
 * - Resets state on component mount for fresh start
 * 
 * Data Structure:
 * preferences = {
 *   historicalPeriod: string (single selected period),
 *   artistsCivilizations: array (multiple selected artists/cultures),
 *   interests: array (custom free-text interests added by user)
 * }
 * 
 * API Integration:
 * - updateUserPreferences(userId, interests[]): Saves combined interests to backend
 * - Combines all preference categories into single interests array
 * - Updates AuthContext with hasCompletedSetup flag
 * - Stores preferences in user object for future reference
 * 
 * User Flow:
 * 1. Land on Step 1, select historical period, click Next
 * 2. Step 2 appears, select multiple artists/civilizations, click Next
 * 3. Step 3 appears, optionally add custom interests, click Submit
 * 4. Preferences saved to backend, redirected to map page
 * 5. Personalized routes now available based on saved preferences
 * 
 * Constants:
 * - HISTORICAL_PERIODS: Array of predefined period options from utils/constants.js
 * - ARTISTS_CIVILIZATIONS: Array of predefined artist/culture options
 * - These ensure consistent data format across app
 * 
 * Navigation:
 * - Completes with redirect to /map page
 * - Sets hasCompletedSetup flag to prevent re-showing questionnaire
 * - Can be re-accessed from settings to update preferences
 * 
 * Visual Design:
 * - Card-based layout for clean presentation
 * - Large tap targets for mobile-friendly selection
 * - Color-coded selections with visual feedback
 * - Clear step indicators and progress tracking
 * - Responsive design for all device sizes
 */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { updateUserPreferences } from '../api/users';
import { HISTORICAL_PERIODS, ARTISTS_CIVILIZATIONS } from '../utils/constants';
import Card from '../components/Card';
// ...existing code...
import './QuestionnairePage.css';

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
