import React from 'react';
import { HISTORICAL_PERIODS } from '../utils/constants';

/**
 * QuestionnaireStep1 Component
 * Renders the first step of the preference questionnaire: Historical Period selection.
 *
 * @param {Object} props
 * @param {string} props.selectedPeriod - The currently selected historical period.
 * @param {function} props.onSelect - Callback function when a period is selected.
 * @param {function} props.onNext - Callback function to proceed to the next step.
 */
const QuestionnaireStep1 = ({ selectedPeriod, onSelect, onNext }) => {
  return (
    <div className="questionnaire-step1">
      <h1 className="questionnaire-big-question">Which historical time periods fascinate you the most?</h1>
      <div className="questionnaire-radio-list">
        {/* Map through predefined periods to create radio options */}
        {HISTORICAL_PERIODS.map((period) => (
          <label key={period} className={`questionnaire-radio-option${selectedPeriod === period ? ' selected' : ''}`}>
            <input
              type="radio"
              name="historicalPeriod"
              value={period}
              checked={selectedPeriod === period}
              onChange={() => onSelect(period)}
            />
            <span className="custom-radio"></span>
            <span className="option-label">{period}</span>
          </label>
        ))}
      </div>
      <div className="questionnaire-step1-next">
        <button
          className="questionnaire-next-btn"
          onClick={onNext}
          disabled={!selectedPeriod}
          style={{ fontWeight: selectedPeriod ? 600 : 400, opacity: selectedPeriod ? 1 : 0.5 }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default QuestionnaireStep1;