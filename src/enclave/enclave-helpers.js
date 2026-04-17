// ─── ENCLAVE INTEGRATION ──────────────────────────────────────────────────────
const ENCLAVE_URL = "https://bobbynacario-design.github.io/enclave";
// Pass 1 link shape stored in localStorage key "enclaveLink"
// { projectId: string|null, status: "not_linked"|"checking"|"linked"|"broken", lastChecked: number|null }

function normalizeEnclaveLink(link) {
  const id = link && link.projectId;
  return {
    ...link,
    projectId: typeof id === "string" && /^[A-Za-z0-9_-]{1,64}$/.test(id.trim())
      ? id.trim()
      : null,
  };
}
