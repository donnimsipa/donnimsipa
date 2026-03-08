# Usage Guide

This document captures the workflow for developing, generating data artifacts, and
shipping the SvelteKit portfolio that lives in this repository.


## Prerequisites

- **Node.js** ≥ 18 (Wrangler currently ships with Node 22.x in CI)
- **Python** ≥ 3.10 with system packages required by WeasyPrint (Cairo, Pango,
  GDK-PixBuf, libffi). Follow the
  [WeasyPrint install notes](https://doc.courtbouillon.org/weasyprint/stable/first_steps.html#installation)
  for your OS.
- **Wrangler CLI** (installed automatically through `npm install`)


## Repository Map

```
src/content/site.yml   # Single source of truth for résumé content
src/content/case-studies/ # MDSveX markdown case studies
scripts/               # Python build logic (build.py, requirements.txt, templates/)
docs/                  # Internal developer documentation
output/                # Temporary staging area for generated artifacts
static/                # Final artifacts consumed by SvelteKit
src/                   # SvelteKit routes and components
```

## Data Pipeline

All content originates in `site.yml`. This YAML file contains core information such as `site_url` for SEO and a structured `certifications` array (which supports `title` and `image` keys for rendering certificate details and links).

Run the build script whenever the YAML changes:

```bash
npm run assets:generate
```

This produces three synchronized artifacts:

- `README.md` for the repository
- `output/site.json` for SEO and Worker APIs
- `output/cv.pdf` (A4 layout rendered via WeasyPrint)

Commit the generated artifacts if you want deterministic builds, otherwise
regenerate them during CI/CD.


## Local Development

1. Install dependencies
   ```bash
   npm install
   python3 -m venv .venv
   source .venv/bin/activate
   pip install -r scripts/requirements.txt
   ```
   - On Windows use `.\.venv\Scripts\activate` instead of `source ...`.
   - Keeping the Python packages in a project-local virtual environment avoids the
     PEP 668 “externally managed” error emitted by system Python installs.
2. Regenerate artifacts when data changes: `npm run assets:generate`
   - This automatically manages your Python environment and runs `scripts/build.py`.
3. Start the dev server:
   ```bash
   npm run dev
   ```
   - SvelteKit serves the portfolio at `http://localhost:5173`

`npm run preview` runs a production build and boots `wrangler dev` so you can
exercise the Worker bundle locally.


## Deployment

The production script wraps the usual Cloudflare worker flow:

```bash
npm run deploy
```

This command runs `vite build` and then deploys the generated worker using
`wrangler deploy --env production`.


## Key NPM Scripts

| Command          | Purpose                                  |
| ---------------- | ---------------------------------------- |
| `npm run dev`    | SvelteKit dev server                     |
| `npm run build`  | Production SvelteKit build               |
| `npm run preview`| Build then run the Worker locally        |
| `npm run deploy` | Build and deploy the Worker to Cloudflare |
| `npm run check`  | Sync + type-check via `svelte-check`     |


## Troubleshooting

- **`Error: 404 /cv.pdf` during prerender** – ensure `scripts/build.py` wrote to
  `static/cv.pdf` (the script targets the correct directory).
- **WeasyPrint import error** – double-check Python deps (`pip install -r
  scripts/requirements.txt` from the activated `.venv`) and OS libraries.
- **Out-of-date data** – rerun `npm run assets:generate` so JSON/PDF outputs match the
  latest YAML source.

With these steps the portfolio remains in sync from local development through
production deployments.
