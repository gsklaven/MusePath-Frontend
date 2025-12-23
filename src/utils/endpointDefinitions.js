import { HEALTH_ENDPOINTS, SYSTEM_ENDPOINTS } from './systemEndpoints';
import { AUTH_ENDPOINTS } from './authEndpoints';
import { ROUTE_ENDPOINTS } from './routeEndpoints';
import { USER_ENDPOINTS } from './userEndpoints';
import { COORDINATE_ENDPOINTS } from './coordinateEndpoints';
import { EXHIBIT_ENDPOINTS } from './exhibitEndpoints';
import { MAP_ENDPOINTS } from './mapEndpoints';
import { DESTINATION_ENDPOINTS } from './destinationEndpoints';

export * from './systemEndpoints';
export * from './authEndpoints';
export * from './routeEndpoints';
export * from './userEndpoints';
export * from './coordinateEndpoints';
export * from './exhibitEndpoints';
export * from './mapEndpoints';
export * from './destinationEndpoints';

/**
 * All endpoints combined for comprehensive iteration
 * @type {Array<Object>}
 */
export const ALL_ENDPOINTS = [
  ...(HEALTH_ENDPOINTS || []),
  ...(AUTH_ENDPOINTS || []),
  ...(EXHIBIT_ENDPOINTS || []),
  ...(ROUTE_ENDPOINTS || []),
  ...(USER_ENDPOINTS || []),
  ...(MAP_ENDPOINTS || []),
  ...(DESTINATION_ENDPOINTS || []),
  ...(COORDINATE_ENDPOINTS || []),
  ...(SYSTEM_ENDPOINTS || []),
];
