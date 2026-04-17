// ─── ENCLAVE LINK NORMALIZER ──────────────────────────────────────────────────
// Firestore auto-IDs are 20 chars of [A-Za-z0-9]. Allow up to 64 to tolerate
// custom IDs, and strip anything that doesn't match rather than letting a
// malformed value reach a URL or Firestore query.
function normalizeEnclaveLink(link) {
  const id = link && link.projectId;
  return {
    ...link,
    projectId: typeof id === "string" && /^[A-Za-z0-9_-]{1,64}$/.test(id.trim())
      ? id.trim()
      : null,
  };
}
