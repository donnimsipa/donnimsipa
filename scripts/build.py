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

print("Generated README.md, site.json, and cv.pdf in output/")
