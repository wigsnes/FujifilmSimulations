/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    scrollRestoration: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "6w4sba9x1x7bgawo.public.blob.vercel-storage.com",
        port: "",
      },
    ],
  },
};

export default nextConfig;
