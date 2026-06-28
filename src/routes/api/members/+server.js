import { json } from '@sveltejs/kit';
import { getWixClient } from '$lib/server/wix';

export async function GET() {
  try {
    const wix = await getWixClient();
    const result = await wix.items.query('Members/FullData').find();

    return json({ ok: true, data: result });
  } catch (err) {
    return json(
      { ok: false, error: err instanceof Error ? err.message : 'Unknown error' },
      { status: 500 }
    );
  }
}