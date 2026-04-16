const { useState, useEffect } = React;

// ─── PALETTE ──────────────────────────────────────────────────────────────────
const DARK_C = {
  bg: "#0D0F14", surface: "#13161f", border: "#2a2f3e", borderSub: "#1e2330",
  text: "#E8E0D0", textMid: "#B0AEAD", textDim: "#8a8fa8", textMute: "#6a7080",
  gold: "#C8A96E", blue: "#7EB8C9", green: "#7EC9A2", purple: "#A98FCE",
  orange: "#E8A87C", red: "#E87F6B",
};
const LIGHT_C = {
  bg: "#F5F1EC", surface: "#FFFFFF", border: "#DDD8D0", borderSub: "#EDE9E3",
  text: "#1A1614", textMid: "#4A4240", textDim: "#6A6560", textMute: "#9A9590",
  gold: "#C8A96E", blue: "#7EB8C9", green: "#7EC9A2", purple: "#A98FCE",
  orange: "#E8A87C", red: "#E87F6B",
};
const C = DARK_C; // module-level alias — used by static data arrays (phases, etc.)
const SF = { fontFamily: "'DM Sans', system-ui, sans-serif" };

// ─── PRIMARY LANE: Phases A–E ─────────────────────────────────────────────────
const phases = [
  {
    id: "A", label: "Phase A", title: "Pre-Exit Validation",
    timeframe: "Now → Month 3", color: C.gold, icon: "🔍",
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
    timeframe: "Month 2–5", color: C.blue, icon: "🏗️",
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
    timeframe: "Month 4–8", color: C.green, icon: "🤝",
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
    timeframe: "Month 6–12", color: C.purple, icon: "📦",
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
    timeframe: "Month 10–18", color: C.red, icon: "📈",
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

// ─── EXPERT WITNESS — TRACK 2 ─────────────────────────────────────────────────
const expertWitnessPhases = [
  { id: "ew1", label: "EW Phase 1", title: "Know the Legal Terrain", timeframe: "Now → Month 4", color: "#E8A87C", icon: "📜", context: "Before you can testify, you must understand the procedural rules cold. Lawyers will immediately sense if you don't.", tasks: [{ id: "ew1a", text: "Study the 2019 Revised Rules on Evidence — focus on Rule 130 Sections 49–52 (Expert Witness)" }, { id: "ew1b", text: "Study Rule 132 on presentation of evidence and examination of witnesses" }, { id: "ew1c", text: "Read at least 5 PH Supreme Court decisions involving CPA expert witness testimony" }, { id: "ew1d", text: "Understand the voir dire process — how a judge qualifies an expert witness in court" }, { id: "ew1e", text: "Learn what 'basis of opinion' means legally — courts can reject an expert who can't defend their methodology" }] },
  { id: "ew2", label: "EW Phase 2", title: "Build Your Expert Profile", timeframe: "Month 2–5", color: "#D4A5C9", icon: "🪪", context: "An expert witness is hired based on their CV and reputation before they're ever called to testify.", tasks: [{ id: "ew2a", text: "Draft a formal Expert Witness CV — credentials, methodology expertise, publications, prior engagements" }, { id: "ew2b", text: "Secure E&O / Professional Liability insurance with explicit expert witness testimony coverage" }, { id: "ew2c", text: "Begin CFE (Certified Fraud Examiner) exam preparation — ACFE PH chapter offers study resources" }, { id: "ew2d", text: "Consider CrFA® (Certified Forensic Accountant) — PH-recognized, faster to obtain" }, { id: "ew2e", text: "List your specific technical competencies: financial statement fraud, data anomaly detection, internal control gaps, transaction tracing" }, { id: "ew2f", text: "Prepare 3 anonymized case summaries from AU work that demonstrate forensic BI capability" }] },
  { id: "ew3", label: "EW Phase 3", title: "Open the Litigation Door", timeframe: "Month 4–9", color: "#87C4C0", icon: "⚖️", context: "Litigation lawyers are your gatekeepers to the witness stand. Build relationships before you pitch the service.", tasks: [{ id: "ew3a", text: "Attend IBP chapter events as a guest — accounting/fraud CPE crossovers are common" }, { id: "ew3b", text: "Offer to co-present with a litigation lawyer on 'Forensic BI in Financial Litigation'" }, { id: "ew3c", text: "Cold-introduce yourself to 5–10 litigation lawyers via LinkedIn as a forensic CPA" }, { id: "ew3d", text: "Offer first 1–2 engagements as litigation consultant (behind the scenes) — analytics support, no testimony yet" }, { id: "ew3e", text: "Accept your first testimonial engagement at a reduced fee for full process exposure" }, { id: "ew3f", text: "After first testimony: debrief with the lawyer — what worked, what was challenged" }] },
  { id: "ew4", label: "EW Phase 4", title: "Command the Stand", timeframe: "Month 9–18", color: "#A8C87E", icon: "🏛️", context: "Repeat engagements, growing reputation, and premium pricing. Each testimony builds the next.", tasks: [{ id: "ew4a", text: "Build a structured Expert Witness Report template (opinion, methodology, findings, limitations)" }, { id: "ew4b", text: "Develop standard BI visualization formats optimized for court presentation" }, { id: "ew4c", text: "Collect written feedback or referral letters from lawyers after each engagement" }, { id: "ew4d", text: "Publish article on 'What to look for in a forensic CPA expert witness'" }, { id: "ew4e", text: "Set your expert witness rate independently — testimony commands 2–3x regular advisory rates" }, { id: "ew4f", text: "Track: cases supported, testimony given, successful outcomes — this is your expert witness record" }] },
];

// ─── PIPELINE ─────────────────────────────────────────────────────────────────
const pipelineStageDefs = [
  { id: "prospect", label: "Prospects", color: C.blue, icon: "🎯", desc: "Identified, not yet contacted" },
  { id: "outreach", label: "Outreach", color: C.gold, icon: "📤", desc: "First message sent" },
  { id: "meeting", label: "Meeting", color: C.purple, icon: "🤝", desc: "Meeting booked or held" },
  { id: "proposal", label: "Proposal", color: C.orange, icon: "📄", desc: "Proposal submitted" },
  { id: "won", label: "Won", color: C.green, icon: "✅", desc: "Engagement signed" },
  { id: "retainer", label: "Retainer", color: "#A8C87E", icon: "🔄", desc: "Recurring active" },
];

// ─── WEEKLY QUESTIONS ─────────────────────────────────────────────────────────
const decisionQuestions = [
  "What is the ONE offer I am actively pushing this week — and to whom specifically?",
  "Name 5 people I will contact before this week ends.",
  "What proposal am I trying to close this week, and what is blocking it?",
  "What is the single biggest blocker I will remove in the next 7 days?",
];
const reflectionQuestions = [
  "What is the ONE task I've been avoiding — and what's really stopping me?",
  "Did I move at least one business development action forward this week?",
  "What did I learn this week that I didn't know before?",
  "Who did I connect with — and who should I connect with next week?",
  "Am I staying on my financial runway plan? Any adjustments needed?",
  "What would a recognized forensic expert in PH do next week that I am not yet doing?",
];
const teamQuestions = [
  "What did each partner or collaborator commit to last week — and what was actually delivered?",
  "What is each person's top priority this week?",
  "What decisions need to be made together this week, and who holds the final call?",
  "What is currently blocked, and who specifically can unblock it?",
];

// ─── TRAINING ─────────────────────────────────────────────────────────────────
const trainingResources = [
  { category: "Priority Credentials", color: C.gold, icon: "🏆", items: [
    { name: "CFE — Certified Fraud Examiner", org: "ACFE", type: "Exam + Membership", urgency: "HIGH", note: "Gold standard for forensic work globally. Completes your CPA + CIA + CFE triangle. Earns 32% income premium per ACFE data.", url: "https://www.acfe.com/cfe-credential" },
    { name: "CrFA® — Certified Forensic Accountant", org: "CrFA Philippines / ICFA", type: "Certification Program", urgency: "HIGH", note: "PH-based, court-recognized credential. Faster to obtain than CFE. Covers litigation support, fraud investigation, evidence handling.", url: "https://crfaphilippines.org" },
    { name: "CFF — Certified in Financial Forensics", org: "AICPA", type: "Specialty Credential", urgency: "MEDIUM", note: "For CPAs specifically. Signals courtroom-ready forensic expertise. Internationally recognized — useful if you retain AU clients.", url: "https://www.aicpa-cima.com/certifications/certified-in-financial-forensics-cff" },
  ]},
  { category: "Expert Witness & Litigation Support", color: C.orange, icon: "⚖️", items: [
    { name: "PH Rules on Evidence — 2019 Revised Rules", org: "Supreme Court of the Philippines", type: "Free Self-Study", urgency: "HIGH", note: "Read Rule 130 Secs 49–52 (expert witnesses) and Rule 132 (examination). Non-negotiable before your first engagement.", url: "https://sc.judiciary.gov.ph/11542/" },
    { name: "The CFE as an Expert Witness", org: "ACFE Online", type: "Online Course", urgency: "HIGH", note: "Covers legal standards for expert witnesses, how to give expert testimony, voir dire preparation, and how to compose proper expert reports.", url: "https://www.acfe.com/training-events-and-products/all-products/product-detail-page?s=The-CFE-as-an-Expert-Witness" },
    { name: "ACFE All Online Training Options", org: "ACFE", type: "Online Course Hub", urgency: "MEDIUM", note: "Browse the full library of ACFE self-study, webinars, and certificate programs.", url: "https://www.acfe.com/training-events-and-products/online-training-options" },
  ]},
  { category: "Forensic BI & Data Skills", color: C.blue, icon: "📊", items: [
    { name: "Fraud Analytics Certificate Program", org: "ACFE Online", type: "Online Certificate", urgency: "HIGH", note: "Three-course program covering data analytics for fraud detection. Covers anomaly detection, Benford's Law, and transaction tracing.", url: "https://www.acfe.com/training-events-and-products/all-products/product-detail-page?s=fraud-analytics-certificate-program" },
    { name: "Financial Analysis in Power BI", org: "DataCamp", type: "Self-Paced Online", urgency: "HIGH", note: "Teaches financial terms, BI dashboards, AI visualizations, scenario analysis — directly applicable to forensic client reporting.", url: "https://www.datacamp.com/courses/financial-analysis-in-power-bi" },
    { name: "Microsoft Power BI Data Analyst", org: "Coursera / Microsoft", type: "Self-Paced Online", urgency: "MEDIUM", note: "Official Microsoft-offered Power BI program. Prepares you for PL-300 certification. Covers data modeling, DAX, and dashboard design.", url: "https://www.coursera.org/professional-certificates/microsoft-power-bi-data-analyst" },
    { name: "Fraud Detection in Python", org: "DataCamp", type: "Self-Paced Online", urgency: "MEDIUM", note: "Covers supervised and unsupervised ML for fraud detection — the technical backbone of advanced forensic BI work.", url: "https://www.datacamp.com/courses/fraud-detection-in-python" },
  ]},
  { category: "PH Professional Networks", color: C.green, icon: "🤝", items: [
    { name: "ACFE Philippines Chapter", org: "ACFE", type: "Professional Membership", urgency: "HIGH", note: "Attend local events. This is where forensic practitioners, lawyers, and regulators intersect in PH.", url: "https://www.acfe.com/about/chapters/philippines" },
    { name: "IIA Philippines", org: "IIA PH", type: "Professional Membership", urgency: "HIGH", note: "Your CIA credential makes you a natural here. Speak at events — fastest credibility builder in the internal audit space.", url: "https://www.iia.org.ph" },
    { name: "PICPA", org: "PICPA", type: "Professional Membership", urgency: "MEDIUM", note: "CFO and Audit Committee networks. Chapters in major cities hold regular events and CPE sessions.", url: "https://www.picpa.com.ph" },
  ]},
];

// ─── MINDSET ──────────────────────────────────────────────────────────────────
const mindsetPillars = [
  { icon: "🧠", title: "Adversarial Resilience", subtitle: "Train for cross-examination before you face it", color: C.orange, practices: ["Practice 'stress inoculation': regularly expose yourself to being challenged on your work. Ask colleagues to poke holes in your analysis.", "Record yourself explaining your findings out loud — then critique your own clarity, pace, and composure.", "Read transcripts of CPA expert cross-examinations (available in published SC decisions) — study how experts buckle and how they hold.", "Join a Toastmasters chapter or debate club — adversarial Q&A is a trainable skill, not a personality trait.", "Book: 'Effective Expert Witnessing' by Jack Matson — covers psychological preparation for hostile questioning."] },
  { icon: "🪨", title: "Stoic Composure", subtitle: "The stand requires equanimity, not emotion", color: C.purple, practices: ["Daily Stoic practice: distinguish what you control (your methodology, preparation, honesty) from what you don't (the judge's ruling, opposing counsel's tactics).", "Book: 'Meditations' by Marcus Aurelius — reframe adversarial pressure as the arena where character is proven.", "Pre-testimony ritual: 5 minutes of focused breathing + mental rehearsal of your opening qualifications statement.", "Reframe cross-examination: opposing counsel is testing your methodology, not attacking you personally.", "After each high-pressure moment: debrief with yourself. What rattled you and why?"] },
  { icon: "🔍", title: "Intellectual Precision", subtitle: "Expert witnesses are judged on exactness, not confidence", color: C.blue, practices: ["Write one-paragraph technical summaries for a non-expert audience daily — forces precise language.", "Practice saying 'I don't know' and 'that is outside my expertise' without anxiety — courts respect honesty.", "Study your AU forensic BI findings critically — where were you relying on assumption vs. data?", "Book: 'Thinking, Fast and Slow' by Kahneman — sharpens awareness of cognitive biases that can contaminate expert opinion.", "Maintain a 'limitations log' in each engagement: what can the data prove, and what can't it prove?"] },
  { icon: "🪞", title: "Identity Shift", subtitle: "From 'employed analyst' to 'independent credentialed expert'", color: C.green, practices: ["Rewrite your professional self-narrative: you are activating a rare credential set, not leaving a job.", "Book: 'The War of Art' by Steven Pressfield — on turning professional and overcoming resistance.", "Weekly journaling prompt: 'What would a recognized forensic expert in PH do this week that I am not yet doing?'", "Find one mentor or peer who has already gone independent — mirror their posture, not just their tactics.", "Celebrate credentials loudly on LinkedIn — CPA + CIA is not bragging, it's professional context clients need."] },
  { icon: "🏋️", title: "High-Stakes Communication", subtitle: "Your voice is a professional instrument — train it", color: C.red, practices: ["Study the difference between expert report writing and consulting report writing — courts require specific structure.", "Practice delivering your expert opinion in exactly 60 seconds — clarity under time pressure is a courtroom skill.", "Video-record yourself giving testimony in a mock scenario — watch it back critically.", "Book: 'Talk Like TED' by Carmine Gallo — high-stakes communication for courtrooms and boardrooms.", "Eliminate: 'basically,' 'I think,' 'sort of,' 'maybe' — replace with precise quantified statements."] },
];

// ─── AI WORKFLOWS ─────────────────────────────────────────────────────────────
const aiWorkflows = [
  { id: "aw1", icon: "🔍", color: C.gold, title: "Forensic Data Analysis", subtitle: "AI as your co-analyst on live engagements", edge: "Replaces weeks of manual query writing. You focus on interpretation and judgment — AI handles the computation.",
    usecases: [
      { label: "Benford's Law Test", when: "Early in any engagement to flag suspicious transaction distributions", prompt: `You are a forensic data analyst. I'm uploading a dataset of [journal entries / transactions / payments].\nRun a Benford's Law analysis:\n1. Calculate the first-digit frequency distribution\n2. Compare against expected Benford frequencies\n3. Identify which digits show statistically significant deviations (use chi-square test)\n4. Flag the specific transactions behind the anomalous digits for further review\n5. Present findings in a table suitable for a forensic report` },
      { label: "Anomaly Detection", when: "To surface unusual transactions that don't fit normal patterns", prompt: `Act as a forensic accountant reviewing this dataset for internal control weaknesses.\nIdentify:\n1. Transactions that fall outside 2-3 standard deviations from the mean\n2. Round-number transactions (ending in 000, 500) that may indicate estimation or fabrication\n3. Transactions posted outside business hours or on weekends/holidays\n4. Duplicate or near-duplicate entries (same amount, same vendor, close dates)\n5. Transactions just below approval thresholds (e.g., just under ₱50,000 or ₱100,000)\nFlag each with a risk rating (High/Medium/Low) and explain the forensic significance.` },
      { label: "Vendor / Related Party", when: "When fraud risk involves procurement or vendor payments", prompt: `I'm conducting a forensic review of vendor payments. From this dataset:\n1. Identify vendors with addresses matching employee addresses or PO boxes\n2. Flag vendors with no clear business registration or inconsistent payment terms\n3. Identify any vendor who received payments that increased sharply in a specific period\n4. Surface any vendor pairs that consistently appear on the same purchase orders\n5. Check for vendors whose names are similar to legitimate vendors (typosquatting fraud)\nPresent as a prioritized risk register with recommended next steps for each finding.` },
      { label: "Journal Entry Testing", when: "For internal audit or financial statement fraud investigations", prompt: `Perform a forensic journal entry analysis on this GL data:\n1. Identify entries posted by unusual users (IT staff, terminated employees, system accounts)\n2. Flag entries with no supporting description or vague narratives (e.g., "adj", "misc", "correction")\n3. Identify entries posted on last day of month, quarter, or year-end (earnings management risk)\n4. Surface debits to expense accounts offset by credits to revenue (potential concealment)\n5. Flag entries that reverse in the subsequent period without clear justification\nFormat findings as a risk-ranked table with the entry details and forensic interpretation.` },
    ]
  },
  { id: "aw2", icon: "📄", color: C.blue, title: "Forensic Report Writing", subtitle: "AI as your co-author — you supply the findings, AI structures the language", edge: "Cuts report drafting time by 60–70%. You review, refine, and sign — AI does the heavy lifting on structure.",
    usecases: [
      { label: "Executive Summary", when: "Final deliverable for Audit Committee or CFO", prompt: `You are a senior forensic accountant writing for a board audience. Based on these findings:\n[paste your bullet findings here]\n\nWrite a 1-page Executive Summary that:\n1. Opens with a clear statement of scope and objective\n2. Summarizes key findings in plain language — what was found and why it matters\n3. Quantifies the financial impact or risk exposure where possible\n4. States 3–5 prioritized recommendations\n5. Closes with a statement on limitations of the analysis\nTone: professional, direct, no hedging. The board needs to act — make the findings impossible to ignore.` },
      { label: "Expert Witness Report", when: "Formal written opinion for court submission", prompt: `Draft a forensic expert opinion report section based on the following findings:\n[paste your technical findings here]\n\nStructure it as:\n1. Statement of Qualifications (placeholder — I will insert my CPA-CIA credentials)\n2. Scope of Engagement — what I was asked to examine and by whom\n3. Methodology — data sources reviewed, analytical techniques applied\n4. Findings — presented as numbered, factual statements with supporting data references\n5. Opinion — my professional conclusion stated clearly and defensibly\n6. Limitations — what this analysis cannot conclude and why\n7. Declaration of Independence\n\nUse precise, court-appropriate language. Avoid advocacy. Every opinion must be grounded in the data.` },
      { label: "Red Flag Summary for Lawyers", when: "Litigation support — helping counsel understand the financial evidence", prompt: `I need to translate these forensic findings into language a litigation lawyer can use:\n[paste technical findings]\n\nRewrite as:\n1. A plain-language Red Flag Summary (what happened, in simple terms)\n2. The financial evidence that supports each red flag (specific transactions, amounts, dates)\n3. What each finding might indicate legally (fraud, breach of fiduciary duty, misrepresentation)\n4. What additional documentation the lawyer should request to strengthen the case\n5. Potential weaknesses in the evidence that opposing counsel may exploit\n\nKeep it factual and precise. Flag where my forensic opinion ends and legal interpretation begins.` },
      { label: "Internal Audit Finding", when: "Retainer clients — monthly or quarterly audit analytics reports", prompt: `Write a formal internal audit finding based on the following observation:\n[describe what you found]\n\nUse the CRSA format:\n- Condition: What is the current situation / what was observed?\n- Risk: What is the risk or potential impact of this condition?\n- Standard: What policy, control, or best practice is not being met?\n- Action Plan: Recommended corrective action with responsible owner and target date\n\nTone: constructive, not punitive. The goal is improvement, not blame. Write for a CFO audience.` },
    ]
  },
  { id: "aw3", icon: "⚖️", color: C.orange, title: "Expert Witness Prep", subtitle: "AI as your moot court partner — stress-test your opinion before you take the stand", edge: "The closest thing to a free rehearsal with a hostile lawyer. Use this before every testimony.",
    usecases: [
      { label: "Cross-Examination Stress Test", when: "Before any expert witness testimony — mandatory preparation step", prompt: `You are an aggressive opposing counsel in a Philippine court. I am a CPA-CIA forensic expert witness who has submitted the following opinion:\n[paste your expert opinion / key findings]\n\nYour job is to challenge my opinion as hard as possible by:\n1. Questioning my methodology — are there alternative explanations for my findings?\n2. Attacking my data sources — are they complete, reliable, and properly authenticated?\n3. Challenging my qualifications for this specific type of analysis\n4. Pointing out any assumptions I made that are not fully supported by the data\n5. Proposing alternative interpretations of the same evidence\n\nBe relentless. Do not go easy. I need to know every weak point before I face real opposing counsel.` },
      { label: "Voir Dire Preparation", when: "Before your first (and every) expert witness qualification", prompt: `Simulate a voir dire examination where you are the judge qualifying me as an expert witness in a Philippine court.\n\nMy credentials: CPA (PRC licensed), CIA (IIA certified), [X] years forensic BI experience including AU market.\nThe case involves: [describe the financial dispute briefly]\n\nAsk me the questions a judge would ask to determine if I am qualified to give expert opinion on this matter. After I answer each one, give me feedback on:\n- Whether my answer would satisfy a Philippine court\n- What I should add or remove\n- Whether I sound confident and credible or uncertain` },
      { label: "Opinion Clarity Check", when: "Before finalizing any written expert report", prompt: `Review my expert opinion below and tell me:\n[paste opinion section]\n\n1. Is every conclusion clearly grounded in the data I cited? Flag any opinion that appears unsupported.\n2. Are there any statements that sound like legal conclusions rather than financial/forensic opinions?\n3. Is the language precise enough to survive cross-examination, or are there vague terms opposing counsel could exploit?\n4. Would a non-accountant judge understand the key findings from this alone?\n5. What is the single weakest sentence in this opinion and how should I rewrite it?` },
    ]
  },
  { id: "aw4", icon: "💼", color: C.purple, title: "Business Development", subtitle: "AI as your pitch writer, proposal drafter, and LinkedIn ghostwriter", edge: "You have the expertise — AI helps you communicate it at the level your clients expect.",
    usecases: [
      { label: "Engagement Proposal", when: "Every time a prospective client asks 'what does this cost and what will you do?'", prompt: `Write a professional forensic BI engagement proposal for the following client and situation:\nClient type: [law firm / listed company / bank / insurer]\nSituation: [describe what they need]\nMy proposed scope: [what I plan to do]\nTimeline: [estimated weeks]\nFee: [amount in PHP]\n\nStructure the proposal as:\n1. Background & Objective\n2. Scope of Work (what is and is not included)\n3. Methodology (high level — enough to show rigor without giving away the approach)\n4. Deliverables\n5. Timeline & Milestones\n6. Investment (fee, payment terms, retainer if applicable)\n7. Why Me (3 sentences on CPA-CIA credentials + AU forensic BI experience)\n\nTone: confident, specific, premium. This should feel written for them.` },
      { label: "LinkedIn Post", when: "Weekly or bi-weekly — building your public profile in the PH forensic space", prompt: `Write a LinkedIn post for a CPA-CIA forensic BI consultant in the Philippines on the following topic:\n[topic — e.g., 'how Benford's Law catches financial fraud' / 'why most PH audit reports miss the data story']\n\nRequirements:\n- Opens with a hook that stops the scroll (a surprising fact, a question, or a bold statement)\n- Written in first person, professional but not stiff\n- Explains one concrete concept clearly — no jargon without explanation\n- Ends with a call to reflection or a question that invites comments\n- 200–280 words. No bullet points — write in short paragraphs.\n- Subtly positions me as the expert without being promotional` },
      { label: "Cold Outreach Message", when: "First contact with a litigation lawyer or CFO via LinkedIn or email", prompt: `Write a cold outreach message to a [litigation lawyer / CFO / Audit Committee chair] in the Philippines.\nContext: I am a CPA-CIA forensic BI consultant recently independent. I am introducing myself as available for [expert witness work / forensic BI assessments / internal audit analytics].\nI found them through: [LinkedIn / PICPA event / IBP seminar / referral from X]\n\nRequirements:\n- 4–5 sentences maximum. Respect their time.\n- Lead with relevance — why am I reaching out to them specifically\n- One sentence on my credentials (CPA, CIA, AU forensic experience)\n- One clear, low-friction call to action (15-minute call, not a full pitch)\n- Peer-to-peer professional tone — not desperate or generic` },
    ]
  },
  { id: "aw5", icon: "🧠", color: C.green, title: "Continuous Learning", subtitle: "Replace generic courses with targeted, case-specific AI-guided learning", edge: "Learn exactly what you need, when you need it, applied to your actual work.",
    usecases: [
      { label: "Deep Dive Any Topic", when: "When you encounter something in an engagement you haven't dealt with before", prompt: `Teach me everything a CPA-CIA forensic BI consultant needs to know about [topic — e.g., transfer pricing manipulation / related party fraud / revenue recognition schemes].\n\nStructure it as:\n1. What it is and how it works (plain language)\n2. How it typically appears in financial data — what are the data signatures?\n3. The most effective analytical tests to detect it\n4. How to document findings for a forensic report or court opinion\n5. Common defenses the opposing party will raise and how to counter them\n6. 2–3 real-world case examples that illustrate the scheme` },
      { label: "CFE / CrFA Exam Prep", when: "While studying for your next credential", prompt: `I am studying for the [CFE / CrFA] exam. Quiz me on [topic — e.g., fraud schemes in financial statements / asset misappropriation / corruption schemes].\n\nFor each question:\n1. Ask me the question first and wait for my answer\n2. Tell me if I'm right or wrong and why\n3. If I'm wrong, explain the correct answer with an example\n4. Connect it to a real-world scenario a forensic accountant in PH would face\n5. After 5 questions, give me a score and tell me which concepts I need to review` },
      { label: "Rules of Evidence Study", when: "Preparing for your first expert witness engagement", prompt: `I am a CPA-CIA forensic accountant preparing to give expert witness testimony in Philippine courts for the first time.\n\nTeach me the 2019 Revised Rules on Evidence as it applies to expert witnesses:\n1. What does Rule 130 Sections 49–52 actually say in plain terms?\n2. What is voir dire and exactly how does it unfold in a PH court?\n3. What makes an expert opinion admissible vs. inadmissible?\n4. What is the 'basis of opinion' requirement and how do I satisfy it?\n5. How should I behave when opposing counsel objects to my testimony?\n\nAfter explaining each, ask me a question to check my understanding.` },
    ]
  },
];

// ─── PRICING ──────────────────────────────────────────────────────────────────
const pricingServices = [
  { title: "Forensic BI Assessment", icon: "🔍", color: C.gold, desc: "Fixed-scope, fixed-price engagement. Your flagship product. Deliverable: forensic BI report with findings, visualizations, and recommendations.", tiers: [
    { tier: "Starter", scope: "Single business unit, 1–2 data sources, 2–3 week delivery", php: "₱120,000 – ₱180,000", usd: "USD 2,000 – 3,000", note: "Entry-level for SMEs or first-time clients" },
    { tier: "Standard", scope: "Multi-unit, 3–5 data sources, 4–6 week delivery", php: "₱250,000 – ₱400,000", usd: "USD 4,500 – 7,000", note: "Listed companies, banks, mid-size corporates" },
    { tier: "Enterprise", scope: "Complex, multi-source, extended timeline, board presentation", php: "₱500,000+", usd: "USD 9,000+", note: "AU clients, large listed companies, regulatory matters" },
  ]},
  { title: "Expert Witness / Litigation Support", icon: "⚖️", color: C.orange, desc: "Charged as a combination of preparation time, report writing, and testimony. Your CPA credential justifies 2–3x your advisory day rate.", tiers: [
    { tier: "Litigation Consultant", scope: "Behind the scenes — analytics support, no testimony", php: "₱8,000 – ₱15,000/day", usd: "USD 150 – 250/day", note: "Starting engagement type. Build the relationship." },
    { tier: "Expert Report Only", scope: "Written forensic opinion for submission, no testimony", php: "₱80,000 – ₱150,000 flat", usd: "USD 1,500 – 2,500 flat", note: "Fixed scope. Cover all your research and drafting time." },
    { tier: "Full Expert Witness", scope: "Report + voir dire + direct + cross-examination", php: "₱25,000 – ₱45,000/day", usd: "USD 450 – 800/day", note: "Premium rate. CPA credential + testimony risk justifies this." },
  ]},
  { title: "Internal Audit Analytics Retainer", icon: "🔄", color: C.green, desc: "Monthly recurring engagement. Continuous anomaly monitoring, dashboard maintenance, quarterly reporting. Your most stable revenue stream.", tiers: [
    { tier: "Monitoring Lite", scope: "Monthly anomaly scan, 1–2 dashboards, summary report", php: "₱30,000 – ₱50,000/mo", usd: "USD 550 – 900/mo", note: "SMEs and growing companies. Low-touch, high-margin." },
    { tier: "Full Retainer", scope: "Weekly monitoring, full dashboard suite, monthly board report", php: "₱75,000 – ₱120,000/mo", usd: "USD 1,300 – 2,100/mo", note: "Listed companies, banks. Anchor client model." },
    { tier: "AU Remote Retainer", scope: "Full service delivered remotely for AU-based clients", php: "N/A", usd: "USD 2,500 – 4,500/mo", note: "Price in AU market terms. Your cost base = your margin advantage." },
  ]},
];

// ─── CLIENTS ──────────────────────────────────────────────────────────────────
const clients = [
  { name: "PSE-Listed Companies", icon: "📊", why: "Required independent Audit Committees; forensic BI assessments of internal controls are a natural procurement", credential: "CPA + CIA" },
  { name: "Litigation Law Firms", icon: "⚖️", why: "Need CPA-credentialed expert witnesses for financial cases; scarce supply of BI-capable forensic CPAs in PH", credential: "CPA" },
  { name: "Banks & Quasi-Banks", icon: "🏦", why: "BSP-regulated; ongoing control and fraud analytics needs; CIA credential signals governance fluency", credential: "CIA + CPA" },
  { name: "Insurance Companies", icon: "🛡️", why: "Claims fraud analytics using BI is underserved; CPA gives credibility for large-claim investigations", credential: "CPA" },
  { name: "AU Clients (Remote)", icon: "🌏", why: "Your existing network + AU market experience; PH cost base gives you a competitive price advantage", credential: "AU Experience" },
  { name: "Mid-size Audit Firms", icon: "🔬", why: "Subcontracting for forensic BI capability they don't have in-house; faster pipeline than direct clients", credential: "CPA + CIA" },
];

// ─── RISKS ────────────────────────────────────────────────────────────────────
const risks = [
  { icon: "⚖️", label: "Slow deal cycles", note: "Forensic and board-level engagements take 2–4 months to close. Start pipeline activity before you resign." },
  { icon: "💰", label: "Underpricing your credentials", note: "CPA + CIA + forensic BI is rare in PH. Don't anchor to local 'data analyst' rates. Price on AU-comparable value." },
  { icon: "📄", label: "AU contract IP risk", note: "Review your employment contract before taking any AU-adjacent PH work. Get a cross-border employment lawyer." },
  { icon: "🔗", label: "Single client dependency", note: "Aim for 3+ active clients within year 1. One retainer client feels safe — until it isn't." },
  { icon: "🪪", label: "License compliance gap", note: "CPA CPE and CIA CPE have separate requirements. Track both during the transition — a lapsed credential is costly." },
  { icon: "🏛️", label: "Expert witness liability", note: "Litigation support carries professional liability risk. Ensure E&O insurance covers expert witness testimony before accepting." },
];

// ─── MILESTONES ───────────────────────────────────────────────────────────────
const milestonesList = [
  { id: "m1", icon: "🔑", title: "Resigned / Handed In Notice", desc: "The moment you committed to your own path." },
  { id: "m2", icon: "🏢", title: "Business Registered (OPC/DTI)", desc: "Your practice is now a legal entity." },
  { id: "m3", icon: "🌐", title: "Website & Professional Email Live", desc: "You exist in the market." },
  { id: "m4", icon: "🤝", title: "First Client Meeting", desc: "The pipeline has officially begun." },
  { id: "m5", icon: "💼", title: "First Paid Engagement Signed", desc: "You are now a practicing independent consultant." },
  { id: "m6", icon: "⭐", title: "First Written Testimonial", desc: "Social proof is now in your hands." },
  { id: "m7", icon: "🔄", title: "First Retainer Client Signed", desc: "Recurring revenue has begun." },
  { id: "m8", icon: "⚖️", title: "First Expert Witness Inquiry", desc: "A lawyer found you and wants to talk." },
  { id: "m9", icon: "🏛️", title: "First Expert Witness Testimony", desc: "You took the stand. The hardest first is done." },
  { id: "m10", icon: "📜", title: "CFE / CrFA Certification Achieved", desc: "Your credential triangle is complete." },
  { id: "m11", icon: "🎤", title: "First Speaking Engagement", desc: "The market now knows your name." },
  { id: "m12", icon: "🌏", title: "First AU Remote Client (Independent)", desc: "International reach, PH base. The full vision realized." },
];

const urgencyColors = { HIGH: C.red, MEDIUM: C.gold };

// ─── ENCLAVE INTEGRATION ──────────────────────────────────────────────────────
const ENCLAVE_URL = "https://bobbynacario-design.github.io/enclave";
// Pass 1 link shape stored in localStorage key "enclaveLink"
// { projectId: string|null, status: "not_linked"|"checking"|"linked"|"broken", lastChecked: number|null }

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
function Strategy() {
  // ── Core State ───────────────────────────────────────────────────────────────
  const [completed, setCompleted] = useState({});        // task completions
  const [gateCompleted, setGateCompleted] = useState({}); // gate criteria
  const [currentPhaseId, setCurrentPhaseId] = useState("A"); // user-selected active phase
  const [activeTab, setActiveTab] = useState("dashboard");
  const [activePhaseView, setActivePhaseView] = useState("A"); // roadmap phase selector
  const [activeEWPhase, setActiveEWPhase] = useState("ew1");

  // ── Resources sub-nav ─────────────────────────────────────────────────────────
  const [activeResourceTab, setActiveResourceTab] = useState("training");
  const [expandedTraining, setExpandedTraining] = useState(null);
  const [activeMindset, setActiveMindset] = useState(0);
  const [activeAIWorkflow, setActiveAIWorkflow] = useState("aw1");
  const [activeUseCase, setActiveUseCase] = useState(0);
  const [copiedPrompt, setCopiedPrompt] = useState(null);

  // ── Weekly Review ─────────────────────────────────────────────────────────────
  const [weekNumber, setWeekNumber] = useState(1);
  const [weekAnswers, setWeekAnswers] = useState({});
  const [savedReviews, setSavedReviews] = useState({});
  const [reviewSaved, setReviewSaved] = useState(false);

  // ── Financial ─────────────────────────────────────────────────────────────────
  const [monthly, setMonthly] = useState({ rent: 25000, food: 15000, transport: 8000, utilities: 5000, insurance: 3000, other: 10000 });
  const [savings, setSavings] = useState(300000);
  const [projectedMonthly, setProjectedMonthly] = useState(0);
  const [taxRate, setTaxRate] = useState(25);
  const [bizOverhead, setBizOverhead] = useState(15000);
  const [utilization, setUtilization] = useState(70);

  // ── Pipeline ──────────────────────────────────────────────────────────────────
  const [prospects, setProspects] = useState([]);
  const [newProspect, setNewProspect] = useState({ name: "", company: "", stage: "prospect", note: "" });
  const [showAddProspect, setShowAddProspect] = useState(false);

  // ── Milestones ────────────────────────────────────────────────────────────────
  const [achieved, setAchieved] = useState({});
  const [milestoneDate, setMilestoneDate] = useState({});
  const [loaded, setLoaded] = useState(false);

  // ── Enclave Integration ───────────────────────────────────────────────────────
  const [fbUser, setFbUser] = useState(null);
  const [authReady, setAuthReady] = useState(false);
  const [enclaveLink, setEnclaveLink] = useState({ projectId: null, status: "not_linked", lastChecked: null });
  const [collabCreating, setCollabCreating] = useState(false);
  const [collabError, setCollabError] = useState(null);
  const [relinkModal, setRelinkModal] = useState(false);
  const [relinkId, setRelinkId] = useState("");
  const [setupModal, setSetupModal] = useState(false);
  const [setupName, setSetupName] = useState("Forensic BI Strategy");
  const [setupDesc, setSetupDesc] = useState("Collaboration space for Forensic BI consulting strategy — phases, tasks, and team coordination.");
  const [setupMode, setSetupMode] = useState("solo");

  // ── Theme ─────────────────────────────────────────────────────────────────────
  const [theme, setTheme] = useState(() => { try { return localStorage.getItem('fba_theme') || 'dark'; } catch { return 'dark'; } });
  // Shadow module-level C with the active theme palette — used by all component rendering
  const C = theme === 'dark' ? DARK_C : LIGHT_C; // eslint-disable-line no-shadow
  const card = { background: C.surface, border: `1px solid ${C.border}`, borderRadius: 10, padding: "20px 24px" };
  const inputSt = { background: C.bg, border: `1px solid ${C.border}`, borderRadius: 6, color: C.text, padding: "8px 12px", fontSize: 14, ...SF, width: "100%", boxSizing: "border-box", outline: "none" };
  const toggleTheme = () => { const n = theme === 'dark' ? 'light' : 'dark'; setTheme(n); try { localStorage.setItem('fba_theme', n); } catch {} };
  const headerBg = theme === 'dark' ? 'linear-gradient(135deg,#0D0F14 0%,#1a1f2e 100%)' : 'linear-gradient(135deg,#F0ECE7 0%,#EAE5DE 100%)';

  // ── Storage ───────────────────────────────────────────────────────────────────
  const save = async (key, val) => { try { await window.storage.set(key, JSON.stringify(val)); } catch {} };

  useEffect(() => {
    const load = async () => {
      const tryLoad = async (key, setter) => {
        try { const r = await window.storage.get(key); if (r) setter(JSON.parse(r.value)); } catch {}
      };
      await tryLoad("completed", setCompleted);
      await tryLoad("gateCompleted", setGateCompleted);
      await tryLoad("currentPhaseId", setCurrentPhaseId);
      await tryLoad("achieved", setAchieved);
      await tryLoad("milestoneDate", setMilestoneDate);
      await tryLoad("savedReviews", setSavedReviews);
      await tryLoad("prospects", setProspects);
      // enclaveLink is loaded from Firestore in the auth listener, not localStorage
      try {
        const r = await window.storage.get("financial");
        if (r) { const f = JSON.parse(r.value); setMonthly(f.monthly); setSavings(f.savings); setProjectedMonthly(f.projectedMonthly || 0); setTaxRate(f.taxRate || 25); setBizOverhead(f.bizOverhead || 15000); setUtilization(f.utilization || 70); }
      } catch {}
      setLoaded(true);
    };
    load();
  }, []);

  // ── Firebase Auth Listener — also loads enclaveLink from Firestore ───────────
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(async user => {
      setFbUser(user);
      setAuthReady(true);
      if (user) {
        try {
          const snap = await firebase.firestore().doc(`users/${user.uid}`).get();
          if (snap.exists && snap.data().fbaLink) setEnclaveLink(snap.data().fbaLink);
        } catch (err) { console.error("Load fbaLink from Firestore error:", err); }
      } else {
        // User signed out — clear the link
        setEnclaveLink({ projectId: null, status: "not_linked", lastChecked: null });
      }
    });
    return () => unsubscribe();
  }, []);

  // ── Health check: verify linked Enclave project still exists ──────────────────
  useEffect(() => {
    if (!authReady || !fbUser || !loaded) return;
    if (!enclaveLink.projectId) return;
    // Only re-check if never checked or last check was > 5 minutes ago
    const stale = !enclaveLink.lastChecked || (Date.now() - enclaveLink.lastChecked > 5 * 60 * 1000);
    if (!stale && enclaveLink.status !== "not_linked") return;
    checkLinkedProject(enclaveLink.projectId);
  }, [authReady, fbUser, loaded]);

  // ── Helpers ───────────────────────────────────────────────────────────────────
  const toggleTask = (id) => { const n = { ...completed, [id]: !completed[id] }; setCompleted(n); save("completed", n); };
  const toggleGate = (id) => { const n = { ...gateCompleted, [id]: !gateCompleted[id] }; setGateCompleted(n); save("gateCompleted", n); };
  const toggleMilestone = (id) => {
    const na = { ...achieved, [id]: !achieved[id] };
    const nd = { ...milestoneDate };
    if (!achieved[id]) nd[id] = new Date().toLocaleDateString("en-PH", { year: "numeric", month: "short", day: "numeric" });
    else delete nd[id];
    setAchieved(na); setMilestoneDate(nd); save("achieved", na); save("milestoneDate", nd);
  };
  const saveReview = () => {
    const n = { ...savedReviews, [weekNumber]: { answers: weekAnswers, date: new Date().toLocaleDateString("en-PH", { year: "numeric", month: "short", day: "numeric" }) } };
    setSavedReviews(n); save("savedReviews", n); setReviewSaved(true); setTimeout(() => setReviewSaved(false), 2000);
  };
  const saveFinancial = (patch) => {
    const f = { monthly, savings, projectedMonthly, taxRate, bizOverhead, utilization, ...patch };
    save("financial", f);
  };

  // ── Enclave helpers ───────────────────────────────────────────────────────────
  const saveEnclaveLink = (patch) => {
    const next = { ...enclaveLink, ...patch };
    setEnclaveLink(next);
    // Persist to Firestore (cross-device) instead of localStorage
    if (fbUser) {
      firebase.firestore().doc(`users/${fbUser.uid}`)
        .set({ fbaLink: next }, { merge: true })
        .catch(err => console.error("saveEnclaveLink Firestore error:", err));
    }
  };

  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).catch(err => console.error("Sign-in error:", err));
  };

  const signOutFirebase = () => firebase.auth().signOut();

  const checkLinkedProject = async (projectId) => {
    if (!projectId) return;
    saveEnclaveLink({ status: "checking" });
    try {
      const snap = await firebase.firestore().doc(`projects/${projectId}`).get();
      saveEnclaveLink({ projectId, status: snap.exists ? "linked" : "broken", lastChecked: Date.now() });
    } catch (err) {
      console.error("Enclave health check failed:", err);
      saveEnclaveLink({ projectId, status: "broken", lastChecked: Date.now() });
    }
  };

  const openInEnclave = () => {
    if (!enclaveLink.projectId) return;
    window.open(`${ENCLAVE_URL}/?page=projects&projectId=${enclaveLink.projectId}`, "enclaveApp");
  };

  // Pass 2 — Create Enclave project, save link, open Enclave
  const createCollaborationSpace = async () => {
    if (!fbUser) { signInWithGoogle(); return; }
    if (enclaveLink.status === "linked") { openInEnclave(); return; }

    setCollabCreating(true);
    setCollabError(null);
    saveEnclaveLink({ status: "checking" });

    const db = firebase.firestore();
    const displayName = fbUser.displayName || fbUser.email || "Member";

    try {
      // Preflight — confirm this Google account is a registered Enclave member
      const userSnap = await db.doc(`users/${fbUser.uid}`).get();
      if (!userSnap.exists) {
        setCollabError("Your Google account isn't registered in Enclave yet. Sign in to Enclave first, then retry here.");
        saveEnclaveLink({ status: "not_linked" });
        setCollabCreating(false);
        return;
      }

      setSetupModal(false);

      // Store roadmap metadata on the user doc (same collection, no new rules needed)
      await db.doc(`users/${fbUser.uid}`).set({
        roadmapApp:       "forensic-bi-strategy",
        roadmapName:      displayName,
        roadmapWorkspace: setupName,
        roadmapMode:      setupMode,
        roadmapUpdatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      }, { merge: true });

      const docRef = await db.collection("projects").add({
        name:            setupName || "Forensic BI Strategy",
        description:     setupDesc || "Collaboration space for Forensic BI consulting strategy.",
        workspaceMode:   setupMode,
        status:          "active",
        createdBy:       fbUser.uid,
        createdByName:   displayName,
        createdAt:       firebase.firestore.FieldValue.serverTimestamp(),
        updatedAt:       firebase.firestore.FieldValue.serverTimestamp(),
        memberIds:       [fbUser.uid],
        memberNames:     { [fbUser.uid]: displayName },
        originApp:       "roadmap",
        originRoadmapId: fbUser.uid,
      });

      saveEnclaveLink({ projectId: docRef.id, status: "linked", lastChecked: Date.now() });
      setCollabCreating(false);
      window.open(`${ENCLAVE_URL}/?page=projects&projectId=${docRef.id}`, "enclaveApp");

    } catch (err) {
      console.error("Create collaboration space failed:", err);
      setCollabError(err.message || "Failed to create. Check that you are signed in to the right Google account.");
      saveEnclaveLink({ status: "not_linked" });
      setCollabCreating(false);
    }
  };

  const relinkSpace = () => { setRelinkId(""); setRelinkModal(true); setSetupModal(false); };
  const openSetupModal = () => {
    setSetupName("Forensic BI Strategy");
    setSetupDesc("Collaboration space for Forensic BI consulting strategy — phases, tasks, and team coordination.");
    setSetupMode("solo");
    setSetupModal(true);
    setRelinkModal(false);
    setCollabError(null);
  };
  const confirmRelink = () => {
    if (!relinkId.trim()) return;
    setRelinkModal(false);
    setRelinkId("");
    saveEnclaveLink({ projectId: relinkId.trim(), status: "checking", lastChecked: null });
    checkLinkedProject(relinkId.trim());
  };
  const addProspect = () => {
    if (!newProspect.name.trim()) return;
    const p = { ...newProspect, id: Date.now() };
    const n = [...prospects, p]; setProspects(n); save("prospects", n);
    setNewProspect({ name: "", company: "", stage: "prospect", note: "" }); setShowAddProspect(false);
  };
  const moveProspect = (id, stage) => { const n = prospects.map(p => p.id === id ? { ...p, stage } : p); setProspects(n); save("prospects", n); };
  const deleteProspect = (id) => { const n = prospects.filter(p => p.id !== id); setProspects(n); save("prospects", n); };

  // ── Derived Values ────────────────────────────────────────────────────────────
  const allPhaseTasks = phases.flatMap(p => p.tasks);
  const totalTasks = allPhaseTasks.length;
  const completedCount = Object.values(completed).filter(Boolean).length;
  const pct = totalTasks > 0 ? Math.round((completedCount / totalTasks) * 100) : 0;
  const achievedCount = Object.values(achieved).filter(Boolean).length;
  const totalPersonalBurn = Object.values(monthly).reduce((a, b) => a + Number(b), 0);
  const totalBurn = totalPersonalBurn + Number(bizOverhead);
  const runwayMonths = totalPersonalBurn > 0 ? Math.floor(Number(savings) / totalPersonalBurn) : 0;
  const netMonthly = projectedMonthly - totalBurn;
  const minBillingToResign = totalBurn > 0 ? Math.round(totalBurn / (1 - taxRate / 100) / (utilization / 100)) : 0;
  const currentPhase = phases.find(p => p.id === currentPhaseId) || phases[0];
  const viewPhase = phases.find(p => p.id === activePhaseView) || phases[0];
  const topMustTasks = currentPhase.tasks.filter(t => t.priority === "Must" && !completed[t.id]).slice(0, 3);
  const nextMilestone = milestonesList.find(m => !achieved[m.id]);
  const gateCriteriaDone = (phaseId) => { const ph = phases.find(p => p.id === phaseId); if (!ph) return 0; return ph.gate.criteria.filter(c => gateCompleted[c.id]).length; };
  const gateTotal = (phaseId) => { const ph = phases.find(p => p.id === phaseId); return ph ? ph.gate.criteria.length : 0; };
  const gateClear = (phaseId) => gateCriteriaDone(phaseId) === gateTotal(phaseId);
  const track2Unlocked = gateClear("C");
  const topRisk = (() => {
    if (runwayMonths > 0 && runwayMonths < 4) return { icon: "💸", label: "Critical runway", note: `Only ${runwayMonths} month${runwayMonths === 1 ? "" : "s"} of runway remaining. Adjust spending or accelerate first revenue before anything else.` };
    if (enclaveLink.status !== "linked") return { icon: "🔗", label: "No collaboration space", note: "Your Enclave workspace is not linked. Create one to start coordinating with partners." };
    if (prospects.length === 0) return { icon: "🎯", label: "Empty pipeline", note: "No prospects tracked. Add targets to the Pipeline tab before momentum stalls." };
    const mustDone = currentPhase.tasks.filter(t => t.priority === "Must" && completed[t.id]).length;
    const mustTotal = currentPhase.tasks.filter(t => t.priority === "Must").length;
    if (mustTotal > 0 && mustDone / mustTotal < 0.3) return { icon: "⏱", label: `Phase ${currentPhaseId} behind`, note: `Under 30% of Phase ${currentPhaseId} Must tasks complete. Focus here before taking on anything new.` };
    if (!gateClear(currentPhaseId)) return { icon: "🚧", label: `Gate ${currentPhaseId} not cleared`, note: `${gateCriteriaDone(currentPhaseId)}/${gateTotal(currentPhaseId)} gate criteria met. Clear this before advancing to the next phase.` };
    return risks[0];
  })();

  // ── Inject CSS ────────────────────────────────────────────────────────────────
  useEffect(() => {
    const s = document.createElement("style");
    const hoverBorder = theme === 'dark' ? '#3a3f50' : '#c5bfb5';
    s.innerHTML = `
      .g2{display:grid;grid-template-columns:1fr 1fr;gap:16px}
      .g3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px}
      .tab-bar{display:flex;gap:1px;border-bottom:1px solid ${C.border};flex-wrap:nowrap;overflow-x:auto;-webkit-overflow-scrolling:touch;scrollbar-width:none}
      .tab-bar::-webkit-scrollbar{display:none}
      .sub-tab-bar{display:flex;gap:6px;flex-wrap:wrap;margin-bottom:20px}
      .pp{padding:20px 32px}
      .hp{padding:22px 32px 18px}
      @media(max-width:640px){.g2{grid-template-columns:1fr!important}.g3{grid-template-columns:1fr!important}.pp{padding:14px 16px!important}.hp{padding:16px 16px 14px!important}}
      .task-row:hover{border-color:${hoverBorder}!important}
      .prospect-card:hover{border-color:${hoverBorder}!important}
    `;
    document.head.appendChild(s);
    return () => document.head.removeChild(s);
  }, [theme]);

  // ── Sub-components ────────────────────────────────────────────────────────────
  const PriorityBadge = ({ p }) => {
    const col = p === "Must" ? C.red : p === "Should" ? C.gold : C.textMute;
    return <span style={{ background: col + "18", border: `1px solid ${col}40`, color: col, borderRadius: 10, padding: "1px 7px", fontSize: 9, ...SF, fontWeight: 700, letterSpacing: "0.08em", flexShrink: 0 }}>{p}</span>;
  };

  const TaskList = ({ tasks, color }) => tasks.map(task => {
    const done = completed[task.id];
    return (
      <div key={task.id} className="task-row" onClick={() => toggleTask(task.id)} style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "11px 13px", borderRadius: 7, background: done ? `${color}08` : C.bg, border: `1px solid ${done ? color + "35" : C.borderSub}`, cursor: "pointer", transition: "all 0.15s", marginBottom: 7 }}>
        <div style={{ width: 18, height: 18, borderRadius: 4, flexShrink: 0, marginTop: 1, border: `1.5px solid ${done ? color : "#3a3f50"}`, background: done ? color : "transparent", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.15s" }}>
          {done && <span style={{ color: "#0D0F14", fontSize: 11, fontWeight: 700 }}>✓</span>}
        </div>
        <span style={{ ...SF, fontSize: 13.5, color: done ? "#6a7080" : C.textMid, textDecoration: done ? "line-through" : "none", lineHeight: 1.5, flex: 1 }}>{task.text}</span>
        {task.priority && <PriorityBadge p={task.priority} />}
      </div>
    );
  });

  const PhaseTab = ({ phases: phList, active, setActive }) => (
    <div style={{ display: "flex", gap: 7, marginBottom: 18, flexWrap: "wrap" }}>
      {phList.map(p => {
        const done = p.tasks.filter(t => completed[t.id]).length;
        const isActive = active === p.id;
        return (
          <button key={p.id} onClick={() => setActive(p.id)} style={{ padding: "6px 13px", borderRadius: 6, border: isActive ? `1.5px solid ${p.color}` : `1.5px solid ${C.border}`, background: isActive ? `${p.color}15` : "transparent", color: isActive ? p.color : C.textMute, cursor: "pointer", fontSize: 12, ...SF, transition: "all 0.15s", display: "flex", alignItems: "center", gap: 5 }}>
            <span>{p.icon}</span>
            <span style={{ fontWeight: isActive ? 600 : 400 }}>{p.label}</span>
            {done > 0 && <span style={{ background: p.color, color: "#0D0F14", borderRadius: 10, padding: "0 5px", fontSize: 9, fontWeight: 700 }}>{done}/{p.tasks.length}</span>}
          </button>
        );
      })}
    </div>
  );

  const GateCard = ({ phase }) => {
    const done = gateCriteriaDone(phase.id);
    const total = gateTotal(phase.id);
    const clear = done === total;
    return (
      <div style={{ background: clear ? `${phase.color}10` : C.bg, border: `1px solid ${clear ? phase.color + "50" : C.border}`, borderRadius: 10, padding: "18px 22px", marginTop: 16 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
          <div style={{ fontSize: 11, color: clear ? phase.color : C.textMute, ...SF, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em" }}>
            {clear ? "✓ " : ""}{phase.gate.label}
          </div>
          <span style={{ fontSize: 12, color: clear ? phase.color : C.textDim, ...SF }}>{done}/{total} criteria met</span>
        </div>
        {phase.gate.criteria.map(c => {
          const met = gateCompleted[c.id];
          return (
            <div key={c.id} onClick={() => toggleGate(c.id)} style={{ display: "flex", alignItems: "flex-start", gap: 9, padding: "8px 10px", borderRadius: 6, background: met ? `${phase.color}08` : "transparent", border: `1px solid ${met ? phase.color + "30" : C.borderSub}`, cursor: "pointer", marginBottom: 6, transition: "all 0.15s" }}>
              <div style={{ width: 16, height: 16, borderRadius: 3, flexShrink: 0, marginTop: 1, border: `1.5px solid ${met ? phase.color : "#3a3f50"}`, background: met ? phase.color : "transparent", display: "flex", alignItems: "center", justifyContent: "center" }}>
                {met && <span style={{ color: "#0D0F14", fontSize: 10, fontWeight: 700 }}>✓</span>}
              </div>
              <span style={{ ...SF, fontSize: 12.5, color: met ? C.textDim : C.textMid, textDecoration: met ? "line-through" : "none", lineHeight: 1.4 }}>{c.text}</span>
            </div>
          );
        })}
      </div>
    );
  };

  const tabs = [
    { id: "dashboard", label: "⚡ Dashboard" },
    { id: "roadmap", label: "🗺 Roadmap" },
    { id: "pipeline", label: "📊 Pipeline" },
    { id: "review", label: "📅 Weekly Review" },
    { id: "finance", label: "💰 Financial" },
    { id: "resources", label: "📚 Resources" },
    { id: "track2", label: "🏛 Track 2: Expert Witness" },
    { id: "milestones", label: "🎉 Milestones" },
  ];

  if (!loaded) return <div style={{ background: C.bg, minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", color: C.gold, ...SF }}>Loading your operating system...</div>;

  return (
    <div style={{ ...SF, background: C.bg, minHeight: "100vh", color: C.text }}>

      {/* HEADER */}
      <div className="hp" style={{ background: headerBg, borderBottom: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 1400, margin: "0 auto", display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 9, letterSpacing: "0.2em", color: C.gold, textTransform: "uppercase", marginBottom: 5, ...SF }}>Forensic BI Consulting · Operating System · v5</div>
            <h1 style={{ margin: "0 0 8px", fontSize: 20, fontWeight: 400, color: C.text, lineHeight: 1.3 }}>Building a Forensic BI Practice — <span style={{ color: C.gold }}>CPA · CIA · Operating System</span></h1>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 6 }}>
              <div style={{ flex: 1, height: 4, background: C.borderSub, borderRadius: 2, overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${pct}%`, background: `linear-gradient(90deg,${C.gold},#E8C98E)`, borderRadius: 2, transition: "width 0.4s" }} />
              </div>
              <span style={{ fontSize: 11, color: C.gold, ...SF, whiteSpace: "nowrap" }}>{completedCount}/{totalTasks} tasks · {pct}%</span>
              <span style={{ fontSize: 11, color: C.green, ...SF, whiteSpace: "nowrap" }}>{achievedCount}/{milestonesList.length} milestones</span>
              <button onClick={toggleTheme} title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'} style={{ background: 'transparent', border: `1px solid ${C.border}`, borderRadius: 6, padding: "3px 9px", cursor: "pointer", fontSize: 13, color: C.textMid, ...SF, transition: "all 0.2s", flexShrink: 0, lineHeight: 1.6 }}>
                {theme === 'dark' ? '☀️' : '🌙'}
              </button>
            </div>
          </div>
          <div style={{ width: 54, height: 54, flexShrink: 0 }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="100%" height="100%">
              <defs>
                <linearGradient id="logoGold" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#E8C98E" />
                  <stop offset="100%" stopColor="#C8A96E" />
                </linearGradient>
                <linearGradient id="logoBlue" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#3a6f80" />
                  <stop offset="100%" stopColor="#7EB8C9" />
                </linearGradient>
              </defs>
              <path d="M60 10 L104 32 L104 82 L60 114 L16 82 L16 32 Z" fill="none" stroke="url(#logoBlue)" strokeWidth="4" strokeLinejoin="round" opacity="0.2"/>
              <path d="M60 22 L92 38 L92 76 L60 100 L28 76 L28 38 Z" fill="none" stroke="url(#logoBlue)" strokeWidth="3" strokeLinejoin="round" opacity="0.6"/>
              <rect x="42" y="65" width="8" height="15" rx="3" fill="url(#logoGold)" />
              <rect x="56" y="50" width="8" height="30" rx="3" fill="url(#logoGold)" />
              <rect x="70" y="35" width="8" height="45" rx="3" fill="url(#logoGold)" />
              <circle cx="46" cy="65" r="3.5" fill={C.textMid} />
              <circle cx="60" cy="50" r="3.5" fill={C.textMid} />
              <circle cx="74" cy="35" r="3.5" fill={C.textMid} />
              <path d="M46 65 L60 50 L74 35" fill="none" stroke={C.textMid} strokeWidth="2" opacity="0.9" strokeLinecap="round"/>
              <circle cx="60" cy="50" r="18" fill="none" stroke="#7EC9A2" strokeWidth="2" opacity="0.8" strokeDasharray="4 4" />
            </svg>
          </div>
        </div>
      </div>

      <div className="pp" style={{ maxWidth: 1400, margin: "0 auto" }}>

        {/* TABS */}
        <div className="tab-bar" style={{ marginBottom: 24 }}>
          {tabs.map(t => (
            <button key={t.id} onClick={() => setActiveTab(t.id)} style={{ background: "transparent", border: "none", borderBottom: activeTab === t.id ? `2px solid ${C.gold}` : "2px solid transparent", color: activeTab === t.id ? C.gold : C.textMute, padding: "8px 11px", cursor: "pointer", fontSize: 11, ...SF, marginBottom: -1, transition: "all 0.15s", whiteSpace: "nowrap" }}>
              {t.label}{t.id === "track2" && !track2Unlocked ? " 🔒" : ""}
            </button>
          ))}
        </div>

        {/* ══════════════ DASHBOARD ══════════════ */}
        {activeTab === "dashboard" && (() => {
          const phaseTasksDone = currentPhase.tasks.filter(t => completed[t.id]).length;
          const phaseTasksTotal = currentPhase.tasks.length;
          const gateDone = gateCriteriaDone(currentPhaseId);
          const gateMax = gateTotal(currentPhaseId);
          return (
            <div>
              {/* Phase Selector Row */}
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20, flexWrap: "wrap" }}>
                <span style={{ fontSize: 12, color: C.textDim, ...SF }}>Current phase:</span>
                {phases.map(p => (
                  <button key={p.id} onClick={() => { setCurrentPhaseId(p.id); save("currentPhaseId", p.id); }} style={{ padding: "5px 12px", borderRadius: 6, border: currentPhaseId === p.id ? `1.5px solid ${p.color}` : `1.5px solid ${C.border}`, background: currentPhaseId === p.id ? `${p.color}18` : "transparent", color: currentPhaseId === p.id ? p.color : C.textMute, cursor: "pointer", fontSize: 11, ...SF, fontWeight: currentPhaseId === p.id ? 700 : 400, transition: "all 0.15s" }}>
                    {p.icon} {p.label}
                  </button>
                ))}
              </div>

              {/* Top Row: Phase card + Gate progress */}
              <div className="g2" style={{ marginBottom: 16 }}>
                <div style={{ background: `linear-gradient(135deg,${currentPhase.color}15,${C.surface})`, border: `1px solid ${currentPhase.color}40`, borderLeft: `3px solid ${currentPhase.color}`, borderRadius: 10, padding: "18px 22px" }}>
                  <div style={{ fontSize: 10, color: currentPhase.color, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 4, ...SF }}>{currentPhase.label} · {currentPhase.timeframe}</div>
                  <div style={{ fontSize: 17, color: C.text, marginBottom: 8 }}>{currentPhase.icon} {currentPhase.title}</div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                    <div style={{ flex: 1, height: 5, background: "#1e2330", borderRadius: 3, overflow: "hidden" }}>
                      <div style={{ height: "100%", width: `${phaseTasksTotal > 0 ? Math.round(phaseTasksDone / phaseTasksTotal * 100) : 0}%`, background: currentPhase.color, borderRadius: 3, transition: "width 0.3s" }} />
                    </div>
                    <span style={{ fontSize: 11, color: currentPhase.color, ...SF }}>{phaseTasksDone}/{phaseTasksTotal}</span>
                  </div>
                  <div style={{ fontSize: 11, color: C.textDim, ...SF }}>Gate: {gateDone}/{gateMax} criteria met{gateClear(currentPhaseId) ? " ✓" : ""}</div>
                </div>

                {/* Financial Snapshot */}
                <div style={{ ...card, display: "flex", flexDirection: "column", gap: 10 }}>
                  <div style={{ fontSize: 10, color: C.textMute, ...SF, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em" }}>Financial Snapshot</div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                    <span style={{ fontSize: 12, color: C.textDim, ...SF }}>Runway</span>
                    <span style={{ fontSize: 22, fontWeight: 700, color: runwayMonths >= 6 ? C.green : runwayMonths >= 3 ? C.gold : C.red, ...SF }}>{runwayMonths}<span style={{ fontSize: 11, fontWeight: 400 }}> mo</span></span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ fontSize: 12, color: C.textDim, ...SF }}>Min billing to resign</span>
                    <span style={{ fontSize: 13, color: C.gold, ...SF, fontWeight: 600 }}>₱{minBillingToResign.toLocaleString()}/mo</span>
                  </div>
                  {projectedMonthly > 0 && <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ fontSize: 12, color: C.textDim, ...SF }}>Projected net</span>
                    <span style={{ fontSize: 13, color: netMonthly >= 0 ? C.green : C.red, ...SF, fontWeight: 600 }}>{netMonthly >= 0 ? "+" : ""}₱{netMonthly.toLocaleString()}</span>
                  </div>}
                </div>
              </div>

              {/* Top 3 Must Tasks */}
              <div style={{ ...card, marginBottom: 16 }}>
                <div style={{ fontSize: 10, color: C.red, ...SF, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 12 }}>⚡ Top 3 Actions — Phase {currentPhaseId}</div>
                {topMustTasks.length === 0
                  ? <div style={{ color: C.green, fontSize: 13, ...SF }}>✓ All Must tasks in this phase are complete. Check your gate criteria below, then advance.</div>
                  : topMustTasks.map(t => (
                    <div key={t.id} className="task-row" onClick={() => toggleTask(t.id)} style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "11px 13px", borderRadius: 7, background: C.bg, border: `1px solid ${C.borderSub}`, cursor: "pointer", marginBottom: 7, transition: "all 0.15s" }}>
                      <div style={{ width: 18, height: 18, borderRadius: 4, flexShrink: 0, marginTop: 1, border: `1.5px solid ${C.red}`, background: "transparent", display: "flex", alignItems: "center", justifyContent: "center" }} />
                      <span style={{ ...SF, fontSize: 13.5, color: C.textMid, lineHeight: 1.5, flex: 1 }}>{t.text}</span>
                      <PriorityBadge p={t.priority} />
                    </div>
                  ))
                }
              </div>

              {/* Enclave Collaboration Card */}
              {(() => {
                const colStatus = enclaveLink.status;
                const borderCol = colStatus === "linked" ? C.green : colStatus === "broken" ? C.red : C.blue;
                const btnBase = { border: "none", borderRadius: 6, padding: "7px 16px", cursor: "pointer", fontSize: 12, ...SF, fontWeight: 700, transition: "all 0.2s" };
                return (
                  <div style={{ background: C.surface, border: `1px solid ${borderCol}35`, borderLeft: `3px solid ${borderCol}`, borderRadius: 10, padding: "16px 22px", marginBottom: 16 }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
                      <div>
                        <div style={{ fontSize: 10, color: borderCol, ...SF, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 4 }}>
                          🔗 Enclave Collaboration Space
                        </div>
                        {!authReady && (
                          <div style={{ fontSize: 12, color: C.textMute, ...SF }}>Checking authentication…</div>
                        )}
                        {authReady && !fbUser && (
                          <div style={{ fontSize: 12, color: C.textDim, ...SF }}>Sign in with Google to link your Enclave workspace.</div>
                        )}
                        {authReady && fbUser && colStatus === "not_linked" && (
                          <div style={{ fontSize: 12, color: C.textDim, ...SF }}>No collaboration space linked. Create one to start working with your team in Enclave.</div>
                        )}
                        {authReady && fbUser && colStatus === "checking" && (
                          <div style={{ fontSize: 12, color: C.textMute, ...SF }}>
                            {collabCreating ? "Creating collaboration space in Enclave…" : "Checking connection to Enclave…"}
                          </div>
                        )}
                        {collabError && (
                          <div style={{ fontSize: 12, color: C.red, ...SF, marginTop: 4 }}>
                            ⚠ {collabError}
                            {collabError.includes("Enclave") && (
                              <> · <a href={ENCLAVE_URL} target="_blank" rel="noopener" style={{ color: C.blue, textDecoration: "underline" }}>Open Enclave →</a></>
                            )}
                          </div>
                        )}
                        {authReady && fbUser && colStatus === "linked" && (
                          <div style={{ fontSize: 12, color: C.green, ...SF }}>✓ Linked · Project ID: <span style={{ fontFamily: "monospace", fontSize: 11 }}>{enclaveLink.projectId}</span></div>
                        )}
                        {authReady && fbUser && colStatus === "broken" && (
                          <div style={{ fontSize: 12, color: C.red, ...SF }}>⚠ Link broken — the Enclave project was not found or was deleted.</div>
                        )}
                      </div>

                      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
                        {!authReady || colStatus === "checking" ? null : !fbUser ? (
                          <button onClick={signInWithGoogle} style={{ ...btnBase, background: C.blue, color: "#0D0F14" }}>Sign in with Google</button>
                        ) : colStatus === "linked" ? (
                          <>
                            <button onClick={openInEnclave} style={{ ...btnBase, background: C.green, color: "#0D0F14" }}>Open in Enclave →</button>
                            <button onClick={() => checkLinkedProject(enclaveLink.projectId)} style={{ ...btnBase, background: "transparent", border: `1px solid ${C.border}`, color: C.textMute }}>↻ Refresh</button>
                          </>
                        ) : colStatus === "broken" ? (
                          <>
                            <button onClick={openSetupModal} disabled={collabCreating} style={{ ...btnBase, background: C.gold, color: "#0D0F14", opacity: collabCreating ? 0.5 : 1 }}>
                              {collabCreating ? "Creating…" : "Create New Space"}
                            </button>
                            <button onClick={relinkSpace} disabled={collabCreating} style={{ ...btnBase, background: "transparent", border: `1px solid ${C.border}`, color: C.textMute, opacity: collabCreating ? 0.4 : 1 }}>Relink Existing</button>
                          </>
                        ) : (
                          <>
                            <button onClick={openSetupModal} disabled={collabCreating} style={{ ...btnBase, background: C.blue, color: "#0D0F14", opacity: collabCreating ? 0.5 : 1 }}>
                              {collabCreating ? "Creating…" : "Create Collaboration Space"}
                            </button>
                            <button onClick={relinkSpace} disabled={collabCreating} style={{ ...btnBase, background: "transparent", border: `1px solid ${C.border}`, color: C.textMute, opacity: collabCreating ? 0.4 : 1 }}>Relink Existing</button>
                          </>
                        )}
                        {authReady && fbUser && (
                          <span style={{ fontSize: 11, color: C.textMute, ...SF, cursor: "pointer", textDecoration: "underline" }} onClick={signOutFirebase}>{fbUser.displayName || fbUser.email} · Sign out</span>
                        )}
                      </div>
                    </div>
                    {setupModal && (
                      <div style={{ marginTop: 14, padding: "16px 18px", borderRadius: 8, background: C.bg, border: `1px solid ${C.border}` }}>
                        <div style={{ fontSize: 11, color: C.gold, ...SF, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 14 }}>Configure Collaboration Space</div>
                        <div style={{ marginBottom: 12 }}>
                          <div style={{ fontSize: 11, color: C.textMute, ...SF, marginBottom: 4 }}>Workspace name</div>
                          <input value={setupName} onChange={e => setSetupName(e.target.value)} placeholder="e.g. Forensic BI Strategy" style={{ ...inputSt, fontSize: 13 }} />
                        </div>
                        <div style={{ marginBottom: 12 }}>
                          <div style={{ fontSize: 11, color: C.textMute, ...SF, marginBottom: 4 }}>Description <span style={{ color: C.textMute, fontWeight: 400 }}>(optional)</span></div>
                          <textarea value={setupDesc} onChange={e => setSetupDesc(e.target.value)} rows={2} style={{ ...inputSt, resize: "vertical", fontSize: 12, lineHeight: 1.5 }} />
                        </div>
                        <div style={{ marginBottom: 16 }}>
                          <div style={{ fontSize: 11, color: C.textMute, ...SF, marginBottom: 8 }}>Workspace mode</div>
                          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                            {[{ id: "solo", label: "Solo", desc: "just me" }, { id: "partnership", label: "Partnership", desc: "2–3 partners" }, { id: "client", label: "Client Engagement", desc: "delivery team" }].map(m => (
                              <button key={m.id} onClick={() => setSetupMode(m.id)} style={{ padding: "6px 13px", borderRadius: 6, border: setupMode === m.id ? `1.5px solid ${C.gold}` : `1.5px solid ${C.border}`, background: setupMode === m.id ? `${C.gold}15` : "transparent", color: setupMode === m.id ? C.gold : C.textMute, cursor: "pointer", fontSize: 12, ...SF, fontWeight: setupMode === m.id ? 700 : 400, transition: "all 0.15s" }}>
                                {m.label} <span style={{ fontSize: 10, fontWeight: 400, opacity: 0.7 }}>({m.desc})</span>
                              </button>
                            ))}
                          </div>
                        </div>
                        <div style={{ display: "flex", gap: 8 }}>
                          <button onClick={createCollaborationSpace} disabled={!setupName.trim() || collabCreating} style={{ ...btnBase, background: C.gold, color: "#0D0F14", opacity: setupName.trim() && !collabCreating ? 1 : 0.4, flexShrink: 0 }}>
                            {collabCreating ? "Creating…" : "Create Space →"}
                          </button>
                          <button onClick={() => setSetupModal(false)} style={{ ...btnBase, background: "transparent", border: `1px solid ${C.border}`, color: C.textMute, flexShrink: 0 }}>Cancel</button>
                        </div>
                      </div>
                    )}
                    {relinkModal && (
                      <div style={{ marginTop: 12, padding: "12px 14px", borderRadius: 8, background: C.bg, border: `1px solid ${C.border}` }}>
                        <div style={{ fontSize: 11, color: C.textDim, ...SF, marginBottom: 8 }}>Paste an existing Enclave project ID to relink:</div>
                        <div style={{ display: "flex", gap: 8 }}>
                          <input value={relinkId} onChange={e => setRelinkId(e.target.value)} onKeyDown={e => e.key === 'Enter' && confirmRelink()} placeholder="Project ID (e.g. abc123XYZ…)" autoFocus style={{ ...inputSt, flex: 1, fontSize: 12, padding: "7px 11px" }} />
                          <button onClick={confirmRelink} disabled={!relinkId.trim()} style={{ ...btnBase, background: C.gold, color: "#0D0F14", opacity: relinkId.trim() ? 1 : 0.4, flexShrink: 0 }}>Link</button>
                          <button onClick={() => { setRelinkModal(false); setRelinkId(""); }} style={{ ...btnBase, background: "transparent", border: `1px solid ${C.border}`, color: C.textMute, flexShrink: 0 }}>Cancel</button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })()}

              {/* Bottom Row: Pipeline + Next Milestone + Risk */}
              <div className="g3">
                <div style={{ ...card }}>
                  <div style={{ fontSize: 10, color: C.blue, ...SF, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 10 }}>📊 Pipeline</div>
                  {pipelineStageDefs.map(s => {
                    const n = prospects.filter(p => p.stage === s.id).length;
                    return n > 0 ? (
                      <div key={s.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                        <span style={{ fontSize: 12, color: C.textDim, ...SF }}>{s.icon} {s.label}</span>
                        <span style={{ fontSize: 13, fontWeight: 700, color: s.color, ...SF }}>{n}</span>
                      </div>
                    ) : null;
                  })}
                  {prospects.length === 0 && <div style={{ fontSize: 12, color: C.textMute, ...SF }}>No prospects yet — go to Pipeline tab.</div>}
                  <button onClick={() => setActiveTab("pipeline")} style={{ marginTop: 10, background: "transparent", border: `1px solid ${C.border}`, color: C.textMute, borderRadius: 6, padding: "5px 12px", cursor: "pointer", fontSize: 11, ...SF }}>Open Pipeline →</button>
                </div>

                <div style={{ ...card }}>
                  <div style={{ fontSize: 10, color: C.gold, ...SF, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 10 }}>🎯 Next Milestone</div>
                  {nextMilestone
                    ? <><div style={{ fontSize: 20, marginBottom: 6 }}>{nextMilestone.icon}</div>
                        <div style={{ fontSize: 13, color: C.text, ...SF, fontWeight: 600, marginBottom: 4 }}>{nextMilestone.title}</div>
                        <div style={{ fontSize: 12, color: C.textDim, ...SF }}>{nextMilestone.desc}</div></>
                    : <div style={{ fontSize: 13, color: C.green, ...SF }}>🎉 All milestones achieved!</div>
                  }
                </div>

                <div style={{ ...card, border: `1px solid ${C.red}30` }}>
                  <div style={{ fontSize: 10, color: C.red, ...SF, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 10 }}>⚠ Top Risk Now</div>
                  <div style={{ fontSize: 20, marginBottom: 6 }}>{topRisk.icon}</div>
                  <div style={{ fontSize: 13, color: C.gold, ...SF, fontWeight: 600, marginBottom: 4 }}>{topRisk.label}</div>
                  <div style={{ fontSize: 12, color: C.textDim, ...SF, lineHeight: 1.5 }}>{topRisk.note}</div>
                </div>
              </div>
            </div>
          );
        })()}

        {/* ══════════════ ROADMAP ══════════════ */}
        {activeTab === "roadmap" && (
          <div>
            <p style={{ color: C.textDim, fontSize: 13, ...SF, marginBottom: 18, fontStyle: "italic" }}>One primary lane. Complete each phase and clear the gate before advancing. Expert Witness is Track 2 — it unlocks after Phase C.</p>
            <PhaseTab phases={phases} active={activePhaseView} setActive={setActivePhaseView} />
            {(() => {
              const p = viewPhase;
              return (
                <div>
                  <div style={{ background: C.surface, border: `1px solid ${p.color}30`, borderLeft: `3px solid ${p.color}`, borderRadius: 10, padding: "22px 26px", marginBottom: 8 }}>
                    <div style={{ fontSize: 10, color: p.color, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 4, ...SF }}>{p.label} · {p.timeframe}</div>
                    <h2 style={{ margin: "0 0 6px", fontSize: 18, fontWeight: 400, color: C.text }}>{p.icon} {p.title}</h2>
                    <p style={{ color: C.textDim, fontSize: 13, ...SF, marginBottom: 18, marginTop: 4, fontStyle: "italic" }}>{p.context}</p>
                    <TaskList tasks={p.tasks} color={p.color} />
                  </div>
                  <GateCard phase={p} />
                </div>
              );
            })()}
          </div>
        )}

        {/* ══════════════ PIPELINE ══════════════ */}
        {activeTab === "pipeline" && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <p style={{ color: C.textDim, fontSize: 13, ...SF, margin: 0, fontStyle: "italic" }}>Track every prospect from first identification to signed retainer.</p>
              <button onClick={() => setShowAddProspect(!showAddProspect)} style={{ background: C.gold, border: "none", color: "#0D0F14", borderRadius: 7, padding: "8px 18px", cursor: "pointer", fontSize: 12, ...SF, fontWeight: 700 }}>+ Add Prospect</button>
            </div>

            {showAddProspect && (
              <div style={{ ...card, marginBottom: 20, border: `1px solid ${C.gold}40` }}>
                <div style={{ fontSize: 11, color: C.gold, ...SF, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 14 }}>New Prospect</div>
                <div className="g2" style={{ marginBottom: 10 }}>
                  <div>
                    <div style={{ fontSize: 11, color: C.textDim, ...SF, marginBottom: 4 }}>Name *</div>
                    <input value={newProspect.name} onChange={e => setNewProspect({ ...newProspect, name: e.target.value })} placeholder="Contact name" style={inputSt} />
                  </div>
                  <div>
                    <div style={{ fontSize: 11, color: C.textDim, ...SF, marginBottom: 4 }}>Company</div>
                    <input value={newProspect.company} onChange={e => setNewProspect({ ...newProspect, company: e.target.value })} placeholder="Company / Firm" style={inputSt} />
                  </div>
                </div>
                <div className="g2" style={{ marginBottom: 10 }}>
                  <div>
                    <div style={{ fontSize: 11, color: C.textDim, ...SF, marginBottom: 4 }}>Stage</div>
                    <select value={newProspect.stage} onChange={e => setNewProspect({ ...newProspect, stage: e.target.value })} style={{ ...inputSt }}>
                      {pipelineStageDefs.map(s => <option key={s.id} value={s.id}>{s.icon} {s.label}</option>)}
                    </select>
                  </div>
                  <div>
                    <div style={{ fontSize: 11, color: C.textDim, ...SF, marginBottom: 4 }}>Note</div>
                    <input value={newProspect.note} onChange={e => setNewProspect({ ...newProspect, note: e.target.value })} placeholder="How you found them, context..." style={inputSt} />
                  </div>
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  <button onClick={addProspect} style={{ background: C.gold, border: "none", color: "#0D0F14", borderRadius: 6, padding: "8px 20px", cursor: "pointer", fontSize: 13, ...SF, fontWeight: 700 }}>Add</button>
                  <button onClick={() => setShowAddProspect(false)} style={{ background: "transparent", border: `1px solid ${C.border}`, color: C.textMute, borderRadius: 6, padding: "8px 16px", cursor: "pointer", fontSize: 13, ...SF }}>Cancel</button>
                </div>
              </div>
            )}

            {/* Pipeline funnel stats */}
            <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
              {pipelineStageDefs.map(s => {
                const n = prospects.filter(p => p.stage === s.id).length;
                return (
                  <div key={s.id} style={{ background: n > 0 ? `${s.color}12` : C.surface, border: `1px solid ${n > 0 ? s.color + "40" : C.border}`, borderRadius: 8, padding: "10px 16px", textAlign: "center", minWidth: 90 }}>
                    <div style={{ fontSize: 16 }}>{s.icon}</div>
                    <div style={{ fontSize: 20, fontWeight: 700, color: n > 0 ? s.color : C.textMute, ...SF }}>{n}</div>
                    <div style={{ fontSize: 10, color: C.textMute, ...SF }}>{s.label}</div>
                  </div>
                );
              })}
            </div>

            {/* Prospect list */}
            {prospects.length === 0
              ? <div style={{ ...card, textAlign: "center", color: C.textDim, ...SF, fontSize: 13 }}>No prospects yet. Add your first one above.<br /><span style={{ fontSize: 12, color: C.textMute }}>Target: 20 prospects by end of Phase B.</span></div>
              : pipelineStageDefs.map(stage => {
                const stageProspects = prospects.filter(p => p.stage === stage.id);
                if (stageProspects.length === 0) return null;
                return (
                  <div key={stage.id} style={{ marginBottom: 20 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                      <span style={{ fontSize: 14 }}>{stage.icon}</span>
                      <span style={{ fontSize: 12, color: stage.color, ...SF, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em" }}>{stage.label}</span>
                      <span style={{ fontSize: 11, color: C.textMute, ...SF }}>({stageProspects.length})</span>
                    </div>
                    {stageProspects.map(p => (
                      <div key={p.id} className="prospect-card" style={{ background: C.surface, border: `1px solid ${C.border}`, borderLeft: `3px solid ${stage.color}`, borderRadius: 8, padding: "12px 16px", marginBottom: 8, transition: "border-color 0.15s" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                          <div style={{ flex: 1 }}>
                            <div style={{ fontSize: 14, color: C.text, ...SF, fontWeight: 600 }}>{p.name}</div>
                            {p.company && <div style={{ fontSize: 12, color: C.textDim, ...SF, marginTop: 2 }}>{p.company}</div>}
                            {p.note && <div style={{ fontSize: 12, color: C.textMute, ...SF, marginTop: 4, fontStyle: "italic" }}>{p.note}</div>}
                          </div>
                          <div style={{ display: "flex", gap: 6, alignItems: "center", marginLeft: 10 }}>
                            <select value={p.stage} onChange={e => moveProspect(p.id, e.target.value)} style={{ background: C.bg, border: `1px solid ${C.border}`, color: stage.color, borderRadius: 5, padding: "4px 8px", fontSize: 11, ...SF, cursor: "pointer" }}>
                              {pipelineStageDefs.map(s => <option key={s.id} value={s.id}>{s.icon} {s.label}</option>)}
                            </select>
                            <button onClick={() => deleteProspect(p.id)} style={{ background: "transparent", border: "none", color: C.textMute, cursor: "pointer", fontSize: 14, padding: "2px 4px" }}>✕</button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                );
              })
            }
          </div>
        )}

        {/* ══════════════ WEEKLY REVIEW ══════════════ */}
        {activeTab === "review" && (
          <div>
            <p style={{ color: C.textDim, fontSize: 13, ...SF, marginBottom: 20, fontStyle: "italic" }}>Same day, same time, every week. Decide first, then reflect. Answers are saved.</p>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
              <span style={{ color: C.gold, fontSize: 13, ...SF }}>Week:</span>
              <button onClick={() => { setWeekNumber(Math.max(1, weekNumber - 1)); setWeekAnswers(savedReviews[weekNumber - 1]?.answers || {}); }} style={{ background: C.surface, border: `1px solid ${C.border}`, color: C.textDim, borderRadius: 6, padding: "6px 12px", cursor: "pointer", fontSize: 14 }}>←</button>
              <span style={{ color: C.text, fontSize: 18, fontWeight: 600, ...SF, minWidth: 40, textAlign: "center" }}>#{weekNumber}</span>
              <button onClick={() => { setWeekNumber(weekNumber + 1); setWeekAnswers(savedReviews[weekNumber + 1]?.answers || {}); }} style={{ background: C.surface, border: `1px solid ${C.border}`, color: C.textDim, borderRadius: 6, padding: "6px 12px", cursor: "pointer", fontSize: 14 }}>→</button>
              {savedReviews[weekNumber] && <span style={{ fontSize: 11, color: C.green, ...SF }}>✓ Saved · {savedReviews[weekNumber].date}</span>}
            </div>

            {/* Decision Questions */}
            <div style={{ fontSize: 11, color: C.red, ...SF, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 12 }}>⚡ My Priorities</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 24 }}>
              {decisionQuestions.map((q, i) => (
                <div key={`d${i}`} style={{ ...card, border: `1px solid ${C.red}25` }}>
                  <div style={{ fontSize: 12, color: C.red, ...SF, marginBottom: 8, fontWeight: 600 }}>D{i + 1} — {q}</div>
                  <textarea value={weekAnswers[`d${i}`] || ""} onChange={e => setWeekAnswers({ ...weekAnswers, [`d${i}`]: e.target.value })} placeholder="Be specific — names, offers, blockers..." rows={2} style={{ ...inputSt, resize: "vertical", lineHeight: 1.5 }} />
                </div>
              ))}
            </div>

            {/* Team Check-in */}
            <div style={{ fontSize: 11, color: C.blue, ...SF, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 12 }}>🤝 Team Check-in</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 24 }}>
              {teamQuestions.map((q, i) => (
                <div key={`t${i}`} style={{ ...card, border: `1px solid ${C.blue}25` }}>
                  <div style={{ fontSize: 12, color: C.blue, ...SF, marginBottom: 8, fontWeight: 600 }}>T{i + 1} — {q}</div>
                  <textarea value={weekAnswers[`t${i}`] || ""} onChange={e => setWeekAnswers({ ...weekAnswers, [`t${i}`]: e.target.value })} placeholder="Partners, commitments, blockers..." rows={2} style={{ ...inputSt, resize: "vertical", lineHeight: 1.5 }} />
                </div>
              ))}
            </div>

            {/* Reflection Questions */}
            <div style={{ fontSize: 11, color: C.gold, ...SF, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 12 }}>🪞 Reflect</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 20 }}>
              {reflectionQuestions.map((q, i) => (
                <div key={`r${i}`} style={{ ...card }}>
                  <div style={{ fontSize: 12, color: C.gold, ...SF, marginBottom: 8, fontWeight: 600 }}>R{i + 1} — {q}</div>
                  <textarea value={weekAnswers[`r${i}`] || ""} onChange={e => setWeekAnswers({ ...weekAnswers, [`r${i}`]: e.target.value })} placeholder="Your answer this week..." rows={3} style={{ ...inputSt, resize: "vertical", lineHeight: 1.5 }} />
                </div>
              ))}
            </div>
            <button onClick={saveReview} style={{ background: reviewSaved ? C.green : C.gold, color: "#0D0F14", border: "none", borderRadius: 8, padding: "11px 28px", cursor: "pointer", fontSize: 14, fontWeight: 700, ...SF, transition: "all 0.3s" }}>
              {reviewSaved ? "✓ Review Saved!" : "Save This Week's Review"}
            </button>
            {Object.keys(savedReviews).length > 0 && (
              <div style={{ marginTop: 24 }}>
                <div style={{ fontSize: 11, color: C.textMute, ...SF, marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.1em" }}>Previous Reviews</div>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {Object.keys(savedReviews).sort((a, b) => Number(b) - Number(a)).map(wk => (
                    <button key={wk} onClick={() => { setWeekNumber(Number(wk)); setWeekAnswers(savedReviews[wk].answers); }} style={{ background: C.surface, border: `1px solid ${C.border}`, color: C.textDim, borderRadius: 6, padding: "6px 14px", cursor: "pointer", fontSize: 12, ...SF }}>
                      Week #{wk} <span style={{ color: C.textMute, fontSize: 10 }}>· {savedReviews[wk].date}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ══════════════ FINANCIAL ══════════════ */}
        {activeTab === "finance" && (
          <div>
            <p style={{ color: C.textDim, fontSize: 13, ...SF, marginBottom: 20, fontStyle: "italic" }}>Know your numbers exactly. The "min billing to resign" signal tells you when the transition is financially safe.</p>
            <div className="g2" style={{ marginBottom: 20 }}>
              <div style={{ ...card }}>
                <div style={{ fontSize: 11, color: C.gold, ...SF, fontWeight: 700, marginBottom: 14, textTransform: "uppercase", letterSpacing: "0.1em" }}>Personal Monthly Expenses (PHP)</div>
                {Object.entries({ rent: "Rent / Housing", food: "Food & Groceries", transport: "Transport", utilities: "Utilities & Telco", insurance: "Insurance & Health", other: "Other / Buffer" }).map(([key, label]) => (
                  <div key={key} style={{ marginBottom: 10 }}>
                    <div style={{ fontSize: 11, color: C.textDim, ...SF, marginBottom: 3 }}>{label}</div>
                    <input type="number" value={monthly[key]} onChange={e => { const n = { ...monthly, [key]: Number(e.target.value) }; setMonthly(n); saveFinancial({ monthly: n }); }} style={inputSt} />
                  </div>
                ))}
                <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 10, marginTop: 4, display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontSize: 12, color: C.textDim, ...SF }}>Personal Burn</span>
                  <span style={{ fontSize: 17, color: C.red, ...SF, fontWeight: 700 }}>₱{totalPersonalBurn.toLocaleString()}</span>
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <div style={{ ...card }}>
                  <div style={{ fontSize: 11, color: C.gold, ...SF, fontWeight: 700, marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.1em" }}>Business Overhead (PHP/mo)</div>
                  <input type="number" value={bizOverhead} onChange={e => { setBizOverhead(Number(e.target.value)); saveFinancial({ bizOverhead: Number(e.target.value) }); }} style={inputSt} />
                  <div style={{ fontSize: 11, color: C.textMute, ...SF, marginTop: 6 }}>Software licenses, insurance, professional memberships, admin</div>
                </div>
                <div style={{ ...card }}>
                  <div style={{ fontSize: 11, color: C.gold, ...SF, fontWeight: 700, marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.1em" }}>Savings / Runway Capital (PHP)</div>
                  <input type="number" value={savings} onChange={e => { setSavings(Number(e.target.value)); saveFinancial({ savings: Number(e.target.value) }); }} style={inputSt} />
                  <div style={{ marginTop: 12, padding: "12px 14px", background: runwayMonths >= 6 ? "#7EC9A215" : C.red + "12", border: `1px solid ${runwayMonths >= 6 ? C.green + "40" : C.red + "40"}`, borderRadius: 8, textAlign: "center" }}>
                    <div style={{ fontSize: 34, fontWeight: 700, color: runwayMonths >= 6 ? C.green : C.red, ...SF }}>{runwayMonths}</div>
                    <div style={{ fontSize: 11, color: C.textDim, ...SF }}>months personal runway</div>
                    <div style={{ fontSize: 11, color: runwayMonths >= 6 ? C.green : C.red, ...SF, marginTop: 3 }}>{runwayMonths >= 6 ? "✓ Runway is safe" : "⚠ Build more runway first"}</div>
                  </div>
                </div>
                <div style={{ ...card }}>
                  <div style={{ fontSize: 11, color: C.gold, ...SF, fontWeight: 700, marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.1em" }}>Assumptions</div>
                  <div style={{ display: "flex", gap: 10 }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 11, color: C.textDim, ...SF, marginBottom: 3 }}>Tax Rate (%)</div>
                      <input type="number" value={taxRate} onChange={e => { setTaxRate(Number(e.target.value)); saveFinancial({ taxRate: Number(e.target.value) }); }} style={inputSt} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 11, color: C.textDim, ...SF, marginBottom: 3 }}>Billable Utilization (%)</div>
                      <input type="number" value={utilization} onChange={e => { setUtilization(Number(e.target.value)); saveFinancial({ utilization: Number(e.target.value) }); }} style={inputSt} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Revenue target */}
            <div style={{ ...card, marginBottom: 16 }}>
              <div style={{ fontSize: 11, color: C.gold, ...SF, fontWeight: 700, marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.1em" }}>Projected Monthly Revenue (PHP)</div>
              <input type="number" value={projectedMonthly} onChange={e => { setProjectedMonthly(Number(e.target.value)); saveFinancial({ projectedMonthly: Number(e.target.value) }); }} placeholder="Enter projected monthly billings..." style={inputSt} />
              {projectedMonthly > 0 && (
                <div style={{ marginTop: 14, display: "flex", flexDirection: "column", gap: 6 }}>
                  {[
                    ["Revenue", `₱${Number(projectedMonthly).toLocaleString()}`, C.green],
                    ["Personal Burn", `-₱${totalPersonalBurn.toLocaleString()}`, C.red],
                    ["Business Overhead", `-₱${Number(bizOverhead).toLocaleString()}`, C.red],
                    ["Estimated Tax", `-₱${Math.round(projectedMonthly * taxRate / 100).toLocaleString()}`, C.orange],
                  ].map(([label, val, col]) => (
                    <div key={label} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: `1px solid ${C.borderSub}` }}>
                      <span style={{ fontSize: 12, color: C.textDim, ...SF }}>{label}</span>
                      <span style={{ fontSize: 13, color: col, ...SF, fontWeight: 600 }}>{val}</span>
                    </div>
                  ))}
                  <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0" }}>
                    <span style={{ fontSize: 13, color: C.text, ...SF, fontWeight: 700 }}>Net Monthly (est.)</span>
                    <span style={{ fontSize: 16, color: netMonthly >= 0 ? C.green : C.red, ...SF, fontWeight: 700 }}>{netMonthly >= 0 ? "+" : ""}₱{netMonthly.toLocaleString()}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Min billing to resign */}
            <div style={{ background: `linear-gradient(135deg,${C.gold}12,${C.surface})`, border: `1px solid ${C.gold}40`, borderRadius: 10, padding: "18px 22px" }}>
              <div style={{ fontSize: 11, color: C.gold, ...SF, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 6 }}>💡 Minimum Monthly Billing to Resign Safely</div>
              <div style={{ fontSize: 32, fontWeight: 700, color: C.gold, ...SF, marginBottom: 4 }}>₱{minBillingToResign.toLocaleString()}<span style={{ fontSize: 13, fontWeight: 400 }}>/mo</span></div>
              <div style={{ fontSize: 12, color: C.textDim, ...SF }}>Covers personal burn + business overhead + {taxRate}% tax reserve, at {utilization}% utilization. This is the number to hit consistently before handing in notice.</div>
            </div>
          </div>
        )}

        {/* ══════════════ RESOURCES ══════════════ */}
        {activeTab === "resources" && (
          <div>
            <div className="sub-tab-bar">
              {[["training","📚 Training"],["mindset","🧠 Mindset"],["aiworkflow","🤖 AI Workflow"],["pricing","🏷 Pricing"],["clients","🎯 Clients"],["risks","⚠ Risks"]].map(([id, label]) => (
                <button key={id} onClick={() => setActiveResourceTab(id)} style={{ padding: "7px 14px", borderRadius: 6, border: activeResourceTab === id ? `1.5px solid ${C.gold}` : `1.5px solid ${C.border}`, background: activeResourceTab === id ? `${C.gold}15` : "transparent", color: activeResourceTab === id ? C.gold : C.textMute, cursor: "pointer", fontSize: 12, ...SF, fontWeight: activeResourceTab === id ? 600 : 400, transition: "all 0.15s" }}>{label}</button>
              ))}
            </div>

            {/* Training */}
            {activeResourceTab === "training" && (
              <div>
                <p style={{ color: C.textDim, fontSize: 13, ...SF, marginBottom: 18, fontStyle: "italic" }}>Structured learning across credentials, courtroom skills, and BI technique. Prioritize HIGH items first.</p>
                {trainingResources.map((cat, ci) => (
                  <div key={ci} style={{ marginBottom: 22 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                      <span style={{ fontSize: 15 }}>{cat.icon}</span>
                      <span style={{ fontSize: 11, color: cat.color, ...SF, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>{cat.category}</span>
                    </div>
                    {cat.items.map((item, ii) => {
                      const key = `${ci}-${ii}`;
                      const open = expandedTraining === key;
                      return (
                        <div key={ii} onClick={() => setExpandedTraining(open ? null : key)} style={{ ...card, cursor: "pointer", marginBottom: 7 }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 8, justifyContent: "space-between" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                              <span style={{ fontSize: 13.5, color: C.text, ...SF, fontWeight: 500 }}>{item.name}</span>
                              <span style={{ background: `${urgencyColors[item.urgency]}18`, border: `1px solid ${urgencyColors[item.urgency]}40`, color: urgencyColors[item.urgency], borderRadius: 10, padding: "1px 7px", fontSize: 9, ...SF, fontWeight: 700 }}>{item.urgency}</span>
                              <span style={{ fontSize: 10, color: C.textMute, ...SF, background: C.borderSub, borderRadius: 10, padding: "1px 7px" }}>{item.type}</span>
                            </div>
                            <span style={{ color: C.textMute, fontSize: 11 }}>{open ? "▲" : "▼"}</span>
                          </div>
                          <div style={{ fontSize: 11, color: C.textMute, ...SF, marginTop: 2 }}>{item.org}</div>
                          {open && (
                            <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 10, marginTop: 10 }}>
                              <p style={{ color: C.textMid, fontSize: 13, ...SF, margin: "0 0 10px", lineHeight: 1.6 }}>{item.note}</p>
                              {item.url && <a href={item.url} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} style={{ display: "inline-flex", alignItems: "center", gap: 6, background: `${cat.color}15`, border: `1px solid ${cat.color}40`, color: cat.color, borderRadius: 6, padding: "6px 14px", fontSize: 12, ...SF, textDecoration: "none", fontWeight: 600 }}>🔗 Open →</a>}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            )}

            {/* Mindset */}
            {activeResourceTab === "mindset" && (
              <div>
                <p style={{ color: C.textDim, fontSize: 13, ...SF, marginBottom: 16, fontStyle: "italic" }}>Rewiring your mindset is as important as your credentials. Expert witnesses are tested psychologically before they are tested legally.</p>
                <div style={{ display: "flex", gap: 7, marginBottom: 18, flexWrap: "wrap" }}>
                  {mindsetPillars.map((p, i) => (
                    <button key={i} onClick={() => setActiveMindset(i)} style={{ padding: "6px 13px", borderRadius: 6, border: activeMindset === i ? `1.5px solid ${p.color}` : `1.5px solid ${C.border}`, background: activeMindset === i ? `${p.color}15` : "transparent", color: activeMindset === i ? p.color : C.textMute, cursor: "pointer", fontSize: 12, ...SF, display: "flex", alignItems: "center", gap: 5, fontWeight: activeMindset === i ? 600 : 400 }}>
                      <span>{p.icon}</span><span>{p.title}</span>
                    </button>
                  ))}
                </div>
                {(() => {
                  const p = mindsetPillars[activeMindset];
                  return (
                    <div style={{ background: C.surface, border: `1px solid ${p.color}30`, borderLeft: `3px solid ${p.color}`, borderRadius: 10, padding: "22px 26px" }}>
                      <div style={{ fontSize: 20, marginBottom: 8 }}>{p.icon}</div>
                      <h2 style={{ margin: "0 0 4px", fontSize: 17, fontWeight: 400, color: C.text }}>{p.title}</h2>
                      <p style={{ color: C.textDim, fontSize: 13, ...SF, marginBottom: 18, marginTop: 0, fontStyle: "italic" }}>{p.subtitle}</p>
                      {p.practices.map((prac, i) => (
                        <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 12 }}>
                          <div style={{ width: 22, height: 22, borderRadius: "50%", background: `${p.color}18`, border: `1px solid ${p.color}35`, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", marginTop: 1 }}>
                            <span style={{ fontSize: 10, color: p.color, ...SF, fontWeight: 700 }}>{i + 1}</span>
                          </div>
                          <p style={{ color: C.textMid, fontSize: 13.5, ...SF, margin: 0, lineHeight: 1.6 }}>{prac}</p>
                        </div>
                      ))}
                    </div>
                  );
                })()}
              </div>
            )}

            {/* AI Workflow */}
            {activeResourceTab === "aiworkflow" && (
              <div>
                <div style={{ ...card, border: `1px solid ${C.gold}30`, marginBottom: 20 }}>
                  <div style={{ fontSize: 10, color: C.gold, textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 6, ...SF }}>🤖 Your AI Advantage</div>
                  <p style={{ color: C.textMid, fontSize: 13, lineHeight: 1.8, margin: 0 }}>CPA + CIA + AU experience combined with <strong style={{ color: C.text }}>AI-augmented analytical capacity</strong> that most PH forensic practitioners don't have. Copy any prompt, paste it into Claude with your actual data, and iterate. <strong style={{ color: C.gold }}>You do the judgment. AI does the computation and drafting.</strong></p>
                </div>
                <div style={{ display: "flex", gap: 7, marginBottom: 20, flexWrap: "wrap" }}>
                  {aiWorkflows.map(wf => {
                    const isActive = activeAIWorkflow === wf.id;
                    return <button key={wf.id} onClick={() => { setActiveAIWorkflow(wf.id); setActiveUseCase(0); }} style={{ padding: "7px 13px", borderRadius: 6, border: isActive ? `1.5px solid ${wf.color}` : `1.5px solid ${C.border}`, background: isActive ? `${wf.color}15` : "transparent", color: isActive ? wf.color : C.textMute, cursor: "pointer", fontSize: 12, ...SF, display: "flex", alignItems: "center", gap: 5, fontWeight: isActive ? 600 : 400 }}><span>{wf.icon}</span><span>{wf.title}</span></button>;
                  })}
                </div>
                {(() => {
                  const wf = aiWorkflows.find(w => w.id === activeAIWorkflow);
                  if (!wf) return null;
                  const uc = wf.usecases[activeUseCase];
                  return (
                    <div>
                      <div style={{ background: C.surface, border: `1px solid ${wf.color}30`, borderLeft: `3px solid ${wf.color}`, borderRadius: 10, padding: "18px 22px", marginBottom: 14 }}>
                        <div style={{ fontSize: 20, marginBottom: 6 }}>{wf.icon}</div>
                        <h2 style={{ margin: "0 0 4px", fontSize: 17, fontWeight: 400, color: C.text }}>{wf.title}</h2>
                        <p style={{ color: C.textDim, fontSize: 13, ...SF, margin: "0 0 8px", fontStyle: "italic" }}>{wf.subtitle}</p>
                        <div style={{ display: "inline-flex", alignItems: "center", gap: 5, background: `${wf.color}12`, border: `1px solid ${wf.color}30`, borderRadius: 6, padding: "4px 10px" }}>
                          <span style={{ fontSize: 11, color: wf.color, ...SF }}>⚡ {wf.edge}</span>
                        </div>
                      </div>
                      <div style={{ display: "flex", gap: 6, marginBottom: 14, flexWrap: "wrap" }}>
                        {wf.usecases.map((u, i) => <button key={i} onClick={() => setActiveUseCase(i)} style={{ padding: "6px 12px", borderRadius: 6, border: activeUseCase === i ? `1.5px solid ${wf.color}` : `1.5px solid ${C.border}`, background: activeUseCase === i ? `${wf.color}12` : "transparent", color: activeUseCase === i ? wf.color : C.textMute, cursor: "pointer", fontSize: 12, ...SF }}>{u.label}</button>)}
                      </div>
                      <div style={{ background: "#0a0c10", border: `1px solid ${wf.color}25`, borderRadius: 10, overflow: "hidden" }}>
                        <div style={{ padding: "12px 16px", borderBottom: `1px solid ${C.borderSub}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <div>
                            <div style={{ fontSize: 13, color: C.text, fontWeight: 600, ...SF }}>{uc.label}</div>
                            <div style={{ fontSize: 11, color: C.textMute, ...SF, marginTop: 2 }}>📌 Use when: {uc.when}</div>
                          </div>
                          <button onClick={() => { navigator.clipboard.writeText(uc.prompt); setCopiedPrompt(uc.label); setTimeout(() => setCopiedPrompt(null), 2000); }} style={{ background: copiedPrompt === uc.label ? C.green : `${wf.color}18`, border: `1px solid ${copiedPrompt === uc.label ? C.green : wf.color + "50"}`, color: copiedPrompt === uc.label ? "#0D0F14" : wf.color, borderRadius: 6, padding: "6px 13px", cursor: "pointer", fontSize: 12, ...SF, fontWeight: 600, transition: "all 0.3s", whiteSpace: "nowrap" }}>
                            {copiedPrompt === uc.label ? "✓ Copied!" : "📋 Copy"}
                          </button>
                        </div>
                        <div style={{ padding: "16px 18px" }}>
                          <pre style={{ color: "#A8C4A0", fontSize: 12, lineHeight: 1.8, margin: 0, whiteSpace: "pre-wrap", wordBreak: "break-word", ...SF, fontFamily: "'Courier New', monospace" }}>{uc.prompt}</pre>
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>
            )}

            {/* Pricing */}
            {activeResourceTab === "pricing" && (
              <div>
                <p style={{ color: C.textDim, fontSize: 13, ...SF, marginBottom: 18, fontStyle: "italic" }}>Reference pricing for your three core service lines. Always anchor to value delivered, not hours worked.</p>
                {pricingServices.map((svc, si) => (
                  <div key={si} style={{ marginBottom: 26 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                      <span style={{ fontSize: 18 }}>{svc.icon}</span>
                      <h3 style={{ margin: 0, fontSize: 16, fontWeight: 400, color: svc.color }}>{svc.title}</h3>
                    </div>
                    <p style={{ color: C.textDim, fontSize: 13, ...SF, marginBottom: 12, lineHeight: 1.6 }}>{svc.desc}</p>
                    {svc.tiers.map((tier, ti) => (
                      <div key={ti} style={{ background: C.surface, border: `1px solid ${svc.color}22`, borderLeft: `3px solid ${svc.color}`, borderRadius: 8, padding: "12px 16px", marginBottom: 7 }}>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 6, marginBottom: 4 }}>
                          <span style={{ fontSize: 13, color: C.text, fontWeight: 600, ...SF }}>{tier.tier}</span>
                          <div style={{ display: "flex", gap: 8 }}>
                            <span style={{ fontSize: 13, color: svc.color, ...SF, fontWeight: 700 }}>{tier.php}</span>
                            {tier.usd !== "N/A" && <span style={{ fontSize: 11, color: C.textMute, ...SF }}>{tier.usd}</span>}
                          </div>
                        </div>
                        <div style={{ fontSize: 12, color: C.textDim, ...SF, marginBottom: 3 }}>{tier.scope}</div>
                        <div style={{ fontSize: 11, color: C.textMute, ...SF, fontStyle: "italic" }}>{tier.note}</div>
                      </div>
                    ))}
                  </div>
                ))}
                <div style={{ ...card, border: `1px solid ${C.gold}30` }}>
                  <div style={{ fontSize: 10, color: C.gold, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8, ...SF }}>💡 Pricing Principles</div>
                  {["Never price on hours alone — price on the value of what you find (or prevent).", "Your first instinct will be to underprice. Resist it — price on AU-comparable value.", "Always quote in writing with a clear scope. Scope creep is the silent margin killer.", "For expert witness work, charge a non-refundable retainer upfront.", "Revisit your rates every 6 months. As your track record grows, so should your fees."].map((pt, i) => (
                    <div key={i} style={{ display: "flex", gap: 9, alignItems: "flex-start", marginBottom: 8 }}>
                      <span style={{ color: C.gold, fontSize: 12, marginTop: 1, flexShrink: 0 }}>→</span>
                      <span style={{ color: C.textMid, fontSize: 13, lineHeight: 1.5, ...SF }}>{pt}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Clients */}
            {activeResourceTab === "clients" && (
              <div>
                <p style={{ color: C.textDim, fontSize: 13, ...SF, marginBottom: 18, fontStyle: "italic" }}>Six best-fit target profiles — ranked by how well your CPA + CIA + BI credentials match their needs.</p>
                {clients.map((cl, i) => (
                  <div key={i} style={{ ...card, display: "flex", alignItems: "flex-start", gap: 14, marginBottom: 10 }}>
                    <div style={{ fontSize: 24, flexShrink: 0, marginTop: 2 }}>{cl.icon}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 5, flexWrap: "wrap" }}>
                        <span style={{ fontSize: 14, color: C.text, fontWeight: 600, ...SF }}>{cl.name}</span>
                        {cl.credential.split(" + ").map(cr => <span key={cr} style={{ background: `${C.gold}15`, border: `1px solid ${C.gold}35`, color: C.gold, borderRadius: 20, padding: "1px 8px", fontSize: 9, ...SF }}>{cr}</span>)}
                      </div>
                      <p style={{ color: C.textDim, fontSize: 13, ...SF, margin: 0, lineHeight: 1.6 }}>{cl.why}</p>
                    </div>
                    <div style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: 6, padding: "2px 8px", fontSize: 10, color: C.textMute, ...SF, flexShrink: 0 }}>#{i + 1}</div>
                  </div>
                ))}
              </div>
            )}

            {/* Risks */}
            {activeResourceTab === "risks" && (
              <div>
                <p style={{ color: C.textDim, fontSize: 13, ...SF, marginBottom: 18, fontStyle: "italic" }}>Specific risks for a credentialed forensic professional going independent — beyond the usual startup concerns.</p>
                <div className="g2">
                  {risks.map((r, i) => (
                    <div key={i} style={{ ...card }}>
                      <div style={{ fontSize: 20, marginBottom: 8 }}>{r.icon}</div>
                      <div style={{ color: "#E8C98E", ...SF, fontSize: 13, fontWeight: 600, marginBottom: 5 }}>{r.label}</div>
                      <div style={{ color: C.textDim, fontSize: 12, ...SF, lineHeight: 1.6 }}>{r.note}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ══════════════ TRACK 2: EXPERT WITNESS ══════════════ */}
        {activeTab === "track2" && (
          <div>
            {!track2Unlocked && (
              <div style={{ background: `${C.red}12`, border: `1px solid ${C.red}40`, borderRadius: 10, padding: "16px 20px", marginBottom: 20 }}>
                <div style={{ fontSize: 13, color: C.red, ...SF, fontWeight: 600, marginBottom: 4 }}>🔒 Track 2 Locked</div>
                <div style={{ fontSize: 13, color: C.textMid, ...SF, lineHeight: 1.6 }}>Expert Witness Track 2 unlocks after you clear <strong style={{ color: C.text }}>Phase C Gate</strong> — 1 paid engagement, 1 testimonial, 1 case study, pipeline alive. This sequencing is intentional: first revenue, then authority expansion.</div>
              </div>
            )}
            <div style={{ ...card, border: `1px solid ${C.orange}30`, marginBottom: 20 }}>
              <div style={{ fontSize: 10, color: C.orange, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 6, ...SF }}>⚠ Reputation is the Product</div>
              <p style={{ color: C.textMid, fontSize: 13, lineHeight: 1.7, margin: 0 }}>The expert witness route demands an <strong style={{ color: C.text }}>impeccable professional and personal reputation</strong>. Courts expect objectivity, not advocacy. Your CPA license, CIA standing, and conduct history are all discoverable. Build this pathway only from complete ethical clarity.</p>
            </div>
            <div style={{ display: "flex", gap: 7, marginBottom: 18, flexWrap: "wrap" }}>
              {expertWitnessPhases.map(p => {
                const done = p.tasks.filter(t => completed[t.id]).length;
                const isActive = activeEWPhase === p.id;
                return (
                  <button key={p.id} onClick={() => setActiveEWPhase(p.id)} style={{ padding: "6px 13px", borderRadius: 6, border: isActive ? `1.5px solid ${p.color}` : `1.5px solid ${C.border}`, background: isActive ? `${p.color}15` : "transparent", color: isActive ? p.color : C.textMute, cursor: "pointer", fontSize: 12, ...SF, display: "flex", alignItems: "center", gap: 5, fontWeight: isActive ? 600 : 400, opacity: !track2Unlocked ? 0.5 : 1 }}>
                    <span>{p.icon}</span><span>{p.label}</span>
                    {done > 0 && <span style={{ background: p.color, color: "#0D0F14", borderRadius: 10, padding: "0 5px", fontSize: 9, fontWeight: 700 }}>{done}/{p.tasks.length}</span>}
                  </button>
                );
              })}
            </div>
            {(() => {
              const p = expertWitnessPhases.find(ph => ph.id === activeEWPhase);
              if (!p) return null;
              return (
                <div style={{ background: C.surface, border: `1px solid ${p.color}30`, borderLeft: `3px solid ${p.color}`, borderRadius: 10, padding: "22px 26px" }}>
                  <div style={{ fontSize: 10, color: p.color, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 4, ...SF }}>{p.label} · {p.timeframe}</div>
                  <h2 style={{ margin: "0 0 6px", fontSize: 17, fontWeight: 400, color: C.text }}>{p.icon} {p.title}</h2>
                  <p style={{ color: C.textDim, fontSize: 13, ...SF, marginBottom: 18, marginTop: 4, fontStyle: "italic" }}>{p.context}</p>
                  {p.tasks.map(task => {
                    const done = completed[task.id];
                    return (
                      <div key={task.id} onClick={() => !(!track2Unlocked) && toggleTask(task.id)} style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "11px 13px", borderRadius: 7, background: done ? `${p.color}08` : C.bg, border: `1px solid ${done ? p.color + "35" : C.borderSub}`, cursor: !track2Unlocked ? "not-allowed" : "pointer", transition: "all 0.15s", marginBottom: 7, opacity: !track2Unlocked ? 0.5 : 1 }}>
                        <div style={{ width: 18, height: 18, borderRadius: 4, flexShrink: 0, marginTop: 1, border: `1.5px solid ${done ? p.color : "#3a3f50"}`, background: done ? p.color : "transparent", display: "flex", alignItems: "center", justifyContent: "center" }}>
                          {done && <span style={{ color: "#0D0F14", fontSize: 11, fontWeight: 700 }}>✓</span>}
                        </div>
                        <span style={{ ...SF, fontSize: 13.5, color: done ? C.textMute : C.textMid, textDecoration: done ? "line-through" : "none", lineHeight: 1.5 }}>{task.text}</span>
                      </div>
                    );
                  })}
                </div>
              );
            })()}
          </div>
        )}

        {/* ══════════════ MILESTONES ══════════════ */}
        {activeTab === "milestones" && (
          <div>
            <p style={{ color: C.textDim, fontSize: 13, ...SF, marginBottom: 8, fontStyle: "italic" }}>Every milestone deserves to be marked. Click to record the date you achieved it.</p>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 22, ...SF }}>
              <div style={{ flex: 1, height: 5, background: C.borderSub, borderRadius: 3, overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${Math.round((achievedCount / milestonesList.length) * 100)}%`, background: `linear-gradient(90deg,${C.green},#A8E8C0)`, borderRadius: 3, transition: "width 0.4s" }} />
              </div>
              <span style={{ fontSize: 12, color: C.green, whiteSpace: "nowrap" }}>{achievedCount} / {milestonesList.length} achieved</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {milestonesList.map(m => {
                const done = achieved[m.id];
                return (
                  <div key={m.id} onClick={() => toggleMilestone(m.id)} style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 18px", borderRadius: 9, background: done ? `${C.green}12` : C.surface, border: `1px solid ${done ? C.green + "35" : C.border}`, cursor: "pointer", transition: "all 0.2s" }}>
                    <div style={{ fontSize: 22, flexShrink: 0, opacity: done ? 1 : 0.35 }}>{done ? "🎉" : m.icon}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 14, color: done ? C.text : C.textDim, ...SF, fontWeight: done ? 600 : 400 }}>{m.title}</div>
                      <div style={{ fontSize: 12, color: C.textMute, ...SF, marginTop: 2 }}>{m.desc}</div>
                      {done && milestoneDate[m.id] && <div style={{ fontSize: 11, color: C.green, ...SF, marginTop: 4 }}>✓ Achieved: {milestoneDate[m.id]}</div>}
                    </div>
                    <div style={{ width: 20, height: 20, borderRadius: "50%", border: `2px solid ${done ? C.green : "#3a3f50"}`, background: done ? C.green : "transparent", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s" }}>
                      {done && <span style={{ color: "#0D0F14", fontSize: 11, fontWeight: 700 }}>✓</span>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
