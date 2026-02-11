# Tulosten vertailu – Local vs GitHub vs GitLab vs Azure

## Yhteenvetotaulukko

- Local (ilman putkea):
  - Build-kesto: 1.322 s (frontend build)
  - Testit (ajettu / läpäisty): backend 1.024 s + frontend 2.665 s, läpäisty
  - Lint: 1.498 s
  - Manuaaliset vaiheet julkaisussa: kaikki (build, kopiointi, deploy)
  - Huomioita: ei CI/CD-automaatiota

- GitHub Actions:
  - Build-kesto: CI ~20–30 s (uusimmat ajot: 27, 23, 20, 21, 31, 26 s)
  - Testit (ajettu / läpäisty): backend + frontend + coverage, läpäisty
  - Manuaaliset vaiheet julkaisussa: deploy pois päältä (`cd` estetty)
  - Huomioita: nopein CI, koska kaikki samassa jobissa hosted-runnerilla

- GitLab CI:
  - Build-kesto: CI ~1 min (uusimmat ajot: 1:01, 1:04, 1:02, 1:04, 1:01, 1:01)
  - Testit (ajettu / läpäisty): backend + frontend + coverage, läpäisty
  - Manuaaliset vaiheet julkaisussa: `cd`-job manuaalinen (Play)
  - Huomioita: docker+machine lisää overheadia, muuten rakenne sama kuin GitHubissa
  
- Azure Pipelines:
  - Build-kesto: CI 1:15, 0:54 (self-hosted agent)
  - Testit (ajettu / läpäisty): backend + frontend + coverage, läpäisty
  - Manuaaliset vaiheet julkaisussa: ei, CD ajaa deployn Azure Storageen
  - Huomioita: Microsoft-hosted runnerit vaativat parallelism-grantin, self-hosted toimi

## Yleisjohtopäätökset

- Kaikilla kolmella alustalla sama CI-komentosarja tuottaa yhtenevät tulokset.
- GitHub Actions on nopein CI ajoissa; GitLab hitaampi docker-runnerin overheadin vuoksi.
- Azure Pipelines vaati self-hosted agentin, mutta sen jälkeen CD Azure Storageen onnistui.
- Julkaisu on GitHubissa pois päältä, GitLabissa manuaalinen ja Azuressa automaattinen (frontend).
