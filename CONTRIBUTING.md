# Contributing to next-prod-setup

Thanks for considering contributing!

## Getting Started

1. Fork the repo
2. `npx degit you/next-prod-setup my-fork` or `git clone`
3. `yarn install`
4. `cp .env.example .env.local` — set `SESSION_PASSWORD` (32+ chars)
5. `yarn dev`

## Workflow

* Create a branch: `git checkout -b feat/my-feature`
* Keep it minimal — this boilerplate is intentionally small (see `docs/PROJECT_INFO.md`)
* Update `docs/PROJECT_INFO.md` + relevant `docs/**` on every change
* Ensure `yarn build` passes
* Commit with conventional commits: `feat:`, `fix:`, `docs:`, `chore:`
* Open a PR against `main` — fill the PR template

## What to Contribute

* Bug fixes, docs, a11y, DX improvements
* New minimal reusables (must include `docs/reusables/*.md` how-to with code example)
* Do not add heavy deps without discussion — open an issue first

## Code of Conduct

By participating you agree to `CODE_OF_CONDUCT.md`.

## Questions?

Open an issue with label `question`.
