// ─── PIPELINE ─────────────────────────────────────────────────────────────────
const pipelineStageDefs = [
  { id: "prospect", label: "Prospects", color: "blue", icon: "🎯", desc: "Identified, not yet contacted" },
  { id: "outreach", label: "Outreach", color: "gold", icon: "📤", desc: "First message sent" },
  { id: "meeting", label: "Meeting", color: "purple", icon: "🤝", desc: "Meeting booked or held" },
  { id: "proposal", label: "Proposal", color: "orange", icon: "📄", desc: "Proposal submitted" },
  { id: "won", label: "Won", color: "green", icon: "✅", desc: "Engagement signed" },
  { id: "retainer", label: "Retainer", color: "#A8C87E", icon: "🔄", desc: "Recurring active" },
];
