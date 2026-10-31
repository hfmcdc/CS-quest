/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: { ignoreDuringBuilds: true },
  // All pages are static, so keep prefetched route payloads in the client router cache longer (seconds).
  experimental: { staleTimes: { dynamic: 300, static: 600 } },
  async headers() {
    return [{ source: "/sw.js", headers: [{ key: "Cache-Control", value: "no-cache" }, { key: "Service-Worker-Allowed", value: "/" }] }];
  },
};
export default nextConfig;
