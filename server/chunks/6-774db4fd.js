import { r as redirect } from './index-1dce6fb5.js';

const load = async ({ params, locals }) => {
  const token = params.token;
  try {
    const users = locals.pocketBase.collection("users");
    await users.confirmVerification(token);
    return;
  } catch (err) {
    console.error(err);
  }
  throw redirect(303, "/");
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 6;
const component = async () => (await import('./_page.svelte-750a8ff6.js')).default;
const file = '_app/immutable/entry/auth-confirm-verification-_token_-page.svelte.e62e44cc.js';
const server_id = "src/routes/auth/confirm/verification/[token]/+page.server.ts";
const imports = ["_app/immutable/entry/auth-confirm-verification-_token_-page.svelte.e62e44cc.js","_app/immutable/chunks/index.139172c0.js","_app/immutable/chunks/Indicator.svelte_svelte_type_style_lang.fbd5f539.js"];
const stylesheets = ["_app/immutable/assets/Indicator.1d121e74.css"];
const fonts = [];

export { component, file, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=6-774db4fd.js.map
