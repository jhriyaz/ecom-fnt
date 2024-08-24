/** @type {import('next').NextConfig} */


const nextConfig = {
  swcMinify: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
        port: "",
        // pathname: "/**/",
      },
    ],
  },
};

export default nextConfig;
