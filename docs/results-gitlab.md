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

- Kokonaiskesto: ~1 min (esim. 55 s ja 1 min 3 s kahdella ajolla, GitLab SaaS -runner, docker+machine)
- Install: hitain osa, sisältää Node 22 -kontin käynnistyksen ja riippuvuuksien asennuksen
- Lint + testit + build: ajetaan samassa `ci`-jobissa, kokonaiskesto kohtuullinen
- Deploy (`cd`-job): nopea, suorittaa vain kaksi HTTP-kutsua (Netlify + Render)

## Artefaktit

- Frontend build -paketti: `frontend/dist/` (talletetaan `ci`-jobin artefaktina)
- Backend-artefakti: `backend/` (talletetaan `ci`-jobin artefaktina)
- Backend coverage: `coverage/`
- Frontend coverage: `frontend/coverage/`

## Julkaisu

- Frontend-URL: Netlify-sivusto, jota voidaan päivittää GitLabin `cd`-jobilla (manuaalinen ajastus)
- Backend API -endpoint: Render Web Service, jota voidaan käynnistää GitLabin `cd`-jobilla (tällä hetkellä Render rapotoi tilan "service is suspended")

## Huomiot

- Erot lokaalista ajosta: komentojen järjestys ja sisältö vastaavat GitHub Actions -putkea ja lokaalia ajoa (install → lint → testit → build).
- GitLabin pipeline on rakenteeltaan yhtenäinen GitHubin kanssa (yksi `ci`-vaihe + erillinen manuaalinen `cd`), mutta GitLabin docker+machine-rakenteesta tulee enemmän overheadia ja hitaampi kokonaisaika.
- `cd`-job on hyödyllinen esimerkki manuaalisesta CD:stä: se voi käynnistää sekä Netlify- että Render-deployn samoilla secretoilla kuin GitHub.
