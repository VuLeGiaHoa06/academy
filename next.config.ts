import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { hostname: "erao7nnn5q.ufs.sh" },
      { hostname: "img.clerk.com" },
    ],
  },
};

export default nextConfig;
