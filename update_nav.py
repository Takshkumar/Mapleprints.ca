import os
import re

nav_template = """  <!-- Navigation -->
  <nav class=\"navbar\" role=\"navigation\" aria-label=\"Main navigation\">
    <div class=\"nav-container\">
      <a href=\"index.html\" class=\"logo\" aria-label=\"MaplePrints Home\">
        <img src=\"resources/maple-logo.png\" alt=\"MaplePrints - Premium Business Cards Canada Logo\" width=\"40\" height=\"40\" loading=\"eager\" />
        MaplePrints
      </a>

      <button class=\"menu-toggle\" id=\"menuToggle\" aria-label=\"Toggle navigation menu\" aria-expanded=\"false\">
        <span aria-hidden=\"true\"></span>
        <span aria-hidden=\"true\"></span>
        <span aria-hidden=\"true\"></span>
      </button>

      <ul class=\"nav-menu\">
        <li><a href=\"index.html\"{home_active} aria-label=\"Home\">Home</a></li>
        <li><a href=\"package.html\"{package_active} aria-label=\"Business Card Packages\">Package</a></li>
        <li><a href=\"design.html\"{design_active} aria-label=\"Design Options\">Design</a></li>
        <li><a href=\"testimonials.html\"{testimonials_active} aria-label=\"Testimonials\">Testimonials</a></li>
        <li><a href=\"blog.html\"{blog_active} aria-label=\"Blog\">Blog</a></li>
        <li><a href=\"index.html#contact\" aria-label=\"Contact\">Contact</a></li>
        <li>
          <a href=\"index.html#contact\" class=\"btn btn-primary\" data-whatsapp=\"general-inquiry\" aria-label=\"Start Your Design\">Start Your Design</a>
        </li>
      </ul>
    </div>
  </nav>"""

files_to_update = {
    'index.html': 'home',
    'package.html': 'package',
    'design.html': 'design',
    'testimonials.html': 'testimonials',
    'blog.html': 'blog',
    '404.html': 'none',
}

for filename, active_page in files_to_update.items():
    if not os.path.exists(filename):
        continue
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()

    # Create the specialized nav block
    nav_text = nav_template.format(
        home_active=' class=\"active\"' if active_page == 'home' else '',
        package_active=' class=\"active\"' if active_page == 'package' else '',
        design_active=' class=\"active\"' if active_page == 'design' else '',
        testimonials_active=' class=\"active\"' if active_page == 'testimonials' else '',
        blog_active=' class=\"active\"' if active_page == 'blog' else '',
    )
    
    if filename == 'index.html':
        nav_text = nav_text.replace('href=\"index.html#contact\"', 'href=\"#contact\"')
        nav_text = nav_text.replace('href=\"index.html\" class=\"logo\"', 'href=\"/\" class=\"logo\"')
        nav_text = nav_text.replace('href=\"index.html\" class=\"active\"', 'href=\"/\" class=\"active\"')
        nav_text = nav_text.replace('href=\"index.html\" aria-label=\"Home\"', 'href=\"/\" aria-label=\"Home\"')

    pattern = re.compile(r'<!-- Navigation -->.*?<nav[^>]*>.*?</nav>', re.DOTALL)
    if pattern.search(content):
        new_content = pattern.sub(nav_text, content)
        with open(filename, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f'Updated {filename}')
    else:
        pattern2 = re.compile(r'<nav[^>]*>.*?</nav>', re.DOTALL)
        if pattern2.search(content):
            new_content = pattern2.sub(nav_text, content)
            with open(filename, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f'Updated {filename} (no comment found)')
        else:
            print(f'Could not find nav in {filename}')
