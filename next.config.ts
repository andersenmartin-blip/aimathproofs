import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        // Research content changes daily. Re-fetch the document on navigation;
        // fingerprinted scripts, styles and fonts keep their normal caching.
        source: "/",
        headers: [
          { key: "Cache-Control", value: "no-store, max-age=0" },
        ],
      },
    ];
  },
  async rewrites() {
    return {
      beforeFiles: [{ source: "/simplechess", destination: "/simplechess/index.html" }],
      afterFiles: [],
      fallback: [],
    };
  },
};

export default nextConfig;
