import json
import os
import shutil

import yaml
from jinja2 import Environment, FileSystemLoader
from weasyprint import HTML

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUTPUT = os.path.join(ROOT, "output")
STATIC = os.path.join(ROOT, "static")
os.makedirs(OUTPUT, exist_ok=True)
os.makedirs(STATIC, exist_ok=True)

with open(os.path.join(ROOT, "src", "content", "site.yml"), "r", encoding="utf-8") as f:
    DATA = yaml.safe_load(f)

# 1) Generate README.md from Jinja2 template
env = Environment(loader=FileSystemLoader(os.path.join(ROOT, "scripts", "templates")), trim_blocks=True, lstrip_blocks=True)
tpl = env.get_template("README.md.j2")
with open(os.path.join(ROOT, "README.md"), "w", encoding="utf-8") as f:
    f.write(tpl.render(**DATA))

# Generate CV PDF
cv_tpl = env.get_template("cv.html.j2")
cv_html = cv_tpl.render(**DATA)
cv_pdf_output = os.path.join(OUTPUT, "cv.pdf")
HTML(string=cv_html, base_url=ROOT).write_pdf(cv_pdf_output)
shutil.copyfile(cv_pdf_output, os.path.join(STATIC, "cv.pdf"))

# 2) Generate output/site.json for SSG SEO
payload = {
    "name": DATA.get("name"),
    "headline": DATA.get("headline"),
    "about": DATA.get("about"),
    "about_tagline": DATA.get("about_tagline"),
    "sections": DATA.get("sections", {}),
    "experience": DATA.get("experience", []),
    "projects": DATA.get("projects", []),
    "skills": DATA.get("skills", {}),
    "certifications": DATA.get("certifications", []),
    "contact": DATA.get("contact", {}),
}
payload["siteName"] = DATA.get("site_name") or DATA.get("siteName") or DATA.get("name")
payload["siteNavbar"] = DATA.get("site_navbar") or DATA.get("siteNavbar") or payload["siteName"]
payload["siteUrl"] = DATA.get("site_url") or DATA.get("siteUrl")
with open(os.path.join(OUTPUT, "site.json"), "w", encoding="utf-8") as f:
    json.dump(payload, f, ensure_ascii=False, indent=2)
shutil.copyfile(os.path.join(OUTPUT, "site.json"), os.path.join(STATIC, "site.json"))

# 3) Generate sitemap.xml
import datetime
today = datetime.date.today().isoformat()
site_url = DATA.get("site_url", "https://about.donnimsipa.my.id").rstrip("/")

urls = [
    {"loc": f"{site_url}/", "lastmod": today, "priority": "1.0"},
    {"loc": f"{site_url}/case-studies", "lastmod": today, "priority": "0.8"},
]

case_studies_dir = os.path.join(ROOT, "src", "content", "case-studies")
if os.path.exists(case_studies_dir):
    for filename in os.listdir(case_studies_dir):
        if filename.endswith(".md"):
            slug = filename[:-3]
            urls.append({
                "loc": f"{site_url}/case-studies/{slug}",
                "lastmod": today,
                "priority": "0.7"
            })

sitemap_content = '<?xml version="1.0" encoding="UTF-8"?>\n'
sitemap_content += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
for url in urls:
    sitemap_content += '  <url>\n'
    sitemap_content += f'    <loc>{url["loc"]}</loc>\n'
    sitemap_content += f'    <lastmod>{url["lastmod"]}</lastmod>\n'
    sitemap_content += f'    <priority>{url["priority"]}</priority>\n'
    sitemap_content += '  </url>\n'
sitemap_content += '</urlset>'

with open(os.path.join(OUTPUT, "sitemap.xml"), "w", encoding="utf-8") as f:
    f.write(sitemap_content)
shutil.copyfile(os.path.join(OUTPUT, "sitemap.xml"), os.path.join(STATIC, "sitemap.xml"))

# 4) Generate manifest.json
manifest = {
    "name": DATA.get("name"),
    "short_name": DATA.get("name"),
    "start_url": "/",
    "display": "standalone",
    "background_color": "#ffffff",
    "theme_color": "#14b8a6",
    "icons": [
        {"src": "/android-chrome-192x192.png", "sizes": "192x192", "type": "image/png"},
        {"src": "/android-chrome-512x512.png", "sizes": "512x512", "type": "image/png"}
    ]
}
with open(os.path.join(OUTPUT, "manifest.json"), "w", encoding="utf-8") as f:
    json.dump(manifest, f, ensure_ascii=False, indent=2)
shutil.copyfile(os.path.join(OUTPUT, "manifest.json"), os.path.join(STATIC, "manifest.json"))

print("Generated README.md, site.json, cv.pdf, sitemap.xml, and manifest.json in output/")
