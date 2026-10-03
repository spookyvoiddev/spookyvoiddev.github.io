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

**Second cause: CI used to install unpinned prettier.** `prettier.yml` ran
`npm install --save-dev --save-exact prettier @shopify/prettier-plugin-liquid`,
which resolves the _latest_ versions instead of the ones in `package-lock.json`.
Once plugin-liquid 1.11.0 shipped, CI reformatted `_layouts/bib.liquid` (one
`{% endhighlight %}` indent) and failed on a file no commit had touched, while
`prettier . --check` stayed green locally on the pinned 1.10.2. The two versions
disagree in both directions, so reformatting the file only flips which
environment fails.

**Permanent mitigation already in place:**

- `update-tocs.yml` is set to `workflow_dispatch:` only (no auto-trigger).
- `prettier.yml` installs with `npm ci`, so CI and local use identical
  versions. Do not change it back to `npm install <pkg>`.
- Running `prettier . --write` (entire repo) before every commit catches drift.

**If a Prettier CI failure recurs:**

1. `npx prettier . --check` locally — find the file.
2. `npx prettier . --write` to fix all drift.
3. Commit + push. Don't target single files.
4. If it keeps recurring, look for ANY workflow that auto-commits to `main`;
   disable its push trigger.
5. If CI flags a file your commit never touched, compare the prettier and
   plugin-liquid versions CI resolved against `package-lock.json` before
   touching the file.

## Active workflows

Only three workflows live in `.github/workflows/`:

- `deploy.yml` — Jekyll build + push to `gh-pages`. Split into a read-only
  `build` job and a `deploy` job that alone holds `contents: write`; keep it
  that way so gems/npm packages never run with a write token.
- `prettier.yml` — formatting check on push/PR.
- `codeql.yml` — security scan (JS, Ruby, and the workflows themselves).

`.github/dependabot.yml` opens monthly grouped PRs for actions, gems and npm.
Actions are pinned to commit SHAs with a `# vX.Y.Z` comment; keep that format
when bumping by hand. If a Dependabot PR bumps prettier or plugin-liquid, run
`npx prettier . --write` on that branch before merging.

All al-folio template workflows (lighthouse-badger, render-cv, update-citations,
update-tocs, broken-links, axe, copilot-setup-steps, prettier-comment-on-pr,
docker-slim, deploy-image, deploy-docker-tag, prettier-html) were removed
during repo cleanup. Do not reintroduce without configuring upstream deps.

## Supply chain

- `Gemfile.lock` is committed (platforms include `x86_64-linux` for CI and
  `x64-mingw-ucrt` for local Windows). Commit it whenever gems change.
- `jekyll-terser` is a git gem pinned by `ref:`; bump the SHA deliberately.
- purgecss is a pinned devDependency run via `npx --no-install`; do not go back
  to `npm install -g purgecss`.
- Third-party CDN libs in `_config.yml` carry SRI hashes. jsDelivr may be
  blocked from cloud sessions; compute a hash from the npm tarball instead
  (`npm pack <pkg>@<ver>`, then `openssl dgst -sha256 -binary <file> | base64`).

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

Live outside the repo at `D:\ClaudeArchive\wp-migration\` (not version
controlled). Includes:

- `convert.rb` — WordPress HTML → Jekyll Markdown converter.
- `localize_post_images.rb` — rewrites WP image URLs in `_posts/` to local
  `/assets/img/posts/` paths.
- `localize_thumbnails.rb` — same for `thumbnail:` frontmatter.

Re-run these only if migrating new content from WP; current posts are already
localized.
