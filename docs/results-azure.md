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

## Ajoajat (viimeisimmät ajokerrat)

- CI-avg: 1 min 10 s
- CD-avg: 14 s
- CI-ajot (min:s): 1:22, 0:53, 1:15
- CD-ajot (min:s): 0:15, 0:12, 0:14

## Artefaktit

- Frontend build -paketti: `frontend-dist`
- Backend-artefakti: `backend-code`

## Julkaisu

- Frontend-URL: <https://todoapplk.z16.web.core.windows.net/>
- Backend API -endpoint: <https://todo-app-backend-vc2f.onrender.com/api/todos>

## Huomiot

- CI ajetaan self-hosted agentilla, jolloin ajoympäristö on sama kuin omalla koneella.
- Havaitut ongelmat: Microsoft-hosted runnerit eivät olleet käytettävissä ilman parallelism-grantia, joten self-hosted agent tarvittiin.
