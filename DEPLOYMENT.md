# GrimForge auf GitHub und Vercel veröffentlichen

## 1. Projekt lokal prüfen

```powershell
npm ci
npm run lint
npm run build
```

Der Produktions-Build wird im Ordner `dist/` erstellt. Dieser Ordner wird nicht in Git eingecheckt.

## 2. Änderungen zu GitHub übertragen

```powershell
git status
git add .
git commit -m "Release 0.9.8: GitHub- und Vercel-Deployment"
git push origin main
```

Verwendet dein Repository den Branch `master`, ersetze `main` entsprechend.

## 3. Vercel einmalig verbinden

1. In Vercel **Add New → Project** öffnen.
2. Das GrimForge-GitHub-Repository importieren.
3. Als Framework sollte automatisch **Vite** erkannt werden.
4. Build Command: `npm run build`
5. Output Directory: `dist`
6. Install Command: `npm ci`
7. Deployment starten.

Die Datei `vercel.json` enthält diese Einstellungen bereits und sorgt außerdem für die SPA-Auslieferung sowie sinnvolle Cache-Header.

## 4. Spätere Updates

Nach der einmaligen Verbindung genügt künftig:

```powershell
git add .
git commit -m "Beschreibung der Änderung"
git push origin main
```

Vercel erstellt danach automatisch ein neues Production Deployment. Pull Requests erhalten automatisch Preview Deployments.

## 5. PWA-Update prüfen

GrimForge verwendet einen Service Worker. Nach einem Deployment kann ein bereits geöffneter Browser-Tab kurzfristig noch die vorherige Version zeigen. Die App aktualisiert den Service Worker automatisch. Bei Bedarf:

- Seite vollständig neu laden,
- den Tab einmal schließen und erneut öffnen,
- oder in den Browser-Entwicklertools unter **Application → Service Workers** aktualisieren.

## 6. GitHub Actions

`.github/workflows/ci.yml` führt bei Pushes und Pull Requests automatisch aus:

- `npm ci`
- `npm run lint`
- `npm run build`

Dadurch werden fehlerhafte Änderungen erkannt, bevor sie veröffentlicht werden.
