import { json } from '@sveltejs/kit';
import { getWixClient } from '$lib/server/wix';

export async function GET() {
  const wixClient = getWixClient();

  return json({
    ok: true,
    clientCreated: !!wixClient
  });
}