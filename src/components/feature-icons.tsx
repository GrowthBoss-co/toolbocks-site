import type { SVGProps } from "react";
import type { FeatureVisualKey } from "@/lib/content";
import {
  ChartIcon,
  DocIcon,
  MailIcon,
  PlaybookIcon,
  RepeatIcon,
  SearchIcon,
  ShieldCheckIcon,
  SparkleIcon,
} from "@/components/icons";

type P = SVGProps<SVGSVGElement>;

/** Stroke icons in the same 24-grid and weight as the rest of `icons.tsx`. */
function S({ d, ...props }: P & { d: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path d={d} stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const CalendarIcon = (p: P) => (
  <S {...p} d="M7 3v3M17 3v3M4 9h16M6 5h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Zm2 8h3v3H8z" />
);
const KanbanIcon = (p: P) => (
  <S {...p} d="M5 4h4v16H5zM10 4h4v10h-4zM15 4h4v7h-4z" />
);
const UserPlusIcon = (p: P) => (
  <S {...p} d="M15 20a6 6 0 0 0-12 0M9 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm10-2v6m-3-3h6" />
);
const LeafIcon = (p: P) => (
  <S {...p} d="M5 20c0-8 5-14 15-15-1 10-7 15-15 15Zm0 0 8-8" />
);
const ShareIcon = (p: P) => (
  <S {...p} d="M18 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM6 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm12 7a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM8.6 13.5l6.8 4M15.4 6.5l-6.8 4" />
);
const PhoneIcon = (p: P) => (
  <S {...p} d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" />
);
const UsersIcon = (p: P) => (
  <S {...p} d="M16 20a5 5 0 0 0-10 0M11 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm5 1a3 3 0 1 0-1-5.8M17 15.5a4.5 4.5 0 0 1 4 4.5" />
);
const ChatIcon = (p: P) => (
  <S {...p} d="M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H9l-5 4V6Zm4 4h8M8 13h5" />
);
const TargetIcon = (p: P) => (
  <S {...p} d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0-4a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm0-4a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" />
);
const HandoffIcon = (p: P) => (
  <S {...p} d="M3 12h11m-4-4 4 4-4 4M15 4h4a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-4" />
);
const BookIcon = (p: P) => (
  <S {...p} d="M5 4h11a3 3 0 0 1 3 3v13H8a3 3 0 0 0-3 3V4Zm0 0v13a3 3 0 0 1 3-3h11M9 8h6" />
);
const GridIcon = (p: P) => (
  <S {...p} d="M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z" />
);
const TrendIcon = (p: P) => (
  <S {...p} d="M3 17l6-6 4 4 8-8m0 0h-5m5 0v5" />
);
const DollarIcon = (p: P) => (
  <S {...p} d="M12 3v18M16.5 7.5A3.5 3.5 0 0 0 13 5h-2a3 3 0 0 0 0 6h2a3 3 0 0 1 0 6h-2.5A3.5 3.5 0 0 1 7 13.5" />
);
const FunnelIcon = (p: P) => (
  <S {...p} d="M4 5h16l-6 7v6l-4 2v-8L4 5Z" />
);
const ClockIcon = (p: P) => (
  <S {...p} d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0-13v5l3 2" />
);
const ReceiptIcon = (p: P) => (
  <S {...p} d="M6 3h12v18l-3-2-3 2-3-2-3 2V3Zm3 5h6M9 12h6M9 16h4" />
);
const PlugIcon = (p: P) => (
  <S {...p} d="M9 3v5M15 3v5M6 8h12v3a6 6 0 0 1-12 0V8Zm6 9v4" />
);

export const featureIcons: Record<FeatureVisualKey, (p: P) => React.JSX.Element> = {
  today: CalendarIcon,
  pipeline: KanbanIcon,
  leadGen: UserPlusIcon,
  leadResearch: SearchIcon,
  cadence: RepeatIcon,
  nurturer: LeafIcon,
  socialSelling: ShareIcon,
  powerDialer: PhoneIcon,
  teamDialer: UsersIcon,
  liveCoach: SparkleIcon,
  emailBlast: MailIcon,
  conversations: ChatIcon,
  audit: ChartIcon,
  proposal: DocIcon,
  programStrategy: TargetIcon,
  salesHandoff: HandoffIcon,
  businessLibrary: BookIcon,
  teamDashboard: GridIcon,
  productivity: TrendIcon,
  roi: DollarIcon,
  campaignReports: FunnelIcon,
  dialerReports: ClockIcon,
  aiCosts: ReceiptIcon,
  coachPlaybook: PlaybookIcon,
  usersRoles: ShieldCheckIcon,
  integrations: PlugIcon,
};
