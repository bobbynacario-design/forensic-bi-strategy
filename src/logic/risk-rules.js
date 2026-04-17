// ─── TOP RISK COMPUTATION ─────────────────────────────────────────────────────
function computeTopRisk(ctx) {
  const { mode, runwayMonths, prospects, currentPhase, currentPhaseId,
          completed, taskOwners, enclaveLink, gateCriteriaDone, gateTotal,
          gateClear, risks } = ctx;

  const mustTasks  = currentPhase.tasks.filter(t => t.priority === "Must");
  const mustDone   = mustTasks.filter(t => completed[t.id]).length;
  const mustTotal  = mustTasks.length;
  const runwayNote = `Only ${runwayMonths} month${runwayMonths === 1 ? "" : "s"} of runway remaining.`;
  const unownedMust = mustTasks.filter(t => !completed[t.id] && !taskOwners[t.id]);

  const riskRules = [
    // ── 1. Critical runway — fires in all modes, label/note varies ────────────
    {
      when: ({ runwayMonths }) => runwayMonths > 0 && runwayMonths < 4,
      build: ({ mode, runwayMonths }) => {
        const base = `Only ${runwayMonths} month${runwayMonths === 1 ? "" : "s"} of runway remaining.`;
        const note =
          mode === "partnership" ? `${base} Review partner capital contributions and shared burn before anything else.`
        : mode === "client"      ? `${base} Review billing schedule and outstanding invoices immediately.`
        :                          `${base} Adjust spending or accelerate first revenue before anything else.`;
        const label =
          mode === "partnership" ? "Critical shared runway" : "Critical runway";
        return { icon: "💸", label, note };
      },
    },

    // ── 2. No shared workspace — partnership (required) and client (required) ─
    {
      when: ({ mode, enclaveLink }) =>
        mode !== "solo" && enclaveLink.status !== "linked",
      build: ({ mode }) => ({
        icon: "🔗",
        label: mode === "partnership" ? "No shared workspace" : "No engagement workspace",
        note:  mode === "partnership"
          ? "Your Enclave collaboration space is not linked. Partners cannot coordinate without a shared workspace."
          : "Link an Enclave project to coordinate your delivery team and track files and tasks.",
      }),
    },

    // ── 3. Unowned Must tasks — partnership and client only ───────────────────
    {
      when: ({ mode, unownedMust }) =>
        mode !== "solo" && unownedMust.length > 0,
      build: ({ mode, unownedMust }) => {
        const n = unownedMust.length;
        const plural = n > 1 ? "s have" : " has";
        return {
          icon: "👤",
          label: mode === "partnership" ? "Unassigned Must tasks" : "Unassigned deliverables",
          note:  mode === "partnership"
            ? `${n} Must task${plural} no owner. Go to the Roadmap tab and assign them to a partner.`
            : `${n} Must task${plural} no assigned team member. Assign ownership before the next client check-in.`,
        };
      },
    },

    // ── 3b. Stale high-value deals — proposal or meeting, no movement in 14d ──
    {
      when: ({ prospects }) => {
        const STALE_MS = 14 * 24 * 60 * 60 * 1000;
        const now = Date.now();
        return prospects.some(p =>
          (p.stage === "proposal" || p.stage === "meeting") &&
          p.lastUpdated && (now - p.lastUpdated) > STALE_MS
        );
      },
      build: ({ prospects }) => {
        const STALE_MS = 14 * 24 * 60 * 60 * 1000;
        const now = Date.now();
        const stale = prospects.filter(p =>
          (p.stage === "proposal" || p.stage === "meeting") &&
          p.lastUpdated && (now - p.lastUpdated) > STALE_MS
        );
        const n = stale.length;
        const names = stale.slice(0, 2).map(p => p.name).join(", ");
        const tail = n > 2 ? ` and ${n - 2} more` : "";
        return {
          icon: "⏰",
          label: `${n} stale deal${n > 1 ? "s" : ""}`,
          note: `${names}${tail} — no movement in 14+ days. Follow up or move to a different stage.`,
        };
      },
    },

    // ── 4. Empty pipeline — all modes (client surfaces open proposals first) ──
    {
      when: ({ mode, prospects }) =>
        mode === "client"
          ? prospects.filter(p => p.stage === "proposal").length > 0
          : prospects.length === 0,
      build: ({ mode, prospects }) => {
        if (mode === "client") {
          const n = prospects.filter(p => p.stage === "proposal").length;
          return {
            icon: "📄",
            label: "Open proposals",
            note: `You have ${n} proposal${n > 1 ? "s" : ""} awaiting response. Follow up before momentum stalls.`,
          };
        }
        return {
          icon: "🎯",
          label: "Empty pipeline",
          note: mode === "partnership"
            ? "No prospects tracked. Assign deal owners and add targets to the Pipeline tab."
            : "No prospects tracked. Add targets to the Pipeline tab before momentum stalls.",
        };
      },
    },

    // ── 5. Phase behind (<30% Must tasks done) ────────────────────────────────
    {
      when: ({ mustTotal, mustDone }) => mustTotal > 0 && mustDone / mustTotal < 0.3,
      build: ({ mode, currentPhaseId }) => ({
        icon: "⏱",
        label: mode === "client" ? "Engagement behind schedule" : `Phase ${currentPhaseId} behind`,
        note:  mode === "partnership"
          ? `Under 30% of Phase ${currentPhaseId} Must tasks complete. Review ownership and unblock together.`
          : mode === "client"
          ? `Under 30% of Phase ${currentPhaseId} Must tasks complete. Review delivery timeline with the client.`
          : `Under 30% of Phase ${currentPhaseId} Must tasks complete. Focus here before taking on anything new.`,
      }),
    },

    // ── 6. Gate not cleared — solo and partnership ────────────────────────────
    {
      when: ({ mode, currentPhaseId, gateClear }) =>
        mode !== "client" && !gateClear(currentPhaseId),
      build: ({ mode, currentPhaseId, gateCriteriaDone, gateTotal }) => ({
        icon: "🚧",
        label: `Gate ${currentPhaseId} not cleared`,
        note: `${gateCriteriaDone(currentPhaseId)}/${gateTotal(currentPhaseId)} gate criteria met. Clear ${mode === "partnership" ? "as a team " : ""}before advancing.`,
      }),
    },

    // ── 7. No Enclave link — solo (optional nudge) ────────────────────────────
    {
      when: ({ mode, enclaveLink }) =>
        mode === "solo" && enclaveLink.status !== "linked",
      build: () => ({
        icon: "🔗",
        label: "No collaboration space",
        note: "Optional: link an Enclave workspace for notes, files, or future subcontractors.",
      }),
    },
  ];

  // Bind derived values into ctx so build() functions can access them directly
  const enriched = { ...ctx, mustTotal, mustDone, unownedMust };
  return riskRules.find(r => r.when(enriched))?.build(enriched) ?? risks[0];
}
