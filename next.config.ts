import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  productionBrowserSourceMaps: true,
  poweredByHeader: false,
  output: "standalone",
  env: {},
  images: {
    remotePatterns: [],
  },
};

export default nextConfig;
