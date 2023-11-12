/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
        dirs: ['app','components'],
        ignoreDuringBuilds: true,
    },
}

module.exports = nextConfig
