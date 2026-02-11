import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Configuração para subpath /lab
  basePath: '/lab',

  // Asset prefix para servir assets do subpath correto
  assetPrefix: '/lab',

  // Variáveis de ambiente públicas
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
  },

  // Otimizações
  compress: true,
  poweredByHeader: false,

  // Required for static export
  output: 'export',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
