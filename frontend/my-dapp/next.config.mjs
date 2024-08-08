/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        staleTimes: {
            dynamic: 30//So that the client side router caches pages for 30 seconds
        },
    },
    serverExternalPackages: ["@node-rs/argon2"], //From the lucia documentation
};

export default nextConfig;
