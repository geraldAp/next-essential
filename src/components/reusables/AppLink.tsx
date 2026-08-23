import Link from "next/link";
import { cn } from "@/lib/utils";

export type AppLinkProps = Omit<
  React.ComponentProps<typeof Link>,
  "className" | "children"
> & {
  children: React.ReactNode;
  className?: string;
  /** visual variant - both render as <Link>, only styles differ */
  type?: "link" | "button";
};

const baseStyles =
  "inline-flex items-center gap-1 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring";

const linkStyles = "text-primary underline-offset-4 hover:underline";
const buttonStyles =
  "bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-4 py-2 no-underline";

export function AppLink({
  children,
  className,
  type = "link",
  ...rest
}: AppLinkProps) {
  const variantStyles = type === "button" ? buttonStyles : linkStyles;
  return (
    <Link className={cn(baseStyles, variantStyles, className)} {...rest}>
      {children}
    </Link>
  );
}

export default AppLink;
