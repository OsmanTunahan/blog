import type { NextConfig } from "next";

const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "avatars.githubusercontent.com",
      },
    ],
  },
};

export default nextConfig;
