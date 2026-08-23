# API Handler — How To

Location: `src/lib/api/apiHandler.ts:1`, instance `src/lib/api/http.ts:1`, session `src/lib/session.ts:1`

Unified wrapper that returns a discriminated union — no `try/catch` at call sites, no thrown errors.

## Types

```ts
type ApiSuccess<T> = { ok: true; data: T };
type ApiFailure = { ok: false; error: AxiosError };
type ApiResponse<T> = ApiSuccess<T> | ApiFailure;
```

## http instance

```ts
// src/lib/api/http.ts
import http from "@/lib/api/http";
http.defaults.baseURL = process.env.NEXT_PUBLIC_API_BASE_URL ?? process.env.API_BASE_URL;
```

Auth is injected **server-side** from iron-session unless `skipAuth: true`.

## apiRequest

```tsx
import { apiRequest } from "@/lib/api/apiHandler";

const res = await apiRequest<{ data: { id: string } }>({
  method: "get",
  url: "/v1/users/me",
  opts: { params: { include: "profile" } } // any AxiosRequestConfig
});

if (res.ok) {
  console.log(res.data.data.id); // T
} else {
  console.error(res.error.response?.status, res.error.response?.data);
  // 401 auto redirect("/logout") in apiHandler
}
```

Skip auth (login, public):

```tsx
await apiRequest({ method:"post", url:"/v1/admins/login", data:{email,password}, opts:{ skipAuth:true } });
```

Add custom header:

```tsx
await apiRequest({ method:"get", url:"/v1/export", opts:{ headers:{ Authorization:"Bearer xyz" } } });
```

## Direct http usage (client)

```tsx
import http from "@/lib/api/http";
const { data } = await http.get("/v1/users");
```
