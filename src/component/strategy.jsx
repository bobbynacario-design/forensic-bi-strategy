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
  const [newProspect, setNewProspect] = useState({ name: "", company: "", stage: "prospect", note: "", owner: "" });
  const [showAddProspect, setShowAddProspect] = useState(false);

  // ── Workspace mode ────────────────────────────────────────────────────────────
  const [workspaceMode, setWorkspaceMode] = useState("solo");
  const [taskOwners, setTaskOwners] = useState({});

  // ── Milestones ────────────────────────────────────────────────────────────────
  const [achieved, setAchieved] = useState({});
  const [milestoneDate, setMilestoneDate] = useState({});
  const [loaded, setLoaded] = useState(false);

  // ── Enclave Integration ───────────────────────────────────────────────────────
  const [fbUser, setFbUser] = useState(null);
  const [authReady, setAuthReady] = useState(false);
  const EMPTY_LINK = { projectId: null, status: "not_linked", lastChecked: null };
  const [enclaveLinks, setEnclaveLinks] = useState({ solo: EMPTY_LINK, partnership: EMPTY_LINK, client: EMPTY_LINK });
  // Derived — always the active mode's link. All read sites use this alias unchanged.
  const enclaveLink = enclaveLinks[workspaceMode] ?? EMPTY_LINK;
  const [collabCreating, setCollabCreating] = useState(false);
  const [collabError, setCollabError] = useState(null);
  const [relinkModal, setRelinkModal] = useState(false);
  const [relinkId, setRelinkId] = useState("");
  const [setupModal, setSetupModal] = useState(false);
  const [setupName, setSetupName] = useState("Forensic BI Strategy");
  const [setupDesc, setSetupDesc] = useState("Collaboration space for Forensic BI consulting strategy — phases, tasks, and team coordination.");
  const [setupMode, setSetupMode] = useState("solo");
  const [setupMembers, setSetupMembers] = useState([""]);

  // ── Partnership Finance ───────────────────────────────────────────────────────
  const [partnerRows, setPartnerRows] = useState([{ name: "", capital: 0, draw: 0 }, { name: "", capital: 0, draw: 0 }]);
  const [sharedOverhead, setSharedOverhead] = useState(0);

  // ── Client Finance ────────────────────────────────────────────────────────────
  const [engagementValue, setEngagementValue] = useState(0);
  const [invoiced, setInvoiced] = useState(0);
  const [collectedAmt, setCollectedAmt] = useState(0);

  // ── Theme ─────────────────────────────────────────────────────────────────────
  const [theme, setTheme] = useState(() => { try { return localStorage.getItem('fba_theme') || 'dark'; } catch (err) { console.warn('[Praxis] theme localStorage read failed:', err); return 'dark'; } });
  // Active theme palette — used by all component rendering
  const C = theme === 'dark' ? DARK_C : LIGHT_C;
  const card = { background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: "24px 28px" };
  const inputSt = { background: C.bg, border: `1px solid ${C.border}`, borderRadius: 6, color: C.text, padding: "10px 14px", fontSize: 15, ...SF, width: "100%", boxSizing: "border-box", outline: "none" };
  const toggleTheme = () => { const n = theme === 'dark' ? 'light' : 'dark'; setTheme(n); try { localStorage.setItem('fba_theme', n); } catch (err) { console.warn('[Praxis] theme localStorage write failed:', err); } };
  const headerBg = theme === 'dark' ? 'linear-gradient(135deg,#0D0F14 0%,#1a1f2e 100%)' : 'linear-gradient(135deg,#F0ECE7 0%,#EAE5DE 100%)';

  // ── Storage ───────────────────────────────────────────────────────────────────
  const save = async (key, val) => { try { await window.storage.set(key, JSON.stringify(val)); } catch (err) { console.warn('[Praxis] storage.set failed for key:', key, err); } };

  useEffect(() => {
    const load = async () => {
      const tryLoad = async (key, setter) => {
        try { const r = await window.storage.get(key); if (r) setter(JSON.parse(r.value)); } catch (err) { console.warn('[Praxis] storage.get failed for key:', key, err); }
      };
      await tryLoad("completed", setCompleted);
      await tryLoad("gateCompleted", setGateCompleted);
      await tryLoad("currentPhaseId", setCurrentPhaseId);
      await tryLoad("achieved", setAchieved);
      await tryLoad("milestoneDate", setMilestoneDate);
      await tryLoad("savedReviews", setSavedReviews);
      await tryLoad("prospects", setProspects);
      await tryLoad("taskOwners", setTaskOwners);
      // enclaveLink is loaded from Firestore in the auth listener, not localStorage
      try {
        const r = await window.storage.get("financial");
        if (r) { const f = JSON.parse(r.value); setMonthly(f.monthly); setSavings(f.savings); setProjectedMonthly(f.projectedMonthly || 0); setTaxRate(f.taxRate || 25); setBizOverhead(f.bizOverhead || 15000); setUtilization(f.utilization || 70); }
      } catch (err) { console.warn('[Praxis] storage.get failed for key: financial', err); }
      try {
        const rp = await window.storage.get("financePartnership");
        if (rp) { const fp = JSON.parse(rp.value); if (fp.partnerRows) setPartnerRows(fp.partnerRows); if (fp.sharedOverhead != null) setSharedOverhead(fp.sharedOverhead); }
      } catch (err) { console.warn('[Praxis] storage.get failed for key: financePartnership', err); }
      try {
        const rc = await window.storage.get("financeClient");
        if (rc) { const fc = JSON.parse(rc.value); if (fc.engagementValue != null) setEngagementValue(fc.engagementValue); if (fc.invoiced != null) setInvoiced(fc.invoiced); if (fc.collectedAmt != null) setCollectedAmt(fc.collectedAmt); }
      } catch (err) { console.warn('[Praxis] storage.get failed for key: financeClient', err); }
      setLoaded(true);
    };
    load();
  }, []);

  // ── Firebase Auth Listener — also loads per-mode enclaveLinks from Firestore ──
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(async user => {
      setFbUser(user);
      setAuthReady(true);
      if (user) {
        try {
          const snap = await firebase.firestore().doc(`users/${user.uid}`).get();
          if (snap.exists) {
            if (snap.data().fbaLinks) {
              // Current shape — per-mode object
              const raw = snap.data().fbaLinks;
              setEnclaveLinks({
                solo:        normalizeEnclaveLink(raw.solo        || EMPTY_LINK),
                partnership: normalizeEnclaveLink(raw.partnership || EMPTY_LINK),
                client:      normalizeEnclaveLink(raw.client      || EMPTY_LINK),
              });
            } else if (snap.data().fbaLink) {
              // Legacy single-link — migrate into the user's stored mode slot
              const legacyMode = snap.data().roadmapMode || "solo";
              setEnclaveLinks(prev => ({ ...prev, [legacyMode]: normalizeEnclaveLink(snap.data().fbaLink) }));
            }
            if (snap.data().roadmapMode) setWorkspaceMode(snap.data().roadmapMode);
          }
        } catch (err) { console.error("Load fbaLinks from Firestore error:", err); }
      } else {
        // User signed out — clear all mode links
        setEnclaveLinks({ solo: EMPTY_LINK, partnership: EMPTY_LINK, client: EMPTY_LINK });
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
  }, [authReady, fbUser, loaded, workspaceMode]);

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
  const savePartnershipFinance = (patch) => {
    const f = { partnerRows, sharedOverhead, ...patch };
    save("financePartnership", f);
  };
  const saveClientFinance = (patch) => {
    const f = { engagementValue, invoiced, collectedAmt, ...patch };
    save("financeClient", f);
  };

  // ── Enclave helpers ───────────────────────────────────────────────────────────
  const saveEnclaveLink = (patch) => {
    const next = { ...enclaveLink, ...patch };
    const nextLinks = { ...enclaveLinks, [workspaceMode]: next };
    setEnclaveLinks(nextLinks);
    // Persist per-mode object to Firestore (cross-device)
    if (fbUser) {
      firebase.firestore().doc(`users/${fbUser.uid}`)
        .set({ fbaLinks: nextLinks }, { merge: true })
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

      // Resolve member emails → Enclave UIDs
      let memberIds = [fbUser.uid];
      let memberNames = { [fbUser.uid]: displayName };
      let pendingInvites = [];
      const filteredEmails = setupMembers.filter(e => e.trim() && e.trim() !== fbUser.email);
      for (const email of filteredEmails) {
        try {
          const snap = await db.collection("users").where("email", "==", email.trim()).limit(1).get();
          if (!snap.empty) {
            const uDoc = snap.docs[0];
            memberIds.push(uDoc.id);
            memberNames[uDoc.id] = uDoc.data().displayName || uDoc.data().name || email.trim();
          } else {
            pendingInvites.push(email.trim());
          }
        } catch { pendingInvites.push(email.trim()); }
      }

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
        memberIds,
        memberNames,
        ...(pendingInvites.length > 0 ? { pendingInvites } : {}),
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

  const saveWorkspaceMode = (mode) => {
    setWorkspaceMode(mode);
    // Reset phase view to first phase of the new mode's lane
    const firstId = mode === "partnership" ? "P1" : mode === "client" ? "C1" : "A";
    setCurrentPhaseId(firstId);
    setActivePhaseView(firstId);
    if (fbUser) {
      firebase.firestore().doc(`users/${fbUser.uid}`)
        .set({ roadmapMode: mode }, { merge: true })
        .catch(err => console.error("saveWorkspaceMode error:", err));
    }
  };
  const modeLabel = workspaceMode === "solo" ? "👤 Solo" : workspaceMode === "partnership" ? "🤝 Partnership" : "💼 Client";
  const modeColor = workspaceMode === "solo" ? C.textMute : workspaceMode === "partnership" ? C.blue : C.purple;
  const isTeamMode = workspaceMode !== "solo";
  const modeDefs = [
    { id: "solo", label: "👤 Solo", color: C.textMute },
    { id: "partnership", label: "🤝 Partnership", color: C.blue },
    { id: "client", label: "💼 Client", color: C.purple },
  ];
  const openSetupModal = () => {
    const defaultName = workspaceMode === "client" ? "Forensic BI Engagement" : "Forensic BI Strategy";
    const defaultDesc = workspaceMode === "partnership"
      ? "Shared partnership workspace for Forensic BI consulting — roles, tasks, and coordination."
      : workspaceMode === "client"
      ? "Client engagement workspace — scope, deliverables, and team execution."
      : "Collaboration space for Forensic BI consulting strategy — phases, tasks, and team coordination.";
    setSetupName(defaultName);
    setSetupDesc(defaultDesc);
    setSetupMode(workspaceMode);
    setSetupMembers(workspaceMode === "solo" ? [] : [""]);
    setSetupModal(true);
    setRelinkModal(false);
    setCollabError(null);
  };
  const confirmRelink = () => {
    if (!relinkId.trim()) return;
    setRelinkModal(false);
    setRelinkId("");
    const cleanId = /^[A-Za-z0-9_-]{1,64}$/.test(relinkId.trim()) ? relinkId.trim() : null;
    saveEnclaveLink({ projectId: cleanId, status: cleanId ? "checking" : "not_linked", lastChecked: null });
    if (cleanId) checkLinkedProject(cleanId);
  };
  const addProspect = () => {
    if (!newProspect.name.trim()) return;
    const p = { ...newProspect, id: Date.now() };
    const n = [...prospects, p]; setProspects(n); save("prospects", n);
    setNewProspect({ name: "", company: "", stage: "prospect", note: "", owner: "" }); setShowAddProspect(false);
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
  // Mode-aware phase and milestone data
  const activePhases = workspaceMode === "partnership" ? partnershipPhases : workspaceMode === "client" ? clientPhases : phases;
  const activeMilestones = workspaceMode === "partnership" ? partnershipMilestones : workspaceMode === "client" ? clientMilestones : milestonesList;
  const currentPhase = activePhases.find(p => p.id === currentPhaseId) || activePhases[0];
  const viewPhase = activePhases.find(p => p.id === activePhaseView) || activePhases[0];
  const topMustTasks = currentPhase.tasks.filter(t => t.priority === "Must" && !completed[t.id]).slice(0, 3);
  const nextMilestone = activeMilestones.find(m => !achieved[m.id]);
  const gateCriteriaDone = (phaseId) => { const ph = activePhases.find(p => p.id === phaseId); if (!ph) return 0; return ph.gate.criteria.filter(c => gateCompleted[c.id]).length; };
  const gateTotal = (phaseId) => { const ph = activePhases.find(p => p.id === phaseId); return ph ? ph.gate.criteria.length : 0; };
  const gateClear = (phaseId) => gateCriteriaDone(phaseId) === gateTotal(phaseId);
  const track2Unlocked = workspaceMode === "solo" && gateClear("C");
  const topRisk = computeTopRisk({
    mode: workspaceMode, runwayMonths, prospects, currentPhase, currentPhaseId,
    completed, taskOwners, enclaveLink, gateCriteriaDone, gateTotal, gateClear, risks,
  });

  // ── Inject CSS ────────────────────────────────────────────────────────────────
  // Re-uses the same <style> tag on theme change instead of remove+add, which
  // would briefly un-style the page between React paint cycles.
  useEffect(() => {
    const STYLE_ID = 'praxis-dynamic-styles';
    let s = document.getElementById(STYLE_ID);
    if (!s) { s = document.createElement('style'); s.id = STYLE_ID; document.head.appendChild(s); }
    const hoverBorder = theme === 'dark' ? '#3a3f50' : '#c5bfb5';
    s.innerHTML = `
      .g2{display:grid;grid-template-columns:1fr 1fr;gap:16px}
      .g3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px}
      .tab-bar{display:flex;gap:1px;border-bottom:1px solid ${C.border};flex-wrap:nowrap;overflow-x:auto;-webkit-overflow-scrolling:touch;scrollbar-width:none}
      .tab-bar::-webkit-scrollbar{display:none}
      .sub-tab-bar{display:flex;gap:6px;flex-wrap:wrap;margin-bottom:20px}
      .pp{padding:28px 48px;width:100%;box-sizing:border-box}
      .hp{padding:28px 48px 22px;width:100%;box-sizing:border-box}
      @media(max-width:640px){.g2{grid-template-columns:1fr!important}.g3{grid-template-columns:1fr!important}.pp{padding:16px 18px!important}.hp{padding:18px 18px 14px!important}}
      .task-row:hover{border-color:${hoverBorder}!important}
      .prospect-card:hover{border-color:${hoverBorder}!important}
    `;
    // No cleanup — the style tag persists for the app's lifetime.
  }, [theme]);

  // ── Sub-components ────────────────────────────────────────────────────────────
  const PriorityBadge = ({ p }) => {
    const col = p === "Must" ? C.red : p === "Should" ? C.gold : C.textMute;
    return <span style={{ background: col + "18", border: `1px solid ${col}40`, color: col, borderRadius: 10, padding: "1px 7px", fontSize: 9, ...SF, fontWeight: 700, letterSpacing: "0.08em", flexShrink: 0 }}>{p}</span>;
  };

  const TaskList = ({ tasks, color }) => tasks.map(task => {
    const done = completed[task.id];
    const owner = taskOwners[task.id] || "";
    return (
      <div key={task.id} className="task-row" onClick={() => toggleTask(task.id)} style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "11px 13px", borderRadius: 7, background: done ? `${color}08` : C.bg, border: `1px solid ${done ? color + "35" : C.borderSub}`, cursor: "pointer", transition: "all 0.15s", marginBottom: 7 }}>
        <div style={{ width: 18, height: 18, borderRadius: 4, flexShrink: 0, marginTop: 1, border: `1.5px solid ${done ? color : "#3a3f50"}`, background: done ? color : "transparent", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.15s" }}>
          {done && <span style={{ color: "#0D0F14", fontSize: 11, fontWeight: 700 }}>✓</span>}
        </div>
        <span style={{ ...SF, fontSize: 13.5, color: done ? "#6a7080" : C.textMid, textDecoration: done ? "line-through" : "none", lineHeight: 1.5, flex: 1 }}>{task.text}</span>
        {task.priority && <PriorityBadge p={task.priority} />}
        {isTeamMode && (
          <input
            value={owner}
            onChange={e => { e.stopPropagation(); const n = { ...taskOwners, [task.id]: e.target.value }; setTaskOwners(n); save("taskOwners", n); }}
            onClick={e => e.stopPropagation()}
            placeholder="Owner"
            style={{ background: owner ? `${modeColor}12` : C.bg, border: `1px solid ${owner ? modeColor + "50" : C.border}`, borderRadius: 5, color: owner ? modeColor : C.textMute, padding: "2px 7px", fontSize: 11, ...SF, width: 80, flexShrink: 0, outline: "none" }}
          />
        )}
      </div>
    );
  });

  const PhaseTab = ({ phases: phList, active, setActive }) => (
    <div style={{ display: "flex", gap: 7, marginBottom: 18, flexWrap: "wrap" }}>
      {phList.map(p => {
        const done = p.tasks.filter(t => completed[t.id]).length;
        const isActive = active === p.id;
        return (
          <button key={p.id} onClick={() => setActive(p.id)} style={{ padding: "6px 13px", borderRadius: 6, border: isActive ? `1.5px solid ${C[p.color]}` : `1.5px solid ${C.border}`, background: isActive ? `${C[p.color]}15` : "transparent", color: isActive ? C[p.color] : C.textMute, cursor: "pointer", fontSize: 12, ...SF, transition: "all 0.15s", display: "flex", alignItems: "center", gap: 5 }}>
            <span>{p.icon}</span>
            <span style={{ fontWeight: isActive ? 600 : 400 }}>{p.label}</span>
            {done > 0 && <span style={{ background: C[p.color], color: "#0D0F14", borderRadius: 10, padding: "0 5px", fontSize: 9, fontWeight: 700 }}>{done}/{p.tasks.length}</span>}
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
      <div style={{ background: clear ? `${C[phase.color]}10` : C.bg, border: `1px solid ${clear ? C[phase.color] + "50" : C.border}`, borderRadius: 10, padding: "18px 22px", marginTop: 16 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
          <div style={{ fontSize: 11, color: clear ? C[phase.color] : C.textMute, ...SF, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em" }}>
            {clear ? "✓ " : ""}{phase.gate.label}
          </div>
          <span style={{ fontSize: 12, color: clear ? C[phase.color] : C.textDim, ...SF }}>{done}/{total} criteria met</span>
        </div>
        {phase.gate.criteria.map(c => {
          const met = gateCompleted[c.id];
          return (
            <div key={c.id} onClick={() => toggleGate(c.id)} style={{ display: "flex", alignItems: "flex-start", gap: 9, padding: "8px 10px", borderRadius: 6, background: met ? `${C[phase.color]}08` : "transparent", border: `1px solid ${met ? C[phase.color] + "30" : C.borderSub}`, cursor: "pointer", marginBottom: 6, transition: "all 0.15s" }}>
              <div style={{ width: 16, height: 16, borderRadius: 3, flexShrink: 0, marginTop: 1, border: `1.5px solid ${met ? C[phase.color] : "#3a3f50"}`, background: met ? C[phase.color] : "transparent", display: "flex", alignItems: "center", justifyContent: "center" }}>
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
    ...(workspaceMode === "solo" ? [{ id: "track2", label: "🏛 Track 2: Expert Witness" }] : []),
    { id: "milestones", label: "🎉 Milestones" },
  ];

  if (!loaded) return <div style={{ background: C.bg, minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", color: C.gold, ...SF }}>Loading Praxis...</div>;

  return (
    <div style={{ ...SF, background: C.bg, minHeight: "100vh", width: "100%", color: C.text }}>

      {/* HEADER */}
      <div className="hp" style={{ background: headerBg, borderBottom: `1px solid ${C.border}` }}>
        <div style={{ width: "100%", display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 11, letterSpacing: "0.2em", color: C.gold, textTransform: "uppercase", marginBottom: 6, ...SF }}>Praxis · Forensic BI Operating System · v5</div>
            <h1 style={{ margin: "0 0 10px", fontSize: 28, fontWeight: 400, color: C.text, lineHeight: 1.3 }}>Praxis — <span style={{ color: C.gold }}>Forensic BI Operating System</span></h1>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 6 }}>
              <div style={{ flex: 1, height: 4, background: C.borderSub, borderRadius: 2, overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${pct}%`, background: `linear-gradient(90deg,${C.gold},#E8C98E)`, borderRadius: 2, transition: "width 0.4s" }} />
              </div>
              <span style={{ fontSize: 11, color: C.gold, ...SF, whiteSpace: "nowrap" }}>{completedCount}/{totalTasks} tasks · {pct}%</span>
              <span style={{ fontSize: 11, color: C.green, ...SF, whiteSpace: "nowrap" }}>{achievedCount}/{activeMilestones.length} milestones</span>
              <div style={{ display: "flex", background: C.bg, border: `1px solid ${C.border}`, borderRadius: 7, padding: 2, gap: 2, flexShrink: 0 }}>
                {modeDefs.map(m => (
                  <button key={m.id} onClick={() => saveWorkspaceMode(m.id)} style={{ background: workspaceMode === m.id ? `${m.color}20` : "transparent", border: workspaceMode === m.id ? `1px solid ${m.color}60` : "1px solid transparent", borderRadius: 5, padding: "2px 9px", cursor: "pointer", fontSize: 10, color: workspaceMode === m.id ? m.color : C.textMute, ...SF, fontWeight: workspaceMode === m.id ? 700 : 400, transition: "all 0.15s", whiteSpace: "nowrap" }}>
                    {m.label}
                  </button>
                ))}
              </div>
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

      <div className="pp" style={{ width: "100%" }}>

        {/* TABS */}
        <div className="tab-bar" style={{ marginBottom: 24 }}>
          {tabs.map(t => (
            <button key={t.id} onClick={() => setActiveTab(t.id)} style={{ background: "transparent", border: "none", borderBottom: activeTab === t.id ? `2px solid ${C.gold}` : "2px solid transparent", color: activeTab === t.id ? C.gold : C.textMute, padding: "11px 18px", cursor: "pointer", fontSize: 14, ...SF, marginBottom: -1, transition: "all 0.15s", whiteSpace: "nowrap" }}>
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
                {activePhases.map(p => (
                  <button key={p.id} onClick={() => { setCurrentPhaseId(p.id); save("currentPhaseId", p.id); }} style={{ padding: "5px 12px", borderRadius: 6, border: currentPhaseId === p.id ? `1.5px solid ${C[p.color]}` : `1.5px solid ${C.border}`, background: currentPhaseId === p.id ? `${C[p.color]}18` : "transparent", color: currentPhaseId === p.id ? C[p.color] : C.textMute, cursor: "pointer", fontSize: 11, ...SF, fontWeight: currentPhaseId === p.id ? 700 : 400, transition: "all 0.15s" }}>
                    {p.icon} {p.label}
                  </button>
                ))}
              </div>

              {/* Top Row: Phase card + Gate progress */}
              <div className="g2" style={{ marginBottom: 16 }}>
                <div style={{ background: `linear-gradient(135deg,${C[currentPhase.color]}15,${C.surface})`, border: `1px solid ${C[currentPhase.color]}40`, borderLeft: `3px solid ${C[currentPhase.color]}`, borderRadius: 10, padding: "18px 22px" }}>
                  <div style={{ fontSize: 10, color: C[currentPhase.color], letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 4, ...SF }}>{currentPhase.label} · {currentPhase.timeframe}</div>
                  <div style={{ fontSize: 17, color: C.text, marginBottom: 8 }}>{currentPhase.icon} {currentPhase.title}</div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                    <div style={{ flex: 1, height: 5, background: "#1e2330", borderRadius: 3, overflow: "hidden" }}>
                      <div style={{ height: "100%", width: `${phaseTasksTotal > 0 ? Math.round(phaseTasksDone / phaseTasksTotal * 100) : 0}%`, background: C[currentPhase.color], borderRadius: 3, transition: "width 0.3s" }} />
                    </div>
                    <span style={{ fontSize: 11, color: C[currentPhase.color], ...SF }}>{phaseTasksDone}/{phaseTasksTotal}</span>
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
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                  <div style={{ fontSize: 10, color: C.red, ...SF, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em" }}>
                    {isTeamMode ? "🤝 Team Top Actions — Phase " : "⚡ Top 3 Actions — Phase "}{currentPhaseId}
                  </div>
                  {isTeamMode && <span style={{ fontSize: 10, color: modeColor, ...SF, background: `${modeColor}15`, border: `1px solid ${modeColor}30`, borderRadius: 4, padding: "2px 8px" }}>{modeLabel}</span>}
                </div>
                {isTeamMode && (
                  <div style={{ fontSize: 12, color: C.textDim, ...SF, marginBottom: 12, padding: "8px 12px", background: `${modeColor}08`, borderRadius: 6, border: `1px solid ${modeColor}20` }}>
                    {workspaceMode === "partnership" ? "Each task below can be assigned to a partner. Go to the Roadmap tab to set owners." : "Assign tasks to delivery team members in the Roadmap tab."}
                  </div>
                )}
                {topMustTasks.length === 0
                  ? <div style={{ color: C.green, fontSize: 13, ...SF }}>✓ All Must tasks in this phase are complete. Check your gate criteria below, then advance.</div>
                  : topMustTasks.map(t => (
                    <div key={t.id} className="task-row" onClick={() => toggleTask(t.id)} style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "11px 13px", borderRadius: 7, background: C.bg, border: `1px solid ${C.borderSub}`, cursor: "pointer", marginBottom: 7, transition: "all 0.15s" }}>
                      <div style={{ width: 18, height: 18, borderRadius: 4, flexShrink: 0, marginTop: 1, border: `1.5px solid ${C.red}`, background: "transparent", display: "flex", alignItems: "center", justifyContent: "center" }} />
                      <span style={{ ...SF, fontSize: 13.5, color: C.textMid, lineHeight: 1.5, flex: 1 }}>{t.text}</span>
                      <PriorityBadge p={t.priority} />
                      {isTeamMode && taskOwners[t.id] && (
                        <span style={{ fontSize: 10, color: modeColor, background: `${modeColor}15`, border: `1px solid ${modeColor}30`, borderRadius: 10, padding: "1px 7px", ...SF, fontWeight: 600, flexShrink: 0 }}>👤 {taskOwners[t.id]}</span>
                      )}
                      {isTeamMode && !taskOwners[t.id] && (
                        <span style={{ fontSize: 10, color: C.textMute, background: `${C.red}10`, border: `1px solid ${C.red}20`, borderRadius: 10, padding: "1px 7px", ...SF, flexShrink: 0 }}>unassigned</span>
                      )}
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
                            <button onClick={relinkSpace} style={{ ...btnBase, background: "transparent", border: `1px solid ${C.border}`, color: C.textMute }}>↻ Relink</button>
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
                              <button key={m.id} onClick={() => { setSetupMode(m.id); setSetupMembers(m.id === "solo" ? [] : setupMembers.length ? setupMembers : [""]); }} style={{ padding: "6px 13px", borderRadius: 6, border: setupMode === m.id ? `1.5px solid ${C.gold}` : `1.5px solid ${C.border}`, background: setupMode === m.id ? `${C.gold}15` : "transparent", color: setupMode === m.id ? C.gold : C.textMute, cursor: "pointer", fontSize: 12, ...SF, fontWeight: setupMode === m.id ? 700 : 400, transition: "all 0.15s" }}>
                                {m.label} <span style={{ fontSize: 10, fontWeight: 400, opacity: 0.7 }}>({m.desc})</span>
                              </button>
                            ))}
                          </div>
                        </div>
                        {setupMode !== "solo" && (
                          <div style={{ marginBottom: 16 }}>
                            <div style={{ fontSize: 11, color: C.textMute, ...SF, marginBottom: 6 }}>
                              {setupMode === "partnership" ? "🤝 Partner emails" : "👥 Team member emails"} <span style={{ fontWeight: 400, opacity: 0.7 }}>(optional — must be signed in to Enclave)</span>
                            </div>
                            {setupMembers.map((email, i) => (
                              <div key={i} style={{ display: "flex", gap: 6, marginBottom: 6 }}>
                                <input value={email} onChange={e => { const n = [...setupMembers]; n[i] = e.target.value; setSetupMembers(n); }} placeholder={setupMode === "partnership" ? "partner@email.com" : "teammate@email.com"} style={{ ...inputSt, fontSize: 12, flex: 1 }} />
                                {setupMembers.length > 1 && <button onClick={() => setSetupMembers(setupMembers.filter((_, j) => j !== i))} style={{ background: "transparent", border: `1px solid ${C.border}`, color: C.textMute, borderRadius: 5, padding: "0 10px", cursor: "pointer", fontSize: 13, flexShrink: 0 }}>✕</button>}
                              </div>
                            ))}
                            {setupMembers.length < 4 && (
                              <button onClick={() => setSetupMembers([...setupMembers, ""])} style={{ background: "transparent", border: `1px dashed ${C.border}`, color: C.textMute, borderRadius: 5, padding: "5px 12px", cursor: "pointer", fontSize: 11, ...SF, marginTop: 2 }}>
                                + Add {setupMode === "partnership" ? "partner" : "member"}
                              </button>
                            )}
                            <div style={{ fontSize: 10, color: C.textMute, ...SF, marginTop: 8, lineHeight: 1.5 }}>
                              Found members are added immediately. Emails not yet in Enclave are saved as pending invites on the project.
                            </div>
                          </div>
                        )}
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
                        <span style={{ fontSize: 13, fontWeight: 700, color: C[s.color] || s.color, ...SF }}>{n}</span>
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
            <p style={{ color: C.textDim, fontSize: 13, ...SF, marginBottom: 18, fontStyle: "italic" }}>
              {workspaceMode === "solo"
                ? "One primary lane. Complete each phase and clear the gate before advancing. Expert Witness is Track 2 — it unlocks after Phase C."
                : workspaceMode === "partnership"
                ? "Partnership operating lane. Governance first, offer second, market third. Each phase must be cleared before advancing."
                : "Client engagement lane. Qualify before scoping. Scope before starting. Follow each gate — skipping steps creates downstream problems."}
            </p>
            <PhaseTab phases={activePhases} active={activePhaseView} setActive={setActivePhaseView} />
            {(() => {
              const p = viewPhase;
              return (
                <div>
                  <div style={{ background: C.surface, border: `1px solid ${C[p.color]}30`, borderLeft: `3px solid ${C[p.color]}`, borderRadius: 10, padding: "22px 26px", marginBottom: 8 }}>
                    <div style={{ fontSize: 10, color: C[p.color], letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 4, ...SF }}>{p.label} · {p.timeframe}</div>
                    <h2 style={{ margin: "0 0 6px", fontSize: 18, fontWeight: 400, color: C.text }}>{p.icon} {p.title}</h2>
                    <p style={{ color: C.textDim, fontSize: 13, ...SF, marginBottom: 18, marginTop: 4, fontStyle: "italic" }}>{p.context}</p>
                    <TaskList tasks={p.tasks} color={C[p.color]} />
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
                  {isTeamMode && (
                    <div>
                      <div style={{ fontSize: 11, color: C.textDim, ...SF, marginBottom: 4 }}>Deal Owner</div>
                      <input value={newProspect.owner || ""} onChange={e => setNewProspect({ ...newProspect, owner: e.target.value })} placeholder="Who owns this prospect?" style={inputSt} />
                    </div>
                  )}
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
                  <div key={s.id} style={{ background: n > 0 ? `${C[s.color] || s.color}12` : C.surface, border: `1px solid ${n > 0 ? (C[s.color] || s.color) + "40" : C.border}`, borderRadius: 8, padding: "10px 16px", textAlign: "center", minWidth: 90 }}>
                    <div style={{ fontSize: 16 }}>{s.icon}</div>
                    <div style={{ fontSize: 20, fontWeight: 700, color: n > 0 ? (C[s.color] || s.color) : C.textMute, ...SF }}>{n}</div>
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
                      <span style={{ fontSize: 12, color: C[stage.color] || stage.color, ...SF, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em" }}>{stage.label}</span>
                      <span style={{ fontSize: 11, color: C.textMute, ...SF }}>({stageProspects.length})</span>
                    </div>
                    {stageProspects.map(p => (
                      <div key={p.id} className="prospect-card" style={{ background: C.surface, border: `1px solid ${C.border}`, borderLeft: `3px solid ${C[stage.color] || stage.color}`, borderRadius: 8, padding: "12px 16px", marginBottom: 8, transition: "border-color 0.15s" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                          <div style={{ flex: 1 }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                              <div style={{ fontSize: 14, color: C.text, ...SF, fontWeight: 600 }}>{p.name}</div>
                              {isTeamMode && p.owner && <span style={{ fontSize: 10, color: modeColor, background: `${modeColor}15`, border: `1px solid ${modeColor}30`, borderRadius: 10, padding: "1px 7px", ...SF, fontWeight: 600 }}>👤 {p.owner}</span>}
                            </div>
                            {p.company && <div style={{ fontSize: 12, color: C.textDim, ...SF, marginTop: 2 }}>{p.company}</div>}
                            {p.note && <div style={{ fontSize: 12, color: C.textMute, ...SF, marginTop: 4, fontStyle: "italic" }}>{p.note}</div>}
                          </div>
                          <div style={{ display: "flex", gap: 6, alignItems: "center", marginLeft: 10 }}>
                            <select value={p.stage} onChange={e => moveProspect(p.id, e.target.value)} style={{ background: C.bg, border: `1px solid ${C.border}`, color: C[stage.color] || stage.color, borderRadius: 5, padding: "4px 8px", fontSize: 11, ...SF, cursor: "pointer" }}>
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
              <button onClick={() => { const prev = Math.max(1, weekNumber - 1); setWeekNumber(prev); setWeekAnswers(savedReviews[prev]?.answers || {}); }} style={{ background: C.surface, border: `1px solid ${C.border}`, color: C.textDim, borderRadius: 6, padding: "6px 12px", cursor: "pointer", fontSize: 14 }}>←</button>
              <span style={{ color: C.text, fontSize: 18, fontWeight: 600, ...SF, minWidth: 40, textAlign: "center" }}>#{weekNumber}</span>
              <button onClick={() => { const next = weekNumber + 1; setWeekNumber(next); setWeekAnswers(savedReviews[next]?.answers || {}); }} style={{ background: C.surface, border: `1px solid ${C.border}`, color: C.textDim, borderRadius: 6, padding: "6px 12px", cursor: "pointer", fontSize: 14 }}>→</button>
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

            {/* Team Check-in — partnership/client mode only */}
            {isTeamMode && (() => {
              const tq = workspaceMode === "partnership" ? partnershipQuestions : clientQuestions;
              const tLabel = workspaceMode === "partnership" ? "🤝 Partner Accountability" : "📋 Delivery Check-in";
              const tPlaceholder = workspaceMode === "partnership" ? "Partner names, commitments, decisions..." : "Deliverables, blockers, scope changes...";
              const tColor = modeColor;
              return (
                <>
                  <div style={{ fontSize: 11, color: tColor, ...SF, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 12 }}>{tLabel}</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 24 }}>
                    {tq.map((q, i) => (
                      <div key={`t${i}`} style={{ ...card, border: `1px solid ${tColor}25` }}>
                        <div style={{ fontSize: 12, color: tColor, ...SF, marginBottom: 8, fontWeight: 600 }}>T{i + 1} — {q}</div>
                        <textarea value={weekAnswers[`t${i}`] || ""} onChange={e => setWeekAnswers({ ...weekAnswers, [`t${i}`]: e.target.value })} placeholder={tPlaceholder} rows={2} style={{ ...inputSt, resize: "vertical", lineHeight: 1.5 }} />
                      </div>
                    ))}
                  </div>
                </>
              );
            })()}

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
            <p style={{ color: C.textDim, fontSize: 13, ...SF, marginBottom: 20, fontStyle: "italic" }}>
              {workspaceMode === "solo" ? "Know your personal numbers exactly. The min billing signal tells you when the transition is financially safe." : workspaceMode === "partnership" ? "Track shared economics — capital contributions, draws, and shared burn — alongside your personal baseline." : "Track engagement margin and collections alongside your personal cost floor."}
            </p>

            {/* Partnership Finance Panel */}
            {workspaceMode === "partnership" && (
              <div style={{ ...card, marginBottom: 20, border: `1px solid ${C.blue}30` }}>
                <div style={{ fontSize: 11, color: C.blue, ...SF, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 16 }}>🤝 Partnership Economics</div>
                <div style={{ marginBottom: 14 }}>
                  <div style={{ fontSize: 11, color: C.textMute, ...SF, marginBottom: 8 }}>Shared Monthly Overhead (PHP)</div>
                  <input type="number" value={sharedOverhead} onChange={e => { setSharedOverhead(Number(e.target.value)); savePartnershipFinance({ sharedOverhead: Number(e.target.value) }); }} style={inputSt} placeholder="0" />
                  <div style={{ fontSize: 11, color: C.textMute, ...SF, marginTop: 4 }}>Software, insurance, admin — split across partners</div>
                </div>
                <div style={{ fontSize: 11, color: C.textMute, ...SF, marginBottom: 8 }}>Partner Capital & Monthly Draw (PHP)</div>
                {partnerRows.map((row, i) => (
                  <div key={i} style={{ display: "flex", gap: 8, marginBottom: 8, flexWrap: "wrap" }}>
                    <input value={row.name} onChange={e => { const n = partnerRows.map((r, j) => j === i ? { ...r, name: e.target.value } : r); setPartnerRows(n); savePartnershipFinance({ partnerRows: n }); }} placeholder={`Partner ${i + 1} name`} style={{ ...inputSt, flex: 2, minWidth: 120 }} />
                    <input type="number" value={row.capital || ""} onChange={e => { const n = partnerRows.map((r, j) => j === i ? { ...r, capital: Number(e.target.value) } : r); setPartnerRows(n); savePartnershipFinance({ partnerRows: n }); }} placeholder="Capital (₱)" style={{ ...inputSt, flex: 1, minWidth: 100 }} />
                    <input type="number" value={row.draw || ""} onChange={e => { const n = partnerRows.map((r, j) => j === i ? { ...r, draw: Number(e.target.value) } : r); setPartnerRows(n); savePartnershipFinance({ partnerRows: n }); }} placeholder="Monthly draw (₱)" style={{ ...inputSt, flex: 1, minWidth: 100 }} />
                  </div>
                ))}
                {partnerRows.length < 4 && (
                  <button onClick={() => { const n = [...partnerRows, { name: "", capital: 0, draw: 0 }]; setPartnerRows(n); savePartnershipFinance({ partnerRows: n }); }} style={{ background: "transparent", border: `1px dashed ${C.border}`, color: C.textMute, borderRadius: 5, padding: "5px 12px", cursor: "pointer", fontSize: 11, ...SF, marginBottom: 12 }}>+ Add partner</button>
                )}
                {(() => {
                  const totalDraws = partnerRows.reduce((s, r) => s + (Number(r.draw) || 0), 0);
                  const totalCapital = partnerRows.reduce((s, r) => s + (Number(r.capital) || 0), 0);
                  const sharedBurn = totalDraws + Number(sharedOverhead);
                  return (
                    <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 12, marginTop: 4, display: "flex", gap: 20, flexWrap: "wrap" }}>
                      {[["Total Capital", `₱${totalCapital.toLocaleString()}`, C.green], ["Total Monthly Draws", `₱${totalDraws.toLocaleString()}`, C.gold], ["Shared Burn/mo", `₱${sharedBurn.toLocaleString()}`, C.red]].map(([l, v, col]) => (
                        <div key={l} style={{ textAlign: "center" }}>
                          <div style={{ fontSize: 11, color: C.textMute, ...SF }}>{l}</div>
                          <div style={{ fontSize: 18, fontWeight: 700, color: col, ...SF }}>{v}</div>
                        </div>
                      ))}
                    </div>
                  );
                })()}
              </div>
            )}

            {/* Client Finance Panel */}
            {workspaceMode === "client" && (
              <div style={{ ...card, marginBottom: 20, border: `1px solid ${C.purple}30` }}>
                <div style={{ fontSize: 11, color: C.purple, ...SF, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 16 }}>💼 Engagement Economics</div>
                <div className="g3" style={{ marginBottom: 14 }}>
                  <div>
                    <div style={{ fontSize: 11, color: C.textMute, ...SF, marginBottom: 4 }}>Total Engagement Value (PHP)</div>
                    <input type="number" value={engagementValue || ""} onChange={e => { setEngagementValue(Number(e.target.value)); saveClientFinance({ engagementValue: Number(e.target.value) }); }} placeholder="0" style={inputSt} />
                  </div>
                  <div>
                    <div style={{ fontSize: 11, color: C.textMute, ...SF, marginBottom: 4 }}>Invoiced to Date (PHP)</div>
                    <input type="number" value={invoiced || ""} onChange={e => { setInvoiced(Number(e.target.value)); saveClientFinance({ invoiced: Number(e.target.value) }); }} placeholder="0" style={inputSt} />
                  </div>
                  <div>
                    <div style={{ fontSize: 11, color: C.textMute, ...SF, marginBottom: 4 }}>Collected to Date (PHP)</div>
                    <input type="number" value={collectedAmt || ""} onChange={e => { setCollectedAmt(Number(e.target.value)); saveClientFinance({ collectedAmt: Number(e.target.value) }); }} placeholder="0" style={inputSt} />
                  </div>
                </div>
                {(() => {
                  const outstanding = invoiced - collectedAmt;
                  const uninvoiced = engagementValue - invoiced;
                  const deliveryCost = totalPersonalBurn + Number(bizOverhead);
                  const margin = engagementValue > 0 ? Math.round(((engagementValue - deliveryCost) / engagementValue) * 100) : 0;
                  return (
                    <div style={{ display: "flex", gap: 16, flexWrap: "wrap", borderTop: `1px solid ${C.border}`, paddingTop: 12 }}>
                      {[
                        ["Outstanding", `₱${outstanding.toLocaleString()}`, outstanding > 0 ? C.orange : C.green],
                        ["Uninvoiced", `₱${uninvoiced.toLocaleString()}`, uninvoiced > 0 ? C.blue : C.textMute],
                        ["Est. Margin", `${margin}%`, margin >= 40 ? C.green : margin >= 20 ? C.gold : C.red],
                      ].map(([l, v, col]) => (
                        <div key={l} style={{ textAlign: "center", flex: 1, minWidth: 80 }}>
                          <div style={{ fontSize: 11, color: C.textMute, ...SF }}>{l}</div>
                          <div style={{ fontSize: 20, fontWeight: 700, color: col, ...SF }}>{v}</div>
                        </div>
                      ))}
                    </div>
                  );
                })()}
              </div>
            )}
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
              <div style={{ fontSize: 11, color: C.gold, ...SF, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 6 }}>
                💡 {workspaceMode === "solo" ? "Minimum Monthly Billing to Resign Safely" : "Personal Cost Floor — Minimum Monthly Billing"}
              </div>
              <div style={{ fontSize: 32, fontWeight: 700, color: C.gold, ...SF, marginBottom: 4 }}>₱{minBillingToResign.toLocaleString()}<span style={{ fontSize: 13, fontWeight: 400 }}>/mo</span></div>
              <div style={{ fontSize: 12, color: C.textDim, ...SF }}>
                {workspaceMode === "solo"
                  ? `Covers personal burn + business overhead + ${taxRate}% tax reserve, at ${utilization}% utilization. This is the number to hit consistently before handing in notice.`
                  : `Your personal cost floor. Covers personal burn + overhead + ${taxRate}% tax at ${utilization}% utilization. Each partner should track their own floor separately.`}
              </div>
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
                      <span style={{ fontSize: 11, color: C[cat.color], ...SF, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>{cat.category}</span>
                    </div>
                    {cat.items.map((item, ii) => {
                      const key = `${ci}-${ii}`;
                      const open = expandedTraining === key;
                      return (
                        <div key={ii} onClick={() => setExpandedTraining(open ? null : key)} style={{ ...card, cursor: "pointer", marginBottom: 7 }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 8, justifyContent: "space-between" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                              <span style={{ fontSize: 13.5, color: C.text, ...SF, fontWeight: 500 }}>{item.name}</span>
                              <span style={{ background: `${C[urgencyColors[item.urgency]]}18`, border: `1px solid ${C[urgencyColors[item.urgency]]}40`, color: C[urgencyColors[item.urgency]], borderRadius: 10, padding: "1px 7px", fontSize: 9, ...SF, fontWeight: 700 }}>{item.urgency}</span>
                              <span style={{ fontSize: 10, color: C.textMute, ...SF, background: C.borderSub, borderRadius: 10, padding: "1px 7px" }}>{item.type}</span>
                            </div>
                            <span style={{ color: C.textMute, fontSize: 11 }}>{open ? "▲" : "▼"}</span>
                          </div>
                          <div style={{ fontSize: 11, color: C.textMute, ...SF, marginTop: 2 }}>{item.org}</div>
                          {open && (
                            <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 10, marginTop: 10 }}>
                              <p style={{ color: C.textMid, fontSize: 13, ...SF, margin: "0 0 10px", lineHeight: 1.6 }}>{item.note}</p>
                              {item.url && <a href={item.url} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} style={{ display: "inline-flex", alignItems: "center", gap: 6, background: `${C[cat.color]}15`, border: `1px solid ${C[cat.color]}40`, color: C[cat.color], borderRadius: 6, padding: "6px 14px", fontSize: 12, ...SF, textDecoration: "none", fontWeight: 600 }}>🔗 Open →</a>}
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
                    <button key={i} onClick={() => setActiveMindset(i)} style={{ padding: "6px 13px", borderRadius: 6, border: activeMindset === i ? `1.5px solid ${C[p.color]}` : `1.5px solid ${C.border}`, background: activeMindset === i ? `${C[p.color]}15` : "transparent", color: activeMindset === i ? C[p.color] : C.textMute, cursor: "pointer", fontSize: 12, ...SF, display: "flex", alignItems: "center", gap: 5, fontWeight: activeMindset === i ? 600 : 400 }}>
                      <span>{p.icon}</span><span>{p.title}</span>
                    </button>
                  ))}
                </div>
                {(() => {
                  const p = mindsetPillars[activeMindset];
                  return (
                    <div style={{ background: C.surface, border: `1px solid ${C[p.color]}30`, borderLeft: `3px solid ${C[p.color]}`, borderRadius: 10, padding: "22px 26px" }}>
                      <div style={{ fontSize: 20, marginBottom: 8 }}>{p.icon}</div>
                      <h2 style={{ margin: "0 0 4px", fontSize: 17, fontWeight: 400, color: C.text }}>{p.title}</h2>
                      <p style={{ color: C.textDim, fontSize: 13, ...SF, marginBottom: 18, marginTop: 0, fontStyle: "italic" }}>{p.subtitle}</p>
                      {p.practices.map((prac, i) => (
                        <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 12 }}>
                          <div style={{ width: 22, height: 22, borderRadius: "50%", background: `${C[p.color]}18`, border: `1px solid ${C[p.color]}35`, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", marginTop: 1 }}>
                            <span style={{ fontSize: 10, color: C[p.color], ...SF, fontWeight: 700 }}>{i + 1}</span>
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
                    return <button key={wf.id} onClick={() => { setActiveAIWorkflow(wf.id); setActiveUseCase(0); }} style={{ padding: "7px 13px", borderRadius: 6, border: isActive ? `1.5px solid ${C[wf.color]}` : `1.5px solid ${C.border}`, background: isActive ? `${C[wf.color]}15` : "transparent", color: isActive ? C[wf.color] : C.textMute, cursor: "pointer", fontSize: 12, ...SF, display: "flex", alignItems: "center", gap: 5, fontWeight: isActive ? 600 : 400 }}><span>{wf.icon}</span><span>{wf.title}</span></button>;
                  })}
                </div>
                {(() => {
                  const wf = aiWorkflows.find(w => w.id === activeAIWorkflow);
                  if (!wf) return null;
                  const uc = wf.usecases[activeUseCase];
                  return (
                    <div>
                      <div style={{ background: C.surface, border: `1px solid ${C[wf.color]}30`, borderLeft: `3px solid ${C[wf.color]}`, borderRadius: 10, padding: "18px 22px", marginBottom: 14 }}>
                        <div style={{ fontSize: 20, marginBottom: 6 }}>{wf.icon}</div>
                        <h2 style={{ margin: "0 0 4px", fontSize: 17, fontWeight: 400, color: C.text }}>{wf.title}</h2>
                        <p style={{ color: C.textDim, fontSize: 13, ...SF, margin: "0 0 8px", fontStyle: "italic" }}>{wf.subtitle}</p>
                        <div style={{ display: "inline-flex", alignItems: "center", gap: 5, background: `${C[wf.color]}12`, border: `1px solid ${C[wf.color]}30`, borderRadius: 6, padding: "4px 10px" }}>
                          <span style={{ fontSize: 11, color: C[wf.color], ...SF }}>⚡ {wf.edge}</span>
                        </div>
                      </div>
                      <div style={{ display: "flex", gap: 6, marginBottom: 14, flexWrap: "wrap" }}>
                        {wf.usecases.map((u, i) => <button key={i} onClick={() => setActiveUseCase(i)} style={{ padding: "6px 12px", borderRadius: 6, border: activeUseCase === i ? `1.5px solid ${C[wf.color]}` : `1.5px solid ${C.border}`, background: activeUseCase === i ? `${C[wf.color]}12` : "transparent", color: activeUseCase === i ? C[wf.color] : C.textMute, cursor: "pointer", fontSize: 12, ...SF }}>{u.label}</button>)}
                      </div>
                      <div style={{ background: "#0a0c10", border: `1px solid ${C[wf.color]}25`, borderRadius: 10, overflow: "hidden" }}>
                        <div style={{ padding: "12px 16px", borderBottom: `1px solid ${C.borderSub}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <div>
                            <div style={{ fontSize: 13, color: C.text, fontWeight: 600, ...SF }}>{uc.label}</div>
                            <div style={{ fontSize: 11, color: C.textMute, ...SF, marginTop: 2 }}>📌 Use when: {uc.when}</div>
                          </div>
                          <button onClick={() => { navigator.clipboard.writeText(uc.prompt); setCopiedPrompt(uc.label); setTimeout(() => setCopiedPrompt(null), 2000); }} style={{ background: copiedPrompt === uc.label ? C.green : `${C[wf.color]}18`, border: `1px solid ${copiedPrompt === uc.label ? C.green : C[wf.color] + "50"}`, color: copiedPrompt === uc.label ? "#0D0F14" : C[wf.color], borderRadius: 6, padding: "6px 13px", cursor: "pointer", fontSize: 12, ...SF, fontWeight: 600, transition: "all 0.3s", whiteSpace: "nowrap" }}>
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
                      <h3 style={{ margin: 0, fontSize: 16, fontWeight: 400, color: C[svc.color] }}>{svc.title}</h3>
                    </div>
                    <p style={{ color: C.textDim, fontSize: 13, ...SF, marginBottom: 12, lineHeight: 1.6 }}>{svc.desc}</p>
                    {svc.tiers.map((tier, ti) => (
                      <div key={ti} style={{ background: C.surface, border: `1px solid ${C[svc.color]}22`, borderLeft: `3px solid ${C[svc.color]}`, borderRadius: 8, padding: "12px 16px", marginBottom: 7 }}>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 6, marginBottom: 4 }}>
                          <span style={{ fontSize: 13, color: C.text, fontWeight: 600, ...SF }}>{tier.tier}</span>
                          <div style={{ display: "flex", gap: 8 }}>
                            <span style={{ fontSize: 13, color: C[svc.color], ...SF, fontWeight: 700 }}>{tier.php}</span>
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
                      <div key={task.id} onClick={() => track2Unlocked && toggleTask(task.id)} style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "11px 13px", borderRadius: 7, background: done ? `${p.color}08` : C.bg, border: `1px solid ${done ? p.color + "35" : C.borderSub}`, cursor: !track2Unlocked ? "not-allowed" : "pointer", transition: "all 0.15s", marginBottom: 7, opacity: !track2Unlocked ? 0.5 : 1 }}>
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
            <p style={{ color: C.textDim, fontSize: 13, ...SF, marginBottom: 8, fontStyle: "italic" }}>
              {workspaceMode === "solo" ? "Every milestone deserves to be marked. Click to record the date you achieved it." : workspaceMode === "partnership" ? "Partnership milestones — from signed agreement to market authority. Click to record each one." : "Engagement delivery milestones — from first qualified opportunity to repeatable model."}
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 22, ...SF }}>
              <div style={{ flex: 1, height: 5, background: C.borderSub, borderRadius: 3, overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${Math.round((achievedCount / activeMilestones.length) * 100)}%`, background: `linear-gradient(90deg,${C.green},#A8E8C0)`, borderRadius: 3, transition: "width 0.4s" }} />
              </div>
              <span style={{ fontSize: 12, color: C.green, whiteSpace: "nowrap" }}>{achievedCount} / {activeMilestones.length} achieved</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {activeMilestones.map(m => {
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
