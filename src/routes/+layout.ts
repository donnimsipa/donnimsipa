import type { SiteData } from '$lib/types';

export const prerender = true;

export async function load({ fetch }) {
  const response = await fetch('/data.json');
  if (!response.ok) {
    throw new Error('Failed to load data.json');
  }
  const meta = (await response.json()) as SiteData;

  const title = `${meta.name} — ${meta.headline}`;
  const description = typeof meta.about === 'string' ? meta.about.slice(0, 180) : '';
  const siteName = meta.siteName ?? meta.name;
  const name = meta.name;
  return {
    meta: {
      title,
      description,
      siteName,
      name
    }
  };
}
