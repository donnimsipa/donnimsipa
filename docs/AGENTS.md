# Instructions for AI Agents

This document defines the architectural patterns, directory structure, and development workflows for this portfolio project. AI agents (like Antigravity / Gemini) should follow these rules to ensure consistency.

## Project Philosophy
- **Clean Root**: Keep the root directory reserved for core configuration only.
- **Source-First**: All editable source material lives in `src/`.
- **Generated Assets**: Static artifacts (`site.json`, `cv.pdf`) are generated from source and should not be edited manually.

## Directory Map
- `src/content/site.yml`: The single source of truth for global site metadata, bio, and experience data.
- `src/content/case-studies/`: MDSveX markdown files for technical case studies.
- `src/routes/`: SvelteKit application logic and UI.
- `scripts/`: Python-based build tools for generating PDFs and JSON.
- `scripts/templates/`: Jinja2 templates used by the build system.
- `docs/`: Developer documentation and guides.
- `output/`: Staging area for build artifacts (Git ignored).
- `static/`: Production-ready assets served by SvelteKit.

## Core Workflows

### 1. Modifying Site Content
- Edit `src/content/site.yml`.
- Run `npm run assets:generate` to synchronize the changes to the README, PDF CV, and JSON data.
- Never edit `static/site.json` or `static/cv.pdf` directly.

### 2. Adding Case Studies
- Create a new Markdown file in `src/content/case-studies/`.
- Follow the frontmatter schema and section structure defined in [docs/CASE_STUDIES.md](CASE_STUDIES.md).
- Ensure all code snippets use dummy data only—no real patient or clinical data.

### 3. Styling & Icons
- Use **UnoCSS** with the **Lucide** icon set.
- Prefer utility classes for layout but maintain semantic hierarchy in Svelte components.
- Icons use the `i-lucide-[icon-name]` class pattern.

## Code Standards
- **TypeScript**: Use strict typing. Core types are defined in `src/lib/types.ts`.
- **Svelte**: This project uses Svelte 5. Prefer `$state`, `$derived`, and `$effect` over legacy Svelte 4 syntax where appropriate.
- **Python**: The build script requires `weasyprint`, `jinja2`, and `pyyaml`.

## Data Transformations
The `scripts/build.py` script performs these mappings:
- `site.yml` -> `README.md` (via Jinja2)
- `site.yml` -> `static/site.json` (for SvelteKit + SEO)
- `site.yml` -> `static/cv.pdf` (via WeasyPrint HTML-to-PDF)
