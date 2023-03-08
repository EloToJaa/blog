import { s as serializeNonPOJOs } from './helpers-ba8b6484.js';

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

const index = 13;
const component = async () => (await import('./_page.svelte-a6f5c804.js')).default;
const file = '_app/immutable/entry/search-page.svelte.ad7e4086.js';
const server_id = "src/routes/search/+page.server.ts";
const imports = ["_app/immutable/entry/search-page.svelte.ad7e4086.js","_app/immutable/chunks/index.2655b24c.js","_app/immutable/chunks/Posts.1f5e0745.js","_app/immutable/chunks/getDate.e2305294.js","_app/immutable/chunks/fa.5d2fbb7b.js","_app/immutable/chunks/Indicator.svelte_svelte_type_style_lang.c401fae7.js","_app/immutable/chunks/index.393cae65.js","_app/immutable/chunks/Wrapper.0f99e45f.js","_app/immutable/chunks/Input.ebb301ae.js"];
const stylesheets = ["_app/immutable/assets/fa.95b16411.css","_app/immutable/assets/Indicator.1d121e74.css"];
const fonts = [];

export { component, file, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=13-0f375401.js.map
