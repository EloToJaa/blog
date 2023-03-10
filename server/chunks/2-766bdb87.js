import { s as serializeNonPOJOs } from './helpers-b426d147.js';

const load = async ({ locals }) => {
  const posts = locals.pocketBase.collection("posts");
  const postsList = await posts.getFullList({
    sort: "postedAt",
    order: "desc",
    filter: `postedAt<='${new Date().toISOString()}'`,
    expand: "author"
  });
  const newPosts = [];
  postsList.forEach((post) => {
    const author = serializeNonPOJOs(post.expand.author);
    newPosts.push({
      author: author.username,
      postedAt: post.postedAt,
      slug: post.slug,
      title: post.title,
      description: post.description
    });
  });
  return {
    posts: newPosts
  };
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 2;
const component = async () => (await import('./_page.svelte-c9ce5b43.js')).default;
const file = '_app/immutable/entry/_page.svelte.2d669fac.js';
const server_id = "src/routes/+page.server.ts";
const imports = ["_app/immutable/entry/_page.svelte.2d669fac.js","_app/immutable/chunks/index.139172c0.js","_app/immutable/chunks/Posts.ff5fee83.js","_app/immutable/chunks/getDate.e2305294.js","_app/immutable/chunks/fa.aaf9e9b5.js","_app/immutable/chunks/Indicator.svelte_svelte_type_style_lang.fbd5f539.js","_app/immutable/chunks/index.e8b7944c.js"];
const stylesheets = ["_app/immutable/assets/fa.95b16411.css","_app/immutable/assets/Indicator.1d121e74.css"];
const fonts = [];

export { component, file, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=2-766bdb87.js.map
