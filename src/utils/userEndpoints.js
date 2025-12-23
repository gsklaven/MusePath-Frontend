/**
 * User API Endpoints
 */
import { GET, POST, PUT, DELETE, generateTestUser } from './endpointBuilders';

const C = { A: 'Authentication', R: 'Routes', U: 'Users', L: 'Coordinates' };

export const AUTH_ENDPOINTS = [
  POST('auth-register', C.A, 'Register User', '/auth/register', 
    'Δημιουργία νέου λογαριασμού', generateTestUser),
  POST('auth-login', C.A, 'Login', '/auth/login', 'Σύνδεση χρήστη', 
    { username: 'john_smith', password: 'Password123!' }),
  POST('auth-logout', C.A, 'Logout', '/auth/logout', 'Αποσύνδεση χρήστη', null, 'user'),
];

export const ROUTE_ENDPOINTS = [
  POST('routes-create', C.R, 'Calculate Route', '/routes', 'Υπολογισμός διαδρομής', 
    { user_id: 1, destination_id: 2, startLat: 40.7610, startLng: -73.9780 }, 'user'),
  GET('routes-get', C.R, 'Get Route Details', '/routes/1', 
    'Λεπτομέρειες διαδρομής', 'user', 'routes-create'),
  PUT('routes-update', C.R, 'Update Route Stops', '/routes/1', 
    'Ενημέρωση στάσεων διαδρομής', { addStops: [3, 4], removeStops: [] }, 'user', 'routes-create'),
  POST('routes-recalculate', C.R, 'Recalculate Route', '/routes/1', 
    'Επαναυπολογισμός διαδρομής', null, 'user', 'routes-create'),
  DELETE('routes-delete', C.R, 'Delete Route', '/routes/1', 
    'Διαγραφή διαδρομής', 'user', 'routes-create'),
];

export const USER_ENDPOINTS = [
  PUT('users-preferences', C.U, 'Update Preferences', '/users/1/preferences', 
    'Ενημέρωση προτιμήσεων χρήστη', 
    { interests: ['modern art', 'sculpture', 'impressionism'] }, 'user'),
  POST('users-favourites-add', C.U, 'Add to Favourites', '/users/1/favourites', 
    'Προσθήκη στα αγαπημένα', { exhibit_id: 2 }, 'user'),
  DELETE('users-favourites-remove', C.U, 'Remove from Favourites', '/users/1/favourites/2', 
    'Αφαίρεση από αγαπημένα', 'user'),
  GET('users-personalized-route', C.U, 'Get Personalized Route', '/users/1/routes', 
    'Εξατομικευμένη διαδρομή', 'user'),
];

export const COORDINATE_ENDPOINTS = [
  GET('coordinates-get', C.L, 'Get User Coordinates', '/coordinates/1', 
    'Τοποθεσία χρήστη', 'user'),
  PUT('coordinates-update', C.L, 'Update Coordinates', '/coordinates/1', 
    'Ενημέρωση τοποθεσίας', { lat: 40.7612, lng: -73.9778 }, 'user'),
];