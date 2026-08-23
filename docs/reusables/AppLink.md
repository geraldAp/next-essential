# AppLink — How To

Location: `src/components/reusables/AppLink.tsx:1`
Always renders `next/link`. `type` controls **visual variant only** (not element type). Styles are overridable via `className` through `cn()` (`src/lib/utils.ts:4` = `clsx` + `twMerge`).

## Props

```ts
type AppLinkProps = {
  children: React.ReactNode;
  href: string;
  type?: "link" | "button"; // default "link"
  className?: string;
} & Omit<ComponentProps<typeof Link>, "children" | "className">
```

## Link variant (default)

```tsx
import { AppLink } from "@/components/reusables/AppLink";

<AppLink href="/login">Sign in</AppLink>
// -> text-primary underline
```

## Button variant (still a link)

```tsx
<AppLink href="/dashboard" type="button">Go to dashboard</AppLink>
// -> bg-primary text-primary-foreground rounded-md px-4 py-2
```

## Overriding

`className` is merged last, so it wins via `twMerge`:

```tsx
<AppLink href="/login" className="text-foreground no-underline hover:text-primary">
  Custom link
</AppLink>

<AppLink href="/login" type="button" className="bg-transparent text-primary border border-primary">
  Outline button look
</AppLink>

<AppLink href="/external" target="_blank" rel="noopener noreferrer" className="gap-2">
  External <ExternalLink className="size-4" />
</AppLink>
```

## Notes

* Use `type="button"` when you need a CTA style but still want client-side navigation.
* For actual `<button>` actions (logout, submit) use `src/components/ui/button.tsx:1` instead.
