# Sentinels Design Lab

Production website for Sentinels Design Lab.

## Production Stack

- Next.js 15 App Router
- React 18
- Tailwind CSS
- Framer Motion
- Radix UI
- Vercel deployment
- GitHub source control

## Local Development

```bash
npm ci
npm run dev
```

The development server runs on the standard Next.js local port unless overridden.

## Production Validation

```bash
npm run build
npm start
```

## Project Structure

```text
app/                    Next.js routes, metadata, sitemap, and robots
src/components/         Active application components
src/lib/                Shared site data, metadata, and utilities
src/index.css            Global styles
public/                  Production images and static assets
next.config.mjs          Next.js configuration
package.json             Runtime and build dependencies
```

The `@/*` path alias resolves to `src/*`.

## Production Source of Truth

- `main` is the production branch.
- Vercel production deployments are sourced from GitHub.
- `https://www.sentinelsdesignlab.com` is the production domain.
- Platform-exported or historical project copies are not the production source of truth.

## Pricing Data

Current public pricing and managed website-care inclusions are centralized in `src/lib/pricingData.js` and rendered by `src/components/pages/Pricing.jsx`.

## Deployment Notes

Production changes should be validated through a branch/PR, allowed to complete the Vercel preview/build checks, and then merged into `main`.
