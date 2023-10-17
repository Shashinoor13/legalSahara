/** @type {import('next').NextConfig} */
const nextConfig = {
    // experimental: true,
    experimental: {
      serverActions: true,
    },
    images: {
        domains: ['example.com','dummyimage.com','cdn.sanity.io'],
      },
      
}

module.exports = nextConfig
