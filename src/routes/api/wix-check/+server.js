import { json } from '@sveltejs/kit';
import { WIX_CLIENT_ID, WIX_ACCOUNT_ID, WIX_SITE_ID } from '$env/static/private';

export async function GET() {
  return json({
    ok: true,
    env: {
      hasClientId: !!WIX_CLIENT_ID,
      hasAccountId: !!WIX_ACCOUNT_ID,
      hasSiteId: !!WIX_SITE_ID
    }
  });
}