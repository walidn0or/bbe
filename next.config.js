/** @type {import('next').NextConfig} */
const nextConfig = {
  // Production optimizations
  reactStrictMode: true,
  
  // Image optimization
  images: {
    formats: ['image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    domains: [], // Add your image CDN domains here if using external images
  },

  // Security headers
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          }
        ],
      },
      {
        source: '/videos/:path*.mp4',
        headers: [
          { 
            key: 'Content-Type',
            value: 'video/mp4' 
          },
          {
            key: 'Content-Disposition',
            value: 'inline'
          },
          {
            key: 'Accept-Ranges',
            value: 'bytes'
          },
        ],
      },
      {
        source: '/videos/:path*.mov',
        headers: [
          { 
            key: 'Content-Type',
            value: 'video/quicktime' 
          },
          {
            key: 'Content-Disposition',
            value: 'inline'
          },
          {
            key: 'Accept-Ranges',
            value: 'bytes'
          },
        ],
      },
      {
        source: '/images/videos/:path*.mp4',
        headers: [
          { 
            key: 'Content-Type',
            value: 'video/mp4' 
          },
          {
            key: 'Content-Disposition',
            value: 'inline'
          },
          {
            key: 'Accept-Ranges',
            value: 'bytes'
          },
        ],
      },
      {
        source: '/images/videos/:path*.mov',
        headers: [
          { 
            key: 'Content-Type',
            value: 'video/quicktime' 
          },
          {
            key: 'Content-Disposition',
            value: 'inline'
          },
          {
            key: 'Accept-Ranges',
            value: 'bytes'
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig