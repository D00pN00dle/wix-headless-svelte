import { createClient, OAuthStrategy } from '@wix/sdk';

/**
 * Server-only Wix client.
 * This is a starter shell; we'll plug in specific Wix modules + token flow next.
 */
export function getWixClient() {
  return createClient({
    auth: OAuthStrategy({
      clientId: process.env.WIX_CLIENT_ID,
      tokens: {
        // Placeholder token object so the client can be constructed.
        // Replace with real OAuth/app tokens in the next step.
        accessToken: {
          value: '',
          expiresAt: 0
        }
      }
    })
  });
}