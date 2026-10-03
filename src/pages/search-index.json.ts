import { loadPosts } from "@utils/blog";
import { postUrl } from "@utils/posts";
export async function GET() {
  const posts = await loadPosts();
  return Response.json(
    posts.map(post => ({
      href: postUrl(post.id),
      frontmatter: { ...post.data, pubDatetime: post.data.pubDatetime.toISOString() },
    }))
  );
}
