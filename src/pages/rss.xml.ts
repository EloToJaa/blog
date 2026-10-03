import rss, { type RSSFeedItem } from "@astrojs/rss";
import { SITE_INFO } from "@config";
import { loadPosts } from "@utils/blog";
import { postUrl } from "@utils/posts";
import type { APIContext } from "astro";

export async function GET(context: APIContext) {
  const allPosts = await loadPosts();
  const posts = allPosts;

  return rss({
    title: SITE_INFO.name,
    description: SITE_INFO.description,
    // https://docs.astro.build/en/reference/api-reference/#contextsite
    site: context.site ?? "",
    items: posts.map(post => ({
      title: post.data.title,
      author: post.data.author.id,
      description: post.data.description,
      link: postUrl(post.id),
      pubDate: post.data.pubDatetime,
      categories: post.data.tags,
    })) as RSSFeedItem[],
    customData: `<language>en-us</language>`,
  });
}
