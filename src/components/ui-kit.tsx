import Link from "next/link";
import { cn } from "@/lib/utils";

/* ==========================================================================
   Button. Ports Orizon's .button-main, including its hover text-reveal: the
   label sits in a clipped 1.5rem window with a duplicate stacked underneath,
   and the pair slides up on hover.
   ========================================================================= */

type ButtonVariant = "primary" | "dark" | "light";
type ButtonSize = "default" | "small";

/**
 * Lime is the only saturated warm colour on the page, so it is spent entirely
 * on the one thing every section is asking for: book the demo. Indigo stays the
 * structural colour — rails, nodes, icons, chips — and never competes as a CTA.
 *
 * The ghost variant is a border, not a fill: a second filled button beside the
 * lime one halves the pull of both.
 */
const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-lime text-void hover:-translate-y-0.5 hover:shadow-[0_10px_30px_-10px_rgb(218_255_0/0.5)]",
  dark: "border border-white/12 bg-white/[0.04] text-ink hover:border-primary-400 hover:bg-white/[0.07]",
  light: "bg-[var(--n-50)] text-strong hover:bg-white",
};

const sizeClasses: Record<ButtonSize, string> = {
  default: "h-[3.25rem] px-2xl text-base",
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
  // Both labels must be exactly as tall as the window they slide inside, or the
  // second one peeks out under the first. The small size sets .text-small,
  // whose 1.6 line-height is shorter than the 1.5rem window — which showed as a
  // clipped, doubled label on the nav CTA. Pinning h-6/leading-6 on the labels
  // themselves makes the slide exactly one label tall at every size.
  const label = "block h-6 shrink-0 leading-6 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/btn:-translate-y-full";

  const inner = (
    <span className="flex h-6 flex-col overflow-hidden text-center">
      <span className={label}>{children}</span>
      <span aria-hidden="true" className={label}>
        {children}
      </span>
    </span>
  );

  const classes = cn(
    "group/btn inline-flex shrink-0 items-center justify-center overflow-hidden rounded-round font-medium leading-6 transition-all duration-200",
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
