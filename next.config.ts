import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return {
      beforeFiles: [{ source: "/simplechess", destination: "/simplechess/index.html" }],
      afterFiles: [],
      fallback: [],
    };
  },
};

export default nextConfig;
