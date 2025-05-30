import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "res.cloudinary.com",
        pathname: "/dcgdhd1er/image/upload/**",
      },
    ],
  },
};

export default nextConfig;
