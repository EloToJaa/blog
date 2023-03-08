import { s as serializeNonPOJOs } from './helpers-ba8b6484.js';
import { e as error } from './index-1dce6fb5.js';

const load = async ({ locals, params }) => {
  try {
    const posts = locals.pocketBase.collection("posts");
    const post = await posts.getFirstListItem(`slug="${params.slug}"`, { expand: "author" });
    const author = serializeNonPOJOs(post.expand.author);
    const postObject = {
      author: author.username,
      authorId: author.id,
      postedAt: post.postedAt,
      slug: post.slug,
      title: post.title,
      content: post.content
    };
    const user = serializeNonPOJOs(locals.pocketBase.authStore.model);
    return {
      post: postObject,
      user: locals.pocketBase.authStore.isValid ? user : null
    };
  } catch (err) {
    console.log(err);
    throw error(404, "Post not found");
  }
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 7;
const component = async () => (await import('./_page.svelte-4b25ac4f.js')).default;
const file = '_app/immutable/entry/blog-_slug_-page.svelte.6d0c48de.js';
const server_id = "src/routes/blog/[slug]/+page.server.ts";
const imports = ["_app/immutable/entry/blog-_slug_-page.svelte.6d0c48de.js","_app/immutable/chunks/index.2655b24c.js","_app/immutable/chunks/getDate.e2305294.js","_app/immutable/chunks/Indicator.svelte_svelte_type_style_lang.c401fae7.js"];
const stylesheets = ["_app/immutable/assets/_page.eac0d35b.css","_app/immutable/assets/Indicator.1d121e74.css"];
const fonts = [];

export { component, file, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=7-46e69a65.js.map
