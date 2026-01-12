import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: ["snippet-manager.ddev.site"],
    },
  },
  allowedDevOrigins: ["snippet-manager.ddev.site"],
};

export default nextConfig;
