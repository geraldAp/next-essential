# next-prod-setup

Minimal, prod-ready Next.js 16 boilerplate — essentials only. Built to be cloned via `degit` and extended, not bloated.

## What is this?

A clean App Router starter with auth, API wrapper, reusable UI and docs — kept intentionally small for CLI/`degit` distribution.

**Includes:** iron-session (encrypted cookies), axios + `apiRequest` wrapper (`AxiosError`), zustand + persist, react-hook-form + zod, DataTable/AppLink reusables, sonner toasts, SSR-safe storage helpers.

**Excludes:** no heavy state, no test setup, no middleware bloat — add as needed.

## Stack

Next.js 16.3.2 (Turbopack) · React 19 · Tailwind 4 · TypeScript · Yarn 4 (`nodeLinker: node-modules`) · iron-session · zustand · axios · date-fns

## Use this template

```bash
npx degit <you>/next-prod-setup my-app
cd my-app
cp .env.example .env.local  # set SESSION_PASSWORD (32+ chars)
yarn install
yarn dev
```

Or GitHub: `Use this template` button.

Mock login: `admin@example.com` / `password123` (toggle `src/lib/utils/mock.ts` `ENABLE_MOCK`).

## Env

```bash
SESSION_PASSWORD=complex_password_at_least_32_characters_long_dev_only
NEXT_PUBLIC_API_BASE_URL=https://api.example.com
```

## Structure

```
src/app/(auth)/login  -> LoginForm (RHF+zod) + server action
src/app/(auth)/logout -> clears iron-session + localStorage
src/components/reusables -> DataTable, AppLink
src/components/login -> LoginForm
src/lib/api -> http.ts, apiHandler.ts
src/lib/session.ts -> iron-session
src/schemas/login.ts
src/actions/login.ts
docs/ -> PROJECT_INFO.md + how-tos
```

## Docs

* `docs/PROJECT_INFO.md` — current state (update on every change)
* `docs/reusables/DataTable.md`, `AppLink.md`
* `docs/api/api-handler.md`, `server-actions.md`, `toast.md`
* `AGENTS.md` — instructs agents to read `docs/` first

## Scripts

```bash
yarn dev
yarn build
yarn start
```

## Deploy

Works on Vercel out of the box. Set `SESSION_PASSWORD` and `NEXT_PUBLIC_API_BASE_URL` in env.

## License

MIT
