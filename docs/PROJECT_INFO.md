# PROJECT_INFO — next-prod-setup

> **Instructions to humans and agents:** Update this file on **every** change to the project. Remove any section that is no longer relevant. Do not keep stale info. This file is the single source of truth for current project state. Also check `docs/reusables/*` and `docs/api/*` for detailed how-tos.

## Stack

* Next.js 16.3.2 (App Router, Turbopack), React 19, TypeScript, Tailwind 4
* Yarn 4.18.0 (`.yarnrc.yml:1` `nodeLinker: node-modules`), `src/` directory
* Auth: `iron-session` `src/lib/session.ts:1` (sealed `nsm_session`, `SESSION_PASSWORD` 32+ chars)
* State: `zustand` `src/store/userStore.ts:1` (client, persist `user-storage`), `src/store/socketStore.ts:1`
* HTTP: `axios` `src/lib/api/http.ts:1` + wrapper `src/lib/api/apiHandler.ts:1` (`ApiResponse<T>`)
* Forms: `react-hook-form` + `zod` + `@hookform/resolvers`, shadcn/ui
* Toast: `sonner` `src/lib/helpers/toast.tsx:1`

## Structure

```
src/
  app/
    (auth)/login/page.tsx        -> LoginForm
    (auth)/logout/page.tsx + LogoutClient.tsx
    layout.tsx
  components/
    ui/ (button, card, input, label, table, skeleton, etc.)
    reusables/DataTable.tsx, AppLink.tsx
    login/LoginForm.tsx
  actions/ (use server)
    login.ts (mock via MOCK_LOGIN), sessionActions.ts
  lib/
    api/http.ts, api/apiHandler.ts, api/socket.ts
    session.ts
    helpers/toast.tsx, helpers/formatters.ts
    utils/constants.ts, routes.ts, storage.ts, mock.ts
  schemas/login.ts
  store/
  providers/SocketProvider.tsx
docs/
  PROJECT_INFO.md (this file)
  reusables/DataTable.md, AppLink.md
  api/api-handler.md, server-actions.md, toast.md
```

## Env

```
SESSION_PASSWORD=complex_password_at_least_32_characters_long_dev_only
NEXT_PUBLIC_API_BASE_URL=https://api.example.com
# or API_BASE_URL for server-only
```

## Key Flows

* Login: `src/components/login/LoginForm.tsx:1` -> `src/actions/login.ts:1` `adminLogin` (checks `src/lib/utils/mock.ts:1` `MOCK_LOGIN` when `ENABLE_MOCK:true`, else real API) -> `src/actions/sessionActions.ts:1` `setBearerToken`/`setSession` (iron-session) -> `handleSuccess` + `router.push("/")`
* Logout: `src/app/(auth)/logout/page.tsx:1` destroys iron-session server-side + `LogoutClient.tsx` clears `localStorage`/`userStore` and `router.replace("/login")`
* API: `apiRequest({method,url,data,opts})` auto-injects `Authorization: Bearer <token>` from session unless `opts.skipAuth:true`, returns `{ok,data}` | `{ok:false,error:AxiosError}`, 401 -> `redirect("/logout")`
* Storage: `src/lib/utils/storage.ts:1` SSR-safe `getItem/setItem/removeItem` for non-sensitive client data; sensitive goes to iron-session

## Current State

* `yarn build` passes (Turbopack)
* Mock login: `admin@example.com` / `password123` -> success, else 401 mock error
* Docs cover reusables + api + toast with code examples


