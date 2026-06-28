import {fail} from '@sveltejs/kit';

export async function load({ fetch }) {
  const res = await fetch('/api/members');
  const {data} = await res.json();
  console.log('Members data:', data);
  if (!res.ok) {
    return fail(res.status, { error: data.error });
  }
  return { members: data.items };
}