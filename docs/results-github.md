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
- Deploy (Netlify + Render, `cd`-job): EI KÄYTÖSSÄ (job olemassa, mutta `if: ${{ false }}` estää ajon)

## Ajoajat (viimeisin ajokerta)

- Kokonaiskesto: ~20–30 s (GitHubin hosted-runnerilla)
- Install: lyhyt (npm cache käytössä)
- Lint: nopea, osa samasta jobista
- Test: lyhyt, backend + frontend + coverage samassa jobissa
- Build: lyhyt, ajetaan testien jälkeen
- Deploy: ei ajeta (CD-job disabloitu)
- Uusimmat CI-ajot (s): 27, 23, 20, 21, 31, 26

## Artefaktit

- Frontend build -paketti: `frontend-dist` (polku: `frontend/dist`)
- Backend-artefakti: `backend-code` (polku: `backend/`)

## Julkaisu

- Frontend-URL: Netlify-sivusto (deploy mahdollinen, mutta workflowssa tällä hetkellä pois päältä)
- Backend API -endpoint: Render-sovellus (deploy mahdollinen, mutta workflowssa tällä hetkellä pois päältä)

## Huomiot

- GitHub Actions -ajot ovat edelleen hieman nopeampia kuin GitLabin vastaavat, vaikka rakenne on nyt sama (yksi `ci`-job + erillinen `cd`). Suurin ero tulee GitLabin docker+machine-runnerin ja container image -pullien overheadista.
- Deploy-steppien olemassaolo dokumentoitu, mutta ne on tietoisesti kytketty pois käytöstä kustannussyistä.
- Kaikki kolme putkea on nyt toteutettu ja ajettu; uusimmat ajot on kirjattu yllä.
