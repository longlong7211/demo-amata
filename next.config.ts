import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'csdl.vietnamtourism.gov.vn',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
