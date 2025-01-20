/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
      serverActions: {
        bodySizeLimit: '1000mb'
      }
    },
    images: {
      domains: ['storage.googleapis.com']
    },
    reactStrictMode: false,
    webpack(config) {
        config.module.rules.push({
          test: /\.svg$/,
          use: ['@svgr/webpack'],
        });
    
        return config;
      },
};

export default nextConfig;
