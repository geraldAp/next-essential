# Server Actions — How To

All actions live in `src/actions/*` and are `"use server"`. They use `src/lib/api/apiHandler.ts:1` + `src/lib/session.ts:1` (iron-session) + `src/schemas/*` (zod).

## Creating an action

```ts
// src/actions/users.ts
"use server";

import { apiRequest } from "@/lib/api/apiHandler";
import { ADMIN_API_ROUTES } from "@/lib/utils/routes";

export async function getUsers() {
  const res = await apiRequest<{ data: User[] }>({
    method: "get",
    url: "/v1/admins",
    // opts.skipAuth defaults to false -> Authorization injected from session
  });
  return res; // { ok, data } | { ok, error }
}
```

## Calling from client with useTransition

```tsx
// src/components/login/LoginForm.tsx
"use client";
import { useTransition } from "react";
import { adminLogin } from "@/actions/login";
import { handleSuccess, handleError } from "@/lib/helpers/toast";

export function MyComponent() {
  const [isPending, startTransition] = useTransition();

  const onSubmit = (data: LoginInput) => {
    startTransition(async () => {
      const res = await adminLogin(data);
      if (res.ok) {
        handleSuccess({ message: "Done" });
        router.push("/");
      } else {
        const msg = (res.error.response?.data as any)?.message ?? res.error.message;
        handleError({ message: msg });
      }
    });
  };

  return <Button disabled={isPending}>{isPending ? "Loading..." : "Submit"}</Button>;
}
```

## Login mock (boilerplate)

`src/lib/utils/mock.ts:1`:

```ts
export const MOCK_LOGIN = {
  ENABLE_MOCK: true,
  VALID_EMAIL: "admin@example.com",
  VALID_PASSWORD: "password123",
} as const;
```

`src/actions/login.ts:8` checks it before real API — disable via `ENABLE_MOCK: false` when backend is ready.

## Session (iron-session)

```ts
// src/actions/sessionActions.ts
import { getSession } from "@/lib/session";

export async function setBearerToken(token: string) {
  const session = await getSession();
  session.bearerToken = token;
  await session.save();
}
export async function clearSession() {
  const session = await getSession();
  session.destroy();
}
```

Requires `SESSION_PASSWORD` (32+ chars) in `.env.local`.
