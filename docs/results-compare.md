# Tulosten vertailu – Local vs GitHub vs GitLab vs Azure

## Yhteenvetotaulukko

| | Local | GitHub Actions | GitLab CI | Azure Pipelines |
|---|---|---|---|---|
| **CI-avg** | ~6.5 s (yhteensä) | 21 s | 1 min 4 s | 1 min 10 s |
| **CD-avg** | – | 9 s | 46 s | 14 s |
| **CI-ajot (min:s)** | – | 0:22, 0:19, 0:21 | 1:04, 1:07, 1:02 | 1:22, 0:53, 1:15 |
| **CD-ajot (min:s)** | – | 0:07, 0:13, 0:06 | 0:46, 0:47, 0:46 | 0:15, 0:12, 0:14 |
| **Runner** | oma kone | hosted (ubuntu) | SaaS docker+machine | self-hosted (Win) |
| **Testit** | OK | OK | OK | OK |
| **Lint** | 1.498 s | sis. CI | sis. CI | sis. CI |
| **Backend-testit** | 1.024 s | sis. CI | sis. CI | sis. CI |
| **Frontend-testit** | 2.665 s | sis. CI | sis. CI | sis. CI |
| **Build** | 1.322 s | sis. CI | sis. CI | sis. CI |
| **Deploy-kohde** | – | Netlify + Render | Netlify + Render (manuaalinen) | Azure Storage (auto) |
| **Manuaaliset vaiheet** | kaikki | ei | CD manuaalinen (Play) | ei |

## Yleisjohtopäätökset

- Kaikilla kolmella alustalla sama CI-komentosarja tuottaa yhtenevät tulokset.
- **GitHub Actions on nopein** CI-ajoissa (~21 s) hosted-runnerin ansiosta.
- **GitLab CI on hitain** (~1 min 4 s) docker+machine-runnerin overheadin vuoksi. Myös CD on hitain (46 s).
- **Azure Pipelines** CI (~1 min 10 s) on lähellä GitLabia, mutta CD (14 s) on nopea self-hosted agentilla.
- GitHub Actions CD (9 s) on nopein deploy-vaihe.
- GitLab CI CD:ssä overhead tulee container-käynnistyksestä ja artefaktien latauksesta.
- Paikallisesti samat vaiheet (lint + testit + build) kestävät yhteensä noin 6.5 s ilman mitään CI-overheadia.
- Azure Pipelines vaati self-hosted agentin, koska Microsoft-hosted runnerit eivät olleet käytettävissä ilman parallelism-grantia.
