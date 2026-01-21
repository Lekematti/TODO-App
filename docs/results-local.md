# Tulokset ilman CI/CD-putkea (Local)

## Ympäristö

- Päiväys: 21.1.2026
- Kone / OS: Win 11
- Node-versio: v22.14.0

## Ajetut komennot

- `npm install`
- `npm run build`

(`npm run dev` on testattu aiemmin, mutta ei ajettu erikseen tässä mittauksessa.)

## Ajoajat (arvio)

- `npm install`: ≈ 1–2 s (uudelleenasennus, riippuvuudet jo välimuistissa)
- `npm run dev` (ensikäynnistys): ≈ 2–3 s (aiemman havainnon perusteella)
- `npm run build`: ≈ 1 s (Vite build -tuloste)

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
