import type { PageLoad } from './$types';
import { error } from '@sveltejs/kit';
import { getProjectBySlug } from '$lib/utils/projects';

export const prerender = true;

export const load: PageLoad = async ({ params }) => {
  const result = await getProjectBySlug(params.slug);

  if (!result) {
    throw error(404, `Project "${params.slug}" not found`);
  }

  return {
    metadata: result.metadata,
    component: result.component
  };
};
