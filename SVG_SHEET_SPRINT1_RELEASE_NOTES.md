# GrimForge – SVG Character Sheet Sprint 1

- Replaced the AI-image/background-coordinate export with a deterministic SVG layout.
- Page 1 is now generated from CharacterArchiveEntry data as real SVG text, lines, circles and panels.
- Added a WYSIWYG `Bogen-Vorschau` action next to the PDF export.
- Unicode text (including ä, ö, ü, ß) is native SVG text.
- Explicit layout regions: identity, HP, six abilities + modifiers + saves, combat, class resources, attacks, equipment, death saves, currency and transformation.
- PDF export renders the exact same SVG used by preview, so preview and export share one source of truth.
- TypeScript typecheck passes.
- Production Vite build cannot complete in this container because the supplied node_modules misses @rolldown/binding-linux-x64-gnu; reinstalling dependencies on the deployment machine resolves that environment-specific optional dependency.
