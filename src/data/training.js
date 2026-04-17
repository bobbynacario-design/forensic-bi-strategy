// ─── TRAINING ─────────────────────────────────────────────────────────────────
const trainingResources = [
  { category: "Priority Credentials", color: "gold", icon: "🏆", items: [
    { name: "CFE — Certified Fraud Examiner", org: "ACFE", type: "Exam + Membership", urgency: "HIGH", note: "Gold standard for forensic work globally. Completes your CPA + CIA + CFE triangle. Earns 32% income premium per ACFE data.", url: "https://www.acfe.com/cfe-credential" },
    { name: "CrFA® — Certified Forensic Accountant", org: "CrFA Philippines / ICFA", type: "Certification Program", urgency: "HIGH", note: "PH-based, court-recognized credential. Faster to obtain than CFE. Covers litigation support, fraud investigation, evidence handling.", url: "https://crfaphilippines.org" },
    { name: "CFF — Certified in Financial Forensics", org: "AICPA", type: "Specialty Credential", urgency: "MEDIUM", note: "For CPAs specifically. Signals courtroom-ready forensic expertise. Internationally recognized — useful if you retain AU clients.", url: "https://www.aicpa-cima.com/certifications/certified-in-financial-forensics-cff" },
  ]},
  { category: "Expert Witness & Litigation Support", color: "orange", icon: "⚖️", items: [
    { name: "PH Rules on Evidence — 2019 Revised Rules", org: "Supreme Court of the Philippines", type: "Free Self-Study", urgency: "HIGH", note: "Read Rule 130 Secs 49–52 (expert witnesses) and Rule 132 (examination). Non-negotiable before your first engagement.", url: "https://sc.judiciary.gov.ph/11542/" },
    { name: "The CFE as an Expert Witness", org: "ACFE Online", type: "Online Course", urgency: "HIGH", note: "Covers legal standards for expert witnesses, how to give expert testimony, voir dire preparation, and how to compose proper expert reports.", url: "https://www.acfe.com/training-events-and-products/all-products/product-detail-page?s=The-CFE-as-an-Expert-Witness" },
    { name: "ACFE All Online Training Options", org: "ACFE", type: "Online Course Hub", urgency: "MEDIUM", note: "Browse the full library of ACFE self-study, webinars, and certificate programs.", url: "https://www.acfe.com/training-events-and-products/online-training-options" },
  ]},
  { category: "Forensic BI & Data Skills", color: "blue", icon: "📊", items: [
    { name: "Fraud Analytics Certificate Program", org: "ACFE Online", type: "Online Certificate", urgency: "HIGH", note: "Three-course program covering data analytics for fraud detection. Covers anomaly detection, Benford's Law, and transaction tracing.", url: "https://www.acfe.com/training-events-and-products/all-products/product-detail-page?s=fraud-analytics-certificate-program" },
    { name: "Financial Analysis in Power BI", org: "DataCamp", type: "Self-Paced Online", urgency: "HIGH", note: "Teaches financial terms, BI dashboards, AI visualizations, scenario analysis — directly applicable to forensic client reporting.", url: "https://www.datacamp.com/courses/financial-analysis-in-power-bi" },
    { name: "Microsoft Power BI Data Analyst", org: "Coursera / Microsoft", type: "Self-Paced Online", urgency: "MEDIUM", note: "Official Microsoft-offered Power BI program. Prepares you for PL-300 certification. Covers data modeling, DAX, and dashboard design.", url: "https://www.coursera.org/professional-certificates/microsoft-power-bi-data-analyst" },
    { name: "Fraud Detection in Python", org: "DataCamp", type: "Self-Paced Online", urgency: "MEDIUM", note: "Covers supervised and unsupervised ML for fraud detection — the technical backbone of advanced forensic BI work.", url: "https://www.datacamp.com/courses/fraud-detection-in-python" },
  ]},
  { category: "PH Professional Networks", color: "green", icon: "🤝", items: [
    { name: "ACFE Philippines Chapter", org: "ACFE", type: "Professional Membership", urgency: "HIGH", note: "Attend local events. This is where forensic practitioners, lawyers, and regulators intersect in PH.", url: "https://www.acfe.com/about/chapters/philippines" },
    { name: "IIA Philippines", org: "IIA PH", type: "Professional Membership", urgency: "HIGH", note: "Your CIA credential makes you a natural here. Speak at events — fastest credibility builder in the internal audit space.", url: "https://www.iia.org.ph" },
    { name: "PICPA", org: "PICPA", type: "Professional Membership", urgency: "MEDIUM", note: "CFO and Audit Committee networks. Chapters in major cities hold regular events and CPE sessions.", url: "https://www.picpa.com.ph" },
  ]},
];
