/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Export estático: sem Server Actions nem rotas dinâmicas na página, dá
  // para gerar HTML/CSS/JS puro e publicar sem depender de Node no host.
  output: "export",
  images: {
    // A otimização de imagem embutida do Next exige um servidor rodando —
    // não existe em export estático.
    unoptimized: true,
  },
  // Mantém o bundle de ícones enxuto: só os ícones efetivamente importados
  // entram no build, mesmo com imports nomeados.
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
};

export default nextConfig;
