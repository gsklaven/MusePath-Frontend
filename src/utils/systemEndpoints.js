import {
  GET,
  POST
} from './endpointBuilders';

/**
 * Health check endpoints for API status monitoring
 */
export const HEALTH_ENDPOINTS = [
  GET(
    'health',
    'Health Check',
    'Health Status',
    '/health',
    'Έλεγχος λειτουργίας API'
  ),
];

/**
 * System endpoints for notifications and data synchronization
 */
export const SYSTEM_ENDPOINTS = [
  POST(
    'notifications-send',
    'Notifications',
    'Send Notification',
    '/notifications',
    'Αποστολή ειδοποίησης (Uses route_id 2 - backup route for testing)',
    {
      user_id: 1,
      route_id: 2,
      currentLat: 40.7610,
      currentLng: -73.9780,
    },
    'user'
  ),
  POST(
    'sync-data',
    'Sync',
    'Sync Offline Data',
    '/sync',
    'Συγχρονισμός offline δεδομένων',
    [
      {
        type: 'rating',
        exhibit_id: 1,
        rating: 5,
        timestamp: new Date().toISOString(),
      },
    ],
    'user'
  ),
];