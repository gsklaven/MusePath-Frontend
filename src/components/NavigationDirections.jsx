import React from 'react';

/**
 * NavigationDirections Component
 * Displays turn-by-turn instructions and route stops.
 *
 * @param {Object} props
 * @param {Object} props.routeDetails - Route object containing instructions array.
 * @param {number} props.currentStep - Index of the current instruction step.
 * @param {function} props.onNext - Handler for next step.
 * @param {function} props.onPrev - Handler for previous step.
 * @param {function} props.onSetStep - Handler to jump to specific step.
 * @param {Array} props.stops - List of intermediate stops.
 */
const NavigationDirections = ({ routeDetails, currentStep, onNext, onPrev, onSetStep, stops }) => {
  return (
    <div className="directions-card" style={{ margin: '32px 0 0 0', background: '#f8fafb', borderRadius: 16, boxShadow: '0 2px 12px rgba(44,51,67,0.07)' }}>
      <h2>Directions</h2>
      {routeDetails?.instructions && routeDetails.instructions.length > 0 ? (
        <>
          <div className="current-instruction">
            <div className="step-number">
              Step {currentStep + 1} of {routeDetails.instructions.length}
            </div>
            <p className="instruction-text">
              {routeDetails.instructions[currentStep]}
            </p>
          </div>
          <div className="step-controls">
            {/* Previous step button */}
            <button 
              className="muse-step-btn"
              onClick={onPrev}
              disabled={currentStep === 0}
              style={{ display: 'flex', alignItems: 'center' }}
            >
              <img src={process.env.PUBLIC_URL + '/assets/icons/back.png'} alt="Previous" style={{ width: 16, height: 16, marginRight: 6 }} />
              Previous
            </button>
            {/* Next step button */}
            <button 
              className="muse-step-btn"
              onClick={onNext}
              disabled={currentStep === routeDetails.instructions.length - 1}
              style={{ display: 'flex', alignItems: 'center' }}
            >
              Next
              <img src={process.env.PUBLIC_URL + '/assets/icons/right-arrow.png'} alt="Next" style={{ width: 16, height: 16, marginLeft: 6 }} />
            </button>
          </div>
          <div className="all-steps">
            <h3>All Steps</h3>
            <ol className="steps-list">
              {routeDetails.instructions.map((instruction, index) => (
                <li 
                  key={index} 
                  className={currentStep === index ? 'active' : ''}
                  onClick={() => onSetStep && onSetStep(index)}
                >
                  {instruction}
                </li>
              ))}
            </ol>
          </div>
        </>
      ) : (
        <p>Calculating directions...</p>
      )}
      {stops && stops.length > 0 && (
        <div className="route-stops">
          <h3>Stops on this route</h3>
          <ul>
            {stops.map((stop, index) => (
              <li key={index}>{stop.title}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default NavigationDirections;