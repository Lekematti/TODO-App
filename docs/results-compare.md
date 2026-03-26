# Tulosten vertailu – Local vs GitHub vs GitLab vs Azure

## Yhteenvetotaulukko

| | GitHub Actions | GitLab CI | Azure Pipelines |
|---|---|---|---|---|
| **CI-avg** | 23 s | 1 min 3 s | 1 min 7 s |
| **CI-ajot (min:s)** | 0:22, 0:20, 0:23, 0:23, 0:25 | 1:07, 1:03, 1:02, 0:58, 1:05 | 1:00, 1:00, 1:01, 1:25, 1:10 |
| **Runner** | oma kone | hosted (ubuntu) | SaaS docker+machine | self-hosted (Win) |
| **Testit** | OK | OK | OK |
| **Deploy-kohde** | Netlify + Render | Netlify + Render (manuaalinen) | Azure Storage + Render |
| **Manuaaliset vaiheet** | ei | CD manuaalinen (Play) | ei |

## Yleisjohtopäätökset

- Kaikilla kolmella alustalla sama CI-komentosarja tuottaa yhtenevät tulokset.
- **GitHub Actions on nopein** CI-ajoissa (23 s) hosted-runnerin ansiosta.
- **GitLab CI on hitain** (1 min 3 s) docker+machine-runnerin overheadin vuoksi.
- **Azure Pipelines** CI (1 min 7 s) on lähellä GitLabia.
- GitLab CI CD:ssä overhead tulee container-käynnistyksestä ja artefaktien latauksesta.
- Azure Pipelines vaati self-hosted agentin, koska Microsoft-hosted runnerit eivät olleet käytettävissä ilman parallelism-grantia.
