import { HEALTH_ENDPOINTS, SYSTEM_ENDPOINTS } from './systemEndpoints';
import { AUTH_ENDPOINTS, ROUTE_ENDPOINTS, USER_ENDPOINTS, COORDINATE_ENDPOINTS } from './userEndpoints';
import { EXHIBIT_ENDPOINTS, MAP_ENDPOINTS, DESTINATION_ENDPOINTS } from './contentEndpoints';

export * from './systemEndpoints';
export * from './userEndpoints';
export * from './contentEndpoints';

/**
 * All endpoints combined for comprehensive iteration
 * @type {Array<Object>}
 */
export const ALL_ENDPOINTS = [
  ...HEALTH_ENDPOINTS,
  ...AUTH_ENDPOINTS,
  ...EXHIBIT_ENDPOINTS,
  ...ROUTE_ENDPOINTS,
  ...USER_ENDPOINTS,
  ...MAP_ENDPOINTS,
  ...DESTINATION_ENDPOINTS,
  ...COORDINATE_ENDPOINTS,
  ...SYSTEM_ENDPOINTS,
];