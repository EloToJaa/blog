import rss, { type RSSFeedItem } from "@astrojs/rss";
import BlogCollection from "@utils/blog";
import type { APIContext } from "astro";

export async function GET(context: APIContext) {
  const blogCollection = new BlogCollection();
  await blogCollection.getCollection();
  const posts = blogCollection.getPosts();

  return rss({
    title: "EloToJa's Blog",
    description: "A blog about web development and other stuff",
    // https://docs.astro.build/en/reference/api-reference/#contextsite
    site: context.site ?? "",
    items: posts.map(post => ({
      title: post.data.title,
      author: post.data.author.slug,
      description: post.data.description,
      link: `/blog/${post.slug}`,
      pubDate: post.data.pubDatetime,
    })) as RSSFeedItem[],
    customData: `<language>en-us</language>`,
  });
}
