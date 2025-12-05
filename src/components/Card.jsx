import React from 'react';
import './Card.css';

/**
 * Reusable card container component with consistent styling.
 */
const Card = ({ children, className = '', onClick, ...props }) => {
  return (
    <div className={`card ${className}`} onClick={onClick} {...props}>
      {children}
    </div>
  );
};

export default Card;
