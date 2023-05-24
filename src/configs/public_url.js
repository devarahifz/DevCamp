import { Directus } from '@directus/sdk';

export const url =
window.location.hostname === 'localhost'
  ? 'http://localhost:8055'
  : 'https://api.directus.io';

export const directus = new Directus(url);