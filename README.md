# spookyvoiddev.github.io

Personal site of [@spookyvoiddev](https://github.com/spookyvoiddev) — blog, projects, CV.

**Live:** <https://spookyvoiddev.github.io>

## Tech stack

- [Jekyll](https://jekyllrb.com/) static site
- Hosted on [GitHub Pages](https://pages.github.com/) (`gh-pages` branch)
- Built and deployed via GitHub Actions (`.github/workflows/deploy.yml`)
- Forked from the [al-folio](https://github.com/alshedivat/al-folio) theme (MIT — see [`LICENSE`](LICENSE))

## Local development

Requires Ruby 3.3 and Node 22.

```bash
bundle install
npm ci
bundle exec jekyll serve
```

Site serves at <http://localhost:4000>. Run `npx prettier . --write` before committing.

## License

MIT — see [`LICENSE`](LICENSE).
