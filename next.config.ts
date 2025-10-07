import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/w8h1d8f',  // la ruta que tu QR apunta
        destination: '/',      // tu home
        permanent: true,       // 301 permanente
      },
    ]
  },
};

export default nextConfig;
