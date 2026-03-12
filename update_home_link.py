import glob, re

html_files = glob.glob('*.html')
skip_files = ['index.html', 'forgotpassword.html', 'signup.html']

for filepath in html_files:
    if filepath in skip_files:
        continue
    with open(filepath, 'r') as f:
        content = f.read()

    # Find the logo image element
    pattern = r'(<div class="sidebar-header">\s*)(<img src="assets/dr-aruna-logo.png"[^>]+>)'
    replacement = r'\1<a href="dashboard.html" style="display: block; text-decoration: none;">\n                \2\n            </a>'
    
    new_content, count = re.subn(pattern, replacement, content)
    
    if count > 0:
        with open(filepath, 'w') as f:
            f.write(new_content)
        print(f"Updated {filepath}")
    else:
        print(f"Skipped {filepath} - pattern not found")

