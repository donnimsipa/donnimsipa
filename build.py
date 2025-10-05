import json
import os
import shutil

import yaml
from jinja2 import Environment, FileSystemLoader
from weasyprint import HTML

ROOT = os.path.dirname(__file__)
PUBLIC = os.path.join(ROOT, "public")
STATIC = os.path.join(ROOT, "static")
os.makedirs(PUBLIC, exist_ok=True)
os.makedirs(STATIC, exist_ok=True)

with open(os.path.join(ROOT, "data.yml"), "r", encoding="utf-8") as f:
    DATA = yaml.safe_load(f)

# 1) Generate README.md from Jinja2 template
env = Environment(loader=FileSystemLoader(os.path.join(ROOT, "templates")), trim_blocks=True, lstrip_blocks=True)
tpl = env.get_template("README.md.j2")
with open(os.path.join(ROOT, "README.md"), "w", encoding="utf-8") as f:
    f.write(tpl.render(**DATA))

# Generate CV PDF
cv_tpl = env.get_template("cv.html.j2")
cv_html = cv_tpl.render(**DATA)
cv_pdf_public = os.path.join(PUBLIC, "cv.pdf")
HTML(string=cv_html, base_url=ROOT).write_pdf(cv_pdf_public)
shutil.copyfile(cv_pdf_public, os.path.join(STATIC, "cv.pdf"))

# 2) Generate public/data.json for SSG SEO
payload = {
    "name": DATA.get("name"),
    "headline": DATA.get("headline"),
    "about": DATA.get("about"),
    "experience": DATA.get("experience", []),
    "projects": DATA.get("projects", []),
    "skills": DATA.get("skills", {}),
    "certifications": DATA.get("certifications", []),
    "contact": DATA.get("contact", {}),
}
payload["siteName"] = DATA.get("site_name") or DATA.get("siteName") or DATA.get("name")
with open(os.path.join(PUBLIC, "data.json"), "w", encoding="utf-8") as f:
    json.dump(payload, f, ensure_ascii=False, indent=2)
shutil.copyfile(os.path.join(PUBLIC, "data.json"), os.path.join(STATIC, "data.json"))

print("Generated README.md, data.json, and cv.pdf in public/")
