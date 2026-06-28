import { createClient, OAuthStrategy } from '@wix/sdk';
import { items } from '@wix/data'; // Wix Data SDK module
import { WIX_CLIENT_ID } from '$env/static/private';
import { getVisitorToken } from '$lib/server/wix-auth';

export async function getWixClient() {
  const accessToken = await getVisitorToken();

  return createClient({
    modules: { items },
    auth: OAuthStrategy({
      clientId: WIX_CLIENT_ID,
      tokens: {
        accessToken: {
          value: accessToken,
          expiresAt: Date.now() + 1000 * 60 * 30
        },
        refreshToken: {
          value: '',
          role: 'visitor',
        }
      }
    })
  });
}