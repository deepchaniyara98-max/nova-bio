/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Vercel injects its own adapter; standalone + adapter fails on Next 16
  // with ENOENT .next/next-server.js.nft.json
  output: process.env.VERCEL ? undefined : "standalone",
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
  turbopack: {
    root: process.cwd(),
  },
  agentRules: false,
};

export default nextConfig;
