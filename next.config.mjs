// next.config.mjs
import bundleAnalyzer from "@next/bundle-analyzer";

// Enable the analyzer only when the ANALYZE environment variable is set to 'true'
const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

/** @type {import('next').NextConfig} */
const nextConfig = {};

// Export the configuration with the bundle analyzer applied
export default withBundleAnalyzer(nextConfig);
