# Sentinels Design Lab

Sentinels Design Lab is a Vite + React marketing site. This repository has been scrubbed of platform-specific runtime dependencies so it can run as a standard local project.

## Stack

- Vite
- React
- React Router
- Tailwind CSS
- Framer Motion
- Radix UI

## Getting Started

1. Install dependencies:
   npm install

2. Start the development server:
   npm run dev

3. Build for production:
   npm run build

4. Preview the production build locally:
   npm run preview

## Project Structure

sentinels-design-lab/
├─ src/
│  ├─ components/
│  ├─ hooks/
│  ├─ lib/
│  ├─ pages/
│  ├─ utils/
│  ├─ App.jsx
│  ├─ index.css
│  └─ main.jsx
├─ index.html
├─ package.json
├─ tailwind.config.js
└─ vite.config.js

## Notes

- Image references are currently hardcoded in individual pages and service pages.
- Shared business info, navigation, and utility values live in `src/lib/constants.js`.
- Delete `package-lock.json` and regenerate it after pasting the cleaned `package.json`.

Mac/Linux:
rm package-lock.json
npm install

Windows PowerShell:
Remove-Item package-lock.json
npm install

## Recommended Next Step
Proceed with framework normalization and then the V3 home page conversion pass.
