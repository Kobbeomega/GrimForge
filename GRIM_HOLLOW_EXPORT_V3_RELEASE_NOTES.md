# Grim Hollow Export V3

- Export rendering moved from PDF text stamping to a high-resolution browser canvas.
- Native Unicode rendering fixes ä, ö, ü, Ä, Ö, Ü and ß without PDF font encoding hacks.
- All text placement now uses the original 1492 x 1054 template coordinate system directly.
- Character values use true canvas centring and vertical centring.
- Equipment is split into the printed columns: item, quantity, weight and notes.
- Equipment rows are vertically centred between the actual table lines.
- Weapon data is split across name, attack, range and damage/type columns.
- Ability modifiers and saves are centred inside their printed box/circle targets.
- Defence values are moved into the clear white areas below the labels.
- Data text receives a subtle double-impression for a rougher typewriter/zine look while remaining readable.
- Export canvas renders at 2x source resolution before being embedded into the PDF for cleaner printing.
