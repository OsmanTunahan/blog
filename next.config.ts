import type { NextConfig } from "next";

const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "avatars.githubusercontent.com",
      },
    ],
  },
  typescript: {
    ignoreBuildErrors: true
  },
  env: {
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
    VERCEL_URL: process.env.VERCEL_URL,
  },
  output: 'standalone',
};

export default nextConfig;