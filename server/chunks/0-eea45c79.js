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
const component = async () => (await import('./_layout.svelte-2471177b.js')).default;
const file = '_app/immutable/entry/_layout.svelte.ec4e794a.js';
const server_id = "src/routes/+layout.server.ts";
const imports = ["_app/immutable/entry/_layout.svelte.ec4e794a.js","_app/immutable/chunks/index.139172c0.js","_app/immutable/chunks/toast.d71cff8f.js","_app/immutable/chunks/index.e8b7944c.js","_app/immutable/chunks/stores.2e75e177.js","_app/immutable/chunks/singletons.a8873716.js","_app/immutable/chunks/Indicator.svelte_svelte_type_style_lang.fbd5f539.js","_app/immutable/chunks/ToolbarButton.303651e4.js","_app/immutable/chunks/fa.aaf9e9b5.js","_app/immutable/chunks/Wrapper.48eecd67.js"];
const stylesheets = ["_app/immutable/assets/_layout.0a67c0f1.css","_app/immutable/assets/Indicator.1d121e74.css","_app/immutable/assets/fa.95b16411.css"];
const fonts = [];

export { component, file, fonts, imports, index, _layout_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=0-eea45c79.js.map
