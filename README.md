# Mini TODO App

Tämä on osa opinnäytetyötäni jossa teen kolmelle eri alustalle CI/CD putken. Kaikissa alustoissa tulee olemaan sama projekti pohjana. Laitan tänne myös muiden alustojen linkit kun ne ovat tehty.

Full-stack mini TODO -sovellus, jossa on Node.js + Express + SQLite (sql.js) -backend ja React + Vite -frontend.

Sovellus näyttää muistilappu-tyylisen TODO-listan, jossa voit lisätä, muokata, poistaa ja merkitä tehtäviä valmiiksi. Kaikki muutokset tallennetaan SQLite-tietokantaan backendin kautta.

## Rakenne

- Root npm-projekti: [package.json](package.json)
  - `dev:backend` käynnistää backendin
  - `dev:frontend` käynnistää frontendin
  - `dev` käynnistää molemmat yhtä aikaa
- Backend-koodi: [backend/src/server.js](backend/src/server.js), [backend/src/db.js](backend/src/db.js)
  - Tietokantatiedosto: [backend/todos.sqlite](backend/todos.sqlite) (luodaan automaattisesti)
- Frontend-koodi: [frontend/src/App.jsx](frontend/src/App.jsx), [frontend/src/main.jsx](frontend/src/main.jsx), [frontend/src/styles.css](frontend/src/styles.css), [frontend/index.html](frontend/index.html), [frontend/vite.config.mjs](frontend/vite.config.mjs)

## Asennus

1. Asenna riippuvuudet juuresta:
   - `npm install`

## Kehityskäynnistys

- Käynnistä backend ja frontend yhdellä komennolla juuresta:
  - `npm run dev`

Tämä ajaa:

- Backend: [http://localhost:4000](http://localhost:4000)
- Frontend: [http://localhost:5173](http://localhost:5173)

Halutessasi voit myös ajaa erikseen:

- Vain backend: `npm run dev:backend`
- Vain frontend: `npm run dev:frontend`

## Toiminnot

- Näytä kaikki TODOt (GET `/api/todos`)
- Lisää uusi TODO (POST `/api/todos`)
- Muokkaa TODO:a (PUT `/api/todos/:id`)
- Poista TODO (DELETE `/api/todos/:id`)
- Klikkaus muistilapun tekstin päällä togglaa valmiiksi/ei-valmiiksi (PUT `done`-kenttään)

## Deploy (Netlify + Render)

### Frontend (Netlify)

- Build-komento: `npm run build:frontend`
- Publish-kansio: `frontend/dist`
- Environment variable:
  - `VITE_API_BASE_URL=https://todo-app-backend-vc2f.onrender.com/api`

### Backend (Render)

- Web Service (Node)
- Root Directory: `backend`
- Build Command: `npm install`
- Start Command: `node src/server.js`
- Free tier sleepaa, joten ensimmäinen pyyntö voi olla hidas.

## CI/CD (GitHub Actions)

Pipeline tekee:

1) Install
2) Build (frontend)
3) Backend tests
4) Frontend tests
5) Deploy frontend (Netlify)
6) Deploy backend (Render deploy hook)

Secrets GitHubissa:

- `NETLIFY_AUTH_TOKEN`
- `NETLIFY_SITE_ID`
- `VITE_API_BASE_URL`
- `RENDER_DEPLOY_HOOK`

## Linttaus

```bash
npm run lint
```

## Testikattavuus (Coverage)

**Backend:**

```bash
npm run test:backend:coverage
```

**Frontend:**

```bash
npm run test:frontend:coverage
```

Coverage-raportit:

- Backend: `coverage/`
- Frontend: `frontend/coverage/`
