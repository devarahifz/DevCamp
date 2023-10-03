import { Directus } from '@directus/sdk';

export const url =
window.location.hostname === 'devcamp-bootcamp.netlify.app' ||
window.location.hostname === 'localhost'
  ? 'https://devcamp.duckdns.org'
  : 'https://devcamp.duckdns.org';

export const directus = new Directus(url);