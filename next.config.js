/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  poweredByHeader: false,
  async redirects() {
    return [
      { source: "/industries", destination: "/#who-we-help", permanent: true },
      { source: "/why-intermix-ai", destination: "/about", permanent: true },
      { source: "/resources/:path*", destination: "/faq", permanent: true },
      { source: "/services/:slug", destination: "/services", permanent: true },
      { source: "/terms", destination: "/privacy", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "DENY" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};
