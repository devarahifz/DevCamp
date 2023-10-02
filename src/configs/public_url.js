import { Directus } from '@directus/sdk';

export const url =
window.location.hostname === 'devcamp-bootcamp.netlify.app' ||
window.location.hostname === 'localhost'
  ? 'http://143.198.90.40:8055'
  : 'http://143.198.90.40:8055';

export const directus = new Directus(url);