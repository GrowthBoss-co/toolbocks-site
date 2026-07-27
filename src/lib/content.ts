/**
 * All ToolBocks landing-page copy lives here so it can be edited without
 * touching layout code.
 *
 * Entries flagged PLACEHOLDER are structural stand-ins that need real data
 * before this page goes public. Nothing in them is a claim ToolBocks can
 * currently make. See the two exported constants at the bottom of the file.
 */

export const DEMO_URL =
  "https://api.leadconnectorhq.com/widget/bookings/gabriel-narsaik";

/** The app front door. Becomes app.toolbocks.com once that host is licensed. */
export const APP_URL = "https://toolbocks.com";

export const AGENCY_URL = "https://growthboss.co";

export const navLinks = [
  { label: "Platform", href: "#platform" },
  { label: "Benefits", href: "#benefits" },
  { label: "Integrations", href: "#integrations" },
  { label: "Pricing", href: "#pricing" },
  { label: "Why ToolBocks", href: "#why" },
] as const;

export const hero = {
  eyebrow: "Sales engagement platform",
  title: "Run your entire outbound motion from one login",
  subtitle:
    "Power dialer, multi-channel cadences, lead sourcing, AI-generated audits and proposals, and full pipeline reporting. ToolBocks runs Growth Boss's own outbound every single day, and now it can run yours.",
  primaryCta: "Book a live demo",
  secondaryCta: "See the platform",
  note: "Live walkthrough on real screens. No slideware.",
};

export const mission = {
  eyebrow: "Our mission",
  text: "ToolBocks was not designed in a boardroom. It was built inside Growth Boss because calling 60 prospects used to take a rep an entire day. Every feature exists because our own SDR team needed it that week.",
};

export const stats = [
  { value: "1,928", label: "calls logged in the last 90 days" },
  { value: "20+", label: "tools replaced by one platform" },
  { value: "9", label: "native integrations" },
  { value: "~2 min", label: "to a full AI website audit" },
];

export const features = {
  eyebrow: "Workflow efficiency",
  title: "Stop dialing. Start closing.",
  body: "Cut the manual work out of outbound. ToolBocks queues the calls, runs the follow-up, and writes research back to your CRM, so reps spend the day in conversations instead of in spreadsheets.",
  cards: [
    {
      eyebrow: "Live campaigns",
      title: "Dial the queue, not the list",
      body: "Campaign queues, live call coaching, recordings and transcripts, with pacer ratio and abandon rate tracked on the supervisor board as it happens.",
    },
    {
      eyebrow: "Follow-up",
      title: "Never drop a follow-up",
      body: "Multi-step email, SMS and call cadences built on named angles: Pattern Interrupt, Value Stack, Social Proof, Urgency, Breakup.",
    },
  ],
};

export const benefits = {
  eyebrow: "Benefits",
  title: "The benefits of running outbound in one system",
  items: [
    {
      title: "Provably fair for reps",
      body: "A transparent fairness dashboard shows exactly how connects and idle time are distributed across the team, so nobody has to argue about who the dialer favours.",
    },
    {
      title: "Compliance-first telephony",
      body: "Abandon-rate tracking, pacer-ratio monitoring and DND checking sit inside the supervisor view, not bolted on after a complaint lands.",
    },
    {
      title: "Human in the loop",
      body: "Blast emails and texts are AI-drafted but human-approved, then sent through your own CRM at a measured pace. Your domain reputation stays yours.",
    },
  ],
};

export const integrations = {
  eyebrow: "Integrations",
  title: "Connect the stack your outbound already runs on",
  body: "Credentials are stored encrypted and never redisplayed once saved.",
  brands: [
    { name: "GoHighLevel", mark: "GHL" },
    { name: "Twilio", mark: "TW" },
    { name: "OpenAI", mark: "AI" },
    { name: "Anthropic", mark: "AN" },
    { name: "ElevenLabs", mark: "11" },
    { name: "Google Places", mark: "GP" },
    { name: "Amplemarket", mark: "AM" },
    { name: "MiniMax", mark: "MM" },
    { name: "Vercel", mark: "VC" },
  ],
};

/**
 * PLACEHOLDER. ToolBocks has no published customer testimonials yet, and
 * inventing them would put fabricated quotes on a real product page. These are
 * layout stand-ins. Replace each `quote`, `name` and `role` with a real,
 * attributable quote before publishing, or delete the section.
 */
export const testimonials = {
  eyebrow: "Testimonials",
  title: "What teams say after a month on ToolBocks",
  isPlaceholder: true,
  items: [
    { quote: "Add a real client quote here.", name: "Client name", role: "Role, Company" },
    { quote: "Add a real client quote here.", name: "Client name", role: "Role, Company" },
    { quote: "Add a real client quote here.", name: "Client name", role: "Role, Company" },
    { quote: "Add a real client quote here.", name: "Client name", role: "Role, Company" },
    { quote: "Add a real client quote here.", name: "Client name", role: "Role, Company" },
  ],
};

/**
 * PLACEHOLDER PRICES. ToolBocks does not have public pricing. The tier names,
 * feature lists and structure are real; every number below is invented for
 * layout only. Confirm real figures before publishing.
 */
export const pricing = {
  eyebrow: "Pricing",
  title: "Pricing that scales with your seat count",
  isPlaceholder: true,
  annualSavingLabel: "Save 20%",
  plans: [
    {
      name: "Solo",
      monthly: "$00",
      annual: "$000",
      blurb: "One closer running their own pipeline.",
      features: [
        "Power dialer and call recording",
        "Cadence builder",
        "AI website audits",
        "1 seat",
        "Email and chat support",
      ],
      cta: "Book a demo",
      popular: false,
    },
    {
      name: "Team",
      monthly: "$00",
      annual: "$000",
      blurb: "SDR teams that need a supervisor view.",
      features: [
        "Everything in Solo",
        "Team dialer and supervisor board",
        "Fairness dashboard",
        "Up to 10 seats",
        "Priority support",
      ],
      cta: "Book a demo",
      popular: true,
    },
    {
      name: "Agency",
      monthly: "Custom",
      annual: "Custom",
      blurb: "Agencies running outbound for clients.",
      features: [
        "Everything in Team",
        "Isolated instance per client",
        "AI proposals and sales handoffs",
        "Unlimited seats",
        "Onboarding and migration",
      ],
      cta: "Talk to us",
      popular: false,
    },
  ],
};

export const values = {
  eyebrow: "Built for real outbound",
  title: "Foundation for high-performing sales teams",
  cards: [
    {
      icon: "shield" as const,
      title: "Encrypted by default",
      body: "Integration credentials are sealed with AES-256-GCM and never shown again after you save them. Every instance holds its own key.",
    },
    {
      icon: "gauge" as const,
      title: "Compliance built in",
      body: "Abandon rate, pacer ratio and DND state are tracked on every campaign, so the compliance conversation happens before the complaint does.",
    },
    {
      icon: "chart" as const,
      title: "Costs you can see",
      body: "Per-user AI spend, call cost and campaign ROI are reported in the same place as pipeline, so nothing about the platform is a black box.",
    },
  ],
  tags: [
    "Abandon-rate tracking",
    "Pacer ratio",
    "DNC checking",
    "Local-time gating",
    "Call recording",
    "Consent records",
    "Audit trail",
  ],
};

export const finalCta = {
  marquee: "Book a live demo",
  title: "See ToolBocks running on real data",
  body: "Book a walkthrough and we will show you the live platform: the dialer, the cadences, and an AI audit generated in front of you.",
  cta: "Book a live demo",
};

export const footer = {
  tagline:
    "The sales engagement platform built and battle-tested inside Growth Boss, a full-service marketing agency in Oakville, Ontario.",
  columns: [
    {
      heading: "Platform",
      links: [
        { label: "Power dialer", href: "#platform" },
        { label: "Cadences", href: "#platform" },
        { label: "AI audits", href: "#platform" },
        { label: "Integrations", href: "#integrations" },
        { label: "Pricing", href: "#pricing" },
      ],
    },
    {
      heading: "Company",
      links: [
        { label: "Growth Boss", href: AGENCY_URL },
        { label: "Book a demo", href: DEMO_URL },
        { label: "Sign in", href: APP_URL },
      ],
    },
  ],
  legal: {
    copyright: "© 2026 Growth Boss Marketing Corp. All rights reserved.",
    address: "2030 Bristol Circle, Suite 201, Oakville, Ontario",
  },
};
