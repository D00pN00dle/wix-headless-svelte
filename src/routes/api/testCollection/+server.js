import { json } from '@sveltejs/kit';
import { getWixClient } from '$lib/server/wix';

// Insert
export async function POST({ request }) {
  try {
    const body = await request.formData();
    console.log('Received POST body:', body);
    // IMPORTANT: whitelist fields you allow from client input
    const dataItem = {
      title: body.get('title') ?? null
    };

    const wix = await getWixClient();
    const inserted = await wix.items.insert('TestCollection', dataItem);
    console.log('Inserted item:', inserted);
    return json({ ok: true, data: inserted }, { status: 201 });
  } catch (err) {
    return json(
      { ok: false, error: err instanceof Error ? err.message : 'Unknown error' },
      { status: 500 }
    );
  }
}