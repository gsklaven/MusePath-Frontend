// Validation functions
export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const validatePassword = (password) => {
  return password.length >= 6;
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
