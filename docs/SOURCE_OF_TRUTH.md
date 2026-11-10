# Source of truth

The independently hosted Vercel site at https://sentinelsdesignlab.com is authoritative.
This branch reconciles the source checkout used for deployment dpl_Eh8yCC9MiXLtS2ysNhgv5ujRtaBt, including its previously uncommitted public Work assets and application changes. The production website is not redeployed by this task.

Do not merge this branch to main until release effects have been reviewed. Main may trigger a production deployment. Existing main-only commercial changes are intentionally not part of the live-source snapshot. Repository CI configuration is retained.

The Base44 V2 mirror is maintained separately in sentinelstechnologygroup-stack/SDL-v2-b44. It is a derived public presentation, never an upstream source for this repository. Do not connect the primary domain or production credentials to Base44.

## Validation and known baseline

The source builds on Vercel. The grocery demo link was checked live; homepage, pricing, services and Work text matched the prior production release apart from that link.
The baseline source snapshot at `164e252cd727c7a4ff3a19552c38d4a17a463e77` preserved two failing evaluation-engine score-cap assertions. That immutable commit and the unchanged checksum manifest retain the honest original capture.

The November 10 QC follow-up corrects a separate validator inconsistency: transparent v6 scores are measured category aggregates, while critical failures determine the readiness label. High measured scores with a critical, nonfavorable verdict must validate; critical failures must still reject both favorable readiness labels. Regression tests exercise the complete build-plus-validation path and preserve category-score transparency, low confidence and visible risk warnings. No score formula or customer-routing behavior changed. This follow-up is not permission to merge the broader reconciliation into main or deploy its unrelated differences.
No .env files, DNS backups, build outputs, credentials, or local caches are included. docs/live-source-manifest.json records runtime source checksums.
