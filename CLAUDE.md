@AGENTS.md

---

# Project-specific lessons (DO NOT IGNORE)

## Mandatory pre-commit checklist

Always run these from the repo root before `git commit`. No exceptions.

```bash
npx prettier . --write     # MUST be the whole repo, not specific files
PATH=/c/Ruby33-x64/bin:$PATH bundle exec jekyll build   # local build sanity check
```

If `prettier . --write` modifies files, stage them and re-run `prettier . --check`
to confirm a clean state before committing.

## Recurring failure: Prettier CI fails on CUSTOMIZE.md (and friends)

This has bitten us multiple times. Pattern:

1. We push a commit.
2. (Historically) `update-tocs.yml` auto-regenerated TOCs in `*.md` and
   force-pushed an "Auto update markdown TOC" commit. That regenerated markdown
   was not prettier-formatted, so the next `Prettier code formatter` workflow
   failed on `CUSTOMIZE.md` or `FAQ.md`.
3. We "fixed" only the offending file with `prettier <file> --write`. The next
   push re-introduced drift in a different file.

**Permanent mitigation already in place:**

- `update-tocs.yml` is set to `workflow_dispatch:` only (no auto-trigger).
- Running `prettier . --write` (entire repo) before every commit catches drift.

**If a Prettier CI failure recurs:**

1. `npx prettier . --check` locally — find the file.
2. `npx prettier . --write` to fix all drift.
3. Commit + push. Don't target single files.
4. If it keeps recurring, look for ANY workflow that auto-commits to `main`;
   disable its push trigger.

## Disabled workflows (do not re-enable without configuring upstream deps)

These al-folio workflows are intentionally set to `workflow_dispatch:` only:

| Workflow                     | Why disabled                                                                 |
| ---------------------------- | ---------------------------------------------------------------------------- |
| `lighthouse-badger.yml`      | Needs a PAT in `secrets.token`; not configured.                              |
| `render-cv.yml`              | Our `_data/cv.yml` uses al-folio's display subset, not full RenderCV schema. |
| `update-citations.yml`       | No `_bibliography/papers.bib`.                                               |
| `broken-links-site.yml`      | Burns CI minutes after every deploy.                                         |
| `update-tocs.yml`            | Caused the Prettier auto-commit loop (see above).                            |
| `copilot-setup-steps.yml`    | Only relevant when GitHub Copilot agent is wired up.                         |
| `prettier-comment-on-pr.yml` | Single-author repo does not need automated PR comments.                      |

Workflows kept enabled: `deploy.yml`, `prettier.yml`, `codeql.yml`.
Docker/broken-links/axe workflows have
`if: github.repository_owner == 'alshedivat'` guards and skip silently.

## GitHub Pages source

Pages source is **`gh-pages` branch**, not `main`. The `deploy.yml` workflow
builds `_site/` and pushes it to `gh-pages` via
`JamesIves/github-pages-deploy-action`. Do not change Pages source back to
`main` — the GH default Jekyll runner does not understand al-folio's plugins
(`jekyll-toc`, etc.) and will fail with `Unknown tag 'toc'`.

## Image handling

- Blog post images live in `assets/img/posts/` (downloaded from the old
  WordPress site at migration time). Do not re-introduce remote
  `youcanclickl3.wordpress.com` URLs.
- Battlemap images are at `assets/img/battlemaps/` and were resized via
  WordPress CDN's `?w=1500` to stay under GitHub's 100 MB-per-file limit.
- The image-overflow CSS rule in `_sass/_blog.scss` (`#markdown-content img`)
  is what keeps post images from overflowing. Don't remove without a
  replacement.

## CV (`_data/cv.yml`)

- Per-role `summary:` is intentionally omitted. Each role lists `Credited:`
  followed by game titles in `highlights`.
- Locked games per role (don't add to wrong role):
  - Senior QA Tester @ Epic: Fortnite: Battle Royale, Fortnite: Blitz Royale
  - Tester II @ Epic: Fortnite: Battle Royale
  - QA Specialist @ The Behemoth: Alien Hominid Invasion, Alien Hominid HD,
    BattleBlock Theater Remastered
- Do not write "Blitz QA" anywhere — that is an internal team name. The game
  mode "Fortnite: Blitz Royale" is fine and intentional.

## Migration scripts

Live outside the repo at `D:\ClaudeProjects\.wp-migration\` (not version
controlled). Includes:

- `convert.rb` — WordPress HTML → Jekyll Markdown converter.
- `localize_post_images.rb` — rewrites WP image URLs in `_posts/` to local
  `/assets/img/posts/` paths.
- `localize_thumbnails.rb` — same for `thumbnail:` frontmatter.

Re-run these only if migrating new content from WP; current posts are already
localized.
