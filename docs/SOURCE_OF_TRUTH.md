# Source of truth

The independently hosted Vercel site at https://sentinelsdesignlab.com is authoritative.
This branch reconciles the source checkout used for deployment dpl_Eh8yCC9MiXLtS2ysNhgv5ujRtaBt, including its previously uncommitted public Work assets and application changes. The production website is not redeployed by this task.

Do not merge this branch to main until release effects have been reviewed. Main may trigger a production deployment. Existing main-only commercial changes are intentionally not part of the live-source snapshot. Repository CI configuration is retained.

The Base44 V2 mirror is maintained separately in sentinelstechnologygroup-stack/SDL-v2-b44. It is a derived public presentation, never an upstream source for this repository. Do not connect the primary domain or production credentials to Base44.

## Validation and known baseline

The source builds on Vercel. The grocery demo link was checked live; homepage, pricing, services and Work text matched the prior production release apart from that link.
Two existing evaluation-engine assertions fail against this exact source snapshot (conflicting-source score cap and alternate-domain score cap). They also failed before reconciliation; this task preserves them for an honest baseline rather than silently changing backend behavior.
No .env files, DNS backups, build outputs, credentials, or local caches are included. docs/live-source-manifest.json records runtime source checksums.
