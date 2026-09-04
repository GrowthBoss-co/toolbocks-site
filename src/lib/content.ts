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
  // Four links, per Bahaa: Features (the carousel), How it works, Benefits,
  // Pricing. Integrations and "Why ToolBocks" came off the bar.
  { label: "Features", href: "#platform" },
  { label: "How it works", href: "#walkthrough" },
  { label: "Benefits", href: "#benefits" },
  { label: "Pricing", href: "#pricing" },
] as const;

export const hero = {
  eyebrow: "Sales engagement platform",
  title: "Your reps talk. The system does the rest.",
  subtitle:
    "It researches each lead, dials until a human picks up, and feeds the rep their next line while the call is live. Growth Boss runs its own outbound on it every day.",
  primaryCta: "Book a live demo",
  secondaryCta: "See the platform",
  note: "A live walkthrough on real data, not slides.",
};

export const mission = {
  eyebrow: "Our mission",
  text: "ToolBocks was not designed in a boardroom. It was built inside Growth Boss because calling 60 prospects used to take a rep an entire day. Every feature exists because our own SDR team needed it that week.",
};

/**
 * Deliberately durable figures. The previous set was hardcoded but written as
 * live measurements ("in the last 90 days"), so it went stale the day it
 * shipped and had to be either maintained or quietly believed. Each of these
 * stays true without anyone updating it, and each one is checkable in the app.
 */
export const stats = [
  { value: "2", label: "CRMs supported natively" },
  { value: "6", label: "channels in one conversation inbox" },
  { value: "427", label: "area codes mapped to legal calling windows" },
  { value: "Per rep", label: "AI cost metered and capped" },
];

export const features = {
  // The "What changes" header, on its own again: the dot field the cursor
  // draws through lives behind it. The two bands and the dashboard that used
  // to follow it were removed; the all-features carousel follows instead.
  eyebrow: "What changes",
  title: "Reps spend the day talking, not typing.",
  body: "The list, the research, the follow-up and the CRM updates all happen without anyone touching them. What is left on a rep's calendar is conversations.",
};

export const featureCatalog = {
  // The "Explore all the features" carousel that replaced "What changes":
  // one card per screen in the product, in the app's own nav order. Titles
  // are the screen names; bodies are the screens' own one-line descriptions
  // from the ToolBox at c41ec86, lightly trimmed. New copy, flagged for
  // Bahaa's sign-off. `visual` keys the illustration and the icon.
  eyebrow: "All features",
  titleLead: "Explore",
  titleAccent: "all the features",
  titleLine2: "built into ToolBocks.",
  items: [
    {
      visual: "today",
      title: "Today",
      body: "Everything due today in one queue: cadence steps, callbacks, replies waiting and meetings to confirm. Reps work it top to bottom.",
    },
    {
      visual: "pipeline",
      title: "Pipeline",
      body: "A deal board that writes back to the CRM. Drag a card between stages and the CRM stage moves with it.",
    },
    {
      visual: "leadGen",
      title: "Lead Gen",
      body: "Build a target list without leaving the app. Filter by industry, size and geography, preview the match count, then push straight into a cadence.",
    },
    {
      visual: "leadResearch",
      title: "Lead Research",
      body: "One prospect, researched before the dial: what the business does, the likely pain, and an opener written from what was found.",
    },
    {
      visual: "cadence",
      title: "Cadence",
      body: "Multi-step call, email and SMS sequences that run on their own and stop the moment someone replies or books.",
    },
    {
      visual: "nurturer",
      title: "Nurturer",
      body: "The long game for leads that said not now. Something useful on a slow drip, and a hand back to a rep the day they engage.",
    },
    {
      visual: "socialSelling",
      title: "Social Selling",
      body: "LinkedIn and Instagram worked like a channel. Openers drafted from the prospect's own posts, with the source kept beside the draft.",
    },
    {
      visual: "powerDialer",
      title: "Power Dialer",
      body: "One rep, one queue. Local presence, dispositions in a click, and the recording, transcript and summary land on the contact.",
    },
    {
      visual: "teamDialer",
      title: "Team Dialer",
      body: "A shared queue for the whole floor. Lines dial in parallel and the next connect goes to whoever is free.",
    },
    {
      visual: "liveCoach",
      title: "AI Live Coach",
      body: "Reads the live transcript, catches the objection as it is said, and puts the counter on the rep's screen before the pause gets long.",
    },
    {
      visual: "emailBlast",
      title: "Email Blast",
      body: "Write once, send to a tag, see what happened. Every send carries the unsubscribe footer the law wants.",
    },
    {
      visual: "conversations",
      title: "Conversations",
      body: "Every reply, email and text in one inbox with the lead's history beside it. Replying here stops the cadence.",
    },
    {
      visual: "audit",
      title: "Digital Audit",
      body: "A branded audit of the prospect's online presence, built from the research and published with your booking link on it.",
    },
    {
      visual: "proposal",
      title: "Proposal",
      body: "A proposal drafted from the call and your Business Library, reviewed by the rep, then sent with your name on it.",
    },
    {
      visual: "programStrategy",
      title: "Program Strategy",
      body: "The 90-day plan a client gets after they sign: what runs in which month, what it should produce, and what you need from them.",
    },
    {
      visual: "salesHandoff",
      title: "Sales Handoff",
      body: "Everything delivery needs, written while it is fresh: what was promised, what was not, and where the lead came from.",
    },
    {
      visual: "businessLibrary",
      title: "Business Library",
      body: "What the AI knows about your business: who you sell to, what you sell, the proof you use. Answer once and every document follows it.",
    },
    {
      visual: "teamDashboard",
      title: "Team Dashboard",
      body: "The whole team on one page: calls, connects, meetings and talk time by rep, with the shape of the day hour by hour.",
    },
    {
      visual: "productivity",
      title: "Productivity",
      body: "Per-rep activity and talk time, and where the day actually went, so nobody argues about who the dialer favours.",
    },
    {
      visual: "roi",
      title: "ROI",
      body: "What the outreach is worth in money rather than activity: cost per lead, cost per meeting, and what a closed deal returned.",
    },
    {
      visual: "campaignReports",
      title: "Campaign Reports",
      body: "How one campaign's leads actually moved: where they stopped, what they replied to, and how long anything took.",
    },
    {
      visual: "dialerReports",
      title: "Dialer Reports",
      body: "Every call the instance placed, with the recording, the transcript and the summary attached to the row.",
    },
    {
      visual: "aiCosts",
      title: "AI Costs",
      body: "What the AI actually cost, priced per operation at each model's own rate, so a research run and a proposal are never averaged together.",
    },
    {
      visual: "coachPlaybook",
      title: "Coach Playbook",
      body: "The objections your team actually hears and what worked against them, built from your own call recordings rather than a book.",
    },
    {
      visual: "usersRoles",
      title: "Users & Roles",
      body: "Who is on the instance and what they can reach. Roles carry a default set of screens; anything else is granted per person.",
    },
    {
      visual: "integrations",
      title: "Integrations",
      body: "Your CRM, your phone numbers, your AI keys and your business profile. Credentials are encrypted on the instance and never leave it.",
    },
  ] as const,
};

export type FeatureVisualKey = (typeof featureCatalog.items)[number]["visual"];

/**
 * The middle item used to be "Compliance-first telephony". Compliance is now
 * made once, in `system`, rather than three times across this page: it was also
 * a System pillar and a Values card, and saying it three ways read as padding
 * instead of as the differentiator it is.
 *
 * The replacement covers two-way CRM sync, which the page otherwise only
 * mentions inside one walkthrough step.
 */
// The AI Live Coach gets its own beat: copy on the left, the real dialer demo
// (public/demo/live-call.html, embedded as-is) on the right. Everything claimed
// here was verified against the app in the PR #18 review: objection coaching
// reads the live transcript (src/objections.ts), research happens before the
// first contact, and the methodology is the floor's own playbook.
export const coach = {
  eyebrow: "AI Live Coach",
  title: "A coach on the line for every call",
  body: "It listens to the live transcript, catches the objection as it is being said, and puts the counter on the rep's screen before the pause gets long. The methodology underneath is the one that runs the Growth Boss floor, so a rep in their first week handles a pushback the way the floor does.",
  points: [
    "Reads the call as it happens, not after it ends",
    "The counter is on screen before the rep has to think of one",
    "Lead intel and research are already there when the call connects",
  ],
  demoNote: "Live demo on sample data. Click around.",
};

export const benefits = {
  eyebrow: "Benefits",
  title: "Three things that stop being your problem",
  items: [
    {
      title: "Provably fair for reps",
      body: "A fairness dashboard shows how connects and idle time are actually distributed, so nobody has to argue about who the dialer favours.",
    },
    {
      title: "Your CRM stays current on its own",
      body: "Every dial, reply, note and disposition writes itself back, and moving a deal between stages on the board updates the CRM. Nobody keeps two systems in sync by hand.",
    },
    {
      // "and texts" was here and was wrong: the SMS blast is retired, and
      // cadence SMS sends automatically rather than per-message approved. Email
      // is the channel a rep reads and edits before anything goes out.
      title: "Human in the loop",
      body: "Blast emails are AI-drafted and rep-approved before anything sends, then go out through your own CRM at a measured pace. Your domain reputation stays yours.",
    },
  ],
};

export const integrations = {
  // A very small line over a row of CRM wordmarks, sitting where the stat
  // strip used to be under the hero. Official logos in their own colours,
  // dark lettering turned white for the ground, no captions. HighLevel and
  // Salesforce are wired today (both behind CrmClient); the rest are popular
  // CRMs on the roadmap, listed at Bahaa's call. `w`/`h` are the artwork's
  // aspect (from the file's viewBox); `size` is the rendered height in rem,
  // tuned by eye so a squat cloud and a long wordmark read as the same weight.
  heading: "Connects to the CRM you already run",
  brands: [
    { name: "HighLevel", file: "highlevel.png", w: 1024, h: 232, size: 2.1 },
    { name: "Salesforce", file: "salesforce.svg", w: 273, h: 191, size: 3.3 },
    { name: "HubSpot", file: "hubspot.svg", w: 106, h: 30, size: 2.1 },
    { name: "Zoho", file: "zoho.svg", w: 1024, h: 450, size: 2.3 },
    { name: "Pipedrive", file: "pipedrive.svg", w: 668, h: 152, size: 1.7 },
    { name: "monday.com", file: "monday.svg", w: 467, h: 47, size: 1.55 },
    { name: "Microsoft Dynamics 365", file: "dynamics365.svg", w: 1017, h: 355, size: 2.5 },
    { name: "Zendesk", file: "zendesk.svg", w: 363, h: 259, size: 2.6 },
    { name: "Freshworks", file: "freshworks.svg", w: 600, h: 120, size: 1.75 },
    { name: "ActiveCampaign", file: "activecampaign.svg", w: 136, h: 14, size: 1.35 },
    { name: "Keap", file: "keap.svg", w: 600, h: 280, size: 2.2 },
    { name: "Insightly", file: "insightly.svg", w: 134, h: 48, size: 2 },
  ] as const,
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
  // "seven tools" was here. The product replaces far more than seven, and any
  // count invites someone to check it, so the line no longer carries one.
  body: "A rep's day used to be a stack of tools that do not talk to each other, with copy-paste between all of them. This is the same day inside ToolBocks.",
  // The opening beat of the threaded walkthrough: a prompt on the left, a line
  // running to a pill on the right that lights when the line reaches it. Sixty
  // is the figure the mission statement already uses; the pill repeats the hero
  // headline word for word so the section ties back to the promise at the top.
  start: {
    prompt: "A rep opens a list of sixty prospects.",
    pill: "The system does the rest",
  },
  // `tag` is the small label on the connector line that leads INTO each step,
  // naming what the system is doing on the way there.
  steps: [
    {
      kicker: "The live call",
      title: "Every call, coached in real time",
      body: "The rep opens a lead that is already researched. While they talk, the coach reads the call and puts the counter to an objection on screen as it is being said.",
      visual: "coachedCall" as const,
      sample: true,
      tag: "pulling lead intel",
    },
    {
      kicker: "Power dialer",
      title: "Parallel dialing, several lines at once",
      body: "Several lines dial at once and the first human to answer is bridged to the rep. Machines are screened out, and numbers outside their legal calling window are held.",
      visual: "parallelLines" as const,
      sample: true,
      tag: "queuing the next lines",
    },
    {
      kicker: "Fill the pipeline",
      title: "AI research feeds every touch",
      body: "Every lead is researched before anyone contacts it, down to whether they are already running ads. The follow-up then goes out personalised and CASL-safe, without a rep writing it.",
      visual: "researchFlow" as const,
      sample: false,
      tag: "researching every lead",
    },
    {
      kicker: "Pipeline",
      title: "A board that writes itself",
      body: "Every dial, reply and disposition syncs back to your CRM both ways, and dragging a deal between stages writes through. Works natively with GoHighLevel and Salesforce.",
      visual: "pipelineBoard" as const,
      sample: true,
      tag: "syncing both ways",
    },
    {
      kicker: "Close faster",
      title: "Branded audits and proposals, one click",
      body: "Point it at a website and an Instagram handle and it returns an on-brand marketing audit, ready to send. From a discovery-call transcript it writes the proposal.",
      visual: "auditProposal" as const,
      sample: false,
      tag: "reading the transcript",
    },
    {
      kicker: "Analytics",
      title: "Every rep, every dollar, measured",
      body: "Connect rate, best time to call, disposition mix and AI cost, broken out per rep. Each SDR sees their own numbers, so a review is never a surprise.",
      visual: "analytics" as const,
      sample: true,
      tag: "metering every rep",
    },
  ],
  sampleNote: "Illustrative interface. Figures shown are a sample view.",
};

/**
 * Positioning section, from demo scene 10. The deck's fourth pillar was
 * "Licensed & locked", written for investors as an anti-cloning moat. Recast
 * here toward what the same fact means for a customer: the instance is yours
 * and cannot be copied out of your environment.
 *
 * This section absorbed the old `Values` section, which restated the same
 * argument one scroll later with larger icons. The last two pillars and the
 * `tags` strip below are what came across; the rest of Values was already said
 * here. Six pillars means the grid is three across rather than four.
 */
export const system = {
  eyebrow: "Why it holds up",
  title: "Not a dialer. A sales system.",
  body: "Plenty of tools will dial a list. The difference is what surrounds the call.",
  // `tag` is the small mono label in each bento card's corner, from the design.
  pillars: [
    {
      icon: "playbook" as const,
      tag: "Method",
      title: "Encoded playbook",
      body: "The close methodology that runs the Growth Boss floor is built into every coach prompt and every script, so a new rep inherits it on day one.",
    },
    {
      icon: "gauge" as const,
      tag: "Guardrails",
      title: "Compliance native",
      body: "Calling windows are enforced from the lead's own area code, opt-outs are handled server-side, and the dialer slows itself down before an abandon rate becomes a problem.",
    },
    {
      icon: "server" as const,
      tag: "Isolation",
      title: "Instance per customer",
      body: "Your deployment is isolated, with its own keys and its own data. Nothing of yours shares a database with another agency.",
    },
    {
      icon: "lock" as const,
      tag: "Ownership",
      title: "Licensed to you",
      body: "Each build is signed and bound to your domain, so an instance cannot be copied out of your environment and run somewhere else.",
    },
    {
      icon: "shield" as const,
      tag: "Security",
      title: "Encrypted by default",
      body: "Integration credentials are encrypted and never shown again after you save them. Every instance holds its own key.",
    },
    {
      icon: "chart" as const,
      tag: "Transparency",
      title: "Costs you can see",
      body: "AI spend, call cost and campaign return are reported per rep in the same place as pipeline, so nothing about the platform is a black box.",
    },
  ],
  // "DNC checking" was the industry term for scrubbing against the national
  // registries, which this does not do. The do-not-call list it does keep is
  // real, permanent and org-wide, so the chip now says exactly that.
  tags: [
    "Abandon-rate tracking",
    "Pacer ratio",
    "Do-not-call list",
    "Local-time gating",
    "Call recording",
    "Consent records",
    "Audit trail",
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

export const finalCta = {
  title: "See it work on one of your leads.",
  body: "Bring a company you want to sell to. We will research it, dial it and generate its audit while you watch.",
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
