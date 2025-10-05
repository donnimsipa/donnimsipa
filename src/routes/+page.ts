import type { SiteData } from '$lib/types';

export const load = async ({ fetch }) => {
  const response = await fetch('/data.json');
  if (!response.ok) {
    throw new Error('Failed to load data.json');
  }
  const data = (await response.json()) as SiteData;
  return { data };
};
