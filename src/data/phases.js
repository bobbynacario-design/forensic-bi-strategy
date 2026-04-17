// ─── PRIMARY LANE: Phases A–E ─────────────────────────────────────────────────
const phases = [
  {
    id: "A", label: "Phase A", title: "Pre-Exit Validation",
    timeframe: "Now → Month 3", color: "gold", icon: "🔍",
    context: "De-risk the transition before you resign. Runway, legal clearance, niche decision, and your flagship offer locked. Do not move to Phase B without clearing this gate.",
    gate: {
      label: "Gate A — Safe to Exit",
      criteria: [
        { id: "gA1", text: "Runway ≥ 6 months of total monthly burn confirmed in savings" },
        { id: "gA2", text: "AU employment contract IP / non-compete reviewed by a lawyer" },
        { id: "gA3", text: "Primary niche locked: Internal Audit Analytics + Forensic BI Assessment" },
        { id: "gA4", text: "Flagship offer defined: scope, deliverables, and price tiers" },
        { id: "gA5", text: "CPA CPE and CIA CPE fully compliant — no gaps at transition" },
      ]
    },
    tasks: [
      { id: "A1", text: "Build 6+ months of personal living expenses as runway savings", priority: "Must" },
      { id: "A2", text: "Confirm PRC CPA license active — note renewal date", priority: "Must" },
      { id: "A3", text: "Audit CIA CPE hours — remain compliant through transition", priority: "Must" },
      { id: "A4", text: "Have AU employment contract reviewed by a cross-border employment lawyer", priority: "Must" },
      { id: "A5", text: "Document your forensic BI methodology, tools, and templates — this is your core IP", priority: "Must" },
      { id: "A6", text: "Lock niche: Internal Audit Analytics for mid-size listed companies (PH primary, AU secondary)", priority: "Must" },
      { id: "A7", text: "Define flagship offer: Forensic BI Assessment — scope, deliverables, 3 price tiers", priority: "Must" },
      { id: "A8", text: "List every AU contact who knows your quality — potential referrers or remote clients", priority: "Should" },
      { id: "A9", text: "Research PH target clients: PSE-listed Audit Committees and mid-size corporates", priority: "Should" },
      { id: "A10", text: "Begin SEC OPC registration and open business bank account (run in parallel)", priority: "Should" },
    ]
  },
  {
    id: "B", label: "Phase B", title: "Market Entry",
    timeframe: "Month 2–5", color: "blue", icon: "🏗️",
    context: "Build the legal backbone, establish your public presence, and load 20 real prospects into your pipeline. Goal this phase: meetings — not revenue yet.",
    gate: {
      label: "Gate B — Pipeline Is Active",
      criteria: [
        { id: "gB1", text: "OPC registered, BIR COR obtained, LGU business permit secured" },
        { id: "gB2", text: "Capability deck complete — credentials + methodology + 3 anonymized AU cases" },
        { id: "gB3", text: "LinkedIn profile optimized — clear positioning, recent post published" },
        { id: "gB4", text: "20 target prospects identified with name, company, and contact path" },
        { id: "gB5", text: "5 first meetings booked or completed" },
      ]
    },
    tasks: [
      { id: "B1", text: "Register SEC One Person Corporation (OPC)", priority: "Must" },
      { id: "B2", text: "Register with BIR, secure COR, choose correct tax type for professional services", priority: "Must" },
      { id: "B3", text: "Secure Professional Liability / E&O insurance covering forensic engagements", priority: "Must" },
      { id: "B4", text: "Open dedicated business bank account (UnionBank or BDO)", priority: "Must" },
      { id: "B5", text: "Draft engagement letter, NDA, and proposal templates — have a lawyer review", priority: "Must" },
      { id: "B6", text: "Build capability deck: credentials, methodology, 3 anonymized AU case studies", priority: "Must" },
      { id: "B7", text: "Optimize LinkedIn — one-liner, featured post, CPA+CIA+AU positioning clear", priority: "Must" },
      { id: "B8", text: "Build 20-prospect list: Audit Committee members, CFOs, litigation lawyers", priority: "Must" },
      { id: "B9", text: "Send 5 outreach messages to warmest contacts — AU network first", priority: "Must" },
      { id: "B10", text: "Set up professional email and minimal website (yourname-forensics.ph)", priority: "Should" },
      { id: "B11", text: "Join PICPA and IIA Philippines — attend first chapter events", priority: "Should" },
      { id: "B12", text: "License core tech stack: Power BI / Tableau, SQL, secure file sharing", priority: "Should" },
    ]
  },
  {
    id: "C", label: "Phase C", title: "First Revenue",
    timeframe: "Month 4–8", color: "green", icon: "🤝",
    context: "One paid Forensic BI Assessment. One testimonial. One case study. That is the complete goal of Phase C. Expert Witness Track 2 opens after this gate — not before.",
    gate: {
      label: "Gate C — First Revenue Proven",
      criteria: [
        { id: "gC1", text: "1 paid Forensic BI Assessment signed and fully delivered" },
        { id: "gC2", text: "1 written testimonial or reference letter from first client" },
        { id: "gC3", text: "1 anonymized case study created from first engagement" },
        { id: "gC4", text: "Pricing reviewed and adjusted from first-engagement experience" },
        { id: "gC5", text: "3+ active prospects in pipeline" },
      ]
    },
    tasks: [
      { id: "C1", text: "Work your 20-prospect list — push for meetings first, proposals second", priority: "Must" },
      { id: "C2", text: "Offer one reduced-rate Forensic BI Assessment to generate first testimonial + case study", priority: "Must" },
      { id: "C3", text: "Deliver first engagement — follow your documented methodology exactly", priority: "Must" },
      { id: "C4", text: "Collect written testimonial from first client — make it easy for them", priority: "Must" },
      { id: "C5", text: "Write anonymized case study from first engagement for capability deck", priority: "Must" },
      { id: "C6", text: "Reach out to mid-size audit firms for forensic BI subcontracting", priority: "Must" },
      { id: "C7", text: "Write 2 LinkedIn articles on forensic BI topics", priority: "Should" },
      { id: "C8", text: "Join ACFE Philippines chapter — attend events, build practitioner network", priority: "Should" },
      { id: "C9", text: "Tell AU network you are independent — ask for referrals by name", priority: "Should" },
      { id: "C10", text: "Begin CFE exam preparation (target completion by Phase D)", priority: "Should" },
    ]
  },
  {
    id: "D", label: "Phase D", title: "Productization",
    timeframe: "Month 6–12", color: "purple", icon: "📦",
    context: "Turn your first engagement into a repeatable system. Fixed scope. Fixed price. Delivery templates. Convert one client to a retainer. This is where the business becomes stable.",
    gate: {
      label: "Gate D — Repeatable Business",
      criteria: [
        { id: "gD1", text: "Forensic BI Assessment packaged: scope doc + proposal template + delivery checklist" },
        { id: "gD2", text: "First retainer client signed (Internal Audit Analytics monitoring)" },
        { id: "gD3", text: "Reusable BI template library built: fraud detection, anomaly flags, ratio analysis" },
        { id: "gD4", text: "CFE or CrFA certification achieved" },
        { id: "gD5", text: "3+ total clients engaged (not necessarily concurrent)" },
      ]
    },
    tasks: [
      { id: "D1", text: "Productize Forensic BI Assessment: fixed-scope doc, proposal template, delivery checklist", priority: "Must" },
      { id: "D2", text: "Build retainer offer: Internal Audit Analytics monthly monitoring — scope, price, cadence", priority: "Must" },
      { id: "D3", text: "Create reusable BI template library: fraud detection, anomaly flags, ratio analysis", priority: "Must" },
      { id: "D4", text: "Achieve CFE or CrFA certification — completes your credential triangle", priority: "Must" },
      { id: "D5", text: "Convert one assessment client to monthly retainer", priority: "Must" },
      { id: "D6", text: "Set billing and collections process: invoice template, payment terms, follow-up cadence", priority: "Must" },
      { id: "D7", text: "Track monthly KPIs: utilization rate, revenue per engagement, referral rate, deal size", priority: "Should" },
      { id: "D8", text: "Explore remote AU client pipeline — PH cost base is your pricing advantage", priority: "Should" },
    ]
  },
  {
    id: "E", label: "Phase E", title: "Authority Expansion",
    timeframe: "Month 10–18", color: "red", icon: "📈",
    context: "Revenue is proven. A retainer is running. Now build market authority: speaking, premium positioning, Expert Witness expansion — in that order.",
    gate: {
      label: "Gate E — Market Authority",
      criteria: [
        { id: "gE1", text: "First speaking engagement delivered (PICPA, IIA PH, IBP, or legal CPE)" },
        { id: "gE2", text: "Expert Witness Track 2 formally activated (2+ paid engagements complete)" },
        { id: "gE3", text: "Rates reviewed and increased from Phase C launch pricing" },
        { id: "gE4", text: "First AU remote client signed (independent, not employer-referred)" },
        { id: "gE5", text: "First hire or subcontractor in consideration (billing 60%+ capacity)" },
      ]
    },
    tasks: [
      { id: "E1", text: "Pursue speaking at PICPA, IIA PH, or IBP — fastest path to 50+ ideal clients at once", priority: "Must" },
      { id: "E2", text: "Activate Expert Witness Track 2 — study legal terrain, draft expert CV", priority: "Must" },
      { id: "E3", text: "Raise your rates — track record justifies it. Benchmark against Phase C launch pricing.", priority: "Must" },
      { id: "E4", text: "Re-engage AU market with dual-currency offering (PH delivery, AU-grade output)", priority: "Should" },
      { id: "E5", text: "Build referral partnerships: 2 litigation lawyers, 1 audit firm, 1 PICPA contact", priority: "Should" },
      { id: "E6", text: "Consider hiring a junior CPA or data analyst once billing 60%+ capacity", priority: "Later" },
    ]
  },
];
