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
  };

  return new Response(JSON.stringify(manifest), apiJson);
}
