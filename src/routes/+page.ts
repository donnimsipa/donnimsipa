import type { SiteData } from '$lib/types';
import { getAllProjectSummaries } from '$lib/utils/projects';

export const load = async ({ fetch }) => {
  const response = await fetch('/site.json');
  if (!response.ok) {
    throw new Error('Failed to load site.json');
  }
  const data = (await response.json()) as SiteData;
  const projectSummaries = await getAllProjectSummaries();
  
  return { 
    data,
    projectSummaries
  };
};
