import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: { root: process.cwd() },
  outputFileTracingRoot: process.cwd(),
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
