// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
//   reactStrictMode: false,
//   images: {
//     domains: ["lh3.googleusercontent.com"],
//   },
//   allowedDevOrigins: [
//     "localhost",
//     "127.0.0.1",
//     "192.168.1.5", // your LAN IP
//   ],
// };

// export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com", // replace with your image domain
      },
    ],
  },
  allowedDevOrigins: [
    "localhost",
    "127.0.0.1",
    "192.168.1.5", // your LAN IP
  ],
};

export default nextConfig;
