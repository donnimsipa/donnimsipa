/**
 * Frontmatter metadata for each project markdown file.
 * This schema is parsed by MDSveX from the YAML frontmatter block.
 */
export interface ProjectMetadata {
  /** Display title of the project */
  title: string;
  /** URL-friendly slug (must match the filename without .md) */
  slug: string;
  /** Short 1–2 sentence description shown in cards and meta tags */
  description: string;
  /** Technology/domain tags for filtering (e.g. "FHIR", "HL7", "Go") */
  tags: string[];
  /** High-level category for grouping */
  category: 'Backend Infrastructure' | 'API Development' | 'System Integration' | 'Data Engineering';
  /** Technology stack items */
  stack: string[];
  /** Pin this project to the top of the index page */
  featured: boolean;
  /** ISO date string (YYYY-MM-DD) of publication / project completion */
  date: string;
  /** Human-readable project duration (e.g. "3 months") */
  duration: string;
  /** Your role on this project */
  role: string;
  /** Estimated read time in minutes (auto-calculated if not provided) */
  readTime?: number;
}

/**
 * A project with its resolved Svelte component and file path.
 * The component is the MDSveX-compiled Svelte component from the .md file.
 */
export interface Project {
  metadata: ProjectMetadata;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: any;
  path: string;
}

/**
 * Lightweight project record used on the index page (no component).
 * Safe to pass from +page.server.ts.
 */
export interface ProjectSummary {
  metadata: ProjectMetadata;
  path: string;
}

/** Supported sort modes for the projects index */
export type SortMode = 'date' | 'featured' | 'title';

/** Supported view modes for the projects index */
export type ViewMode = 'grid' | 'list';
