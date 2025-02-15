import type { NextConfig } from "next";
import "./env";

const nextConfig: NextConfig = {
  // remove or comment out to disable eslint errors for the project.
  eslint: {
    ignoreDuringBuilds: true,
  },

  //  uncomment to ignore build typescript errors for the project.
  // typescript: {
  //   ignoreBuildErrors: true,
  // },
};

export default nextConfig;
