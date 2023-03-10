import { s as serializeNonPOJOs } from './helpers-ba8b6484.js';

const load = async ({ locals }) => {
  const user = serializeNonPOJOs(locals.pocketBase.authStore.model);
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
    user,
    posts: newPosts
  };
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 14;
const component = async () => (await import('./_page.svelte-e21307a0.js')).default;
const file = '_app/immutable/entry/user-page.svelte.ce74ae41.js';
const server_id = "src/routes/user/+page.server.ts";
const imports = ["_app/immutable/entry/user-page.svelte.ce74ae41.js","_app/immutable/chunks/index.139172c0.js","_app/immutable/chunks/Posts.ff5fee83.js","_app/immutable/chunks/getDate.e2305294.js","_app/immutable/chunks/fa.aaf9e9b5.js","_app/immutable/chunks/Indicator.svelte_svelte_type_style_lang.fbd5f539.js","_app/immutable/chunks/index.e8b7944c.js","_app/immutable/chunks/Label.fbb2c53b.js","_app/immutable/chunks/Input.b3e37cdb.js","_app/immutable/chunks/Wrapper.48eecd67.js","_app/immutable/chunks/ToolbarButton.303651e4.js"];
const stylesheets = ["_app/immutable/assets/fa.95b16411.css","_app/immutable/assets/Indicator.1d121e74.css"];
const fonts = [];

export { component, file, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=14-f20a98a4.js.map
