import type { ProjectMetadata, ProjectSummary } from '$lib/types/project';

/**
 * Average reading speed (words per minute).
 */
const WPM = 200;

/**
 * Estimate reading time in minutes from a raw markdown string.
 */
export function estimateReadTime(content: string): number {
  const text = content.replace(/```[\s\S]*?```/g, '').replace(/[#*_`>\[\]]/g, '');
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / WPM));
}

/**
 * Load all project summaries (metadata + path, no Svelte component).
 * Uses Vite's import.meta.glob with eager: true to gather frontmatter at build time.
 * Safe to call from +page.server.ts.
 */
export async function getAllProjectSummaries(): Promise<ProjectSummary[]> {
  // Glob all .md files in the content folder at build time
  const modules = import.meta.glob('/src/content/case-studies/*.md', { eager: true }) as Record<
    string,
    { metadata: ProjectMetadata }
  >;

  const projects: ProjectSummary[] = Object.entries(modules)
    .filter(([, mod]) => mod.metadata && mod.metadata.slug)
    .map(([path, mod]) => ({
      metadata: {
        ...mod.metadata,
        // Auto-calculate readTime if not in frontmatter
        readTime: mod.metadata.readTime ?? 5
      },
      path
    }));

  return projects;
}

/**
 * Load a single project with its compiled Svelte component (for the [slug] page).
 * Returns null if not found.
 */
export async function getProjectBySlug(slug: string): Promise<{
  metadata: ProjectMetadata;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: any;
} | null> {
  const modules = import.meta.glob('/src/content/case-studies/*.md') as Record<
    string,
    () => Promise<{ metadata: ProjectMetadata; default: unknown }>
  >;

  const entry = Object.entries(modules).find(([path]) => {
    const filename = path.split('/').pop()?.replace('.md', '');
    return filename === slug;
  });

  if (!entry) return null;

  const [, loader] = entry;
  const mod = await loader();
  return {
    metadata: mod.metadata,
    component: mod.default
  };
}

/**
 * Collect all unique tags across all projects, sorted alphabetically.
 */
export function getAllTags(projects: ProjectSummary[]): string[] {
  const tagSet = new Set<string>();
  projects.forEach((p) => p.metadata.tags?.forEach((t) => tagSet.add(t)));
  return [...tagSet].sort();
}

/**
 * Collect all unique categories across all projects.
 */
export function getAllCategories(projects: ProjectSummary[]): string[] {
  const catSet = new Set<string>();
  projects.forEach((p) => {
    if (p.metadata.category) catSet.add(p.metadata.category);
  });
  return [...catSet].sort();
}

/**
 * Filter and sort projects based on user selections.
 */
export function filterProjects(
  projects: ProjectSummary[],
  {
    search = '',
    category = '',
    tags = [] as string[],
    sort = 'date' as 'date' | 'featured' | 'title'
  } = {}
): ProjectSummary[] {
  let result = [...projects];

  // Text search across title + description
  if (search.trim()) {
    const q = search.toLowerCase();
    result = result.filter(
      (p) =>
        p.metadata.title.toLowerCase().includes(q) ||
        p.metadata.description.toLowerCase().includes(q) ||
        p.metadata.stack.some((s) => s.toLowerCase().includes(q))
    );
  }

  // Category filter
  if (category) {
    result = result.filter((p) => p.metadata.category === category);
  }

  // Tag filter (project must have ALL selected tags)
  if (tags.length > 0) {
    result = result.filter((p) => tags.every((t) => p.metadata.tags.includes(t)));
  }

  // Sort
  result.sort((a, b) => {
    if (sort === 'featured') {
      if (a.metadata.featured && !b.metadata.featured) return -1;
      if (!a.metadata.featured && b.metadata.featured) return 1;
    }
    if (sort === 'title') {
      return a.metadata.title.localeCompare(b.metadata.title);
    }
    // Default: date descending
    return new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime();
  });

  return result;
}

/**
 * Format a date string for display (e.g. "Jan 2025").
 */
export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
}
