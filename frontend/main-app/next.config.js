/** @type {import('next').NextConfig} */
const nextConfig = {
    transpilePackages: ["@repo/ui"],
    // Configuring allowed origins as suggested by the warning
    devIndicators: {
        allowedDevOrigins: ["192.168.100.110"],
    },
};

module.exports = nextConfig;
