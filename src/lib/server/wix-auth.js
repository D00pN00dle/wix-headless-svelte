import { WIX_CLIENT_ID } from '$env/static/private';
/** @type {string | null} */
let cachedToken = null;
/** @type {number} */
let cachedTokenExpiresAt = 0;

// optional safety buffer so we refresh a bit early
const EXPIRY_BUFFER_MS = 30 * 1000; // 30s

async function fetchVisitorToken() {
  const res = await fetch('https://www.wixapis.com/oauth2/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({
      clientId: WIX_CLIENT_ID,
      grantType: 'anonymous'
    })
  });

  const text = await res.text();
  if (!res.ok) throw new Error(`Token request failed (${res.status}): ${text}`);

  let body;
  try {
    body = JSON.parse(text);
  } catch {
    throw new Error(`Token response was not JSON: ${text}`);
  }

  if (!body.access_token) {
    throw new Error(`Missing access_token: ${text}`);
  }

  // Wix commonly returns expires_in (seconds). Fallback to 300s if absent.
  const expiresInSec = typeof body.expires_in === 'number' ? body.expires_in : 300;
  const expiresAt = Date.now() + expiresInSec * 1000;

  return { accessToken: body.access_token, expiresAt };
}

export async function getVisitorToken() {
  const now = Date.now();

  // Reuse token if still valid (with buffer)
  if (cachedToken && now < cachedTokenExpiresAt - EXPIRY_BUFFER_MS) {
    return cachedToken;
  }

  // Fetch and cache a new one
  const { accessToken, expiresAt } = await fetchVisitorToken();
  cachedToken = accessToken;
  cachedTokenExpiresAt = expiresAt;

  return cachedToken;
}

// Optional: useful for debugging/testing
export function clearVisitorTokenCache() {
  cachedToken = null;
  cachedTokenExpiresAt = 0;
}