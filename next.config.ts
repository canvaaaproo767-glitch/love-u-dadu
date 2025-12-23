import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com', // Unsplash allow kiya
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com', // Cloudinary bhi allow kar diya future ke liye
      },
    ],
  },
};

export default nextConfig;