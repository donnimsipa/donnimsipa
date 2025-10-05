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
build.py       # Converts data.yml → README, JSON, CV PDF
data.yml       # Single source of truth for résumé content
static/        # Generated artifacts consumed by SvelteKit
static/        # Static assets shipped with the site (incl. cv.pdf)
src/           # SvelteKit routes and components
templates/     # Jinja templates for README + cv.html
wrangler.jsonc # Cloudflare Worker bindings and env configuration
uno.config.ts  # UnoCSS configuration
```


## Data Pipeline

All content originates in `data.yml`. Run the build script whenever the YAML
changes:

```bash
python3 build.py
```

This produces three synchronized artifacts:

- `README.md` for the repository
- `public/data.json` for SEO and Worker APIs
- `public/cv.pdf` (A4 layout rendered via WeasyPrint)

Commit the generated artifacts if you want deterministic builds, otherwise
regenerate them during CI/CD.


## Local Development

1. Install dependencies
   ```bash
   npm install
   python3 -m venv .venv
   source .venv/bin/activate
   pip install -r requirements.txt
   ```
   - On Windows use `.\.venv\Scripts\activate` instead of `source ...`.
   - Keeping the Python packages in a project-local virtual environment avoids the
     PEP 668 “externally managed” error emitted by system Python installs.
2. Regenerate artifacts when `data.yml` changes: `python3 build.py`
   - Run this from the same shell session (or after reactivating `.venv`) so the
     Python dependencies remain on your `PATH`.
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

- **`Error: 404 /cv.pdf` during prerender** – ensure `build.py` wrote to
  `static/cv.pdf` (the script targets the correct directory).
- **WeasyPrint import error** – double-check Python deps (`pip install -r
  requirements.txt` from the activated `.venv`) and OS libraries.
- **Out-of-date data** – rerun `python3 build.py` so JSON/PDF outputs match the
  latest YAML source.

With these steps the portfolio remains in sync from local development through
production deployments.
