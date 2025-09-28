// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'ictacademy.uz',
        pathname: '/media/**',
      },
      {
        protocol: 'https',
        hostname: 'ictacademy.uz',
        pathname: '/media/**',
      },
      {
        protocol: 'http',
        hostname: 'ictacademy.uz',
        pathname: '/backend/media/**',
      },
      {
        protocol: 'https',
        hostname: 'ictacademy.uz',
        pathname: '/backend/media/**',
      },
      {
        protocol: "http",
        hostname: "38.242.143.67",
        port: "8000",
        pathname: "/media/**",
      },
      {
        protocol: "https",
        hostname: "38.242.143.67",
        port: "8000",
        pathname: "/media/**",
      },
      {
        protocol: 'http',
        hostname: 'asi.tourism-uzbekistan.uz',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'asi.tourism-uzbekistan.uz',
        pathname: '/**',
      },
    ],
  }
}


module.exports = nextConfig
