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
};

export default nextConfig;