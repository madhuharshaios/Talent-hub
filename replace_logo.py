import glob
import re

html_files = glob.glob('*.html')

sidebar_pattern = re.compile(
    r'<svg class="logo-icon"[^>]*>.*?</svg>\s*<div class="logo-text">Mini LMS</div>', re.DOTALL
)

brand_pattern = re.compile(
    r'<svg class="brand-icon"[^>]*>.*?</svg>\s*<div class="brand-name">Mini LMS</div>', re.DOTALL
)

sidebar_replacement = '<img src="assets/dr-aruna-logo.png" alt="Dr. Aruna University Logo" style="max-height: 52px; max-width: 100%; object-fit: contain;">'
brand_replacement = '<img src="assets/dr-aruna-logo.png" alt="Dr. Aruna University Logo" style="max-height: 90px; margin-bottom: 20px; width: auto; object-fit: contain; margin-left: auto; margin-right: auto;">'

for file in html_files:
    with open(file, 'r') as f:
        content = f.read()

    new_content = sidebar_pattern.sub(sidebar_replacement, content)
    new_content = brand_pattern.sub(brand_replacement, new_content)

    if new_content != content:
        with open(file, 'w') as f:
            f.write(new_content)
        print(f"Replaced logo in {file}")

