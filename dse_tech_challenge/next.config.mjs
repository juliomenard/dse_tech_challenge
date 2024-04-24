/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        CLIENT_ID: process.env.CLIENT_ID,
    },
  serverRuntimeConfig: {
    CLIENT_ID: process.env.CLIENT_ID,
    CLIENT_SECRET: process.env.CLIENT_SECRET,
    SESSION_SECRET: process.env.SESSION_SECRET,
  },
};

export default nextConfig;


