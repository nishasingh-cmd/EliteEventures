import re
from PIL import Image

with open('src/components/BrandsSection/BrandsSection.jsx', 'r', encoding='utf-8') as f:
    text = f.read()

imgs = re.findall(r'src=["\']([^"\']+)["\']', text)
for src in imgs:
    path = src.lstrip('/')
    try:
        im = Image.open('public/' + path)
        print(f'{src:35} {im.size} {im.mode}')
    except Exception as e:
        print(f'{src:35} ERROR: {e}')
