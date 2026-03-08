import type { PageServerLoad } from './$types';
import { getAllProjectSummaries, getAllTags, getAllCategories } from '$lib/utils/projects';

export const prerender = true;

export const load: PageServerLoad = async () => {
  const projects = await getAllProjectSummaries();
  const tags = getAllTags(projects);
  const categories = getAllCategories(projects);

  return {
    projects,
    tags,
    categories
  };
};
