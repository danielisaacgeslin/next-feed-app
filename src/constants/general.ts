export const IMG_BASE = 'https://fakeimg.pl/50x50/fe6f69/000000';

export const PLACEHOLDER_IMAGE_ID = 'placeholder';
export const PLACEHOLDER_IMAGE = `${IMG_BASE}?text=${PLACEHOLDER_IMAGE_ID}&font=lobster&font_size=25`;

export const POST_API = 'https://jsonplaceholder.typicode.com/comments';
export const POST_LIMIT = 20;

export const WS_PORT = 3050;
export const WS_URL = `http://localhost:${WS_PORT}`;
export const WS_POST_EV = `ws-post`;

/** how many ms after it was added to consider a post as new */
export const NEW_POST_CRITERIA_MS = 12500;
