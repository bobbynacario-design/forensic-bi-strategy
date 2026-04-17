// ─── ENCLAVE INTEGRATION ──────────────────────────────────────────────────────
const ENCLAVE_URL = "https://bobbynacario-design.github.io/enclave";
// Per-mode link shape stored in Firestore field "fbaLinks":
// { solo: LinkObj, partnership: LinkObj, client: LinkObj }
// where LinkObj = { projectId: string|null, status: "not_linked"|"checking"|"linked"|"broken", lastChecked: number|null }
