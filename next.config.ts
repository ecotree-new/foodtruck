import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pub-8ba77ae4d6be44b2b12c9762cc3ef01a.r2.dev",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
