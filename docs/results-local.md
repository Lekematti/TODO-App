# Tulokset ilman CI/CD-putkea (Local)

## Ympäristö

- Päiväys: 11.2.2026
- Kone / OS: Win 11
- Node-versio: v22.14.0

## Ajetut komennot

- `npm run lint`
- `npm run test:backend`
- `npm run test:frontend`
- `npm run build:frontend`

## Ajoajat (mitatut)

- `npm run lint`: 1.498 s
- `npm run test:backend`: 1.024 s
- `npm run test:frontend`: 2.665 s
- `npm run build:frontend`: 1.322 s

## Laatu

- Problems / lint-tila: Ei Problems-virheitä projektissa (README + docs + frontend + backend)
- Havaitut bugit manuaalitestissä: Ei havaittuja perus-CRUD-toiminnoissa

## Manuaalinen testaus

- Käynnistys-URL: [http://localhost:5173](http://localhost:5173)
- Toimivatko:
  - TODO:n lisäys: OK
  - TODO:n muokkaus: OK
  - TODO:n poisto: OK
  - Valmis/ei-valmis togglaus: OK

  - Kesto: noin 1 min

## Huomiot

- Pieni projekti, build nopea ja kehityskäynnistys kevyt.
