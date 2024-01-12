import { SITE_INFO } from "@config";
import { apiJson } from "@utils/api";

export async function GET() {
  const manifest = {
    short_name: SITE_INFO.short_name,
    name: SITE_INFO.name,
    description: SITE_INFO.description,
    start_url: "/",
    background_color: "#ffffff",
    theme_color: "#000000",
    display: "standalone",
    icons: [
      {
        src: "/favicon.svg",
        type: "image/svg+xml",
        sizes: "32x32",
      },
      {
        src: "/icons/icon-512.svg",
        type: "image/svg+xml",
        sizes: "512x512",
      },
      {
        src: "/icons/icon-192.png",
        type: "image/png",
        sizes: "192x192",
      },
      {
        src: "/icons/icon-512.png",
        type: "image/png",
        sizes: "512x512",
      },
      {
        src: "/icons/maskable_icon.png",
        type: "image/png",
        sizes: "192x192",
        purpose: "maskable",
      },
    ],
  };

  return new Response(JSON.stringify(manifest), apiJson);
}
