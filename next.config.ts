// Next.js config for local dev and GitHub Pages static export
// Uses basePath and assetPrefix only in production for /clide
import type { NextConfig } from "next";

const repo = 'laisy'; // GitHub repo name
const isProd = process.env.NODE_ENV === 'production';
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  basePath: isProd ? '/laisy' : '',
  assetPrefix: isProd ? '/laisy' : '',
  trailingSlash: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
