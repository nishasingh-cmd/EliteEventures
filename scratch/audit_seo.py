import os
import re

img_tag = re.compile(r'<img\s+([^>]*?)>', re.IGNORECASE | re.DOTALL)
alt_attr = re.compile(r'alt\s*=\s*["\']([^"\']*)["\']', re.IGNORECASE)

missing_alt = []
empty_alt = []
total_imgs = 0

for root, dirs, files in os.walk('src'):
    for f in files:
        if f.endswith('.jsx'):
            p = os.path.join(root, f)
            with open(p, 'r', encoding='utf-8') as fl:
                c = fl.read()
            for m in img_tag.finditer(c):
                total_imgs += 1
                tag = m.group(0)
                alt = alt_attr.search(tag)
                if not alt:
                    missing_alt.append((p, tag))
                elif not alt.group(1).strip():
                    empty_alt.append((p, tag))

print(f"Total images checked: {total_imgs}")
print(f"Missing alt: {len(missing_alt)}")
for p, t in missing_alt:
    print(f"  Missing: {p} -> {t[:80]}")
print(f"Empty alt: {len(empty_alt)}")
for p, t in empty_alt:
    print(f"  Empty: {p} -> {t[:80]}")
