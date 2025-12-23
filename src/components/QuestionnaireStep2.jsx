import { ARTISTS_CIVILIZATIONS } from '../utils/constants';

/**
 * QuestionnaireStep2 Component
 * Renders the second step: Artists & Civilizations multi-selection.
 *
 * @param {Object} props
 * @param {string[]} props.selectedItems - Array of selected artists/civilizations.
 * @param {function} props.onToggle - Callback to toggle selection of an item.
 * @param {function} props.onBack - Callback to go back to previous step.
 * @param {function} props.onNext - Callback to proceed to next step.
 */
const QuestionnaireStep2 = ({ selectedItems, onToggle, onBack, onNext }) => {
  return (
    <div className="questionnaire-step2">
      <h1 className="questionnaire-big-question">Which artists or civilizations fascinate you?</h1>
      <div className="questionnaire-checkbox-list">
        {/* Map through items to create checkboxes */}
        {ARTISTS_CIVILIZATIONS.map((item) => (
          <label key={item} className={`questionnaire-checkbox-option${selectedItems.includes(item) ? ' selected' : ''}`}>
            <input
              type="checkbox"
              name="artistsCivilizations"
              value={item}
              checked={selectedItems.includes(item)}
              onChange={() => onToggle(item)}
            />
            <span className="custom-checkbox"></span>
            <span className="option-label">{item}</span>
          </label>
        ))}
      </div>
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
          onClick={onNext}
          disabled={selectedItems.length === 0}
          style={{ fontWeight: selectedItems.length > 0 ? 600 : 400, opacity: selectedItems.length > 0 ? 1 : 0.5 }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default QuestionnaireStep2;