const clean = (value, fallback = "Not verified") => String(value || fallback).replace(/[<>]/g, "").slice(0, 500);

export function buildSafeReportSummary(evaluation) {
  return {
    score: Number.isFinite(Number(evaluation?.score)) ? Number(evaluation.score) : null,
    scoreLabel: clean(evaluation?.scoreLabel),
    confidence: clean(evaluation?.confidence?.label),
    verdict: clean(evaluation?.verdict),
    verifiedFindings: (evaluation?.findings || []).filter((item) => item.status === "Verified Fail" || item.status === "Verified Pass").slice(0, 8).map((item) => ({ title: clean(item.title), status: clean(item.status), evidence: clean(item.evidence) })),
    unverified: (evaluation?.unverifiedDimensions || []).slice(0, 8).map((item) => ({ label: clean(item.label), status: clean(item.status), reason: clean(item.reason) })),
  };
}
