// ─── PRICING ──────────────────────────────────────────────────────────────────
const pricingServices = [
  { title: "Forensic BI Assessment", icon: "🔍", color: "gold", desc: "Fixed-scope, fixed-price engagement. Your flagship product. Deliverable: forensic BI report with findings, visualizations, and recommendations.", tiers: [
    { tier: "Starter", scope: "Single business unit, 1–2 data sources, 2–3 week delivery", php: "₱120,000 – ₱180,000", usd: "USD 2,000 – 3,000", note: "Entry-level for SMEs or first-time clients" },
    { tier: "Standard", scope: "Multi-unit, 3–5 data sources, 4–6 week delivery", php: "₱250,000 – ₱400,000", usd: "USD 4,500 – 7,000", note: "Listed companies, banks, mid-size corporates" },
    { tier: "Enterprise", scope: "Complex, multi-source, extended timeline, board presentation", php: "₱500,000+", usd: "USD 9,000+", note: "AU clients, large listed companies, regulatory matters" },
  ]},
  { title: "Expert Witness / Litigation Support", icon: "⚖️", color: "orange", desc: "Charged as a combination of preparation time, report writing, and testimony. Your CPA credential justifies 2–3x your advisory day rate.", tiers: [
    { tier: "Litigation Consultant", scope: "Behind the scenes — analytics support, no testimony", php: "₱8,000 – ₱15,000/day", usd: "USD 150 – 250/day", note: "Starting engagement type. Build the relationship." },
    { tier: "Expert Report Only", scope: "Written forensic opinion for submission, no testimony", php: "₱80,000 – ₱150,000 flat", usd: "USD 1,500 – 2,500 flat", note: "Fixed scope. Cover all your research and drafting time." },
    { tier: "Full Expert Witness", scope: "Report + voir dire + direct + cross-examination", php: "₱25,000 – ₱45,000/day", usd: "USD 450 – 800/day", note: "Premium rate. CPA credential + testimony risk justifies this." },
  ]},
  { title: "Internal Audit Analytics Retainer", icon: "🔄", color: "green", desc: "Monthly recurring engagement. Continuous anomaly monitoring, dashboard maintenance, quarterly reporting. Your most stable revenue stream.", tiers: [
    { tier: "Monitoring Lite", scope: "Monthly anomaly scan, 1–2 dashboards, summary report", php: "₱30,000 – ₱50,000/mo", usd: "USD 550 – 900/mo", note: "SMEs and growing companies. Low-touch, high-margin." },
    { tier: "Full Retainer", scope: "Weekly monitoring, full dashboard suite, monthly board report", php: "₱75,000 – ₱120,000/mo", usd: "USD 1,300 – 2,100/mo", note: "Listed companies, banks. Anchor client model." },
    { tier: "AU Remote Retainer", scope: "Full service delivered remotely for AU-based clients", php: "N/A", usd: "USD 2,500 – 4,500/mo", note: "Price in AU market terms. Your cost base = your margin advantage." },
  ]},
];
