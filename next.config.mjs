/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
    domains: ['d2d22nphq0yz8t.cloudfront.net', 'cdn.tailgrids.com']
  }
};

export default nextConfig;
