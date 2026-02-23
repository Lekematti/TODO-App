# CI/CD-tulokset – GitHub Actions

## Pipeline-konfiguraatio

- Workflow-tiedosto: `.github/workflows/main.yml`
- Triggerit: `push` ja `pull_request` branchille `main`

## Vaiheet ja tila (viimeisin onnistunut ajo)

- Install (Node 20 + `npm ci`): OK
- Lint (`npm run lint`): OK
- Test (backend + frontend + coverage): OK
- Build (frontend + backend syntax check): OK
- Package (artefaktien upload): OK
- Deploy (Netlify + Render, `cd`-job)

## Ajoajat (viimeisimmät ajokerrat)

- CI-avg: 21 s
- CD-avg: 9 s
- CI-ajot (min:s): 0:22, 0:19, 0:21
- CD-ajot (min:s): 0:07, 0:13, 0:06

## Artefaktit

- Frontend build -paketti: `frontend-dist` (polku: `frontend/dist`)
- Backend-artefakti: `backend-code` (polku: `backend/`)

## Julkaisu

- Frontend-URL: Netlify-sivusto
- Backend API -endpoint: Render-sovellus (deploy mahdollinen, mutta workflowssa tällä hetkellä pois päältä)

## Huomiot

- GitHub Actions -ajot ovat edelleen hieman nopeampia kuin GitLabin vastaavat, vaikka rakenne on nyt sama (yksi `ci`-job + erillinen `cd`). Suurin ero tulee GitLabin docker+machine-runnerin ja container image -pullien overheadista.
