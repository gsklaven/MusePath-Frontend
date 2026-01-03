/**
 * Validation Rule Constants
 * 
 * Input validation constraints and limits.
 * 
 * @module utils/constants/validation
 */

/**
 * Validation rules and constraints.
 * Applied during form input and data processing.
 * 
 * @constant {Object}
 * @property {number} MIN_PASSWORD_LENGTH - Minimum characters for security (6)
 * @property {number} MIN_RATING - Lowest allowed star rating (1)
 * @property {number} MAX_RATING - Highest allowed star rating (5)
 */
export const VALIDATION = {
  MIN_PASSWORD_LENGTH: 6,
  MIN_RATING: 1,
  MAX_RATING: 5,
};
