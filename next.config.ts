import type { NextConfig } from "next";

const nextConfig: NextConfig = {
   images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dims.apnews.com",
      },
    ],
  },
};

export default nextConfig;
