/**
 * All ToolBocks landing-page copy lives here so it can be edited without
 * touching layout code.
 *
 * Everything in this file is real copy. The PLACEHOLDER flag this comment used
 * to describe, and the pricing and testimonial stand-ins that carried it, were
 * removed once real figures and real quotes landed.
 */

/** Canonical origin for this site. Shared by metadata and the JSON-LD graph. */
export const SITE_URL = "https://toolbocks.com";

export const DEMO_URL =
  "https://api.leadconnectorhq.com/widget/bookings/gabriel-narsaik";

/**
 * The app front door, where sign-in lands. This is a different host from the one
 * serving this page: toolbocks.com is the marketing site, app.toolbocks.com is
 * the ToolBox itself, running on Railway.
 *
 * It used to be toolbocks.com, because the app used to BE toolbocks.com. Do not
 * point it back at the apex — that is this site, so sign-in would loop.
 */
export const APP_URL = "https://app.toolbocks.com";

export const AGENCY_URL = "https://growthboss.co";

export const navLinks = [
  { label: "Platform", href: "#platform" },
  { label: "How it works", href: "#walkthrough" },
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
 * The product walkthrough, ported from the internal demo reel
 * (toolbocks-demo.vercel.app), scenes 4 through 9. Each beat keeps the deck's
 * headline because those lines are already tight.
 *
 * `sample: true` marks a beat whose visual shows representative figures rather
 * than live data, and prints a note under it. The deck carried the same
 * disclaimer and it should not get lost in translation.
 */
export const walkthrough = {
  eyebrow: "The platform, step by step",
  // Deliberately not the deck's "Every call, coached in real time": that line is
  // step 1's headline just below, and repeating it verbatim reads as a mistake.
  title: "A rep's whole day, in one system",
  body: "A rep's day used to be seven tools that do not talk to each other, with copy-paste between all of them. This is the same day inside ToolBocks.",
  steps: [
    {
      kicker: "The live call",
      title: "Every call, coached in real time",
      body: "The rep opens a lead that is already researched: the real signal, the pain, and an opener. While they talk, the live coach surfaces objection counters as the objection is being said.",
      visual: "coachedCall" as const,
      sample: true,
    },
    {
      kicker: "Power dialer",
      title: "Parallel dialing, several lines at once",
      body: "Several lines dial at once and the first human to pick up is bridged to the rep. Answering-machine detection screens out machines, and any number outside its legal calling window is held automatically.",
      visual: "parallelLines" as const,
      sample: true,
    },
    {
      kicker: "Fill the pipeline",
      title: "AI research feeds every touch",
      body: "Lead research runs a web and ad-library scan, then hands off to a multi-touch cadence that routes by tag. Email and SMS go out personalised and CASL-safe, so the follow-up is never the bottleneck.",
      visual: "researchFlow" as const,
      sample: false,
    },
    {
      kicker: "Pipeline",
      title: "A board that writes itself",
      body: "Every dial, reply and disposition syncs back to your CRM both ways, so the rep never updates the board by hand. Live on GoHighLevel today, with a Salesforce integration in pilot.",
      visual: "pipelineBoard" as const,
      sample: true,
    },
    {
      kicker: "Close faster",
      title: "Branded audits and proposals, one click",
      body: "Point it at a website and an Instagram handle and it returns a full on-brand marketing audit, ready to send. From a discovery-call transcript it writes a package-forward proposal with the right tier already recommended.",
      visual: "auditProposal" as const,
      sample: false,
    },
    {
      kicker: "Analytics",
      title: "Every rep, every dollar, measured",
      body: "Connect rate, best time to call, disposition mix and AI cost, broken out per rep. Each SDR also gets a personal report they can see for themselves, so the numbers are never a surprise in a review.",
      visual: "analytics" as const,
      sample: true,
    },
  ],
  sampleNote: "Illustrative interface. Figures shown are a sample view.",
};

/**
 * Positioning section, from demo scene 10. The deck's fourth pillar was
 * "Licensed & locked", written for investors as an anti-cloning moat. Recast
 * here toward what the same fact means for a customer: the instance is yours
 * and cannot be copied out of your environment.
 */
export const system = {
  eyebrow: "Why it holds up",
  title: "Not a dialer. A sales system.",
  body: "Plenty of tools will dial a list. The difference is what surrounds the call.",
  pillars: [
    {
      icon: "playbook" as const,
      title: "Encoded playbook",
      body: "The close methodology that runs the Growth Boss floor is built into every coach prompt and every script, so a new rep inherits it on day one.",
    },
    {
      icon: "scales" as const,
      title: "Compliance native",
      body: "CASL and CRTC/TCPA calling windows and opt-out handling are enforced server-side, not left to a rep to remember.",
    },
    {
      icon: "server" as const,
      title: "Instance per customer",
      body: "Your deployment is isolated, with its own keys and its own data. Nothing of yours shares a database with another agency.",
    },
    {
      icon: "lock" as const,
      title: "Licensed to you",
      body: "Each build is signed and bound to your domain, so an instance cannot be copied out of your environment and run somewhere else.",
    },
  ],
};

/**
 * Real quotes from reps running ToolBocks, supplied by Bahaa 2026-07-29.
 *
 * The card is a fixed 26rem tall and renders the quote at `heading-h5` (1.5rem),
 * which caps a quote at roughly 180 characters before it overflows. Paulo's and
 * Simon's are their own words, tightened to fit that; the edits are noted per
 * entry so the originals are not lost.
 *
 * `role` is the one field NOT supplied and is inferred. Confirm each title.
 *
 * `avatar` is each person's Slack profile photo, unmodified, in
 * `public/assets/testimonials/`. All four sources are 512x512.
 *
 * `crop` is a box on that source in source pixels, applied in CSS by the card
 * rather than baked into the file, so the originals stay intact and a bad crop
 * is a one-number fix. Two of the four need it: Gabriel's photo is a full-torso
 * shot where his face sits small and high, and Simon's is a selfie with his face
 * left of centre and a kayak filling the right, so a plain centred circular crop
 * misses the face in both. `size: 512` means the whole frame, no crop.
 */
export const testimonials = {
  eyebrow: "Testimonials",
  title: "What the reps running it say",
  items: [
    {
      // Verbatim apart from "The toolbox" -> "ToolBocks" and a tightened middle
      // clause. Original: "The toolbox helped me increase my bookings and also
      // gave me the confidence when handling an objection or knowing the right
      // moment to end a call."
      quote:
        "ToolBocks helped me increase my bookings, and gave me the confidence to handle an objection or know the right moment to end a call.",
      name: "Paulo Medeiros",
      role: "SDR, Growth Boss",
      avatar: {
        src: "/assets/testimonials/paulo-medeiros.jpg",
        // Centred studio headshot, already well framed.
        crop: { left: 0, top: 0, size: 512 },
      },
    },
    {
      // His own words, condensed to fit the card. The rest of his note was
      // product feedback for the app backlog rather than testimonial copy, and
      // is tracked there, not here.
      quote:
        "Super efficient for cold calling. It dials two people at a time, writes the emails, and audits the website and socials of every company we call. Really smooth to use.",
      name: "Simon Chen",
      role: "SDR, Growth Boss",
      avatar: {
        src: "/assets/testimonials/simon-chen.png",
        // Pulls in on his face; drops the kayak on the right.
        crop: { left: 40, top: 80, size: 300 },
      },
    },
    {
      // His own words, condensed. His opening line was about efficiency and
      // friction, which Simon's quote above already covers, so it was dropped
      // in favour of the point only he made: quality holding up at volume. The
      // second sentence is tightened from "Most useful has been the ability to
      // make sure my call quality stays high while scaling the amount of volume
      // I can do each day."
      quote:
        "Everything is tailored to each lead, so every conversation is fresh and specific. Most useful is keeping my call quality high while scaling the volume I do each day.",
      name: "Josh Hoath",
      role: "SDR, Growth Boss",
      avatar: {
        src: "/assets/testimonials/josh-hoath.png",
        // His photo is a blue disc on a white square, and the disc is slightly
        // off-centre (roughly centre 255,250 radius 225), so a symmetric trim
        // leaves a white crescent on one edge. This box is centred on the disc
        // and inset well inside it, which keeps the mask entirely blue.
        crop: { left: 55, top: 50, size: 400 },
      },
    },
    {
      // Written on his behalf with his permission (per Bahaa), about the live
      // coaching he singled out. No figures are claimed. He should sign off on
      // this exact wording, since it publishes under his name.
      quote:
        "The live coaching is the part I did not expect to lean on. It reads the call as it happens and puts the right counter in front of me before I have to think about it.",
      name: "Gabriel Narsaik",
      role: "Sales lead, Growth Boss",
      avatar: {
        src: "/assets/testimonials/gabriel-narsaik.jpg",
        // Face is small and high in a full-torso shot, so this crops in hard.
        crop: { left: 127, top: 55, size: 260 },
      },
    },
  ],
};

/**
 * ToolBocks has no published pricing, so no tier shows a figure: every one
 * quotes on a call. The tier names, blurbs and feature lists are real.
 *
 * Each plan carries a single `price` rather than a monthly/annual pair, and the
 * section has no billing-period toggle, because with nothing numeric to switch
 * between, a toggle controls nothing and a "Save 20%" badge would be claiming a
 * discount against prices that do not exist. Reinstate the pair, the toggle and
 * the saving badge together whenever real figures land.
 */
export const pricing = {
  eyebrow: "Pricing",
  title: "Pricing that scales with your seat count",
  plans: [
    {
      name: "Solo",
      price: "Custom",
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
      price: "Custom",
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
      price: "Custom",
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
        { label: "Power dialer", href: "#walkthrough" },
        { label: "Cadences", href: "#walkthrough" },
        { label: "AI audits", href: "#walkthrough" },
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
        // /privacy existed but nothing on the site linked to it. Ad platforms
        // look for a reachable privacy policy, and a footer link is where people
        // expect to find one.
        { label: "Privacy policy", href: "/privacy" },
      ],
    },
  ],
  legal: {
    copyright: "© 2026 Growth Boss Marketing Corp. All rights reserved.",
    address: "2030 Bristol Circle, Suite 201, Oakville, Ontario",
  },
};
