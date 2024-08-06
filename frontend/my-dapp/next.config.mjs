/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        staleTimes: {
            dynamic: 30//So that the client side router caches pages for 30 seconds
        },
    },
};

export default nextConfig;
