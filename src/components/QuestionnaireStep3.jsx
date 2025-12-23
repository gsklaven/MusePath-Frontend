import React, { useState } from 'react';

/**
 * QuestionnaireStep3 Component
 * Renders the third step: Custom Interests input.
 *
 * @param {Object} props
 * @param {string[]} props.interests - Array of custom interests added by user.
 * @param {function} props.onAddInterest - Callback to add a new interest tag.
 * @param {function} props.onRemoveInterest - Callback to remove an interest tag.
 * @param {function} props.onBack - Callback to go back.
 * @param {function} props.onSubmit - Callback to submit the questionnaire.
 */
const QuestionnaireStep3 = ({ interests, onAddInterest, onRemoveInterest, onBack, onSubmit }) => {
  const [customInterest, setCustomInterest] = useState('');

  const handleAdd = () => {
    if (customInterest.trim()) {
      // Add interest only if not empty
      onAddInterest(customInterest.trim());
      setCustomInterest('');
    }
  };

  return (
    <div className="questionnaire-step3">
      <h1 className="questionnaire-big-question">Any other interests? <span style={{ fontWeight: 400 }}>(Optional)</span></h1>
      <div className="custom-interest">
        <input
          type="text"
          value={customInterest}
          onChange={(e) => setCustomInterest(e.target.value)}
          placeholder="e.g., Modern Sculpture, Photography"
          onKeyPress={(e) => e.key === 'Enter' && handleAdd()}
        />
        <button
          className="questionnaire-next-btn"
          style={{ minWidth: 80, fontWeight: customInterest.trim() ? 600 : 400, opacity: customInterest.trim() ? 1 : 0.5 }}
          onClick={handleAdd}
          disabled={!customInterest.trim()}
        >
          Add
        </button>
      </div>
      {interests.length > 0 && (
        <div className="selected-interests">
          {interests.map((interest, index) => (
            <span key={index} className="interest-tag">
              {interest}
              <button onClick={() => onRemoveInterest(index)}>
                ×
              </button>
            </span>
          ))}
        </div>
      )}
      <div className="questionnaire-step1-next">
        <button
          className="questionnaire-next-btn"
          onClick={onBack}
          style={{ marginRight: 12, fontWeight: 600 }}
        >
          Back
        </button>
        <button
          className="questionnaire-next-btn"
          style={{ background: '#b5cda3', fontWeight: 600 }}
          onClick={onSubmit}
        >
          Complete Setup
        </button>
      </div>
    </div>
  );
};

export default QuestionnaireStep3;