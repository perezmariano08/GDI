/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    compiler: {
      styledComponents: true, // Habilita el soporte para Styled Components
    },
    eslint: {
      ignoreDuringBuilds: true,
    },
};
export default nextConfig;
