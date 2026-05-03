/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    // Flat config (eslint.config.mjs) is incompatible with Next.js built-in
    // ESLint runner — it passes deprecated useEslintrc/extensions options.
    // Run linting separately: npx eslint src/
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;