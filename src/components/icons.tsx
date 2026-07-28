import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

/** Four-point sparkle used in the closing marquee. */
export function SparkleIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 19 18" fill="none" aria-hidden="true" {...props}>
      <path
        fill="currentColor"
        d="M9.253 17.695C8.221 14.071 4.444 10.308.806 9.28c-.408-.13-.408-.42 0-.557C4.45 7.687 8.22 3.931 9.26.3c.112-.4.382-.4.493 0 1.033 3.631 4.81 7.387 8.442 8.422.407.131.407.426 0 .557-3.639 1.03-7.415 4.792-8.448 8.416-.112.407-.382.407-.494 0Z"
      />
    </svg>
  );
}

export function CheckIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <circle cx="12" cy="12" r="9" fill="currentColor" opacity="0.16" />
      <path
        d="m8.25 12.2 2.5 2.5 5-5.4"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function StarIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12 2.6l2.7 5.9 6.4.7-4.8 4.3 1.3 6.3L12 16.7l-5.6 3.1 1.3-6.3-4.8-4.3 6.4-.7L12 2.6Z" />
    </svg>
  );
}

export function ArrowUpRightIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M7 17 17 7M9 7h8v8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function PlusIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M12 5v14M5 12h14"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function MinusIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path d="M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function MenuIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M4 7h16M4 12h16M4 17h16"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M6 6l12 12M18 6L6 18"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* -- benefit row icons ---------------------------------------------------- */

export function ScalesIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M12 4v16M7 20h10M4 8h16M4 8l-2 5a3.2 3.2 0 0 0 4 0L4 8Zm16 0-2 5a3.2 3.2 0 0 0 4 0l-2-5Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="5" r="1.6" fill="currentColor" />
    </svg>
  );
}

export function ShieldCheckIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M12 3l7 2.6v5.6c0 4.3-2.9 8-7 9.2-4.1-1.2-7-4.9-7-9.2V5.6L12 3Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="m8.9 12.1 2.1 2.1 4.2-4.4"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function UserCheckIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <circle cx="10" cy="8" r="3.4" stroke="currentColor" strokeWidth="1.7" />
      <path
        d="M4 20c0-3.1 2.7-5.6 6-5.6 1 0 2 .2 2.8.7"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path
        d="m14.6 17.6 1.8 1.8 3.6-3.8"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* -- value card icons ----------------------------------------------------- */

export function GaugeIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M3.6 17a9 9 0 1 1 16.8 0"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path
        d="m12 13.4 4.2-4.2"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <circle cx="12" cy="14.6" r="1.7" fill="currentColor" />
      <path
        d="M5.4 12.2h1.4M17.2 12.2h1.4M12 5.6V7"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function ChartIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M4 20h16"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <rect x="5.4" y="12" width="3.2" height="5" rx="1" fill="currentColor" />
      <rect x="10.4" y="8.4" width="3.2" height="8.6" rx="1" fill="currentColor" opacity="0.72" />
      <rect x="15.4" y="4.8" width="3.2" height="12.2" rx="1" fill="currentColor" opacity="0.45" />
    </svg>
  );
}

export function LockIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <rect
        x="4.6"
        y="10.4"
        width="14.8"
        height="10"
        rx="2.6"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <path
        d="M8.4 10.4V7.8a3.6 3.6 0 0 1 7.2 0v2.6"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <circle cx="12" cy="15.4" r="1.5" fill="currentColor" />
    </svg>
  );
}

/* -- product walkthrough icons -------------------------------------------- */

export function SearchIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <circle cx="10.6" cy="10.6" r="6" stroke="currentColor" strokeWidth="1.7" />
      <path
        d="m15.2 15.2 4.4 4.4"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function RepeatIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M4.6 10.2A5.6 5.6 0 0 1 10.2 4.6h6.1M19.4 13.8a5.6 5.6 0 0 1-5.6 5.6H7.7"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path
        d="m14 2.2 2.6 2.4L14 7M10 17l-2.6 2.4L10 21.8"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function MailIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <rect
        x="3.2"
        y="5.6"
        width="17.6"
        height="12.8"
        rx="2.4"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <path
        d="m4.4 7.6 6.3 4.7a2.2 2.2 0 0 0 2.6 0l6.3-4.7"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function DocIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M6 3.4h7.2L19 9.2v11.4H6V3.4Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="M13 3.6v5.8h5.8"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="M9 13.4h7M9 16.6h4.6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function ServerIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <rect
        x="3.4"
        y="4"
        width="17.2"
        height="6.4"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <rect
        x="3.4"
        y="13.6"
        width="17.2"
        height="6.4"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <circle cx="7.4" cy="7.2" r="1.3" fill="currentColor" />
      <circle cx="7.4" cy="16.8" r="1.3" fill="currentColor" />
      <path
        d="M11.6 7.2h5.2M11.6 16.8h5.2"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Open playbook. Stands in for the encoded close methodology. */
export function PlaybookIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M12 6.6C10.4 5.2 8.2 4.6 4.4 4.6v13c3.8 0 6 .6 7.6 2 1.6-1.4 3.8-2 7.6-2v-13c-3.8 0-6 .6-7.6 2Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="M12 6.6v14"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <circle cx="8.1" cy="10.4" r="1.1" fill="currentColor" />
      <circle cx="15.9" cy="10.4" r="1.1" fill="currentColor" />
    </svg>
  );
}

export const valueIcons = {
  shield: LockIcon,
  gauge: GaugeIcon,
  chart: ChartIcon,
} as const;

/** Icons for the "not a dialer, a sales system" pillars. */
export const systemIcons = {
  playbook: PlaybookIcon,
  scales: ScalesIcon,
  server: ServerIcon,
  lock: LockIcon,
} as const;

/* -- brand ---------------------------------------------------------------- */

export function ToolBocksLogo({
  className,
}: {
  className?: string;
}) {
  return (
    <span className={className}>
      <span className="flex items-center gap-sm">
        <span
          aria-hidden="true"
          className="grid size-7 place-items-center rounded-[7px] bg-lime text-[1.05rem] font-bold leading-none text-strong"
        >
          T
        </span>
        <span className="text-[1.35rem] font-medium leading-none text-ink">
          Tool<span className="text-primary-400">Bocks</span>
        </span>
      </span>
    </span>
  );
}
