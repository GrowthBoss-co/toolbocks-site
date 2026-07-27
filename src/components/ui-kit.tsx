import Link from "next/link";
import { cn } from "@/lib/utils";

/* ==========================================================================
   Button. Ports Orizon's .button-main, including its hover text-reveal: the
   label sits in a clipped 1.5rem window with a duplicate stacked underneath,
   and the pair slides up on hover.
   ========================================================================= */

type ButtonVariant = "primary" | "dark" | "light";
type ButtonSize = "default" | "small";

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-primary-500 text-white hover:bg-primary-600",
  dark: "bg-surface-800 text-ink hover:bg-surface-700",
  light: "bg-[var(--n-50)] text-strong hover:bg-white",
};

const sizeClasses: Record<ButtonSize, string> = {
  default: "h-[3.25rem] px-xl text-base",
  small: "h-10 px-lg text-small",
};

export function Button({
  href,
  children,
  variant = "primary",
  size = "default",
  className,
}: {
  href: string;
  children: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
}) {
  const external = href.startsWith("http");
  const inner = (
    <span className="flex h-6 flex-col overflow-hidden text-center">
      {/* shrink-0 matters: without it flex squashes both labels to half height */}
      <span className="shrink-0 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/btn:-translate-y-full">
        {children}
      </span>
      <span
        aria-hidden="true"
        className="shrink-0 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/btn:-translate-y-full"
      >
        {children}
      </span>
    </span>
  );

  const classes = cn(
    "group/btn inline-flex shrink-0 items-center justify-center overflow-hidden rounded-small font-medium leading-6 transition-colors duration-200",
    variantClasses[variant],
    sizeClasses[size],
    className,
  );

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
      >
        {inner}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {inner}
    </Link>
  );
}

/* ==========================================================================
   Eyebrow + section header
   ========================================================================= */

export function Eyebrow({
  children,
  className,
  small,
}: {
  children: React.ReactNode;
  className?: string;
  small?: boolean;
}) {
  return (
    <p className={cn("text-eyebrow", small && "is-small", className)}>
      {children}
    </p>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  body,
  align = "center",
  as: Heading = "h2",
  className,
}: {
  eyebrow?: string;
  title: string;
  body?: string;
  align?: "center" | "left";
  as?: "h1" | "h2";
  className?: string;
}) {
  const left = align === "left";
  return (
    <div
      className={cn(
        "flex flex-col",
        left ? "items-start" : "items-center",
        className,
      )}
    >
      <div
        className={cn(
          "flex flex-col gap-xl",
          left ? "items-start" : "items-center",
        )}
      >
        {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
        <div
          className={cn(
            "flex flex-col gap-xl",
            left ? "items-start text-left" : "items-center text-center",
          )}
        >
          <Heading
            className={cn(
              "text-gradient max-w-[22ch] text-balance",
              Heading === "h1" ? "heading-h1" : "heading-h2",
            )}
          >
            {title}
          </Heading>
          {body ? (
            <p className="text-large max-w-[56ch] text-soft-400">{body}</p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
