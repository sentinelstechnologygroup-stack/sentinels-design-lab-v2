/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  async redirects() {
    return [
      { source: "/Packages", destination: "/pricing", permanent: true },
      { source: "/Projects", destination: "/work", permanent: true },
      { source: "/Reviews", destination: "/", permanent: true },
      { source: "/Roi", destination: "/pricing", permanent: true },
      { source: "/ROI", destination: "/pricing", permanent: true },
      { source: "/ROICalculator", destination: "/pricing", permanent: true },
      { source: "/StartProject", destination: "/contact?type=website-evaluation", permanent: true },
      { source: "/Start-Project", destination: "/contact?type=website-evaluation", permanent: true },
      { source: "/ComboPackages", destination: "/pricing", permanent: true },
      { source: "/ProjectDetail", destination: "/work", permanent: true },
    ];
  },
};

export default nextConfig;
