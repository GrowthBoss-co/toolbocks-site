import type { Post } from "../types";

export const whatIsAPowerDialer: Post = {
  slug: "what-is-a-power-dialer",
  title: "What is a power dialer? How it works and when it pays off",
  metaTitle: "What is a power dialer? How it works",
  description:
    "A power dialer calls the next lead as soon as a rep is free. How it works, how it differs from predictive and parallel dialers, and when it pays off.",
  primaryKeyword: "what is a power dialer",
  published: "2026-11-19",
  updated: "2026-11-19",
  readingMinutes: 7,
  answer:
    "A **power dialer** is calling software that dials the next number on a list automatically as soon as a rep finishes a call, one line per rep. It removes manual dialing and waiting between calls, so a rep spends more of the day talking to people, without the dropped calls that predictive dialers can cause.",
  sections: [
    { type: "h2", text: "How a power dialer works" },
    {
      type: "p",
      text: "A rep loads a list of leads, usually from the CRM, and starts a session. From there the dialer handles the mechanics that used to eat the day:",
    },
    {
      type: "ol",
      items: [
        "It dials the first number on the list.",
        "If someone answers, the rep is already on the line and talks to them.",
        "If nobody answers, or a voicemail picks up, the rep can leave a message or skip ahead.",
        "When the call ends, the rep logs the outcome (a **disposition** such as connected, no answer or booked meeting) and the dialer moves straight to the next number.",
      ],
    },
    {
      type: "p",
      text: "The key rule is **one call per rep at a time**. The dialer never rings more people than there are reps free to talk to them. That single constraint is what separates a power dialer from the other dialer types, and it is why a power dialer is the safe default for most small outbound teams.",
    },
    {
      type: "p",
      text: "Most power dialers also write the result of each call back to the CRM, so the contact record shows who called, when, and what happened, without the rep typing it in afterwards.",
    },

    { type: "h2", text: "Power dialer vs predictive, parallel and preview dialers" },
    {
      type: "p",
      text: "\"Dialer\" covers four quite different tools. The difference is how many lines ring for each rep, and who decides when the next call starts.",
    },
    {
      type: "table",
      head: ["Dialer type", "Lines per rep", "Who starts the next call", "Best for"],
      rows: [
        ["Preview dialer", "1", "The rep, after reviewing the record", "High-value accounts where research comes first"],
        ["Power dialer", "1", "The software, as soon as the rep is free", "Small teams working a qualified list"],
        ["Parallel dialer", "Several at once", "The software; the first person to answer is connected", "Large lists with low answer rates"],
        ["Predictive dialer", "A ratio set by an algorithm across the team", "The software, before a rep is free", "Large call centres with many agents"],
      ],
    },
    { type: "h3", text: "Preview dialer" },
    {
      type: "p",
      text: "The rep sees the lead's record first and clicks to call when ready. It is the slowest of the four, and the right choice when every call needs context, such as enterprise accounts or warm follow-ups.",
    },
    { type: "h3", text: "Predictive dialer" },
    {
      type: "p",
      text: "A predictive dialer estimates when agents will become free and dials ahead of them, across a whole team. When it guesses wrong, a person answers and there is nobody to talk to, so the call is dropped. In the US the Telemarketing Sales Rule's safe harbour requires abandoned calls to stay at or under 3% of answered calls, measured per campaign over each 30-day period ([16 CFR 310.4](https://www.ecfr.gov/current/title-16/chapter-I/subchapter-C/part-310/section-310.4)). Predictive dialing makes sense with dozens of agents; with three reps the math rarely works.",
    },
    { type: "h3", text: "Parallel dialer" },
    {
      type: "p",
      text: "A parallel dialer rings several numbers at once for a single rep and connects the first person who answers. It produces the most conversations per hour, and it also means the other lines that pick up have to be dropped or handled, so the dialer needs to manage abandon rates carefully.",
    },

    { type: "h2", text: "Why outbound teams use a power dialer" },
    {
      type: "ul",
      items: [
        "**Less dead time.** Manual dialing means finding the number, keying it in, waiting through rings and writing notes before the next call. A power dialer removes most of that.",
        "**Consistent pace.** The next call starts on its own, so the session keeps moving instead of stalling between calls.",
        "**Clean data.** Dispositions and call outcomes are captured as part of the flow, which makes reporting on connect rates and outcomes possible at all.",
        "**No dropped calls.** Because only one line rings per rep, a person who answers always reaches a human. That protects both the prospect's experience and your caller ID reputation.",
        "**Lower risk than predictive dialing.** With one line per rep there is no abandoned-call rate to manage.",
      ],
    },

    { type: "h2", text: "When a power dialer pays off, and when it does not" },
    {
      type: "p",
      text: "A power dialer is worth it when reps spend a real share of the day dialing rather than talking. A quick way to check: count how many calls a rep makes in a day and estimate how long each one takes before anyone answers or the call is abandoned. Multiply the two, and that is roughly the time a power dialer gives back each day.",
    },
    {
      type: "callout",
      title: "A worked example (illustrative numbers)",
      text: "A rep making 80 calls a day who spends 40 seconds per call on dialing, ringing and notes loses about 53 minutes a day to mechanics. Cutting that in half returns close to half an hour of selling time per rep, every day.",
    },
    { type: "p", text: "It pays off most for:" },
    {
      type: "ul",
      items: [
        "SDR and BDR teams making cold or warm calls from a list every day.",
        "Agencies calling on behalf of clients from a CRM such as GoHighLevel or Salesforce.",
        "Sales teams following up on inbound leads quickly, where speed to the first call matters.",
      ],
    },
    { type: "p", text: "It pays off less when:" },
    {
      type: "ul",
      items: [
        "Reps make a handful of calls a day to known accounts. A click-to-call button is enough.",
        "Each call needs several minutes of research first. A preview dialer, or research done before the session, fits better.",
        "The list is huge and answer rates are very low. That is where teams move to parallel dialing.",
      ],
    },

    { type: "h2", text: "Are power dialers legal?" },
    {
      type: "p",
      text: "Yes. A power dialer is a tool, and using one is legal. What the law regulates is how and when you call. This is general information, not legal advice; check the rules that apply to your business with counsel.",
    },
    {
      type: "ul",
      items: [
        "**US calling hours.** Telephone solicitations to residential numbers are only allowed between 8 a.m. and 9 p.m. in the called person's local time ([47 CFR 64.1200](https://www.ecfr.gov/current/title-47/chapter-I/subchapter-B/part-64/subpart-L/section-64.1200)).",
        "**Canada calling hours.** The CRTC's Unsolicited Telecommunications Rules allow telemarketing calls between 9 a.m. and 9:30 p.m. on weekdays and 10 a.m. to 6 p.m. on weekends, in the local time of the person receiving the call. Provincial rules can be stricter ([CRTC rules](https://crtc.gc.ca/eng/trules-reglest.htm)).",
        "**Do-not-call requests.** When someone asks not to be called again, that request has to be honoured. Keep a do-not-call list and check it before every session.",
        "**Autodialer rules.** In the US, the Supreme Court held in Facebook v. Duguid (2021) that an \"automatic telephone dialing system\" under the TCPA must have the capacity to store or produce numbers using a random or sequential number generator. Calling a list of specific leads is a different situation, but consent rules for texts and prerecorded messages still apply.",
      ],
    },
    {
      type: "p",
      text: "The practical risk with any dialer is calling someone outside their legal window because their area code is in a different time zone from your office. A good dialer checks the lead's local time before it dials.",
    },

    { type: "h2", text: "What to look for in a power dialer" },
    {
      type: "ul",
      items: [
        "**CRM sync both ways.** Calls, recordings and dispositions should write back to the contact, and list changes in the CRM should reach the dialer.",
        "**Local-time gating.** Numbers outside their legal calling window should be held automatically, based on the lead's area code.",
        "**A do-not-call list** that the dialer checks before every call.",
        "**Voicemail handling.** Answering machines should be detected or skipped quickly so reps do not sit through greetings.",
        "**Recording and transcripts** on the contact record, for coaching and handoffs.",
        "**Reporting per rep:** dials, connects, talk time and outcomes.",
        "**Room to grow.** If the list grows, being able to switch the same team to parallel dialing saves a migration later.",
      ],
    },

    { type: "h2", text: "Where ToolBocks fits" },
    {
      type: "p",
      text: "[ToolBocks](/) is an AI sales engagement platform and power dialer for GoHighLevel and Salesforce teams, built by Growth Boss in Oakville, Ontario. Its power dialer gives each rep one queue with local presence, one-click dispositions, and the recording, transcript and summary saved to the contact. Calling windows are enforced from the lead's own area code, with 427 US and Canadian area codes mapped to legal calling windows. When a list outgrows one line per rep, the team dialer rings several lines at once and connects the first human who answers to whoever is free.",
    },
    {
      type: "p",
      text: "The part most dialers do not have is the AI live coach, which reads the call as it happens and puts the counter to an objection on screen while the prospect is still talking.",
    },
  ],
  faq: [
    {
      q: "What is a power dialer in sales?",
      a: "In sales, a power dialer is software that calls the next lead on a rep's list automatically as soon as the previous call ends. It keeps one line per rep, so every answered call reaches a person, and it logs each outcome to the CRM.",
    },
    {
      q: "What is the difference between a power dialer and an auto dialer?",
      a: "\"Auto dialer\" is the umbrella term for any software that dials numbers automatically. A power dialer is one type of auto dialer: it dials one number per available rep. Predictive and parallel dialers are other types that ring more lines than there are free reps.",
    },
    {
      q: "Is a power dialer the same as a predictive dialer?",
      a: "No. A power dialer only calls when a rep is free, one line at a time. A predictive dialer calls ahead of agents based on an estimate of when they will be free, which can leave people who answer with nobody on the line.",
    },
    {
      q: "Are power dialers legal?",
      a: "Yes. The rules cover how and when you call: calling hours in the lead's local time, honouring do-not-call requests, and consent for texts and prerecorded messages. This is general information, not legal advice.",
    },
    {
      q: "What is a call disposition?",
      a: "A disposition is the outcome a rep records when a call ends, such as connected, no answer, left voicemail, not interested or meeting booked. A power dialer asks for it before moving to the next number, which is what makes connect-rate and outcome reporting possible.",
    },
  ],
  related: [],
};
