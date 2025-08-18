import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  compiler: { styledComponents: true },

  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://timetile-api.click/api/:path*',
      },
    ];
  },
};

export default nextConfig;
