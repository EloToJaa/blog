import { s as serializeNonPOJOs } from './helpers-ba8b6484.js';

const load = ({ locals }) => {
  const user = serializeNonPOJOs(locals.pocketBase.authStore.model);
  return {
    user
  };
};

var _layout_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 0;
const component = async () => (await import('./_layout.svelte-cee401c8.js')).default;
const file = '_app/immutable/entry/_layout.svelte.cac356c0.js';
const server_id = "src/routes/+layout.server.ts";
const imports = ["_app/immutable/entry/_layout.svelte.cac356c0.js","_app/immutable/chunks/index.2655b24c.js","_app/immutable/chunks/toast.54ef7492.js","_app/immutable/chunks/index.393cae65.js","_app/immutable/chunks/stores.a0731d69.js","_app/immutable/chunks/singletons.c3fa7fcc.js","_app/immutable/chunks/Indicator.svelte_svelte_type_style_lang.c401fae7.js","_app/immutable/chunks/ToolbarButton.c384bc9e.js","_app/immutable/chunks/fa.5d2fbb7b.js","_app/immutable/chunks/Wrapper.0f99e45f.js"];
const stylesheets = ["_app/immutable/assets/_layout.729b6ec2.css","_app/immutable/assets/Indicator.1d121e74.css","_app/immutable/assets/fa.95b16411.css"];
const fonts = [];

export { component, file, fonts, imports, index, _layout_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=0-0496c769.js.map
