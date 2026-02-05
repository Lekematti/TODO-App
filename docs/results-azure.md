# CI/CD-tulokset – Azure Pipelines

## Pipeline-konfiguraatio

- `azure-pipelines.yaml` sijainti: projektin juuri
- Triggerit: `push` ja `pull_request` branchille `main`

## Vaiheet ja tila

- Install: OK
- Lint: OK
- Test: OK
- Build: OK
- Package: OK
- Deploy: OK (frontend Azure Storage Static Website)

## Ajoajat (viimeisin ajokerta)

- CI: 1 min 4 s
- CD: 25 s

## Artefaktit

- Frontend build -paketti: `frontend-dist`
- Backend-artefakti: `backend-code`

## Julkaisu

- Frontend-URL: https://todoapplk.z16.web.core.windows.net/
- Backend API -endpoint: https://todo-app-backend-vc2f.onrender.com/api/todos

## Huomiot

- Erot lokaalista ajosta: CI ajetaan self-hosted agentilla, jolloin ajoympäristö on sama kuin omalla koneella.
- Havaitut ongelmat: Microsoft-hosted runnerit eivät olleet käytettävissä ilman parallelism-grantia, joten self-hosted agent tarvittiin.
