// Next.js config for local dev and GitHub Pages static export
// Uses basePath and assetPrefix only in production for /bugket
import type { NextConfig } from "next";

const repo = 'bugket'; // GitHub repo name
const isProd = process.env.NODE_ENV === 'production';
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  basePath: isProd ? '/bugket' : '',
  assetPrefix: isProd ? '/bugket' : '',
  trailingSlash: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
