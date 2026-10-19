import type { MetadataRoute } from "next";

// Home Screen name and icons. display "browser" keeps the shortcut opening in
// the regular browser, so the site behaves exactly as it does in Safari today.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Intermix AI",
    short_name: "Intermix AI",
    start_url: "/",
    display: "browser",
    background_color: "#1c1c1e",
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
