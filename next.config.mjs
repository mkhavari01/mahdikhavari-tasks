/**
 * @type {import('next').NextConfig}
 */
const isStaticExport = 'false';

const nextConfig = {
  reactStrictMode: false,
  trailingSlash: true,
  basePath: process.env.NEXT_PUBLIC_BASE_PATH,
  env: {
    BUILD_STATIC_EXPORT: isStaticExport,
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    domains: ['', process.env.NEXT_PUBLIC_IMAGE_DOMAIN].filter(Boolean),
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.site.com',
        pathname: '/**',
      },
    ],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
  ...(isStaticExport === 'true' && {
    output: 'export',
  }),
  output: 'standalone',
};

export default nextConfig;
