import withPWA from '@ducanh2912/next-pwa';

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    env: {
        DATABASE_URL: process.env.DATABASE_URL,
        ELIOT_DATABASE_URL: process.env.ELIOT_DATABASE_URL,
        JWT_SECRET: process.env.JWT_SECRET
    }
};

export default withPWA({
    dest: "public",
    disable: process.env.NODE_ENV === "development",
    register: true,
    swcMinify: true,
    skipWaiting: true,
    cacheOnFrontEndNav: true,
    aggressiveFrontEndNavCaching: true,
    reloadOnOnline: true,
    workboxOptions: {
        disableDevLogs: true,
    },
    compiler: {
        removeConsole: process.env.NODE_ENV !== 'development'
    },
})(nextConfig);