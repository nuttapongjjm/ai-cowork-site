import type { NextConfig } from 'next'

const isProd = process.env.NODE_ENV === 'production'

const nextConfig: NextConfig = {
  output: 'export',

  images: {
    unoptimized: true,
  },

  basePath: isProd ? '/ai-cowork-site' : '',

  assetPrefix: isProd ? '/ai-cowork-site/' : '',
}

export default nextConfig