import { apiJson } from "@utils/api";

export async function GET() {
  const manifest = {
    short_name: "EloToJa",
    name: "EloToJa's Blog",
    description: "A blog about web development and other stuff",
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
        src: "/icon-192.svg",
        type: "image/svg+xml",
        sizes: "192x192",
      },
      {
        src: "/icon-512.svg",
        type: "image/svg+xml",
        sizes: "512x512",
      },
    ],
  };

  return new Response(JSON.stringify(manifest), apiJson);
}
