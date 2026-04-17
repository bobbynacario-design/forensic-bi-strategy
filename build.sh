#!/usr/bin/env bash
# ─── build.sh ─────────────────────────────────────────────────────────────────
# Concatenates /src fragments into forensic-bi-strategy-v5.jsx.
# No bundler. No imports. Just cat in declaration order.
# Usage: ./build.sh
# ──────────────────────────────────────────────────────────────────────────────

set -e

OUT="forensic-bi-strategy-v5.jsx"
TEMP="${OUT}.tmp"

cat \
  src/header.js \
  src/theme/palette.js \
  src/data/phases.js \
  src/data/partnership-phases.js \
  src/data/client-phases.js \
  src/data/partnership-milestones.js \
  src/data/client-milestones.js \
  src/data/expert-witness-phases.js \
  src/data/pipeline-stages.js \
  src/data/review-questions.js \
  src/data/training.js \
  src/data/mindset.js \
  src/data/ai-workflows.js \
  src/data/pricing.js \
  src/data/clients.js \
  src/data/risks.js \
  src/data/milestones.js \
  src/enclave/enclave-url.js \
  src/logic/risk-rules.js \
  src/enclave/enclave-normalizer.js \
  src/component/strategy.jsx \
  > "$TEMP"

mv "$TEMP" "$OUT"
echo "✓ Built $OUT ($(wc -l < "$OUT") lines)"
