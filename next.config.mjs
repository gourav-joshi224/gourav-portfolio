/** @type {import("next").NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  compress: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.gourav-dev-psi.vercel.app" }],
        destination: "https://gourav-dev-psi.vercel.app/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
