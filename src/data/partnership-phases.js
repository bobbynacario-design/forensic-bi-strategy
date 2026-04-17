// ─── PARTNERSHIP PHASES ───────────────────────────────────────────────────────
const partnershipPhases = [
  {
    id: "P1", label: "Phase 1", title: "Alignment & Governance",
    timeframe: "Week 1–4", color: "blue", icon: "🤝",
    context: "Before you pitch a single client together, the partnership itself must be structured. Roles, economics, decision rights, and conflict rules must be agreed in writing. Skipping this creates expensive problems later.",
    gate: {
      label: "Gate 1 — Partnership Is Structured",
      criteria: [
        { id: "gP1a", text: "Partner roles defined in writing: who leads client, who leads delivery, who leads admin" },
        { id: "gP1b", text: "Economics agreed: capital contributions, draw schedule, profit split percentage" },
        { id: "gP1c", text: "Decision rights agreed: who can commit the firm to an engagement, what requires joint sign-off" },
        { id: "gP1d", text: "Conflict resolution process agreed: deadlock, buy-out, and exit clause documented" },
        { id: "gP1e", text: "Client ownership rules agreed: what happens to a client if one partner exits" },
      ]
    },
    tasks: [
      { id: "P1a", text: "Define each partner's role: client development, technical delivery, operations/admin", priority: "Must" },
      { id: "P1b", text: "Agree capital contributions and draw schedule — document this before anything else", priority: "Must" },
      { id: "P1c", text: "Agree profit split and review cadence (monthly, quarterly)", priority: "Must" },
      { id: "P1d", text: "Define decision rights: solo vs. joint decisions, veto rules, spending limits", priority: "Must" },
      { id: "P1e", text: "Draft and sign a partnership or co-founders agreement — use a lawyer", priority: "Must" },
      { id: "P1f", text: "Agree conflict resolution and exit clause: buyout formula, notice period, client handover", priority: "Must" },
      { id: "P1g", text: "Document client ownership rules: who retains clients if the partnership dissolves", priority: "Must" },
      { id: "P1h", text: "Set up a shared project workspace (Enclave) and shared document storage", priority: "Should" },
    ]
  },
  {
    id: "P2", label: "Phase 2", title: "Offer & Legal Structure",
    timeframe: "Week 3–8", color: "gold", icon: "📋",
    context: "Build the shared legal and commercial backbone. Your joint offer must be clear before you pitch. Engagement protocols, liability split, and shared credentials must be designed together.",
    gate: {
      label: "Gate 2 — Joint Offer Is Ready",
      criteria: [
        { id: "gP2a", text: "Business entity registered for the partnership (or MOU signed if operating as a consortium)" },
        { id: "gP2b", text: "Joint capability deck complete — both credentials, shared methodology, combined case studies" },
        { id: "gP2c", text: "Engagement and liability split model agreed: who signs the report, who bears the risk" },
        { id: "gP2d", text: "Joint engagement letter and NDA templates reviewed by a lawyer" },
        { id: "gP2e", text: "Twin-expert / legal-forensic handoff protocol defined for litigation engagements" },
      ]
    },
    tasks: [
      { id: "P2a", text: "Register business entity or draft MOU/consortium agreement for joint engagements", priority: "Must" },
      { id: "P2b", text: "Build joint capability deck: both partners' credentials, methodology, combined case studies", priority: "Must" },
      { id: "P2c", text: "Define engagement model: who leads, who supports, how findings are attributed", priority: "Must" },
      { id: "P2d", text: "Agree liability split: who signs expert reports, who holds E&O insurance, shared vs. separate", priority: "Must" },
      { id: "P2e", text: "Draft joint engagement letter, NDA, and proposal templates — have a lawyer review", priority: "Must" },
      { id: "P2f", text: "Design twin-expert / legal-forensic handoff protocol for litigation referrals", priority: "Must" },
      { id: "P2g", text: "Set up shared billing: joint invoice template, collections process, revenue tracking", priority: "Should" },
      { id: "P2h", text: "Run one internal mock pitch together — identify gaps before the first real client", priority: "Should" },
    ]
  },
  {
    id: "P3", label: "Phase 3", title: "Market Activation",
    timeframe: "Month 2–5", color: "green", icon: "🚀",
    context: "Go to market as a team. Your combined network is larger than either alone. Lead with your strongest combined credential and target clients that need both capabilities.",
    gate: {
      label: "Gate 3 — Pipeline Is Active",
      criteria: [
        { id: "gP3a", text: "20 joint target prospects identified with assigned deal owner per partner" },
        { id: "gP3b", text: "5 first meetings booked or completed as a team" },
        { id: "gP3c", text: "LinkedIn positioning updated for both partners — joint offering visible" },
        { id: "gP3d", text: "Referral channel agreed: who is each partner's top 3 referrers" },
        { id: "gP3e", text: "First joint proposal submitted" },
      ]
    },
    tasks: [
      { id: "P3a", text: "Map combined networks — each partner lists top 10 contacts who could refer or engage", priority: "Must" },
      { id: "P3b", text: "Assign deal ownership to each prospect — avoid double-covering the same contact", priority: "Must" },
      { id: "P3c", text: "Update both LinkedIn profiles — joint engagement mentioned, combined offering clear", priority: "Must" },
      { id: "P3d", text: "Send 5 outreach messages each from warmest contacts — lead with strongest shared credential", priority: "Must" },
      { id: "P3e", text: "Submit first joint proposal — debrief together regardless of outcome", priority: "Must" },
      { id: "P3f", text: "Identify each partner's top 3 referrers — agree how you will activate them", priority: "Should" },
      { id: "P3g", text: "Attend at least one industry event together — PICPA, IIA PH, or IBP crossover", priority: "Should" },
    ]
  },
  {
    id: "P4", label: "Phase 4", title: "First Joint Delivery",
    timeframe: "Month 4–8", color: "purple", icon: "⚙️",
    context: "One paid engagement delivered together. Clean handoffs, clear accountability, and a shared post-engagement review. This phase tests whether the partnership actually works under client pressure.",
    gate: {
      label: "Gate 4 — First Joint Engagement Complete",
      criteria: [
        { id: "gP4a", text: "First paid joint engagement signed and fully delivered" },
        { id: "gP4b", text: "Post-engagement debrief completed: what worked, what didn't, what changes" },
        { id: "gP4c", text: "One written testimonial or reference letter from first joint client" },
        { id: "gP4d", text: "One anonymized joint case study created" },
        { id: "gP4e", text: "Roles and handoff process updated based on real engagement experience" },
      ]
    },
    tasks: [
      { id: "P4a", text: "Deliver first joint engagement — follow the documented protocol from Phase 2 exactly", priority: "Must" },
      { id: "P4b", text: "Hold a mid-engagement check-in between partners — flag any handoff or scope issues early", priority: "Must" },
      { id: "P4c", text: "Collect written testimonial from first client — make it easy for them", priority: "Must" },
      { id: "P4d", text: "Hold post-engagement debrief: delivery split, what each partner contributed, what to improve", priority: "Must" },
      { id: "P4e", text: "Write anonymized joint case study for the capability deck", priority: "Must" },
      { id: "P4f", text: "Invoice promptly — test your joint billing process in a real engagement", priority: "Must" },
      { id: "P4g", text: "Update partnership agreement if any role or economics issue surfaced during delivery", priority: "Should" },
    ]
  },
  {
    id: "P5", label: "Phase 5", title: "Repeatability & Growth",
    timeframe: "Month 7–14", color: "red", icon: "📈",
    context: "Turn the first engagement into a repeatable system. Standardize delivery. Build recurring revenue. Decide whether to deepen the partnership or define each partner's independent lane.",
    gate: {
      label: "Gate 5 — Repeatable Partnership",
      criteria: [
        { id: "gP5a", text: "Joint engagement process documented: proposal template, delivery checklist, handoff protocol" },
        { id: "gP5b", text: "First retainer or repeat client signed" },
        { id: "gP5c", text: "Rates reviewed and adjusted from first-engagement pricing" },
        { id: "gP5d", text: "Partnership economics reviewed: are draws and split still working?" },
        { id: "gP5e", text: "Growth path agreed: deepen together, specialize separately, or add a third partner" },
      ]
    },
    tasks: [
      { id: "P5a", text: "Productize the joint offering: fixed scope, fixed price, delivery checklist", priority: "Must" },
      { id: "P5b", text: "Build a retainer offer for ongoing clients — agree revenue split for recurring work", priority: "Must" },
      { id: "P5c", text: "Review and raise rates — first engagement track record justifies it", priority: "Must" },
      { id: "P5d", text: "Conduct full partnership economics review: draws, split, overhead — adjust if needed", priority: "Must" },
      { id: "P5e", text: "Agree the growth path: expand together, specialize by lane, or grow the team", priority: "Must" },
      { id: "P5f", text: "Build referral partnerships: litigation lawyers, audit firms, PICPA contacts", priority: "Should" },
      { id: "P5g", text: "Consider a joint speaking engagement — combined credentials are a stronger draw than solo", priority: "Should" },
    ]
  },
];
