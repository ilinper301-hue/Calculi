#!/usr/bin/env python3
"""Une src/ en un único index.html (raíz), que es lo que publica GitHub Pages.
Orden: src/estilos.css, luego src/js/*.js (por nombre), src/js/estrategias/*.js (por nombre) y src/js/zz-arranque.js al final."""
import pathlib, re, sys
R = pathlib.Path(__file__).resolve().parent.parent
S = R / 'src'
css = (S / 'estilos.css').read_text(encoding='utf8')
js_files = sorted(p for p in (S / 'js').glob('*.js') if p.name != 'zz-arranque.js')
js_files += sorted((S / 'js' / 'estrategias').glob('*.js'))
js_files.append(S / 'js' / 'zz-arranque.js')
js = '\n'.join(f'/* ---- {p.relative_to(S)} ---- */\n' + p.read_text(encoding='utf8') for p in js_files)
html = (S / 'index.template.html').read_text(encoding='utf8')
html = html.replace('/*CSS*/', css).replace('/*JS*/', js)
(R / 'index.html').write_text(html, encoding='utf8')
print(f'index.html: {len(html)//1024} KB · {len(js_files)} archivos JS')
