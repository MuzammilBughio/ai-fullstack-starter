/** @type {import('next').NextConfig} */
const nextConfig = {
  // Allows API calls to your FastAPI backend in production
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${process.env.NEXT_PUBLIC_API_URL}/:path*`,
      },
    ];
  },
};

export default nextConfig;
