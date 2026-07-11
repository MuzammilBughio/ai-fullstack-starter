/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    // Fallback to localhost if the env variable isn't loaded yet during the build pass
    const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

    return [
      {
        source: '/api/:path*',
        destination: `${backendUrl}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;