// ─── CLIENT PHASES ────────────────────────────────────────────────────────────
const clientPhases = [
  {
    id: "C1", label: "Phase 1", title: "Qualification & Opportunity",
    timeframe: "Week 1–2", color: "blue", icon: "🎯",
    context: "Before committing delivery resources, qualify the opportunity. Is the scope clear? Is the client ready? Is the budget confirmed? A bad engagement that starts fast is worse than a good engagement that starts right.",
    gate: {
      label: "Gate 1 — Opportunity Qualified",
      criteria: [
        { id: "gC1a", text: "Client brief received and reviewed — problem statement is clear" },
        { id: "gC1b", text: "Budget range confirmed — within acceptable engagement size" },
        { id: "gC1c", text: "Data availability confirmed — key sources identified and accessible" },
        { id: "gC1d", text: "Decision maker identified and reachable — not just a coordinator" },
        { id: "gC1e", text: "No conflict of interest — independence confirmed" },
      ]
    },
    tasks: [
      { id: "C1a", text: "Conduct qualification call — confirm problem, budget, timeline, and data access", priority: "Must" },
      { id: "C1b", text: "Confirm independence — check for conflicts of interest before proceeding", priority: "Must" },
      { id: "C1c", text: "Identify the real decision maker — who can sign the engagement letter", priority: "Must" },
      { id: "C1d", text: "Assess data readiness: what systems, formats, and volumes are involved", priority: "Must" },
      { id: "C1e", text: "Check engagement fit: does this require your specific forensic BI credentials", priority: "Must" },
      { id: "C1f", text: "Document the opportunity in pipeline with stage, owner, and next action", priority: "Should" },
    ]
  },
  {
    id: "C2", label: "Phase 2", title: "Scope & Proposal",
    timeframe: "Week 2–4", color: "gold", icon: "📄",
    context: "A clear scope protects both sides. Define exactly what you will deliver, what you will not, and what you need from the client. Scope creep starts here if you are not precise.",
    gate: {
      label: "Gate 2 — Engagement Signed",
      criteria: [
        { id: "gC2a", text: "Scope of work document finalized — deliverables, exclusions, and assumptions listed" },
        { id: "gC2b", text: "Timeline confirmed with milestones and client review checkpoints" },
        { id: "gC2c", text: "Fee and payment schedule agreed and confirmed in writing" },
        { id: "gC2d", text: "Engagement letter and NDA signed by client" },
        { id: "gC2e", text: "Data access and confidentiality protocol agreed" },
      ]
    },
    tasks: [
      { id: "C2a", text: "Draft scope of work: objectives, deliverables, exclusions, and key assumptions", priority: "Must" },
      { id: "C2b", text: "Set timeline with milestones — include client review and approval checkpoints", priority: "Must" },
      { id: "C2c", text: "Finalize fee structure and payment schedule — get written confirmation", priority: "Must" },
      { id: "C2d", text: "Send engagement letter and NDA — follow up until signed, do not start without it", priority: "Must" },
      { id: "C2e", text: "Agree data access protocol: how data will be shared, stored, and destroyed after engagement", priority: "Must" },
      { id: "C2f", text: "Clarify change-of-scope process — how additional work is requested and priced", priority: "Should" },
    ]
  },
  {
    id: "C3", label: "Phase 3", title: "Kickoff & Data Access",
    timeframe: "Week 4–6", color: "green", icon: "🚀",
    context: "Get the engagement started cleanly. Introductions, data access, and the first working session set the tone for everything that follows. Delays here compound through the whole timeline.",
    gate: {
      label: "Gate 3 — Data Access Confirmed",
      criteria: [
        { id: "gC3a", text: "Kickoff meeting completed — client team and delivery team introduced" },
        { id: "gC3b", text: "All required data files received or system access granted" },
        { id: "gC3c", text: "Data quality assessed — gaps or issues documented and communicated to client" },
        { id: "gC3d", text: "Delivery timeline reconfirmed after data review" },
        { id: "gC3e", text: "Primary client contact confirmed for day-to-day communication" },
      ]
    },
    tasks: [
      { id: "C3a", text: "Run kickoff meeting — present scope, timeline, team roles, and communication protocol", priority: "Must" },
      { id: "C3b", text: "Receive and validate all required data — flag missing or incomplete sources immediately", priority: "Must" },
      { id: "C3c", text: "Assess data quality: completeness, consistency, anomalies — document findings", priority: "Must" },
      { id: "C3d", text: "Reconfirm delivery timeline after data assessment — adjust if data quality requires it", priority: "Must" },
      { id: "C3e", text: "Confirm primary contact and escalation path for blockers", priority: "Must" },
      { id: "C3f", text: "Set up secure data environment: storage, access controls, encryption", priority: "Must" },
    ]
  },
  {
    id: "C4", label: "Phase 4", title: "Analysis & Findings",
    timeframe: "Week 5–10", color: "purple", icon: "🔍",
    context: "This is the core of the engagement. Follow your methodology. Document every finding as you go. Flag anomalies early — do not save surprises for the final report.",
    gate: {
      label: "Gate 4 — Findings Complete",
      criteria: [
        { id: "gC4a", text: "All analytical procedures completed and documented" },
        { id: "gC4b", text: "Findings reviewed internally — methodology and conclusions defensible" },
        { id: "gC4c", text: "Client interim update delivered — no surprises at final report" },
        { id: "gC4d", text: "Draft report prepared with findings, visualizations, and recommendations" },
        { id: "gC4e", text: "Any scope changes during analysis are documented and agreed in writing" },
      ]
    },
    tasks: [
      { id: "C4a", text: "Execute all analytical procedures per your documented methodology", priority: "Must" },
      { id: "C4b", text: "Document each finding as you go — do not rely on memory at report stage", priority: "Must" },
      { id: "C4c", text: "Flag material anomalies to client immediately — do not wait for final report", priority: "Must" },
      { id: "C4d", text: "Conduct internal findings review — are conclusions supported by evidence?", priority: "Must" },
      { id: "C4e", text: "Deliver interim progress update to client — reconfirm timeline and any changes", priority: "Must" },
      { id: "C4f", text: "Prepare draft report: executive summary, findings, visualizations, recommendations", priority: "Must" },
      { id: "C4g", text: "Document any scope changes that emerged during analysis — agree in writing", priority: "Should" },
    ]
  },
  {
    id: "C5", label: "Phase 5", title: "Reporting & Handover",
    timeframe: "Week 9–12", color: "orange", icon: "📊",
    context: "Deliver clearly, present confidently, and make it easy for the client to act on your findings. The quality of your report is the main thing clients will remember and share with referrers.",
    gate: {
      label: "Gate 5 — Engagement Delivered",
      criteria: [
        { id: "gC5a", text: "Final report submitted and accepted by client" },
        { id: "gC5b", text: "Findings presentation delivered to decision makers" },
        { id: "gC5c", text: "Final invoice submitted" },
        { id: "gC5d", text: "All client data returned or securely destroyed per agreed protocol" },
        { id: "gC5e", text: "Written testimonial or reference letter requested" },
      ]
    },
    tasks: [
      { id: "C5a", text: "Finalize report — executive summary, findings, visualizations, recommendations", priority: "Must" },
      { id: "C5b", text: "Present findings to decision makers — prepare for questions and pushback", priority: "Must" },
      { id: "C5c", text: "Submit final invoice on or before the agreed date", priority: "Must" },
      { id: "C5d", text: "Return or destroy all client data per the agreed confidentiality protocol", priority: "Must" },
      { id: "C5e", text: "Request written testimonial — make it easy with a brief template or talking points", priority: "Must" },
      { id: "C5f", text: "Write anonymized case study for capability deck and future pitches", priority: "Should" },
    ]
  },
  {
    id: "C6", label: "Phase 6", title: "Closeout & Expansion",
    timeframe: "Week 12+", color: "red", icon: "🔄",
    context: "A closed engagement is not the end — it is the start of the next one. Collect payment, debrief internally, and look for the expansion opportunity before the relationship goes cold.",
    gate: {
      label: "Gate 6 — Engagement Closed",
      criteria: [
        { id: "gC6a", text: "Final payment collected" },
        { id: "gC6b", text: "Internal post-engagement debrief completed" },
        { id: "gC6c", text: "Testimonial or reference letter received" },
        { id: "gC6d", text: "Follow-up conversation with client — retainer or next engagement discussed" },
        { id: "gC6e", text: "Case study or anonymized example documented for future use" },
      ]
    },
    tasks: [
      { id: "C6a", text: "Confirm final payment received — follow up immediately if overdue", priority: "Must" },
      { id: "C6b", text: "Conduct internal debrief: what worked, what didn't, what to do differently", priority: "Must" },
      { id: "C6c", text: "Follow up with client 2 weeks post-delivery — ask about impact and next needs", priority: "Must" },
      { id: "C6d", text: "Present retainer or monitoring offer — frame it as a continuation, not a new sale", priority: "Must" },
      { id: "C6e", text: "Update capability deck with new case study and any credential changes", priority: "Should" },
      { id: "C6f", text: "Ask for a referral — warm introductions from satisfied clients are your best pipeline", priority: "Should" },
    ]
  },
];
