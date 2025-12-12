import React from 'react';
import './FormInput.css';

/**
 * Reusable form input with label and error display.
 * Used in Login and Register pages to reduce duplication.
 */
const FormInput = ({ 
  label, 
  type = 'text', 
  placeholder, 
  value, 
  onChange, 
  error 
}) => {
  return (
    <div className="input-group">
      <label>{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default FormInput;
