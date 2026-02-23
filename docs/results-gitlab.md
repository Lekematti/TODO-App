# CI/CD-tulokset – GitLab CI

## Pipeline-konfiguraatio

- `.gitlab-ci.yml` sijainti: projektin juuri
- Triggerit: uusi pipeline jokaisesta pushista GitLab-repoon (branch `main` käytössä vertailussa)

## Vaiheet ja tila (viimeisin onnistunut ajo)

- Install (`npm ci || npm install`): OK
- Lint (`npm run lint`): OK
- Test (backend + frontend + coverage): OK
- Build (frontend + backend syntax check): OK
- Package: sisältyy samaan `ci`-jobiin (artefaktien talletus): OK
- Deploy (Netlify + Render, `cd`-job): OK (manuaalinen ajo; Netlify-build käynnistyy, Render vastaa "service is suspended")

## Ajoajat (viimeisimmät ajokerrat)

- CI-avg: 1 min 4 s
- CD-avg: 46 s
- CI-ajot (min:s): 1:04, 1:07, 1:02
- CD-ajot (min:s): 0:46, 0:47, 0:46

## Artefaktit

- Frontend build -paketti: `frontend/dist/` (talletetaan `ci`-jobin artefaktina)
- Backend-artefakti: `backend/` (talletetaan `ci`-jobin artefaktina)
- Backend coverage: `coverage/`
- Frontend coverage: `frontend/coverage/`

## Julkaisu

- Frontend-URL: Netlify-sivusto, jota voidaan päivittää GitLabin `cd`-jobilla (manuaalinen ajastus)
- Backend API -endpoint: Render Web Service, jota voidaan käynnistää GitLabin `cd`-jobilla (tällä hetkellä Render raportoi tilan "service is suspended")

## Huomiot

- GitLabin pipeline on rakenteeltaan yhtenäinen GitHubin kanssa (yksi `ci`-vaihe + `cd`-vaihe erona on että GiLabissa se on manuaalinen), mutta GitLabin docker+machine-rakenteesta tulee enemmän overheadia ja hitaampi kokonaisaika.
