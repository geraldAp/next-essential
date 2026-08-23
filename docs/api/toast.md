# Toast Helpers — How To

Location: `src/lib/helpers/toast.tsx:1` (uses `sonner`)

Requires `<Toaster />` from `sonner` in layout:

```tsx
// src/app/layout.tsx
import { Toaster } from "sonner";
export default function RootLayout({ children }) {
  return <html><body>{children}<Toaster /></body></html>;
}
```

## API

```ts
import { handleSuccess, handleError, handleWarning } from "@/lib/helpers/toast";

handleSuccess({ message: "Saved successfully" });
handleError({ message: "Failed to save" });
handleWarning({ message: "Session expiring soon" });
```

## Colors

* Success: `#067C3C` / `#067C3C1A`
* Error: `#DC2626` / `#DC26261A`
* Warning: `#B45309` / `#B453091A`

## Usage with server actions

```tsx
const res = await adminLogin(data);
if (res.ok) handleSuccess({ message: "Login successful" });
else handleError({ message: (res.error.response?.data as any)?.message ?? "Login failed" });
```

All helpers accept `{ message: string }`.
