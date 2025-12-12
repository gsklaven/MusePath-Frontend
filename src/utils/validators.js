/**
 * Validation utility functions for user inputs.
 * Includes validators for email, username, password, ratings, and coordinates.
 * Validation rules match backend requirements for consistency.
 */

/**
 * Validate email format
 * Matches backend: only allows alphanumeric, dots, underscores, percent, hyphens, and plus signs
 */
export const validateEmail = (email) => {
  if (typeof email !== 'string') return false;
  const emailRegex = /^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};

/**
 * Validate username format
 * Requirements match backend: 3-30 chars, only letters, numbers, underscores, hyphens
 */
export const validateUsername = (username) => {
  if (typeof username !== 'string') return false;
  if (username.length < 3 || username.length > 30) return false;
  const usernameRegex = /^[a-zA-Z0-9_-]+$/;
  return usernameRegex.test(username);
};

/**
 * Validate password strength
 * Requirements match backend:
 * - Minimum 8 characters
 * - At least one uppercase letter
 * - At least one lowercase letter
 * - At least one digit
 * - At least one special character
 * - Only latin letters, digits and common special characters allowed
 * @returns {{isValid: boolean, message: string}}
 */
export const validatePassword = (password) => {
  if (typeof password !== 'string') {
    return { isValid: false, message: 'Password must be a string' };
  }

  if (password.length < 8) {
    return { isValid: false, message: 'Password must be at least 8 characters long' };
  }

  // Allowed characters: A-Z a-z 0-9 and common ASCII special characters
  const allowedChars = /^[A-Za-z0-9!"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~]+$/;
  if (!allowedChars.test(password)) {
    return { isValid: false, message: 'Password contains invalid characters. Use only latin letters, digits and common special characters' };
  }

  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasDigit = /[0-9]/.test(password);
  const hasSpecial = /[!"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~]/.test(password);

  if (!hasUpper) {
    return { isValid: false, message: 'Password must contain at least one uppercase letter' };
  }
  if (!hasLower) {
    return { isValid: false, message: 'Password must contain at least one lowercase letter' };
  }
  if (!hasDigit) {
    return { isValid: false, message: 'Password must contain at least one digit' };
  }
  if (!hasSpecial) {
    return { isValid: false, message: 'Password must contain at least one special character' };
  }

  return { isValid: true, message: 'Password is strong' };
};

export const validateRating = (rating) => {
  return rating >= 1 && rating <= 5;
};

export const validateCoordinates = (lat, lng) => {
  return (
    lat >= -90 && lat <= 90 &&
    lng >= -180 && lng <= 180
  );
};
