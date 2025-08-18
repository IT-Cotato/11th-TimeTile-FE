import { NextConfig } from "next";

const nextConfig: NextConfig = {
  compiler: {
    styledComponents: true,
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://timetile-api.click/api/:path*",
      },
    ];
  },
};

export default nextConfig;
