import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '/blog-ssg-nextjs',
  assetPrefix: '/blog-ssg-nextjs/',
};

export default nextConfig;
